<?php
  include("../conectar.php"); 
  include("datosUsuario.php"); 
   $link = Conectar();
	
   $idUsuario = addslashes($_POST['Usuario']);	$idUsuario = 1;
   $Usuario = datosUsuario($idUsuario);

   if ($Usuario['idPerfil'] > 3)
   {
      //$empresa = " AND Login.idEmpresa = '" . $Usuario['idEmpresa'] . "'";
   }

   $sql = "SELECT
            nna.id as id,
            CONCAT(nna.Nombre1, ' ', nna.Nombre2, ' ', nna.Apellido1, ' ', nna.Apellido2) AS Nombre,
            nna.idMadre,
            CONCAT(madres.Nombre1, ' ', madres.Nombre2, ' ', madres.Apellido1, ' ', madres.Apellido2) AS Madre,
            nna.Documento,
            nna.TipoDocumento,
            nna.Genero,
            nna.FechaNacimiento,
            nna_Programa.FechaIngreso,
            Municipios.Nombre AS Municipio,
            CentrosZonales.Nombre AS CentroZonal,
            madres.Direccion,
            madres.Barrio
          FROM
            nna
            LEFT JOIN nna_Programa ON nna_Programa.id = nna.id
            LEFT JOIN madres ON nna.idMadre = madres.id
            LEFT JOIN Municipios ON Municipios.id = madres.Localidad
            LEFT JOIN CentrosZonales ON CentrosZonales.id = nna_Programa.idCentroZonal
            LEFT JOIN Sedes ON Sedes.id = CentrosZonales.idSede
            INNER JOIN Programacion ON Programacion.idNNA = nna.id
            INNER JOIN equipos_has_usuarios ON equipos_has_usuarios.idEquipo = Programacion.idEquipo
            INNER JOIN equipos ON equipos.id = equipos_has_usuarios.idEquipo
            INNER JOIN datosUsuarios ON datosUsuarios.idLogin = equipos_has_usuarios.idUsuario AND datosUsuarios.idLogin = '$idUsuario'
         WHERE 
            (nna_Programa.Salio <> 'SI' OR nna_Programa.Salio IS NULL)
            AND equipos.Estado = 1
         ORDER BY
            nna.idMadre;";
            
            

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
