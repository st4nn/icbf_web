<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $Desde = addslashes($_POST['Desde']);
   $Hasta = addslashes($_POST['Hasta']);
   $Usuario = datosUsuario($idUsuario);

   $where = "WHERE Tipo LIKE 'Ingreso%'";

   if ($Desde <> "" )
   {
      $where .= " AND FechaSolicitud >= '$Desde 00:00:00'";
   }

   if ($Hasta <> "")
   {
      if ($where <> "")
      {
         $where .= " AND FechaSolicitud <= '$Hasta 23:59:59'";
      } else
      {
         $where .= " WHERE FechaSolicitud <= '$Hasta 23:59:59'";
      }
   }

   if ($Usuario['idPerfil'] > 3)
   {
      if ($where <> "")
      {
         $where .= "AND";
      } else
      {
         $where = " WHERE ";
      }
      $where .= " (idSede = '" . $Usuario['idSede'] . "')";
   }


   $sql = "SELECT
            *
          FROM
            vNNA_Observaciones
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