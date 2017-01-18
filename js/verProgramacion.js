function funVerProgramacion()
{
	$("#tblVerProgramacion").crearDataTable("");
	$("#tblVerProgramacion_NNASinProgramar").crearDataTable("");

	verProgramacion_CargarProgramacion();

	verProgramacion_CargarNNASinProgramar();

	$("#btnVerProgramacion_VerProgramacion_Actualizar").on("click", function(evento)
	{
		evento.preventDefault();
		verProgramacion_CargarProgramacion();
	});

	$("#btnVerProgramacion_NNA_Actualizar").on("click", function(evento)
	{
		evento.preventDefault();
		verProgramacion_CargarNNASinProgramar();
	});

	$(document).delegate('.lnkVerProgrmacion_AbrirEquipo', 'click', function(event) {
		event.preventDefault();
		var idEquipo = $(this).attr("idEquipo");
		cargarModulo("programacion/visitas.html", 'Asignaciones', function()
		{
			$("#txtProgramacion_Equipos").val(idEquipo);
			$("#txtProgramacion_Equipos").trigger('change');
			$("#txtProgramacion_idEquipo").val(idEquipo);
		});
	});

	
}

function verProgramacion_CargarProgramacion()
{
	$.post('../server/php/proyecto/programacion_VerProgramacion.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		if (data != 0)
		{
			var tds = "";
			$.each(data, function(index, val) 
			{
				 tds += '<tr>';
				 	tds += '<td></td>';
				 	tds += '<td>' + val.Nombre + '</td>';
				 	tds += '<td>' + val.Integrantes + '</td>';
				 	tds += '<td>' + val.Sede + '</td>';
				 	tds += '<td><a href="#" class="lnkVerProgrmacion_AbrirEquipo" idEquipo="' + val.id + '">' + val.NNA + '</a></td>';
				 tds += '</tr>';
			});

					
			$("#tblVerProgramacion").crearDataTable(tds);
		} 
	}, 'json');
}

function verProgramacion_CargarNNASinProgramar()
{
	$.post('../server/php/proyecto/programacion_cargarNNASinProgramar.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		if (data != 0)
		{
			var tds = "";
			var valor = "";
			var icon = "";

			$.each(data, function(index, val) 
			{
				valor = calcularEdad(val.FechaNacimiento);
				valor = valor.anios + " años, " + valor.meses + " meses y " + valor.dias + " días";

				icon = 'male';
				if (val.Genero == 'F')
				{
					icon = 'female';
				}
				 tds += '<tr>';
				 	tds += '<td></td>';
				 	tds += '<td>';
					  	tds += '<i class="icon fa-' + icon + ' font-size-20"></i>';
					tds += '</td>';
				 	tds += '<td>' + val.Nombre + '</td>';
				 	tds += '<td>' + val.Documento + '</td>';
				 	tds += '<td>' + valor + '</td>';
				 tds += '</tr>';
			});

					
			$("#tblVerProgramacion_NNASinProgramar").crearDataTable(tds);
		} 
	}, 'json');
}