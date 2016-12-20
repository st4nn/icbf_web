<?php
   include("../conectar.php"); 

   date_default_timezone_set('America/Bogota');

   $link = Conectar();

   $datos = json_decode($_POST['datos']);

   foreach ($datos as $key => $value) 
   {
      $datos->$key = addslashes($value);
   }

   $Respuesta = array();
   $Respuesta['Error'] = "";

   $Nombre = $datos->Nombre;
   $id = "NULL";

   if ($datos->id != "")
   {
      $id = $datos->id;
   }

   if ($Nombre == "")
   {
      $Respuesta['Error'] = "El nombre no puede estar vacío";
   } else
   {
      $sql = "SELECT COUNT(*) AS 'Cantidad' FROM Regionales WHERE Nombre = '" . $Nombre . "';";
      $result = $link->query($sql);

      $fila =  $result->fetch_array(MYSQLI_ASSOC);
      
      if ($fila['Cantidad'] > 0 AND $id == "NULL")
      {
         $Respuesta['Error'] = "\n Ya existe una Regional con ese nombre, por favor seleccione otro.";
      } else
      {
         $fecha = date('Y-m-d H:i:s');
         $sql = "INSERT INTO Regionales(id, Nombre, Usuario) VALUES ($id, '$Nombre', " . $datos->Usuario . ") ON DUPLICATE KEY UPDATE Nombre = VALUES(Nombre), Usuario = VALUES(Usuario), fechaCargue = '$fecha';";
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