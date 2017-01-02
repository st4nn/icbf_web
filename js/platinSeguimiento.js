function funPlatinSeguimiento()
{

	iniciarWizard($("#cntPlatinSeguimiento_Wizard"), "#cntPlatinSeguimiento_Controles", function()
    {
      var obj = {};

            var Miembro = "" ;
            var Cargo = "";
            var Miembros = [];
            var objs = {};
            

      obj = $("#cntPlatinSeguimiento_MiembrosDelEquipo").find(".cntPlatinSeguimiento_MiembrosDelEquipo");

            $("#txtPlatinSeguimiento_MiembrosDelEquipo").val("");
            if (obj.length > 0)
            {
              $.each(obj, function(index, val) 
              {
                  objs = $(val).find("input");
                  Miembro = $(objs[0]).val();
                  Cargo = $(objs[1]).val();

                  if (Miembro != "" && Cargo != "")
                  {
                    Miembros.push({'n' : Miembro, 'c' : Cargo});
                  }
              });

              $("#txtPlatinSeguimiento_MiembrosDelEquipo").val(JSON.stringify(Miembros));
            }

            $("#frmPlatinSeguimiento").guardarFormulario("txtPlatinSeguimiento_", "PlatinSeguimiento", {campo : "Codigo", valor : $("#txtPlatinSeguimiento_Codigo").val()}, function()
              {
                cargarModulo("home-visita.html", "Hogar Visitado", function(){
                  Mensaje("Hey", "El acta ha sido registrada y se enviará por correo", "success");
                });
              });

    });

  $(document).delegate('.btnPlatinSeguimiento_BorrarMiembroDelHogar', 'click', function(event) {
    $(this).parent("div").parent("div").parent("div").remove();
  });

  $("#btnPlatinSeguimiento_AgregarMiembroDelHogar").on("click", function(evento)
    {
      evento.preventDefault();
      var obj = $("#cntPlatinSeguimiento_MiembrosDelHogar_PrimeraFila").html();
      obj = obj.replace("btnPlatinSeguimiento_BorrarMiembroDelHogar_fake hide", "btnPlatinSeguimiento_BorrarMiembroDelHogar");
      $("#cntPlatinSeguimiento_MiembrosDelHogar").append('<div class="col-sm-12 row cntPlatinSeguimiento_MiembrosDelHogar">' + obj + '</div>');
    });

  $(document).delegate('.btnPlatinSeguimiento_BorrarMiembroDelEquipo', 'click', function(event) {
    $(this).parent("div").parent("div").parent("div").remove();
  });

  $("#btnPlatinSeguimiento_AgregarMiembroDelEquipo").on("click", function(evento)
    {
      evento.preventDefault();
      var obj = $("#cntPlatinSeguimiento_MiembrosDelEquipo_PrimeraFila").html();
      obj = obj.replace("btnPlatinSeguimiento_BorrarMiembroDelEquipo_fake hide", "btnPlatinSeguimiento_BorrarMiembroDelEquipo");
      $("#cntPlatinSeguimiento_MiembrosDelEquipo").append('<div class="col-sm-12 row cntPlatinSeguimiento_MiembrosDelEquipo">' + obj + '</div>');
    });

  $("#btnPlatinSeguimiento_Foto").on("click", function()
  {
    abrirCamara(1, function(uri)
      {
            Mensaje("", "Foto guardada");
      });
  });

  $(document).delegate('.btnPlatinSeguimiento_FirmaMiembro', 'click', function(event) 
  {
    var Cedula = $(this).parent("div").parent("div").find("input");
    Cedula = $(Cedula[0]).val();

    if (Cedula == "")
    {
      Mensaje("Error", "Debe diligenciar primero el Nombre", "danger");
    } else
    {
      cargarModulo("formatos/firma.html", "Recoger Firma", function()
      {
        $("#txtFirma_Proceso").val('PlatinSeguimiento');
        $("#txtFirma_Proyecto").val($("#txtPlatinSeguimiento_Responsable").val());
        $("#txtFirma_Recurso").val(Cedula);
        $("#txtFirma_Vinculo").val("platinSeguimiento.html");
        $("#txtFirma_Titulo").val("Platin de Seguimiento");
      });
    }
  });

  $("#btnPlatinSeguimiento_Galeria").on("click", function()
  {
    abrirCamara(0, function(uri)
      {
        Mensaje("", "Foto Asociada");
       });      
  });

  $("#frmVisita_PlatinSeguimiento").on("submit", function(evento)
	{
		evento.preventDefault();
	});
}

