<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $Usuario = datosUsuario($idUsuario);

   $Perfil = "";
   if ($Usuario['idPerfil'] > 3)
   {
      $Perfil = " WHERE Sedes.id = '" . $Usuario['idSede'] . "' OR Sedes.id IS NULL";
   }

   $sql = "SELECT
            madres.id as id,
            CONCAT(madres.Nombre1, ' ', madres.Nombre2, ' ', madres.Apellido1, ' ', madres.Apellido2) AS Nombre,
            CentrosZonales.Nombre AS CentroZonal,
            MAX(Fecha) AS ultimaAsignacion,
            3 AS Cupos,
            COUNT(DISTINCT nnaDiscapacitados.id) AS CD,
            COUNT(DISTINCT nnaVulnerables.id) AS CV
          FROM
            madres
            LEFT JOIN CentrosZonales ON CentrosZonales.id = madres.Localidad
            LEFT JOIN Sedes ON Sedes.id = CentrosZonales.idSede
            LEFT JOIN madres_Observaciones ON madres_Observaciones.idMadre = madres.id AND madres_Observaciones.Tipo = 'Ingreso de NNA'
            LEFT JOIN nna ON nna.idMadre = madres.id
            LEFT JOIN nna_Programa AS nnaDiscapacitados ON nna.id = nnaDiscapacitados.id AND nnaDiscapacitados.Discapacidad = 'SI'
            LEFT JOIN nna_Programa AS nnaVulnerables ON nna.id = nnaVulnerables.id AND nnaVulnerables.Discapacidad <> 'SI'
         $Perfil
         GROUP BY 
            madres.id;";

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