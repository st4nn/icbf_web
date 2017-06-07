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

   if ($datos->GrupoEtnico == 'No')
   {
      $datos->GrupoEtnicoCual = '';
   }

   $sql = "INSERT INTO madres_Programa(id, Usuario, Prefijo, Estado, FechaIngreso, SIM, CentroZonal, RangoEdad, CuposVulneracion, CuposDiscapacidad, Genero, Ciudad, GrupoEtnico, GrupoEtnicoCual, FechaApertura, NumeroResolucionApertura, FechaResolucion, NivelAcademico, UltimoSemestreAprobado, AfiliadaFondoPension, NombreFondoPension, ActivoFondoPension, BeneficiarioPension, AfiliadoSalud, TipoAfiliacionSalud, NombreEPS, NombreEPSDeseada, RegimenEspecial, Discapacidad, EnfermedadCronica, TipoDiagnostico, AfiliacionCajaCompensacionFamiliar, TipoVivienda, CarnetManipulacionAlimentos, CursoPrimerosAuxilios, fechaCargue) VALUES 
         ('" . $id . "', 
         '" . $datos->Usuario  . "', 
         '" . $datos->Prefijo  . "', 
         '" . $datos->Estado  . "', 
         '" . $datos->FechaIngreso  . "', 
         '" . $datos->SIM  . "', 
         '" . $datos->CentroZonal  . "', 
         '" . $datos->RangoEdad  . "', 
         '" . $datos->CuposVulneracion  . "', 
         '" . $datos->CuposDiscapacidad  . "', 
         '" . $datos->Genero  . "', 
         '" . $datos->Ciudad  . "', 
         '" . $datos->GrupoEtnico  . "', 
         '" . $datos->GrupoEtnicoCual  . "', 
         '" . $datos->FechaApertura  . "', 
         '" . $datos->NumeroResolucionApertura  . "', 
         '" . $datos->FechaResolucion  . "', 
         '" . $datos->NivelAcademico  . "', 
         '" . $datos->UltimoSemestreAprobado  . "', 
         '" . $datos->AfiliadaFondoPension  . "', 
         '" . $datos->NombreFondoPension  . "', 
         '" . $datos->ActivoFondoPension  . "', 
         '" . $datos->BeneficiarioPension  . "', 
         '" . $datos->AfiliadoSalud  . "', 
         '" . $datos->TipoAfiliacionSalud  . "', 
         '" . $datos->NombreEPS  . "', 
         '" . $datos->NombreEPSDeseada  . "', 
         '" . $datos->RegimenEspecial  . "', 
         '" . $datos->Discapacidad  . "', 
         '" . $datos->EnfermedadCronica  . "', 
         '" . $datos->TipoDiagnostico  . "', 
         '" . $datos->AfiliacionCajaCompensacionFamiliar  . "', 
         '" . $datos->TipoVivienda  . "', 
         '" . $datos->CarnetManipulacionAlimentos  . "', 
         '" . $datos->CursoPrimerosAuxilios  . "', 
         '" . $fecha . "')
         ON DUPLICATE KEY UPDATE
            id = VALUES(id),
            Usuario = VALUES(Usuario),
            Prefijo = VALUES(Prefijo),
            Estado = VALUES(Estado),
            FechaIngreso = VALUES(FechaIngreso),
            SIM = VALUES(SIM),
            CentroZonal = VALUES(CentroZonal),
            RangoEdad = VALUES(RangoEdad),
            CuposVulneracion = VALUES(CuposVulneracion),
            CuposDiscapacidad = VALUES(CuposDiscapacidad),
            Genero = VALUES(Genero),
            Ciudad = VALUES(Ciudad),
            GrupoEtnico = VALUES(GrupoEtnico),
            GrupoEtnicoCual = VALUES(GrupoEtnicoCual),
            FechaApertura = VALUES(FechaApertura),
            NumeroResolucionApertura = VALUES(NumeroResolucionApertura),
            FechaResolucion = VALUES(FechaResolucion),
            NivelAcademico = VALUES(NivelAcademico),
            UltimoSemestreAprobado = VALUES(UltimoSemestreAprobado),
            AfiliadaFondoPension = VALUES(AfiliadaFondoPension),
            NombreFondoPension = VALUES(NombreFondoPension),
            ActivoFondoPension = VALUES(ActivoFondoPension),
            BeneficiarioPension = VALUES(BeneficiarioPension),
            AfiliadoSalud = VALUES(AfiliadoSalud),
            TipoAfiliacionSalud = VALUES(TipoAfiliacionSalud),
            NombreEPS = VALUES(NombreEPS),
            NombreEPSDeseada = VALUES(NombreEPSDeseada),
            RegimenEspecial = VALUES(RegimenEspecial),
            Discapacidad = VALUES(Discapacidad),
            EnfermedadCronica = VALUES(EnfermedadCronica),
            TipoDiagnostico = VALUES(TipoDiagnostico),
            AfiliacionCajaCompensacionFamiliar = VALUES(AfiliacionCajaCompensacionFamiliar),
            TipoVivienda = VALUES(TipoVivienda),
            CarnetManipulacionAlimentos = VALUES(CarnetManipulacionAlimentos),
            CursoPrimerosAuxilios = VALUES(CursoPrimerosAuxilios),
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