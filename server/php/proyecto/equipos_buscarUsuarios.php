<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $Parametro = addslashes($_POST['Nombre']);
   $idUsuario = addslashes($_POST['Usuario']);
   $Usuario = datosUsuario($idUsuario);

   $Parametro ="%" . str_replace(" ", "%", $Parametro) . '%';

   $Perfil = "";
   if ($Usuario['idPerfil'] > 3)
   {
      $Perfil = " AND datosUsuarios.idSede = '" . $Usuario['idSede'] . "'";
   }

   $sql = "SELECT
            Login.idLogin as id,
            datosUsuarios.Nombre,
            datosUsuarios.Cargo
          FROM
            Login
            INNER JOIN datosUsuarios ON Login.idLogin = datosUsuarios.idLogin
            LEFT JOIN equipos_has_usuarios ON equipos_has_usuarios.idUsuario = Login.idLogin
            LEFT JOIN equipos ON equipos_has_usuarios.idEquipo = equipos.id AND equipos.Estado = 1
         WHERE
            Login.Estado = 'Activo' 
            AND (equipos_has_usuarios.idUsuario IS NULL OR equipos.id IS NULL)
            AND (
               datosUsuarios.Nombre LIKE '$Parametro'
               OR datosUsuarios.Cargo LIKE '$Parametro'
            ) $Perfil LIMIT 0, 30;";

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