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
            CONCAT(madres.Nombre1, ' ', madres.Nombre2, ' ', madres.Apellido1, ' ', madres.Apellido2) AS Nombre,
            madres.id,
            madres.Cedula AS Documento,
            madres.Telefono1,
            madres.Telefono2,
            madres.Celular1,
            madres.Celular2,
            madres.Correo,
            madres_Programa.Genero,
            madres.FechaNacimiento,
            madres_Programa.FechaIngreso,
            Municipios.Nombre AS Municipio,
            CentrosZonales.Nombre AS CentroZonal,
            madres.Direccion,
            madres.Barrio,
            COUNT(Programacion.id) AS Programados
          FROM
            madres 
            INNER JOIN madres_Programa ON madres.id = madres_Programa.id
            LEFT JOIN Municipios ON Municipios.id = madres.Localidad
            LEFT JOIN CentrosZonales ON CentrosZonales.id = madres_Programa.CentroZonal
            LEFT JOIN Sedes ON Sedes.id = CentrosZonales.idSede
            LEFT JOIN Programacion ON Programacion.idMadre = madres.id
         WHERE 
            madres_Programa.Estado = 'Activo'
            $Perfil
         GROUP BY
            madres.id
         ORDER BY
            madres_Programa.id;";
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