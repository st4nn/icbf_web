<?php
   include("../conectar.php"); 

   date_default_timezone_set('America/Bogota');

   $link = Conectar();

   $idUsuario = addslashes($_POST['idUsuario']);
   $idNNA = addslashes($_POST['idNNA']);
   $idMadre = addslashes($_POST['idMadre']);
   $idNuevaMadre = addslashes($_POST['idNuevaMadre']);
   $Fecha = addslashes($_POST['Fecha']);
   $Observaciones = addslashes($_POST['Observaciones']);

   $tipo = addslashes($_POST['Tipo']); 
   /*
      0 : Ingreso;
      1 : Retiro;
    */
   
   $cTipo = 'Ingreso de NNA';
   $tTipo = 'Se le ha asignado el NNA';
   $tNTipo = 'Se le ha asignado el Hogar de';

   if ($tipo == 1)
   {
      $cTipo = 'Retiro de NNA';
      $tTipo = 'Se le ha retirado el NNA';
      $tNTipo = 'Se le ha retirado del Hogar de';
   }
   

   if ($Fecha == '')
   {
      $fecha = date('Y-m-d');
   } else
   {
      $Fecha = $fecha;
   }

   $Respuesta = array();
   $Respuesta['Error'] = "";

   if ($tipo == "")
   {
      $Respuesta['Error'] = "No se puede completar la operación";
   } else
   {
      $sql = "SELECT Apellido1, Apellido2, Nombre1, Nombre2, TipoDocumento, Documento FROM nna WHERE id = '$idNNA'";
      $result = $link->query(utf8_decode($sql));
      $fila =  $result->fetch_array(MYSQLI_ASSOC);
      $Nombre = $fila['Nombre1'] . ' ' . $fila['Nombre2'] . ' ' . $fila['Apellido1'] . ' ' . $fila['Apellido2'] . ' con Documento: ' . $fila['TipoDocumento'] . ' ' . $fila['Documento'];

      $sql = "INSERT INTO madres_Observaciones(idMadre, idNNA, Fecha, Tipo, Observaciones, Usuario) VALUES ('$idMadre', '$idNNA', '$fecha', '$cTipo', '$tTipo $Nombre \n $Observaciones', '$idUsuario');";
      $link->query(utf8_decode($sql));

      $sql = "SELECT Apellido1, Apellido2, Nombre1, Nombre2, Cedula FROM madres WHERE id = '$idMadre'";
      $result = $link->query(utf8_decode($sql));
      $fila =  $result->fetch_array(MYSQLI_ASSOC);
      $Nombre = $fila['Nombre1'] . ' ' . $fila['Nombre2'] . ' ' . $fila['Apellido1'] . ' ' . $fila['Apellido2'] . ' con Documento: ' . $fila['Cedula'];

      $sql = "INSERT INTO nna_Observaciones(idMadre, idNNA, Fecha, Tipo, Observaciones, Usuario) VALUES ('$idMadre', '$idNNA', '$fecha', '$cTipo', '$tNTipo $Nombre \n $Observaciones', '$idUsuario');";
      $link->query(utf8_decode($sql));

      $sql = "UPDATE nna SET idMadre = '$idNuevaMadre' WHERE id = '$idNNA'";
      $link->query(utf8_decode($sql));


      $link->query(utf8_decode($sql));

      if ( $link->error <> "")
      {
         $Respuesta['Error'] .= "\n Hubo un error desconocido " . $link->error;
      } else
      {
         $Respuesta['datos'] = $link->insert_id;
      }
   }

   echo json_encode($Respuesta);

?>