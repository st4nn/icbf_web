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

				madreMapa.setCenter(parseFloat(data.Latitud), parseFloat(data.Longitud), function()
					{
						madreMarker.setPosition({lat : parseFloat(data.Latitud), lng : parseFloat(data.Longitud)});
					});

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
				 	tds += '<td>' + val.CV + '</td>';
				 	tds += '<td>' + val.CD + '</td>';
				 tds += '</tr>';
			});

					
			$("#tblMadres").crearDataTable(tds);
		} 
	}, 'json');

	$("#btnMadres_Dellate_Editar").on("click", function()
	{
		$.post('../server/php/proyecto/madres_cargarDetalleHome.php', {Usuario: Usuario.id, idMadre : $("#lblMadres_Detalle_Codigo").text()}, function(data, textStatus, xhr) 
		{
			if (data != 0)
			{
				cargarModulo("madres/crearMadre.html", "Editar Madre", function()
				{

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

					responsableMapa.setCenter(parseFloat(data.Latitud), parseFloat(data.Longitud), function()
					{
						responsableMarker.setPosition({lat : parseFloat(data.Latitud), lng : parseFloat(data.Longitud)});
					});
					
				});

			} 
		}, 'json');
	});

	$("#btnMadres_Dellate_Programa").on("click", function()
	{
		cargarModulo("madres/programa.html", "Programa", function()
		{
			$("#txtMadrePrograma_id").val($("#lblMadres_Detalle_Codigo").text());
			$("#txtMadrePrograma_Prefijo").val($("#txtMadre_Prefijo").val());
			$("#lblMadrePrograma_NombreMadre").text($("#lblMadres_Detalle_Nombre").text());

		});
	});
}