<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);


   $Usuario = datosUsuario($idUsuario);
   $where = "";
   if ($Usuario['idPerfil'] > 3)
   {
      $where = " WHERE datosUsuarios.idSede = '" . $Usuario['idSede']  . "' AND datosUsuarios.idPerfil >= '" . $Usuario['idPerfil'] . "'";
   }

   if (array_key_exists('activos', $_POST))
   {
      if ($where <> '')
      {
         $where .= ' AND ';
      } else
      {
         $where = ' WHERE ';
      }

      $verActivos = addslashes($_POST['activos']);
      $strActivos = "'Activo'";

      if ($verActivos == 'true')
      {
         $strActivos = "'Activo', 'Inactivo'";
      }

      
      $where .= "Login.Estado IN (" .  $strActivos . ")";
   }

   $sql = "SELECT
            Login.idLogin as id,
            Login.Usuario,
            Login.Estado,
            datosUsuarios.Nombre,
            datosUsuarios.Correo,
            datosUsuarios.Cargo,
            datosUsuarios.idPerfil,
            datosUsuarios.idSede,
            Perfiles.Nombre AS 'Perfil',
            Sedes.Nombre AS 'Sede'
          FROM
            Login
            INNER JOIN datosUsuarios ON Login.idLogin = datosUsuarios.idLogin
            LEFT JOIN Sedes ON datosUsuarios.idSede = Sedes.id
            LEFT JOIN Perfiles ON datosUsuarios.idPerfil = Perfiles.idPerfil
         $where;";

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