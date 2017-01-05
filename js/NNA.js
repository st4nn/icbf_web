function funNNA()
{
	$("#tblNnas").crearDataTable("");


	$("#btnNNA_CrearNNA").on("click", function()
	{
		cargarModulo('nna/crearNNA.html', 'Crear NNA', function()
			{
				$("#frmNNA")[0].reset();
				$("#txtNNA_Prefijo").val(obtenerPrefijo());
			});
	});

	$.post('../server/php/proyecto/nna_cargarHomeNna.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		if (data != 0)
		{
			var tds = "";
			$.each(data, function(index, val) 
			{
				var edad = calcularEdad(val.FechaNacimiento);

				 tds += '<tr>';
				 	tds += '<td></td>';
				 	tds += '<td>' + val.id + '</td>';
				 	tds += '<td>' + val.Nombre + '</td>';
				 	tds += '<td>' + val.Documento + '</td>';
				 	tds += '<td>' + edad.anios + ' años, ' + edad.meses + ' meses, ' + edad.dias + ' días' + '</td>';
				 tds += '</tr>';
			});

					
			$("#tblNnas").crearDataTable(tds);
		} 
	}, 'json');

	$("#btnNNA_CerrarDetalle").on("click", function()
	{
		$("#cntNNA_Tabla").removeClass('col-sm-8');
		$("#cntNNA_Tabla").addClass('col-sm-12');

		$("#cntNNA_Detalle").hide();
	});

	$(document).delegate('#tblNnas tbody tr', 'click', function(event) 
	{
		$("#cntNNA_Tabla").removeClass('col-sm-12');
		$("#cntNNA_Tabla").addClass('col-sm-8');
		$("#cntNNA_Detalle").slideDown();

		var fila = $(this).find('td');
	
		$.post('../server/php/proyecto/nna_cargarDetalleHome.php', {Usuario: Usuario.id, idNNA : $(fila[1]).text()}, function(data, textStatus, xhr) 
		{
			if (data != 0)
			{
				if (data.Foto == "")
				{
					$("#imgNNA_Foto").attr("src", '../assets/portraits/5.png');
				} else
				{
					$("#imgNNA_Foto").attr("src", data.Foto.replace('..', '../server'));
				}

				$("#txtNNA_Prefijo").val(data.Prefijo);
				$("#lblNNA_Detalle_Nombre").text(data.Nombre1 + ' ' + data.Nombre2 + ' ' + data.Apellido1 + ' ' + data.Apellido2);
				$("#lblNNA_Detalle_Codigo").text(data.id);
				$("#lblNNA_Detalle_Documento").text(data.Cedula);
				var edad = calcularEdad(data.FechaNacimiento);
				$("#lblNNA_Detalle_Edad").text(edad.anios + ' años, ' + edad.meses + ' meses, ' + edad.dias + ' días');
			} 
		}, 'json');
	});

	$("#btnNNA_Dellate_Editar").on("click", function()
	{
		$.post('../server/php/proyecto/nna_cargarDetalleHome.php', {Usuario: Usuario.id, idNNA : $("#lblNNA_Detalle_Codigo").text()}, function(data, textStatus, xhr) 
		{
			if (data != 0)
			{
				cargarModulo("nna/crearNNA.html", "Editar NNA", function()
				{

					if (data.Foto == "")
					{
						$("#imgNNA_Foto").attr("src", '../assets/portraits/5.png');
					} else
					{
						$("#imgNNA_Foto").attr("src", data.Foto.replace('..', '../server'));
					}

					$.each(data, function(index, val) 
					{
						 if ($("#txtNNA_" + index).length > 0)
						 {
						 	$("#txtNNA_" + index).val(val);
						 }
					});

					$("#txtNNA_FechaNacimiento").trigger('change');
					
				});

			} 
		}, 'json');
	});

	$("#btnNNA_Dellate_Programa").on("click", function(evento)
	{
		evento.preventDefault();
		nna_VerPrograma();
	});
}

function nna_VerPrograma()
{
	$.post('../server/php/proyecto/nna_cargarPrograma.php', {Usuario: Usuario.id, idNNA : $("#lblNNA_Detalle_Codigo").text()}, function(data, textStatus, xhr) 
	{
		if (data != 0)
		{
			cargarModulo("nna/nnaPrograma.html", "Programa", function()
			{
				$("#txtNNAPrograma_id").val($("#lblNNA_Detalle_Codigo").text());
				$("#lblNNAPrograma_NombreNNA").text($("#lblNNA_Detalle_Nombre").text());

				$.each(data, function(index, val) 
				{
					 if ($("#txtNNAPrograma_" + index).length > 0)
					 {
					 	$("#txtNNAPrograma_" + index).val(val);
					 }
				});

				$("#txtNNAPrograma_FechaIngreso").trigger('change');
				nna_Programa_CargarMadre(data.idMadre);
			});
		}
	}, 'json');
}

function nna_Programa_CargarMadre(idMadre)
{
	if (idMadre != 0)
	{
		$.post('../server/php/proyecto/madres_cargarDetalleHome.php', {Usuario: Usuario.id, idMadre : idMadre}, function(data, textStatus, xhr) 
		{
			if (data != 0)
			{
				$("#cntNNAMadre_AsignarHogar").hide();
				$("#cntNNAMadre_Detalle").slideDown();
				
				if (data.Foto == "")
				{
					$("#imgNNAMadre_Foto").attr("src", '../assets/portraits/5.png');
				} else
				{
					$("#imgNNAMadre_Foto").attr("src", data.Foto.replace('..', '../server'));
				}

				$("#lblNNAMadre_Detalle_Nombre").text(data.Nombre1 + ' ' + data.Nombre2 + ' ' + data.Apellido1 + ' ' + data.Apellido2);
				$("#txtNNAMadre_id").val(data.id);
				$("#lblNNAMadre_Detalle_Cedula").text(data.Cedula);
				$("#lblNNAMadre_Detalle_Ubicacion").text(data.Direccion + ' ' + data.Barrio);
				$("#lblNNAMadre_Detalle_CentroZonal").text(data.CentroZonal);
				var edad = calcularEdad(data.FechaNacimiento);
				$("#lblNNAMadre_Detalle_Edad").text(edad.anios + ' años, ' + edad.meses + ' meses, ' + edad.dias + ' días');
				$("#lblNNAMadre_Detalle_Telefonos").text(data.Telefono1 + ' ' + data.Telefono2 + ' ' + data.Celular1 + ' ' + data.Celular2);
				$("#lblNNAMadre_Detalle_Correo").text(data.Correo);
				$("#lblNNAMadre_Detalle_Correo").attr("href", 'mailto:' + data.Correo);
			} 
		}, 'json');
		
		$("#cntNNAMadrePrograma_NinosAsignados li").remove();
		$("#lblNNAMadrePrograma_NinosAsignados").text('0 NNA');

		$.post('../server/php/proyecto/madres_cargarNinosAsignados.php', {Usuario: Usuario.id, idMadre : idMadre}, function(data, textStatus, xhr) 
		{
			if (data != 0)
			{
				$("#lblNNAMadrePrograma_NinosAsignados").text(data.length + ' NNA');

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

				$("#cntNNAMadrePrograma_NinosAsignados").append(tds);
			}
		}, 'json');
	} else
	{
		$("#cntNNAMadre_Detalle").hide();
		$("#cntNNAMadre_AsignarHogar").slideDown();
	}

	$("#cntNNAPrograma_Novedades li").remove();
	$.post('../server/php/proyecto/nna_cargarObservaciones.php', {Usuario: Usuario.id, idNNA : $("#txtNNAPrograma_id").val()}, function(data, textStatus, xhr) 
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

			$("#cntNNAPrograma_Novedades").append(tdsO);
		}
	}, 'json');
}