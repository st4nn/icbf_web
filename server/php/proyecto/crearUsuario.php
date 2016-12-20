<?php
   include("../conectar.php"); 
   include("../../../assets/mensajes/correo.php");  

   date_default_timezone_set('America/Bogota');

   $link = Conectar();

   $datos = json_decode($_POST['datos']);

   $id = "NULL";

   if ($datos->idLogin <> "")
   {
      $id = $datos->idLogin;
   }

   $pClave = $datos->Clave;

   $Respuesta = array();
   $Respuesta['Error'] = "";

   foreach ($datos as $key => $value) 
   {
      $datos->$key = addslashes($value);
   }

 
   $sql = "SELECT COUNT(*) AS 'Cantidad' FROM Login WHERE Usuario = '" . $datos->nUsuario . "';";
   $result = $link->query($sql);

   $fila =  $result->fetch_array(MYSQLI_ASSOC);

   if ($fila['Cantidad'] > 0 AND $id == "NULL")
   {
      $Respuesta['Error'] = "El Usuario ya existe, por favor selecciona otro.";
   } else
   {
      $sql = "SELECT COUNT(*) AS 'Cantidad' FROM datosUsuarios WHERE Correo = '" . $datos->Correo . "';";
      $result = $link->query($sql);

      $fila =  $result->fetch_array(MYSQLI_ASSOC);

      if ($fila['Cantidad'] > 0 AND $id == "NULL")
      {
         $Respuesta['Error'] .= "\n El Correo ya tiene un usuario asignado, por favor selecciona otro.";
      } else
      {
         if ($datos->Clave <> $datos->Clave2)
         {
            $Respuesta['Error'] .= "\n Las claves no coinciden.";
         } else
         {
            $nuevoId = $id;

            $fecha = date('Y-m-d H:i:s');
            $mensaje = "";

            if ($datos->Clave <> "laClaveEstaProtegida")
            {
               $sql = "INSERT INTO Login 
                           (idLogin, Usuario, Clave, Estado, fechaCargue) 
                        VALUES 
                           (
                              $id, 
                              '" . $datos->nUsuario . "', 
                              '" . md5(md5(md5($datos->Clave))) . "', 
                              '" . $datos->Estado . "',
                              '$fecha') ON DUPLICATE KEY UPDATE 
                              Clave = VALUES(Clave),
                              Estado = VALUES(Estado),
                              fechaCargue = VALUES(fechaCargue);";

               $link->query(utf8_decode($sql));
               $nuevoId = $link->insert_id;

               $Asunto = "Creación de Usuario " . $datos->Nombre;
               if ( $link->error <> "")
               {
                  $Respuesta['Error'] .= "\n Hubo un error desconocido " . $link->error;
               } else
               {
                  if ($id == "NULL")
                  {
                     $mensaje = "Buen Día, " . $datos->Nombre . "
                     <br>Se ha creado un usuario de acceso para el sistema Simasus,
                     <br><br>
                     Los datos de autenticación son:
                     <br><br>
                     <br>Url de Acceso: <a href='http://icbf.mentortic.com/'>http://icbf.mentortic.com</a>
                     <br>Usuario: " . $datos->nUsuario . "
                     <br>Clave: $pClave";
                  } else
                  {
                     $mensaje = "Buen Día, " . $datos->Nombre . "
                     <br>Se ha cambiado la clave de acceso para el sistema Simasus,
                     <br><br>
                     Los datos de autenticación son:
                     <br><br>
                     <br>Url de Acceso: <a href='http://icbf.mentortic.com/'>http://icbf.mentortic.com</a>
                     <br>Usuario: " . $datos->nUsuario . "
                     <br>Clave: $pClave";

                     $Asunto = "Cambio de Clave " . $datos->Nombre;
                  }
               }
            } 

            if ($nuevoId <> "NULL")
            {
               $sql = "UPDATE Login SET Estado = '" . $datos->Estado . "' WHERE idLogin = $nuevoId";
               $link->query(utf8_decode($sql));
                           
               $sql = "INSERT INTO datosUsuarios (idLogin, Nombre, Cargo, Correo, idPerfil, idCentroZonal, fechaCargue) 
                        VALUES 
                        (
                           $nuevoId, 
                           '" . $datos->Nombre . "', 
                           '" . $datos->Cargo . "', 
                           '" . $datos->Correo . "', 
                           '" . $datos->idPerfil . "', 
                           '" . $datos->idCentroZonal . "', 
                           '" . $fecha . "'
                        ) ON DUPLICATE KEY UPDATE 
                        Nombre = VALUES(Nombre), 
                        Cargo = VALUES(Cargo), 
                        idPerfil = VALUES(idPerfil), 
                        idCentroZonal = VALUES(idCentroZonal), 
                        fechaCargue = VALUES(fechaCargue);";
                  
               $link->query(utf8_decode($sql));

               if ( $link->error <> "")
               {
                  $Respuesta['Error'] .= "\n Hubo un error desconocido " . $link->error;
               } else
               {
                  if ($mensaje <> "")
                  {
                     //$obj = EnviarCorreo($datos->Correo, $Asunto, $mensaje) ;
                  }

                  $Respuesta['datos'] = $nuevoId;
               }
            } 
         }
      }
   }

   echo json_encode($Respuesta);

?>