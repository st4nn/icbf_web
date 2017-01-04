<?php
   include("../conectar.php"); 

   $link = Conectar();

   $datos = json_decode($_POST['datos']);
   $usuario = addslashes($_POST['Usuario']);

   foreach ($datos as $key => $value) 
   {
      if (!is_array($datos->$key))
      {
         $datos->$key = addslashes($value);
      }
   }

   $id = "NULL";

   if (array_key_exists("Codigo", $datos))
   {
      if ($datos->Codigo > 0 AND $datos->Codigo <> "")
      {
         $id = $datos->Codigo;
      }
   } 

   date_default_timezone_set('America/Bogota');
   
   $fecha = date('Y-m-d h:i:s');

   $sql = "INSERT INTO madres(id, Latitud, Longitud, Prefijo, Codigo, Cedula, Apellido1, Apellido2, Nombre1, Nombre2, Telefono1, Telefono2, Celular1, Celular2, Correo, FechaNacimiento, Direccion, Barrio, Localidad, Urbano, Usuario, fechaCargue) VALUES 
         ('" . $id . "', 
         '" . $datos->Latitud . "', 
         '" . $datos->Longitud . "', 
         '" . $datos->Prefijo . "', 
         '" . $datos->Codigo . "', 
         '" . $datos->Cedula . "', 
         '" . $datos->Apellido1 . "', 
         '" . $datos->Apellido2 . "', 
         '" . $datos->Nombre1 . "', 
         '" . $datos->Nombre2 . "', 
         '" . $datos->Telefono1 . "', 
         '" . $datos->Telefono2 . "', 
         '" . $datos->Celular1 . "', 
         '" . $datos->Celular2 . "', 
         '" . $datos->Correo . "', 
         '" . $datos->FechaNacimiento . "', 
         '" . $datos->Direccion . "', 
         '" . $datos->Barrio . "', 
         '" . $datos->Localidad . "', 
         '" . $datos->Urbano . "', 
         '" . $datos->Usuario . "', 
         '" . $fecha . "')
         ON DUPLICATE KEY UPDATE
            Latitud = VALUES(Latitud), 
            Longitud = VALUES(Longitud), 
            Prefijo = VALUES(Prefijo), 
            Codigo = VALUES(Codigo), 
            Cedula = VALUES(Cedula), 
            Apellido1 = VALUES(Apellido1), 
            Apellido2 = VALUES(Apellido2), 
            Nombre1 = VALUES(Nombre1), 
            Nombre2 = VALUES(Nombre2), 
            Telefono1 = VALUES(Telefono1), 
            Celular1 = VALUES(Celular1), 
            Correo = VALUES(Correo), 
            FechaNacimiento = VALUES(FechaNacimiento), 
            Direccion = VALUES(Direccion), 
            Barrio = VALUES(Barrio), 
            Localidad = VALUES(Localidad), 
            Urbano = VALUES(Urbano), 
            Usuario = VALUES(Usuario), 
            fechaCargue = VALUES(fechaCargue);";
            
   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      if ($id  == "NULL")
      {
         $id = $link->insert_id;
      }
      $sql = "UPDATE madres SET Codigo = '$id' WHERE id = '$id'";
      $link->query(utf8_decode($sql));

      echo $id;
   } else
   {
      echo $link->error;
   }
?>