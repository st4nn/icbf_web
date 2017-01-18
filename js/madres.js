var madreMarker = {};
var madreMapa = {};

var responsableMapa = {};
var responsableMarker = {};

function funMadres()
{
	$("#tblMadres").crearDataTable("");


	$("#btnMadres_CrearMadre").on("click", function()
	{
		cargarModulo('madres/crearMadre.html', 'Crear Madre', function()
			{
				$("#frmResponsable")[0].reset();
				$("#txtResponsable_Prefijo").val(obtenerPrefijo());
				$("#btnResponsable_VerPrograma").hide();
				$("#lblResponsable_NombreMadre").text("");
			});
	});

	$("#btnMadres_CerrarDetalle").on("click", function()
	{
		$("#cntMadres_Tabla").removeClass('col-sm-8');
		$("#cntMadres_Tabla").addClass('col-sm-12');

		$("#cntMadres_Detalle").hide();
	});

	$(document).delegate('#tblMadres tbody tr', 'click', function(event) 
	{
		$("#cntMadres_Tabla").removeClass('col-sm-12');
		$("#cntMadres_Tabla").addClass('col-sm-8');
		$("#cntMadres_Detalle").slideDown();

		var objMapa = $("#cntMadres_Mapa").find("div");
		if (objMapa.length == 0)
		{
			$("#cntMadres_Mapa").iniciarMapa({fClick : function(ev)
			{
			}}, function(mapa)
			{
				madreMapa = mapa;
				madreMarker = mapa.addMarker({
		          lat: 4.686804,
		          lng: -74.083867,
		          icon : '../assets/images/icons/home_marker.png'
		        });
			});
		}

		var fila = $(this).find('td');
	
		$.post('../server/php/proyecto/madres_cargarDetalleHome.php', {Usuario: Usuario.id, idMadre : $(fila[1]).text()}, function(data, textStatus, xhr) 
		{
			if (data != 0)
			{
				if (data.Foto == "")
				{
					$("#imgMadre_Foto").attr("src", '../assets/portraits/5.png');
				} else
				{
					$("#imgMadre_Foto").attr("src", data.Foto.replace('..', '../server'));
				}

				$("#txtMadre_Prefijo").val(data.Prefijo);
				$("#lblMadres_Detalle_Nombre").text(data.Nombre1 + ' ' + data.Nombre2 + ' ' + data.Apellido1 + ' ' + data.Apellido2);
				$("#lblMadres_Detalle_Codigo").text(data.id);
				$("#lblMadres_Detalle_Cedula").text(data.Cedula);
				$("#lblMadres_Detalle_Ubicacion").text(data.Direccion + ' ' + data.Barrio);
				$("#lblMadres_Detalle_CentroZonal").text(data.CentroZonal);
				var edad = calcularEdad(data.FechaNacimiento);
				$("#lblMadres_Detalle_Edad").text(edad.anios + ' años, ' + edad.meses + ' meses, ' + edad.dias + ' días');
				$("#lblMadres_Detalle_Telefonos").text(data.Telefono1 + ' ' + data.Telefono2 + ' ' + data.Celular1 + ' ' + data.Celular2);
				$("#lblMadres_Detalle_Correo").text(data.Correo);
				$("#lblMadres_Detalle_Correo").attr("href", 'mailto:' + data.Correo);

				if (data.Latitud != "")
				{
					madreMapa.setCenter(parseFloat(data.Latitud), parseFloat(data.Longitud), function()
						{
							madreMarker.setPosition({lat : parseFloat(data.Latitud), lng : parseFloat(data.Longitud)});
						});
				}

			} 
		}, 'json');
	});

	$.post('../server/php/proyecto/madres_cargarHomeMadres.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		if (data != 0)
		{
			var tds = "";
			$.each(data, function(index, val) 
			{
				 tds += '<tr>';
				 	tds += '<td></td>';
				 	tds += '<td>' + val.id + '</td>';
				 	tds += '<td>' + val.Nombre + '</td>';
				 	tds += '<td>' + val.CentroZonal + '</td>';
				 	tds += '<td>' + val.ultimaAsignacion + '</td>';
				 	tds += '<td>' + val.Cupos + '</td>';
				 	tds += '<td>' + (parseInt(val.CV) + parseInt(val.CD)) + '</td>';
				 	tds += '<td>' + val.CV + '</td>';
				 	tds += '<td>' + val.CD + '</td>';
				 	tds += '<td></td>';
				 tds += '</tr>';
			});

					
			$("#tblMadres").crearDataTable(tds);
		} 
	}, 'json');

	$("#btnMadres_Detalle_Editar").on("click", function()
	{
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

	$("#btnMadres_Detalle_Programa").on("click", function()
	{
		$.post('../server/php/proyecto/madres_cargarPrograma.php', {Usuario: Usuario.id, idMadre : $("#lblMadres_Detalle_Codigo").text()}, function(data, textStatus, xhr) 
		{
			if (data != 0)
			{
				cargarModulo("madres/programa.html", "Programa", function()
				{
					$("#txtMadrePrograma_id").val($("#lblMadres_Detalle_Codigo").text());
					$("#txtMadrePrograma_Prefijo").val($("#txtMadre_Prefijo").val());
					$("#lblMadrePrograma_NombreMadre").text($("#lblMadres_Detalle_Nombre").text());

					$.each(data, function(index, val) 
					{
						 if ($("#txtMadrePrograma_" + index).length > 0)
						 {
						 	$("#txtMadrePrograma_" + index).val(val);
						 }
					});

					$("#txtMadrePrograma_GrupoEtnico").trigger('change');
					$("#txtMadrePrograma_FechaResolucion").trigger('change');

					madres_cargarNinosAsignados();
				});
			}
		}, 'json');
	});
}

function madres_cargarNinosAsignados()
{
	$("#cntMadrePrograma_Novedades li").remove();
	$.post('../server/php/proyecto/madres_cargarObservaciones.php', {Usuario: Usuario.id, idMadre : $("#lblMadres_Detalle_Codigo").text()}, function(data, textStatus, xhr) 
	{
		if (data != 0)
		{
			var tdsO = "";
			var valorO = '';
			$.each(data, function(index, val) 
			{
				tdsO += '<li class="list-group-item">';
                  tdsO += '<div class="media">';
                    tdsO += '<div class="media-left">';
			            tdsO += '<i class="icon wb-chevron-right" aria-hidden="true"></i>';
                    tdsO += '</div>';
                    tdsO += '<div class="media-body">';
                      tdsO += '<h4 class="media-heading">' + val.Nombre;
                        tdsO += '<span> <small>registró un </small> <strong>' + val.Tipo + '<strong></span>';
                      tdsO += '</h4>';
                      tdsO += '<small class="pull-right">' + calcularTiempoPublicacion(val.fechaCargue) + '</small>';
                      tdsO += '<div class="profile-brief">' + val.Observaciones + ' <small> desde el ' + val.Fecha + '</small></div>';
                    tdsO += '</div>';
                  tdsO += '</div>';
                tdsO += '</li>';
			});

			$("#cntMadrePrograma_Novedades").append(tdsO);
		}
	}, 'json');



	$("#cntMadrePrograma_NinosAsignados li").remove();
	$("#lblMadrePrograma_NinosAsignados").text('0 NNA');

	$.post('../server/php/proyecto/madres_cargarNinosAsignados.php', {Usuario: Usuario.id, idMadre : $("#lblMadres_Detalle_Codigo").text()}, function(data, textStatus, xhr) 
	{
		if (data != 0)
		{
			$("#lblMadrePrograma_NinosAsignados").text(data.length + ' NNA');
			var tds = "";
			var icon = 'male';
			var valor = '';
			$.each(data, function(index, val) 
			{
				valor = calcularEdad(val.FechaNacimiento);
				valor = valor.anios + " años, " + valor.meses + " meses y " + valor.dias + " días";

				icon = 'male';
				if (val.Genero == 'F')
				{
					icon = 'female';
				}
				tds += '<li class="list-group-item">';
                  tds += '<div class="media">';
                    tds += '<div class="media-left">';
                      tds += '<i class="icon fa-' + icon + ' font-size-20"></i>';
                    tds += '</div>';
                    tds += '<div class="media-body">';
                      tds += '<h4 class="media-heading">';
                        tds += '<small class="pull-right">' + calcularTiempoPublicacion(val.fechaIngreso) + ' el ' + val.fechaIngreso + '</small>';
                        tds += '<a class="name">' + val.Nombre1 + ' ' + val.Nombre2 + ' ' + val.Apellido1 + ' ' + val.Apellido2 + '</a> ';
                      tds += '</h4>';
                      tds += '<small>' + val.TipoDocumento + ':</small> <strong>' + val.Documento + '</strong><br>';
                      tds += '<small>Edad:</small> <strong>' + valor + '</strong>';
                    tds += '</div>';
                  tds += '</div>';
                tds += '</li>';
			});

			$("#cntMadrePrograma_NinosAsignados").append(tds);
		}
	}, 'json');
}