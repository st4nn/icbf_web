<?php
   include("../conectar.php"); 

   date_default_timezone_set('America/Bogota');

   $link = Conectar();

   $idEquipo = addslashes($_POST['idEquipo']);
   $Usuario = addslashes($_POST['Usuario']);

   
   

   $Respuesta = array();
   $Respuesta['Error'] = "";

         $sql = "UPDATE equipos SET Estado = 0 WHERE id = '$idEquipo';";
         $link->query(utf8_decode($sql));

         if ( $link->error <> "")
         {
            $Respuesta['Error'] .= "\n Hubo un error desconocido " . $link->error;
         } else
         {
            $Respuesta['datos'] = 1;
         }

   echo json_encode($Respuesta);

?>