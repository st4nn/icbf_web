<?php
	include("../conectar.php"); 
   include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $Desde = addslashes($_POST['Desde']);
   $Hasta = addslashes($_POST['Hasta']);
   $Areas = addslashes($_POST['Areas']);
   $Clientes = addslashes($_POST['Clientes']);

   $Usuario = datosUsuario($idUsuario);

   $Perfil = "";
   if ($Usuario['idPerfil'] > 3)
   {
      $Perfil = " AND (CentrosZonales.idSede = '" . $Usuario['idSede'] . "' OR CentrosZonales.idSede IS NULL)";
   }

   $where = "";

   if ($Desde <> "")
   {
      $where .= " oportunidades.fechaCargue >= '$Desde 00:00:00' AND ";
   }

   if ($Hasta <> "")
   {
      $where .= " oportunidades.fechaCargue <= '$Hasta 23:59:59' AND ";
   }

   if ($Areas <> "")
   {
      $where .= " oportunidades.idArea IN ($Areas) AND ";
   }

   if ($Clientes <> "")
   {
      $where .= " oportunidades.Cliente IN ($Clientes) AND ";
   }
   
   if ($where <> "")
   {
      $where = "WHERE " . substr($where, 0, -4);
   }
   
   $sql = "SELECT 
            COUNT(DISTINCT nna.id) AS Cantidad,
            CentrosZonales.id,
            CentrosZonales.Nombre
         FROM 
            nna
            LEFT JOIN nna_Programa ON nna_Programa.id = nna.id
            LEFT JOIN CentrosZonales ON nna_Programa.idCentroZonal = CentrosZonales.id
         WHERE 
            nna_Programa.Salio <> 'SI' 
            $Perfil
         GROUP BY
            CentrosZonales.id;";

   $result = $link->query($sql);

   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      $Resultado['datos'] = array();
      $Resultado['total'] = 0;
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado['datos'][$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado['datos'][$idx][$key] = utf8_encode($value);
         }
         $idx++;
      
         $Resultado['total'] += $row['Cantidad'];
      }

      mysqli_free_result($result);  
      echo json_encode($Resultado);
   } else
   {
      echo 0;
   }
?>