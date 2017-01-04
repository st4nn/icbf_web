function funMadre_Programa()
{
	$("#cntMadrePrograma_RangoEdad").asRange();
	$('#cntMadrePrograma_RangoEdad').on('asRange::change', function (e) 
	{
		var value = $('#cntMadrePrograma_RangoEdad').asRange('get');
		$("#txtMadrePrograma_RangoEdad").val(value[0]+','+value[1]);
	});

	$("#btnMadrePrograma_VolverALaTabla").on("click", function()
	{
		cargarModulo("madres/madres.html", "Madres");
	});

	$("#frmMadrePrograma .datepicker").datepicker({
	  clearBtn: true,
	  language: "es",
	  orientation: "top auto",
	  daysOfWeekHighlighted: "0",
	  autoclose: true,
	  todayHighlight: true
	});

	$("#txtMadrePrograma_FechaNovedad").val(obtenerFecha().substr(0, 10));

	$.post('../server/php/proyecto/configuracion_CargarCentrosZonales.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		$("#txtMadrePrograma_CentroZonal option").remove();
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
				
    			$("#txtMadrePrograma_CentroZonal").append(tds2);
			} else
			{
				Mensaje("Error", data, "danger");
			}
		}
	}, "json");

	$("#btnMadrePrograma_Editar").on("click", function(evento)
	{
		evento.preventDefault();

		$.post('../server/php/proyecto/madres_cargarDetalleHome.php', {Usuario: Usuario.id, idMadre : $("#lblMadres_Detalle_Codigo").text()}, function(data, textStatus, xhr) 
		{
			if (data != 0)
			{
				cargarModulo("madres/crearMadre.html", "Editar Madre", function()
				{
					$("#lblResponsable_NombreMadre").text($("#lblMadres_Detalle_Nombre").text());
					$("#btnResponsable_VerPrograma").show();

					if (data.Foto == "")
					{
						$("#imgResponsable_Foto").attr("src", '../assets/portraits/5.png');
					} else
					{
						$("#imgResponsable_Foto").attr("src", data.Foto.replace('..', '../server'));
					}

					$.each(data, function(index, val) 
					{
						 if ($("#txtResponsable_" + index).length > 0)
						 {
						 	$("#txtResponsable_" + index).val(val);
						 }
					});

					$("#txtResponsable_FechaNacimiento").trigger('change');

					if (data.Latitud != "")
					{
						responsableMapa.setCenter(parseFloat(data.Latitud), parseFloat(data.Longitud), function()
						{
							responsableMarker.setPosition({lat : parseFloat(data.Latitud), lng : parseFloat(data.Longitud)});
						});
					}
				});

			} 
		}, 'json');
	});

	$("#txtMadrePrograma_FechaResolucion").on("change", function()
	  {
	    var valor = $(this).val();
	    if (valor != "")
	    {
	      valor = calcularEdad(valor);
	      valor = valor.anios + " años, " + valor.meses + " meses y " + valor.dias + " días";
	    } 
	    $("#txtMadrePrograma_TiempoResolucionApertura").val(valor);
	  });

	$("#txtMadrePrograma_GrupoEtnico").on("change", function()
	{
		if ($(this).val() == 'Si')
		{
			$("#cntMadrePrograma_GrupoEtnico").slideDown();
		} else
		{
			$("#cntMadrePrograma_GrupoEtnico").slideUp();
		}
	});

	$.post('../server/php/proyecto/configuracion_CargarMunicipios.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
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
				
    			$("#txtMadrePrograma_Ciudad").append(tds2);
			} else
			{
				Mensaje("Error", data, "danger");
			}
		}
	}, "json");

	$("#btnMadrePrograma_AgregarNovedad").on("click", function(evento)
	{
		evento.preventDefault();
		if ($("#txtMadrePrograma_FechaNovedad").val() == "")
		{
			Mensaje("Error", "Debe registrar una Fecha", 'danger');
			$("#txtMadrePrograma_FechaNovedad").focus();
		} else
		{
			if ($("#txtMadrePrograma_Observaciones").val() == "")
			{
				Mensaje("Error", "Debe registrar una Observación", 'danger');	
				$("#txtMadrePrograma_Observaciones").focus();
			} else
			{
				$.post('../server/php/proyecto/madres_RegistrarNovedad.php', {Usuario: Usuario.id, idMadre : $("#lblMadres_Detalle_Codigo").text(), Fecha : $("#txtMadrePrograma_FechaNovedad").val(), Tipo : $("#txtMadrePrograma_TipoNovedad").val(), Observaciones : $("#txtMadrePrograma_Observaciones").val()}, function(data, textStatus, xhr) 
				{
					if (isNaN(data))
					{
						Mensaje("Error", data, "danger");
					} else
					{
						var tds = "";
						tds += '<li class="list-group-item">';
		                  tds += '<div class="media">';
		                    tds += '<div class="media-left">';
					            tds += '<i class="icon wb-chevron-right" aria-hidden="true"></i>';
		                    tds += '</div>';
		                    tds += '<div class="media-body">';
		                      tds += '<h4 class="media-heading">' + Usuario.nombre;
		                        tds += '<span> <small>registró un </small> <strong>' + $("#txtMadrePrograma_TipoNovedad option:selected").text() + '<strong></span>';
		                      tds += '</h4>';
		                      tds += '<small class="pull-right">Hace un momento</small>';
		                      tds += '<div class="profile-brief">' + $("#txtMadrePrograma_Observaciones").val() + ' <small> desde el ' + $("#txtMadrePrograma_FechaNovedad").val() + '</small></div>';
		                    tds += '</div>';
		                  tds += '</div>';
		                tds += '</li>';

		                $("#cntMadrePrograma_Novedades").prepend(tds);
		                $("#txtMadrePrograma_Observaciones").val("");
					}

				});
			}
		}
	});

	

	$("#frmMadrePrograma").on("submit", function(evento)
	{
		evento.preventDefault();
		$("#frmMadrePrograma").generarDatosEnvio("txtMadrePrograma_", function(datos)
		{
			console.log(datos);
			
			$.post('../server/php/proyecto/madres_crearPrograma.php', {Usuario : Usuario.id, datos : datos}, function(data, textStatus, xhr) 
			{
				if (isNaN(data))
				{
					Mensaje("Error", data);
				} else
				{
					Mensaje("Hey", "Los datos han sido ingresados");
				}
			});
		});
	});
}