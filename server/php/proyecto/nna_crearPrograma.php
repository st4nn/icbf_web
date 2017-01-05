<?php
   include("../conectar.php"); 

   $link = Conectar();

   $datos = json_decode($_POST['datos']);
   $usuario = addslashes($_POST['Usuario']);

   foreach ($datos as $key => $value) 
   {
      if (!is_array($datos->$key))
      {
         $datos->$key = addslashes($value);
      }
   }

   $id = "NULL";

   if (array_key_exists("id", $datos))
   {
      if ($datos->id > 0 AND $datos->id <> "")
      {
         $id = $datos->id;
      }
   } 

   date_default_timezone_set('America/Bogota');
   
   $fecha = date('Y-m-d h:i:s');

   $sql = "INSERT INTO nna_Programa(id, Usuario, SIM, NumeroDeResolucion, Discapacidad, Diagnostico, FechaIngreso, FechaEgreso, Salio, PARD, DefensorDeFamilia, idCentroZonal, DeclaradoAdoptabilidad, Desplazado, AutoridadAdministrativa, Observaciones, Modalidad, fechaCargue) VALUES 
         ('" . $id . "', 
         '" . $datos->Usuario  . "', 
         '" . $datos->SIM  . "', 
         '" . $datos->NumeroDeResolucion  . "', 
         '" . $datos->Discapacidad  . "', 
         '" . $datos->Diagnostico  . "', 
         '" . $datos->FechaIngreso  . "', 
         '" . $datos->FechaEgreso  . "', 
         '" . $datos->Salio  . "', 
         '" . $datos->PARD  . "', 
         '" . $datos->DefensorDeFamilia  . "', 
         '" . $datos->idCentroZonal  . "', 
         '" . $datos->DeclaradoAdoptabilidad  . "', 
         '" . $datos->Desplazado  . "', 
         '" . $datos->AutoridadAdministrativa  . "', 
         '" . $datos->Observaciones  . "', 
         '" . $datos->Modalidad  . "', 
         '" . $fecha . "')
         ON DUPLICATE KEY UPDATE
            Usuario = VALUES(Usuario),
            SIM = VALUES(SIM),
            NumeroDeResolucion = VALUES(NumeroDeResolucion),
            Discapacidad = VALUES(Discapacidad),
            Diagnostico = VALUES(Diagnostico),
            FechaIngreso = VALUES(FechaIngreso),
            FechaEgreso = VALUES(FechaEgreso),
            Salio = VALUES(Salio),
            PARD = VALUES(PARD),
            DefensorDeFamilia = VALUES(DefensorDeFamilia),
            idCentroZonal = VALUES(idCentroZonal),
            DeclaradoAdoptabilidad = VALUES(DeclaradoAdoptabilidad),
            Desplazado = VALUES(Desplazado),
            AutoridadAdministrativa = VALUES(AutoridadAdministrativa),
            Observaciones = VALUES(Observaciones),
            Modalidad = VALUES(Modalidad),
            fechaCargue = VALUES(fechaCargue);";
            
   $link->query(utf8_decode($sql));
   if ( $link->error == "")
   {
      if ($id  == "NULL")
      {
         $id = $link->insert_id;
      }

      echo $id;
   } else
   {
      echo $link->error;
   }
?>