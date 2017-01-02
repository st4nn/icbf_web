function funActaVisitaDomiciliaria()
{

	iniciarWizard($("#cntActaVisitaDomiciliaria_Wizard"), "#cntActaVisitaDomiciliaria_Controles", function()
    {
      var obj = $("#cntActaVisitaDomiciliaria_MiembrosDelHogar").find(".cntActaVisitaDomiciliaria_MiembrosDelHogar");

            var Miembro = "" ;
            var Cargo = "";
            var Miembros = [];
            var objs = {};
            
            $("#txtActaVisitaDomiciliaria_MiembrosDelHogar").val("");

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

              $("#txtActaVisitaDomiciliaria_MiembrosDelHogar").val(JSON.stringify(Miembros));
            }

      obj = $("#cntActaVisitaDomiciliaria_MiembrosDelEquipo").find(".cntActaVisitaDomiciliaria_MiembrosDelEquipo");

            $("#txtActaVisitaDomiciliaria_MiembrosDelEquipo").val("");
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

              $("#txtActaVisitaDomiciliaria_MiembrosDelEquipo").val(JSON.stringify(Miembros));
            }

            $("#frmActaVisitaDomiciliaria").guardarFormulario("txtActaVisitaDomiciliaria_", "ActaVisitaDomiciliaria", {campo : "Codigo", valor : $("#txtActaVisitaDomiciliaria_Codigo").val()}, function()
              {
                cargarModulo("home-visita.html", "Hogar Visitado", function(){
                  Mensaje("Hey", "El acta ha sido registrada y se enviará por correo", "success");
                });
              });

    });

  $(document).delegate('.btnActaVisitaDomiciliaria_BorrarMiembroDelHogar', 'click', function(event) {
    $(this).parent("div").parent("div").parent("div").remove();
  });

  $("#btnActaVisitaDomiciliaria_AgregarMiembroDelHogar").on("click", function(evento)
    {
      evento.preventDefault();
      var obj = $("#cntActaVisitaDomiciliaria_MiembrosDelHogar_PrimeraFila").html();
      obj = obj.replace("btnActaVisitaDomiciliaria_BorrarMiembroDelHogar_fake hide", "btnActaVisitaDomiciliaria_BorrarMiembroDelHogar");
      $("#cntActaVisitaDomiciliaria_MiembrosDelHogar").append('<div class="col-sm-12 row cntActaVisitaDomiciliaria_MiembrosDelHogar">' + obj + '</div>');
    });

  $(document).delegate('.btnActaVisitaDomiciliaria_BorrarMiembroDelEquipo', 'click', function(event) {
    $(this).parent("div").parent("div").parent("div").remove();
  });

  $("#btnActaVisitaDomiciliaria_AgregarMiembroDelEquipo").on("click", function(evento)
    {
      evento.preventDefault();
      var obj = $("#cntActaVisitaDomiciliaria_MiembrosDelEquipo_PrimeraFila").html();
      obj = obj.replace("btnActaVisitaDomiciliaria_BorrarMiembroDelEquipo_fake hide", "btnActaVisitaDomiciliaria_BorrarMiembroDelEquipo");
      $("#cntActaVisitaDomiciliaria_MiembrosDelEquipo").append('<div class="col-sm-12 row cntActaVisitaDomiciliaria_MiembrosDelEquipo">' + obj + '</div>');
    });

  $("#btnActaVisitaDomiciliaria_Foto").on("click", function()
  {
    abrirCamara(1, function(uri)
      {
            Mensaje("", "Foto guardada");
      });
  });

  $(document).delegate('.btnActaVisitaDomiciliaria_FirmaMiembro', 'click', function(event) 
  {
    var Cedula = $(this).parent("div").parent("div").find("input");
    Cedula = $(Cedula[0]).val();

    if (Cedula == "")
    {
      Mensaje("Error", "Debe diligenciar primero el Nombre", "danger");
    } else
    {
      cargarModulo("firma.html", "Recoger Firma", function()
      {
        $("#txtFirma_Proceso").val('ActaVisitaDomiciliaria');
        $("#txtFirma_Proyecto").val($("#txtActaVisitaDomiciliaria_Responsable").val());
        $("#txtFirma_Recurso").val(Cedula);
        $("#txtFirma_Vinculo").val("actaVisitaDomiciliaria.html");
        $("#txtFirma_Titulo").val("Acta de Visita Domiciliaria");
      });
    }
  });

  $("#btnActaVisitaDomiciliaria_Galeria").on("click", function()
  {
    abrirCamara(0, function(uri)
      {
        Mensaje("", "Foto Asociada");
       });      
  });

  $("#frmVisita_ActaVisitaDomiciliaria").on("submit", function(evento)
	{
		evento.preventDefault();
	});
}

