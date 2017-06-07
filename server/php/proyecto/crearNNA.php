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

   $sql = "INSERT INTO nna(id, Usuario, Prefijo, Codigo, TipoDocumento, Documento, Apellido1, Apellido2, Nombre1, Nombre2, FechaNacimiento, Adoptabilidad, fechaCargue) VALUES 
         ('" . $id . "', 
         '" . $datos->Usuario . "', 
         '" . $datos->Prefijo . "', 
         '" . $datos->Codigo . "', 
         '" . $datos->TipoDocumento . "', 
         '" . $datos->Documento . "', 
         '" . $datos->Apellido1 . "', 
         '" . $datos->Apellido2 . "', 
         '" . $datos->Nombre1 . "', 
         '" . $datos->Nombre2 . "', 
         '" . $datos->FechaNacimiento . "', 
         '" . $datos->Adoptabilidad . "', 
         '" . $fecha . "')
         ON DUPLICATE KEY UPDATE
            Usuario = VALUES(Usuario), 
            Prefijo = VALUES(Prefijo), 
            Codigo = VALUES(Codigo), 
            TipoDocumento = VALUES(TipoDocumento), 
            Documento = VALUES(Documento), 
            Apellido1 = VALUES(Apellido1), 
            Apellido2 = VALUES(Apellido2), 
            Nombre1 = VALUES(Nombre1), 
            Nombre2 = VALUES(Nombre2), 
            FechaNacimiento = VALUES(FechaNacimiento), 
            Adoptabilidad = VALUES(Adoptabilidad), 
            fechaCargue = VALUES(fechaCargue);";
            
   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      if ($id  == "NULL")
      {
         $id = $link->insert_id;
      }
      $sql = "UPDATE nna SET Codigo = '$id' WHERE id = '$id'";
      $link->query(utf8_decode($sql));

      echo $id;
   } else
   {
      echo $link->error;
   }
?>