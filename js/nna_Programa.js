function funnna_Programa()
{
	$("#btnNNAPrograma_VolverALaTabla").on("click", function()
	{
		cargarModulo("nna/nna.html", "NNA");
	});

	$("#frmNNAPrograma .datepicker, #txtNNAPrograma_FechaNovedad").datepicker({
	  clearBtn: true,
	  language: "es",
	  orientation: "top auto",
	  daysOfWeekHighlighted: "0",
	  autoclose: true,
	  todayHighlight: true
	});

	$("#txtNNAPrograma_FechaNovedad").val(obtenerFecha().substr(0, 10));

	$("#txtNNAPrograma_FechaIngreso").on("change", function()
	  {
	    var valor = $(this).val();
	    if (valor != "")
	    {
	      valor = calcularEdad(valor);
	      valor = valor.anios + " años, " + valor.meses + " meses y " + valor.dias + " días";
	    } 
	    $("#txtNNAPrograma_TiempoHogar").val(valor);
	  });

	$.post('../server/php/proyecto/configuracion_CargarCentrosZonales.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		$("#txtNNAPrograma_idCentroZonal option").remove();
		if (data == 0)
		{
			Mensaje("Error", "No hay datos en la Tabla", "danger");
		} else
		{
			if (typeof(data) == "object")
			{
				var tds2 = "";
				
				$.each(data, function(index, val) 
				{
	    			tds2 += '<option value="' + val.id + '">' + val.Nombre + '</option>';
				});
				
    			$("#txtNNAPrograma_idCentroZonal").append(tds2);
			} else
			{
				Mensaje("Error", data, "danger");
			}
		}
	}, "json");

	$("#cntNNAPrograma_Responsable").iniciarResponsables({url : 'typeahead_cargarMadres'}, function(ev, suggestion) 
	{
		$.post('../server/php/proyecto/nna_AsignarHogar.php', {idUsuario: Usuario.id, idNNA : $("#txtNNAPrograma_id").val(), idMadre : suggestion.id, idNuevaMadre : suggestion.id, Tipo : 0, Fecha : '', Observaciones : ''}, function(data, textStatus, xhr) 
		{
			if (data.Error != "")
			{
				Mensaje("Error", data.Error);
			} else
			{
				$("#cntNNAMadre_AsignarHogar").hide();
				nna_Programa_CargarMadre(suggestion.id);
			}
		}, 'json');
	}, function()
	{
		$("#cntNNAPrograma_Responsable label").text("Nombre del Responsable del Hogar");

	});

	$("#btnNNAPrograma_AgregarNovedad").on("click", function(evento)
	{
		evento.preventDefault();
		if ($("#txtNNAPrograma_FechaNovedad").val() == "")
		{
		  Mensaje("Error", "Debe registrar una Fecha", 'danger');
		  $("#txtNNAPrograma_FechaNovedad").focus();
		} else
		{
		  if ($("#txtNNAPrograma_NObservaciones").val() == "")
		  {
		    Mensaje("Error", "Debe registrar una Observación", 'danger'); 
		    $("#txtNNAPrograma_NObservaciones").focus();
		  } else
		  {
		  	if ($("#txtNNAPrograma_TipoNovedad").val() == 'Retiro' || $("#txtNNAPrograma_TipoNovedad").val() == 'Retiro por Muerte')
		  	{
		  		$.post('../server/php/proyecto/nna_AsignarHogar.php', {idUsuario: Usuario.id, idNNA : $("#txtNNAPrograma_id").val(), idMadre : $("#txtNNAMadre_id").val(), idNuevaMadre : 0, Tipo : 1, Fecha : $("#txtNNAPrograma_FechaNovedad").val(), Observacion: $("#txtNNAPrograma_NObservaciones").val()}, function(data, textStatus, xhr) 
				{
					if (data.Error != "")
					{
						Mensaje("Error", data.Error);
					} else
					{
						$("#cntNNAMadre_Detalle").hide();
						nna_Programa_CargarMadre(0);
					}
				}, 'json');
		  	} else
		  	{
			    $.post('../server/php/proyecto/nna_RegistrarNovedad.php', {Usuario: Usuario.id, idNNA : $("#txtNNAPrograma_id").val(), Fecha : $("#txtNNAPrograma_FechaNovedad").val(), Tipo : $("#txtNNAPrograma_TipoNovedad").val(), Observaciones : $("#txtNNAPrograma_NObservaciones").val()}, function(data, textStatus, xhr) 
			    {
			      if (isNaN(data))
			      {
			        Mensaje("Error", data, "danger");
			      }
			    });
		  	}

	        var tds = "";
	        tds += '<li class="list-group-item">';
	                  tds += '<div class="media">';
	                    tds += '<div class="media-left">';
	                  tds += '<i class="icon wb-chevron-right" aria-hidden="true"></i>';
	                    tds += '</div>';
	                    tds += '<div class="media-body">';
	                      tds += '<h4 class="media-heading">' + Usuario.nombre;
	                        tds += '<span> <small>registró un </small> <strong>' + $("#txtNNAPrograma_TipoNovedad option:selected").text() + '<strong></span>';
	                      tds += '</h4>';
	                      tds += '<small class="pull-right">Hace un momento</small>';
	                      tds += '<div class="profile-brief">' + $("#txtNNAPrograma_NObservaciones").val() + ' <small> desde el ' + $("#txtNNAPrograma_FechaNovedad").val() + '</small></div>';
	                    tds += '</div>';
	                  tds += '</div>';
	                tds += '</li>';

	                $("#cntNNAPrograma_Novedades").prepend(tds);
	                $("#txtNNAPrograma_NObservaciones").val("");
		  }
	}
	});


	$("#frmNNAPrograma").on("submit", function(evento)
	{
		evento.preventDefault();
		$("#frmNNAPrograma").generarDatosEnvio("txtNNAPrograma_", function(datos)
		{			
			$.post('../server/php/proyecto/nna_crearPrograma.php', {Usuario : Usuario.id, datos : datos}, function(data, textStatus, xhr) 
			{
				if (isNaN(data))
				{
					Mensaje("Error", data);
				} else
				{
					Mensaje("Hey", "Los datos han sido ingresados");
					$("#txtNNAPrograma_id").val(data);
				}
			});
		});
	});
}