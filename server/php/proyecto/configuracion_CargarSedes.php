<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = $_POST['Usuario'];
   $Usuario = datosUsuario($idUsuario);

   $Perfil = "";
   if ($Usuario['idPerfil'] > 3)
   {
      $Perfil = " WHERE Sedes.id = '" . $Usuario['idSede'] . "' OR Sedes.id IS NULL";
   }

   $sql = "SELECT
            Sedes.*,
            Regionales.Nombre AS Regional,
            datosUsuarios.Nombre AS Usuario_Nombre 
          FROM
            Sedes
            INNER JOIN Regionales ON Regionales.id = Sedes.idRegional
            LEFT JOIN datosUsuarios ON datosUsuarios.idLogin = Sedes.Usuario
         $Perfil;";

   $result = $link->query($sql);

   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado[$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado[$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
         echo json_encode($Resultado);
   } else
   {
      echo 0;
   }
?>