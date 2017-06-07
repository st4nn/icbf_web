<?php
   include("../conectar.php"); 
   $link = Conectar();
   $idEquipo = addslashes($_POST['idEquipo']);
   $idUsuario = addslashes($_POST['Usuario']);
   if (array_key_exists("Borrados", $_POST))
   {
      $Borrados = $_POST['Borrados'];
      $sql = "";
      foreach ($Borrados as $key => $value) 
      {
         $sql = " DELETE FROM Programacion WHERE idEquipo = '" . addslashes($value['idEquipo']) . "' AND idMadre = '" . addslashes($value['idNNA']) . "' AND fecha = '" . addslashes($value['Fecha']) . "';";
         $link->query(utf8_decode($sql));
      }
   }
   if (array_key_exists("datos", $_POST))
   {
      $datos = $_POST['datos'];
      $values = "";
      foreach ($datos as $key => $value) 
      {
         $values .= " ('$idEquipo', '" . addslashes($value['idNNA']). "', '" . addslashes($value['Fecha']) . "', '$idUsuario'),";
      }
      $values = substr($values, 0, -1);
      $sql = "INSERT INTO Programacion(idEquipo, idMadre, fecha, Usuario) VALUES " . $values . " ON DUPLICATE KEY UPDATE fecha = VALUES(fecha);";
      $link->query(utf8_decode($sql));
      if ( $link->error == "")
      {
         echo 1;
      } else
      {
         echo $link->error;
      }
   }
?>