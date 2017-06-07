<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
   $idUsuario = addslashes($_POST['Usuario']);
   $idNNA = addslashes($_POST['idNNA']);
   $Usuario = datosUsuario($idUsuario);
   if ($Usuario['idPerfil'] <> 1)
   {
      //$empresa = " AND Login.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
   }
   $sql = "SELECT
            nna_Observaciones.*,
            datosUsuarios.Nombre
          FROM
            nna_Observaciones
            LEFT JOIN datosUsuarios ON datosUsuarios.idLogin = nna_Observaciones.Usuario
         WHERE nna_Observaciones.idNNA = '$idNNA'
         ORDER BY nna_Observaciones.fechaCargue DESC;";

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