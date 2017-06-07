<?php
	include("../conectar.php"); 
   $link = Conectar();

   $Parametro = addslashes($_GET['q']);
   
   $Parametro = str_replace(" ", "%", $Parametro);
   
   $sql = "SELECT 
            madres.id AS id, 
            CONCAT(madres.Nombre1, ' ', madres.Nombre2, ' ', madres.Apellido1, ' ', madres.Apellido2)  as name, 
            CentrosZonales.Nombre  AS mail 
         FROM 
            madres 
            LEFT JOIN CentrosZonales ON CentrosZonales.id = madres.Localidad
         WHERE
            madres.Nombre1 LIKE '%$Parametro%' OR madres.Nombre2 LIKE '%$Parametro%'  OR madres.Apellido1 LIKE '%$Parametro%'  OR madres.Apellido2 LIKE '%$Parametro%' OR CentrosZonales.Nombre LIKE '%$Parametro%'
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