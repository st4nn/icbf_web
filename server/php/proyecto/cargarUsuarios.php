<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = $_POST['Usuario'];
   $Usuario = datosUsuario($idUsuario);

   if ($Usuario['idPerfil'] <> 1)
   {
      //$empresa = " AND Login.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
   }

   $sql = "SELECT
            Login.idLogin as id,
            Login.Usuario,
            Login.Estado,
            datosUsuarios.Nombre,
            datosUsuarios.Correo,
            datosUsuarios.Cargo,
            datosUsuarios.idPerfil,
            datosUsuarios.idCentroZonal,
            Perfiles.Nombre AS 'Perfil',
            'Centro Zonal' AS 'CentroZonal'
          FROM
            Login
            INNER JOIN datosUsuarios ON Login.idLogin = datosUsuarios.idLogin
            LEFT JOIN Perfiles ON datosUsuarios.idPerfil = Perfiles.idPerfil;";

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