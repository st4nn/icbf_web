<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $Usuario = datosUsuario($idUsuario);

   $Perfil = "";
   if ($Usuario['idPerfil'] <> 1)
   {
      $Perfil = " WHERE Sedes.id = '" . $Usuario['idSede'] . "' OR Sedes.id IS NULL";
   }

   $sql = "SELECT
            madres.id as id,
            CONCAT(madres.Nombre1, ' ', madres.Nombre2, ' ', madres.Apellido1, ' ', madres.Apellido2) AS Nombre,
            CentrosZonales.Nombre AS CentroZonal,
            '--' AS ultimaAsignacion,
            0 AS Cupos,
            0 AS CV,
            0 AS CD
          FROM
            madres
            LEFT JOIN CentrosZonales ON CentrosZonales.id = madres.Localidad
            LEFT JOIN Sedes ON Sedes.id = CentrosZonales.idSede
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