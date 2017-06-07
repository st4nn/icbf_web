<?php 
	include("../conectar.php"); 
	$link = Conectar();

   date_default_timezone_set('America/Bogota');

   $idFormato = addslashes($_POST['idFormato']);
   $Usuario = addslashes($_POST['Usuario']);
   $Prefijo = addslashes($_POST['Prefijo']);
   $idNNA = addslashes($_POST['idNNA']);
   $datos = json_decode($_POST['datos']);
   $columnasParametros = array();

   foreach ($datos as $key => $value) 
   {
      $datos->$key = addslashes($value);
      $columnasParametros[] = $key;
   }

   $sql = "SHOW FULL TABLES FROM simasus LIKE  'tblFormato_" . $idFormato . "'";
   
   $result = $link->query($sql);

   if ( $result->num_rows == 0)
   {
      $sql = "CREATE TABLE tblFormato_" . $idFormato . " (
                 id int(11) NOT NULL,
                 idVisita int(11) NOT NULL
               ) ENGINE=MyISAM DEFAULT CHARSET=latin1;";

               $link->query($sql);
               
      $sql = "ALTER TABLE tblFormato_" . $idFormato . " ADD PRIMARY KEY (id);";
      $link->query($sql);

      $sql = "ALTER TABLE tblFormato_" . $idFormato . " MODIFY id int(11) NOT NULL AUTO_INCREMENT;";
      $link->query($sql);
   }

	$parametros = $datos;

   $sql = "SHOW COLUMNS FROM tblFormato_" . $idFormato . ";";

   $result = $link->query($sql);

   $idx = 0;
   if ( $result->num_rows > 0)
   {

      $Columnas = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         
         $Columnas[$idx] = $row['Field'];
         
         $idx++;
      }

         mysqli_free_result($result);  
         $diferencias = array_diff($columnasParametros, $Columnas);
         	$alter = "";
         
         foreach ($diferencias as $key => $value) 
         {
         	$alter .= " ADD $value LONGTEXT NULL DEFAULT NULL, ";
         }

         $alter = substr($alter, 0, -2);

         if ($alter <> "")
         {
         	$alter = "ALTER TABLE tblFormato_" . $idFormato . " " . $alter . ";";
         	$link->query($alter);

         	 if ($link->error <> "")
         	 {
         	 	echo $link->error . "<br>" . $alter;
         	 }
         }

         $campos = "";
         $values = "";
         $values2 = "";

         foreach ($parametros as $key => $value) 
         {
         	$campos .= $key . ", ";
         	$values .= 	"'" . addslashes($value) . "', ";
         	$values2 .= $key . " = VALUES(" . $key . "), ";
         }

         $campos = substr($campos, 0, -2);
         $values = substr($values, 0, -2);
         $values2 = substr($values2, 0, -2);

         if ($campos <> "")
         {
            $campos = 'idVisita, ' . $campos;
            $sql = "SELECT idMadre AS 'idMadre' FROM nna WHERE id = '" . $idNNA . "';";
            $result = $link->query($sql);
            $fila =  $result->fetch_array(MYSQLI_ASSOC);
            $idMadre = $fila['idMadre'];

            $sql = "INSERT INTO Visitas (Prefijo, Usuario, idNNA, idMadre, idFormato, datos) VALUES (
                     '$Prefijo',
                     '$Usuario',
                     '$idNNA',
                     '$idMadre',
                     '$idFormato',
                     '" . json_encode($datos) . "'
                  )";

            $link->query(utf8_decode($sql));
            $idVisita = $link->insert_id;

            $values = $idVisita . ', ' . $values;

            $sql = "INSERT INTO tblFormato_" . $idFormato . " ($campos) VALUES ($values)  ON DUPLICATE KEY UPDATE $values2;";
            $result = $link->query(utf8_decode($sql));

            	if ($link->error <> "")
            	 {
            	 	echo $link->error . "<br>" . $sql;

                  $fp = fopen('error_' + date('YmdHis') + '.txt', 'w');
                  fwrite($fp, $link->error . " \n " . $sql);
                  fclose($fp);
            	 } else
                {
                  echo 1;
                }
         }
   } else
   {
      echo 0;
   }
?>

