<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $Usuario = datosUsuario($idUsuario);

   $Perfil = "";
   if ($Usuario['idPerfil'] > 3)
   {
      $Perfil = " AND (Sedes.id = '" . $Usuario['idSede'] . "' OR Sedes.id IS NULL)";
   }

   $sql = "SELECT
            equipos.id,
            equipos.Nombre,
            datosUsuarios.idSede AS idSede,
            GROUP_CONCAT(concat(datosUsuarios.Nombre, ' (', datosUsuarios.Cargo, ')') SEPARATOR ', ') AS Integrantes ,
            Sedes.Nombre AS Sede,
            COUNT(DISTINCT Programacion.idNNA) AS NNA
          FROM
            equipos
            INNER JOIN equipos_has_usuarios ON equipos_has_usuarios.idEquipo = equipos.id
            INNER JOIN datosUsuarios ON equipos_has_usuarios.idUsuario = datosUsuarios.idLogin
            LEFT JOIN Sedes ON datosUsuarios.idSede = Sedes.id
            LEFT JOIN Programacion ON Programacion.idEquipo = equipos.id
         WHERE 
            equipos.Estado = '1' 
            $Perfil
         GROUP BY
            equipos.id
         ORDER BY
            Programacion.fecha DESC;";

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