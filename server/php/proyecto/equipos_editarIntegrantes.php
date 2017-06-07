<?php
   include("../conectar.php"); 

   date_default_timezone_set('America/Bogota');

   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idEquipo = addslashes($_POST['idEquipo']);
   $Tipo = addslashes($_POST['Tipo']);
   $Usuario = addslashes($_POST['Usuario']);

   
   

   $Respuesta = array();
   $Respuesta['Error'] = "";

   if ($Tipo == "")
   {
      $Respuesta['Error'] = "No se puede completar la operación";
   } else
   {
      if ($Tipo == "INSERT")
      {
         $sql = "INSERT INTO equipos_has_usuarios(id, idEquipo, idUsuario, Usuario) VALUES (NULL, $idEquipo, $idUsuario, $Usuario) ON DUPLICATE KEY UPDATE Usuario = VALUES(Usuario);";
      }

      if ($Tipo == "DELETE")
      {
         $sql = "DELETE FROM equipos_has_usuarios WHERE idEquipo = $idEquipo AND idUsuario = $idUsuario;";
      }

      $link->query(utf8_decode($sql));

      if ( $link->error <> "")
      {
         $Respuesta['Error'] .= "\n Hubo un error desconocido " . $link->error;
      } else
      {
         $Respuesta['datos'] = $link->insert_id;
      }
   }

   echo json_encode($Respuesta);

?>