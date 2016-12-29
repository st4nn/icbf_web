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

	$("#btnNNA_Dellate_Programa").on("click", function()
	{
		cargarModulo("nna/nnaPrograma.html", "Programa", function()
		{
			$("#txtNNAPrograma_id").val($("#lblNNA_Detalle_Codigo").text());
			$("#txtNNAPrograma_Prefijo").val($("#txtNNA_Prefijo").val());
			$("#lblNNAPrograma_NombreNNA").text($("#lblNNA_Detalle_Nombre").text());

		});
	});
}