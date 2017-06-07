<?php
   include("../conectar.php"); 
   $link = Conectar();
   $Parametro = addslashes($_GET['q']);
   $Parametro = str_replace(" ", "%", $Parametro);
   $sql = "SELECT 
            nna.id AS id, 
            CONCAT(nna.Nombre1, ' ', nna.Nombre2, ' ', nna.Apellido1, ' ', nna.Apellido2)  as name, 
            nna.Documento  AS mail 
         FROM 
            nna 
            LEFT JOIN nna_Programa ON nna_Programa.id = nna.id
         WHERE
            nna.Nombre1 LIKE '%$Parametro%' OR nna.Nombre2 LIKE '%$Parametro%'  OR nna.Apellido1 LIKE '%$Parametro%'  OR nna.Apellido2 LIKE '%$Parametro%' 
            AND (nna_Programa.Salio <> 'SI' OR nna_Programa.Salio IS NULL)
         LIMIT 0, 10;";
   $result = $link->query($sql);
   $idx = 0;
   $Resultado = array();
    if ( $result->num_rows > 0)
   {
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
   }
   echo json_encode($Resultado);
?>