<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $idNNA = addslashes($_POST['idNNA']);
   $Usuario = datosUsuario($idUsuario);

   $Perfil = "";
   if ($Usuario['idPerfil'] <> 1)
   {
      $Perfil = " AND (Sedes.id = '" . $Usuario['idSede'] . "' OR Sedes.id IS NULL)";
   }

   $sql = "SELECT
            nna.*,
            CONCAT(Archivos.Ruta, '/', Archivos.Nombre) AS Foto
          FROM
            nna
            LEFT JOIN Archivos ON Archivos.Prefijo = nna.Prefijo AND Archivos.Proceso = 'Foto NNA'
            LEFT JOIN nna_Programa ON nna_Programa.id = nna.id
            LEFT JOIN CentrosZonales ON CentrosZonales.id = nna_Programa.idCentroZonal
            LEFT JOIN Sedes ON Sedes.id = CentrosZonales.idSede 
         WHERE
            nna.id = '$idNNA'
            $Perfil
         GROUP BY
            nna.id;";

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