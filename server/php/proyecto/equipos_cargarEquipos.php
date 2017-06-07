<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = $_POST['Usuario'];
   $Usuario = datosUsuario($idUsuario);

   $Perfil = "";
   if ($Usuario['idPerfil'] > 3)
   {
      $Perfil = " AND datosUsuarios.idSede = '" . $Usuario['idSede'] . "'";
   }

   $sql = "SELECT
            equipos.*,
            GROUP_CONCAT(concat(datosUsuarios.idLogin, ':', datosUsuarios.Nombre, ':', datosUsuarios.Cargo) SEPARATOR ',') AS Integrantes 
          FROM
            equipos
            LEFT JOIN equipos_has_usuarios ON equipos_has_usuarios.idEquipo = equipos.id
            LEFT JOIN datosUsuarios ON datosUsuarios.idLogin = equipos_has_usuarios.idUsuario 
         WHERE
            equipos.Estado = 1
            $Perfil
         GROUP BY
            equipos.id;";

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