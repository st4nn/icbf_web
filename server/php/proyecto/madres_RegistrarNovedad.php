<?php
   include("../conectar.php"); 

   $link = Conectar();

   $idMadre = addslashes($_POST['idMadre']);
   $Fecha = addslashes($_POST['Fecha']);
   $Tipo = addslashes($_POST['Tipo']);
   $Observaciones = addslashes($_POST['Observaciones']);
   $usuario = addslashes($_POST['Usuario']);

      date_default_timezone_set('America/Bogota');
   
   $fecha = date('Y-m-d h:i:s');

   $sql = "INSERT INTO madres_Observaciones(idMadre, Fecha, Tipo, Observaciones, Usuario) VALUES 
         (
         '" . $idMadre . "', 
         '" . $Fecha . "', 
         '" . $Tipo . "', 
         '" . $Observaciones . "', 
         '" . $usuario . "')
         ON DUPLICATE KEY UPDATE
            idMadre = VALUES(idMadre), 
            Fecha = VALUES(Fecha), 
            Tipo = VALUES(Tipo), 
            Observaciones = VALUES(Observaciones), 
            Usuario = VALUES(Usuario);";
            
   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      echo $link->insert_id;
   } else
   {
      echo $link->error;
   }
?>