<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $idMadre = addslashes($_POST['idMadre']);
   $Usuario = datosUsuario($idUsuario);

   if ($Usuario['idPerfil'] <> 1)
   {
      //$empresa = " AND Login.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
   }

   $sql = "SELECT
            madres.*,
            Municipios.Nombre AS CentroZonal,
            CONCAT(Archivos.Ruta, '/', Archivos.Nombre) AS Foto
          FROM
            madres
            LEFT JOIN Municipios ON Municipios.id = madres.Localidad
            LEFT JOIN Archivos ON Archivos.Prefijo = madres.Prefijo AND Archivos.Proceso = 'Foto Madre'
         WHERE
            madres.id = '$idMadre'
         GROUP BY
            madres.id;";

   $result = $link->query($sql);

   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         //$Resultado[$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado[$key] = utf8_encode($value);
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