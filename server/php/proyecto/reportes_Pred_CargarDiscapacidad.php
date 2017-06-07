<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $Desde = addslashes($_POST['Desde']);
   $Hasta = addslashes($_POST['Hasta']);
   $Usuario = datosUsuario($idUsuario);

   if ($Desde == "" )
   {
      $Desde = '1900-01-01';
   }

   if ($Hasta == "" )
   {
      $Desde = '2030-01-01';
   }

   $where = "";

   $where .= " AND FechaSolicitud >= '$Desde 00:00:00'";
   $where .= " AND FechaSolicitud <= '$Hasta 23:59:59'";

   $Perfil = "";
   if ($Usuario['idPerfil'] > 3)
   {
      $Perfil .= "WHERE (Sedes.id = '" . $Usuario['idSede'] . "')";
   }


   $sql = "SELECT 
            idCentroZonal,
            CentrosZonales.Nombre AS CentroZonal,
            Sedes.Nombre AS Sede,
            SUM(nna_Ubicados) AS nna_Ubicados,
            SUM(m_Vulneracion) AS m_Discapacidad,
            SUM(m_Mixtos) AS m_Mixtos,
            SUM(n_AcuIngresos) AS n_AcuIngresos,
            SUM(n_AcuEgresos) AS n_AcuEgresos
         FROM
            (SELECT 
               nna_Programa.idCentroZonal,
               COUNT(DISTINCT nna_Programa.id) AS nna_Ubicados,
               0 AS m_Vulneracion,
               0 AS m_Mixtos,
               0 AS n_AcuIngresos,
               0 AS n_AcuEgresos
            FROM 
               nna_Programa 
            WHERE
               nna_Programa.Salio <> 'SI'
            GROUP BY 
               nna_Programa.idCentroZonal
      UNION ALL

            SELECT 
               nna_Programa.idCentroZonal,
               0 AS nna_Ubicados,
               COUNT(DISTINCT madres.id) AS m_Vulneracion,
               0 AS m_Mixtos,
               0 AS n_AcuIngresos,
               0 AS n_AcuEgresos
            FROM 
               nna_Programa 
               INNER JOIN nna ON nna.id = nna_Programa.id
               INNER JOIN madres ON madres.id = nna.idMadre
            WHERE
               nna_Programa.Discapacidad = 'SI'
            GROUP BY 
               nna_Programa.idCentroZonal

      UNION ALL

            SELECT 
               nna_Programa.idCentroZonal,
               0 AS nna_Ubicados,
               0 AS m_Vulneracion,
               COUNT(DISTINCT madres.id) AS m_Mixtos,
               0 AS n_AcuIngresos,
               0 AS n_AcuEgresos
            FROM 
               nna_Programa 
               INNER JOIN nna ON nna.id = nna_Programa.id
               INNER JOIN madres ON madres.id = nna.idMadre
            
            GROUP BY 
               nna_Programa.idCentroZonal

      UNION ALL

            SELECT 
               nna_Programa.idCentroZonal,
               0 AS nna_Ubicados,
               0 AS m_Vulneracion,
               0 AS m_Mixtos,
               COUNT(DISTINCT nna_Observaciones.id) AS n_AcuIngresos,
               0 AS n_AcuEgresos
            FROM 
               nna_Programa 
               INNER JOIN nna_Observaciones ON nna_Observaciones.idNNA = nna_Programa.id
            WHERE 
               nna_Observaciones.Tipo LIKE 'Ingreso%'
               AND nna_Programa.Discapacidad = 'SI'
               AND nna_Observaciones.Fecha >= '$Desde 00:00:00'
               AND nna_Observaciones.Fecha <= '$Hasta 23:59:59'
            GROUP BY 
               nna_Programa.idCentroZonal

      UNION ALL

            SELECT 
               nna_Programa.idCentroZonal,
               0 AS nna_Ubicados,
               0 AS m_Vulneracion,
               0 AS m_Mixtos,
               0 AS n_AcuIngresos,
               COUNT(DISTINCT nna_Observaciones.id) AS n_AcuEgresos
            FROM 
               nna_Programa 
               INNER JOIN nna_Observaciones ON nna_Observaciones.idNNA = nna_Programa.id
            WHERE 
               nna_Observaciones.Tipo LIKE 'Retiro%' 
               AND nna_Programa.Discapacidad = 'SI'
               AND nna_Observaciones.Fecha >= '$Desde 00:00:00'
               AND nna_Observaciones.Fecha <= '$Hasta 23:59:59'
            GROUP BY 
               nna_Programa.idCentroZonal
      ) AS Datos 
      LEFT JOIN CentrosZonales ON CentrosZonales.id = Datos.idCentroZonal
      LEFT JOIN Sedes ON CentrosZonales.idSede = Sedes.id
      $Perfil
      GROUP BY
         Datos.idCentroZonal;";
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