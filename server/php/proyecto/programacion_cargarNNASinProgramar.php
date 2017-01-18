<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['Usuario']);
   $Usuario = datosUsuario($idUsuario);

   $Perfil = "";
   if ($Usuario['idPerfil'] > 3)
   {
      $Perfil = " AND (Sedes.id = '" . $Usuario['idSede'] . "' OR Sedes.id IS NULL)";
   }

   $sql = "SELECT
            nna.id,
            CONCAT(nna.Nombre1, ' ', nna.Nombre2, ' ', nna.Apellido1, ' ', nna.Apellido2) AS Nombre,
            CONCAT(nna.TipoDocumento, ': ', nna.Documento) AS Documento,
            nna.Genero,
            nna.FechaNacimiento
          FROM
            nna
            LEFT JOIN nna_Programa ON nna_Programa.id = nna.id
            LEFT JOIN CentrosZonales ON CentrosZonales.id = nna_Programa.idCentroZonal
            LEFT JOIN Sedes ON CentrosZonales.idSede = Sedes.id
            LEFT JOIN Programacion ON Programacion.idNNA = nna.id
         WHERE 
            (nna_Programa.Salio <> 'SI' OR nna_Programa.Salio IS NULL) 
            AND Programacion.idNNA IS NULL
            $Perfil
         ORDER BY
            nna.Apellido1;";

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