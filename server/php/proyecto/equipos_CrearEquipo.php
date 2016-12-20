<?php
   include("../conectar.php"); 

   date_default_timezone_set('America/Bogota');

   $link = Conectar();

   $nomEquipo = addslashes($_POST['Nombre']);
   $Usuario = addslashes($_POST['Usuario']);

   
   

   $Respuesta = array();
   $Respuesta['Error'] = "";

   if ($nomEquipo == "")
   {
      $Respuesta['Error'] = "El nombre no puede estar vacío";
   } else
   {
      $sql = "SELECT COUNT(*) AS 'Cantidad' FROM Equipos WHERE Nombre = '" . $nomEquipo . "';";
      $result = $link->query($sql);

      $fila =  $result->fetch_array(MYSQLI_ASSOC);
      
      if ($fila['Cantidad'] > 0 AND $id == "NULL")
      {
         $Respuesta['Error'] = "\n Ya existe un equipo con ese nombre, por favor seleccione otro.";
      } else
      {
         $sql = "INSERT INTO equipos(id, Nombre, Usuario) VALUES (NULL, '$nomEquipo', $Usuario);";
         $link->query(utf8_decode($sql));

         if ( $link->error <> "")
         {
            $Respuesta['Error'] .= "\n Hubo un error desconocido " . $link->error;
         } else
         {
            $nuevoId = $link->insert_id;
            $Respuesta['datos'] = $nuevoId;

         }
      }
   }

   echo json_encode($Respuesta);

?>