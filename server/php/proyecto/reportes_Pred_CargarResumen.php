<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $Desde = addslashes($_POST['Desde']);
   $Hasta = addslashes($_POST['Hasta']);
   $Sede = addslashes($_POST['Sede']);
   $Agrupacion = addslashes($_POST['Agrupacion']);
   $Usuario = datosUsuario($idUsuario);

   if ($Desde == "" )
   {
      $Desde = '1900-01-01';
   }

   if ($Hasta == "" )
   {
      $Desde = '2030-01-01';
   }

   $Perfil = "";
   if ($Usuario['idPerfil'] > 3)
   {
      $Perfil .= "AND (Sedes.id = '" . $Usuario['idSede'] . "')";
   }

   $condicionAgrupado = "Municipios.Nombre AS Municipio,";
   $agruparPor = "Municipios.id";

   if ($Agrupacion == "2")
   {
      $condicionAgrupado = "CentrosZonales.Nombre AS Municipio,";
      $agruparPor = "CentrosZonales.id";
   }

   if ($Agrupacion == "3")
   {
      $condicionAgrupado = "Sedes.Nombre AS Municipio,";
      $agruparPor = "Sedes.id";
   }
   
   $sql = "SELECT
            Localidad,
            $condicionAgrupado
            Municipios.Coordenadas,
            ' ' AS munTiempo,
            SUM(Madres) AS Madres,
            SUM(NNA_Discapacidad) AS NNA_Discapacidad,
            SUM(NNA_Vulneracion) AS NNA_Vulneracion,
            SUM(NNA_SinInfo) AS NNA_SinInfo
         FROM (
            
         SELECT 
            madres.Localidad,
            COUNT(DISTINCT madres.id) AS Madres,
            0 AS NNA_Discapacidad,
            0 AS NNA_Vulneracion,
            0 AS NNA_SinInfo
         FROM
            madres
            INNER JOIN Municipios ON Municipios.id = madres.Localidad
            INNER JOIN CentrosZonales ON CentrosZonales.id = Municipios.idCentroZonal
            INNER JOIN Sedes ON Sedes.id = CentrosZonales.idSede
         WHERE
            Sedes.id = '$Sede'
            $Perfil
         GROUP BY
            madres.Localidad

      UNION ALL

            SELECT 
            madres.Localidad,
            0 AS Madres,
            COUNT(DISTINCT nna.id) AS NNA_Discapacidad,
            0 AS NNA_Vulneracion,
            0 AS NNA_SinInfo
         FROM
            madres
            INNER JOIN Municipios ON Municipios.id = madres.Localidad
            INNER JOIN CentrosZonales ON CentrosZonales.id = Municipios.idCentroZonal
            INNER JOIN Sedes ON Sedes.id = CentrosZonales.idSede
            INNER JOIN nna ON nna.idMadre = madres.id
            INNER JOIN nna_Programa ON nna.id = nna_Programa.id
         WHERE
            Sedes.id = '$Sede'
            AND nna_Programa.Discapacidad = 'SI'
            $Perfil
         GROUP BY
            madres.Localidad

      UNION ALL

            SELECT 
            madres.Localidad,
            0 AS Madres,
            0 AS NNA_Discapacidad,
            COUNT(DISTINCT nna.id) AS NNA_Vulneracion,
            0 AS NNA_SinInfo
         FROM
            madres
            INNER JOIN Municipios ON Municipios.id = madres.Localidad
            INNER JOIN CentrosZonales ON CentrosZonales.id = Municipios.idCentroZonal
            INNER JOIN Sedes ON Sedes.id = CentrosZonales.idSede
            INNER JOIN nna ON nna.idMadre = madres.id
            INNER JOIN nna_Programa ON nna.id = nna_Programa.id
         WHERE
            Sedes.id = '$Sede'
            AND nna_Programa.Discapacidad = 'NO'
            $Perfil
         GROUP BY
            madres.Localidad

      UNION ALL

            SELECT 
            madres.Localidad,
            0 AS Madres,
            0 AS NNA_Discapacidad,
            0 AS NNA_Vulneracion,
            COUNT(DISTINCT nna.id) AS NNA_SinInfo
         FROM
            madres
            INNER JOIN Municipios ON Municipios.id = madres.Localidad
            INNER JOIN CentrosZonales ON CentrosZonales.id = Municipios.idCentroZonal
            INNER JOIN Sedes ON Sedes.id = CentrosZonales.idSede
            INNER JOIN nna ON nna.idMadre = madres.id
            INNER JOIN nna_Programa ON nna.id = nna_Programa.id
         WHERE
            Sedes.id = '$Sede'
            AND nna_Programa.Discapacidad <> 'SI'
            AND nna_Programa.Discapacidad <> 'NO'

            $Perfil
         GROUP BY
            madres.Localidad
      ) AS Datos 
      LEFT JOIN Municipios ON Municipios.id = Datos.Localidad
      LEFT JOIN CentrosZonales ON CentrosZonales.id = Municipios.idCentroZonal
      LEFT JOIN Sedes ON CentrosZonales.idSede = Sedes.id
      WHERE
            Sedes.id = '$Sede'
      $Perfil
      GROUP BY
         $agruparPor;";


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

      $Resultado['Agrupado'] = array();

      $sql = "SELECT Localidad, Cantidad, COUNT(Cantidad) AS Agrupados
               FROM
            (SELECT 
               madres.Localidad,
                COUNT(DISTINCT nna.id) AS Cantidad
            FROM nna
            INNER JOIN madres ON nna.idMadre = madres.id
            GROUP BY madres.Localidad, madres.id
            ) AS nnaPorHogar GROUP BY Localidad, Cantidad";

      $result = $link->query($sql);

      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['Agrupado'][$row['Localidad']][$row['Cantidad']] = $row['Agrupados'];
      }

      $sql = "SELECT Localidad, Cantidad, COUNT(Cantidad) AS Agrupados
               FROM
            (SELECT 
               madres.Localidad,
                COUNT(DISTINCT nna.id) AS Cantidad
            FROM nna
            INNER JOIN madres ON nna.idMadre = madres.id
            GROUP BY madres.Localidad, madres.id
            ) AS nnaPorHogar GROUP BY Localidad, Cantidad";

      $result = $link->query($sql);

      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['Agrupado'][$row['Localidad']][$row['Cantidad']] = $row['Agrupados'];
      }

         mysqli_free_result($result);  
         echo json_encode($Resultado);
   } else
   {
      echo 0;
   }
?>