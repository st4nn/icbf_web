function funVisitaSeguimiento()
{
	$("#frmVisita_VisitaSeguimiento").on("submit", function(evento)
	{
		evento.preventDefault();

    cargarModulo("formatos/home.html", "Hogar Visitado", function(){
      Mensaje("Hey", "La visita ha sido registrada", "success");
    });
	});

  $("#btnVisitaSeguimiento_Foto").on("click", function()
  {
    abrirCamara(1, function(uri)
      {
            Mensaje("", "Foto guardada");
      });
  });

  $("#btnVisitaSeguimiento_Galeria").on("click", function()
  {
    abrirCamara(0, function(uri)
      {
        Mensaje("", "Foto Asociada");
       });      
  });

  iniciarWizard($("#cntVisitaSeguimiento_Wizard"), "#cntVisitaSeguimiento_Controles", function(){
        $("#txtVisitaSeguimiento_FechaFin").val(obtenerFecha());
        $("#frmVisitaSeguimiento").generarJsonRadios("optVisitaSeguimiento_", $("#txtVisitaSeguimiento_Encuesta"), function()
          {
            var obj = $("#frmVisitaSeguimiento").find(".cntVisitaSeguimiento_Compromiso");

            $("#txtVisitaSeguimiento_Compromisos").val("");
            if (obj.length > 0)
            {
              var Compromiso = "" ;
              var Fecha = "";
              var Compromisos = [];
              $.each(obj, function(index, val) 
              {
                  Compromiso = $(val).find("textarea").val();
                  Fecha = $(val).find("input").val();

                  if (Compromiso != "" && Fecha != "")
                  {
                    Compromisos.push({'c' : Compromiso, 'f' : Fecha});
                  }
              });

              $("#txtVisitaSeguimiento_Compromisos").val(JSON.stringify(Compromisos));

              $("#frmVisitaSeguimiento").guardarFormulario("txtVisitaSeguimiento_", "VisitaSeguimiento", {campo : "Codigo", valor : $("#txtVisitaSeguimiento_Codigo").val()}, function()
              {
                cargarModulo("home-visita.html", "Hogar Visitado", function(){
                  Mensaje("Hey", "La Visita ha sido registrada", "success");
                });
              });
            }
          });
  });

  $(document).delegate('.btnVisitaSeguimiento_BorrarCompromiso', 'click', function(event) {
    $(this).parent("div").parent("div").parent("div").remove();
  });

  $("#btnVisitaSeguimiento_AgregarCompromiso").on("click", function(evento)
    {
      evento.preventDefault();
      var obj = $("#cntVisitaSeguimiento_Compromisos_PrimeraFila").html();
      obj = obj.replace("btnVisitaSeguimiento_BorrarCompromiso_fake hide", "btnVisitaSeguimiento_BorrarCompromiso");
      $("#cntVisitaSeguimiento_Compromisos").append('<div class="col-sm-12 row cntVisitaSeguimiento_Compromiso">' + obj + '</div>');
    });
}

