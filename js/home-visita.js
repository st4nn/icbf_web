function funHome_Visita()
{
	$("#lnkHome_Visita_VisitaSeguimiento").on("click", function(evento)
	{
   		cargarModulo("formatos/visitaSeguimiento.html", "Visita de Seguimiento", function(){
	      //$("#frmVisitaSeguimiento")[0].reset();
	      $("#txtVisitaSeguimiento_Responsable").val($("#txtMapa_idHogar").val());
	      $("#txtVisitaSeguimiento_Codigo").val(obtenerPrefijo());
	      $("#txtVisitaSeguimiento_FechaInicio").val(obtenerFecha());
	    });
	});

	$("#lnkHome_Visita_ActaVisitaDomiciliaria").on("click", function(evento)
	{
   		cargarModulo("formatos/actaVisitaDomiciliaria.html", "Acta de Visita Domiciliaria", function(){
	      //$("#frmActaVisitaDomicialiaria")[0].reset();
			/*ejecutarSQL("SELECT MAX(fechaCargue) as Valor FROM VisitaSeguimiento WHERE Responsable = ?", [$("#txtMapa_idHogar").val()], function(dato)
			{
	      		$("#txtActaVisitaDomicialiaria_Codigo").val(obtenerPrefijo());
			    $("#txtActaVisitaDomicialiaria_Responsable").val($("#txtMapa_idHogar").val());
			    $("#txtActaVisitaDomicialiaria_FechaInicio").val(obtenerFecha());
			    $("#txtActaVisitaDomicialiaria_Fecha").val(obtenerFecha());
			    
				if (dato.length > 0)
				{
					ejecutarSQL("SELECT * FROM VisitaSeguimiento WHERE fechaCargue = ?", [dato[0].Valor], function(visita)
					{
						visita = visita[0];

						var Encuesta = $.parseJSON(visita.Encuesta);
						var Compromisos = $.parseJSON(visita.Compromisos);

						$.each(Encuesta, function(index, val) 
						{
							 if (val.o != "")
							 {
							 	$("#txtActaVisitaDomicialiaria_Observaciones").val($("#txtActaVisitaDomicialiaria_Observaciones").val() + val.o + "\n");
							 }
						});

						if (Compromisos.length > 0)
						{
							$("#txtActaVisitaDomicialiaria_Observaciones").val($("#txtActaVisitaDomicialiaria_Observaciones").val() + "\n\n Se Adquirieron los siguietes compromisos\n\n");
							$.each(Compromisos, function(index, val) 
							{
								 $("#txtActaVisitaDomicialiaria_Observaciones").val($("#txtActaVisitaDomicialiaria_Observaciones").val() + val.c + " para revisar el " + val.f + "\n");
							});
						}
					});
				}
			});*/
	    });
	});

	$("#lnkHome_Visita_PlatinSeguimiento").on("click", function(evento)
	{
   		cargarModulo("formatos/platinSeguimiento.html", "Platin de Seguimiento", function(){
	      $("#frmPlatinSeguimiento")[0].reset();
	      $("#txtPlatinSeguimiento_Responsable").val($("#txtMapa_idHogar").val());
	      $("#txtPlatinSeguimiento_Codigo").val(obtenerPrefijo());
	      $("#txtPlatinSeguimiento_FechaInicio").val(obtenerFecha());
	    });
	});


	$(document).delegate('.btn_VolverAlPanel', 'click', function(evento) {
		evento.preventDefault();
        cargarModulo("formatos/home.html", "Hogar Visitado", function()
          {
            
          });
	});

	$("#btnVisitas_VolverAlPanel").on("click", function(evento)
      {
        evento.preventDefault();
        cargarModulo("formatos/home.html", "Inicio", function()
          {
            
          });
      });

	$("#btnVisitas_agregarHogar").on("click", function(evento)
      {
        evento.preventDefault();
        mapDiligenciamiento.getCameraPosition(function(camera) 
      	{
	        cargarModulo("registroResponsable.html", "Registrar Responsable", function()
	          {
	            //$("#frmVisita_AgregarResponsable")[0].reset();
		        $("#txtResponsable_Latitud").val(camera.target.lat);
		        $("#txtResponsable_Longitud").val(camera.target.lng);
	            $("#txtResponsable_Codigo").val(obtenerPrefijo());
	          });
      	});
      });

	$("#btnVisitas_VerHogar").on("click", function(evento)
	{
		evento.preventDefault();
		cargarModulo("home-visita.html", "Hogar Visitado", function()
		{
				
		});

	});

	
}

