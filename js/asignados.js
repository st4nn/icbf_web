function funAsignados()
{
	jQuery.expr[':'].Contains = function(a, i, m) { 
	  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
	};
	jQuery.expr[':'].contains = function(a, i, m) { 
	  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
	};

	$("#lblAsignados_Nombre").text(Usuario.nombre);


	$("#txtAsignados_Fecha").datepicker({
	  clearBtn: true,
	  language: "es",
	  orientation: "top auto",
	  daysOfWeekHighlighted: "0",
	  autoclose: true,
	  todayHighlight: true
	});

	$("#txtAsignados_Filtrar").on("change keyup paste", function()
	{
		var str = $(this).val();
		//str = str.replace(/ /g, '%');

		if (str == "")
		{
			$(".cntAsignados_Madre").show();
		} else
		{
			$(".cntAsignados_Madre").hide();
			$(".cntAsignados_Madre:contains('" + str + "')").show();
		}
	});
	

	$.post('../server/php/proyecto/programacion_cargarNNAAsignados.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		var tds = "";
		var valor = null;

		var tmpMadre = 99999999;

		$("#lblAsignados_PanelNNA_Cargados").text(data.length);
		$("#lblAsignados_PanelNNA_PorProgramar").text(data.length);

		var idxNNA = 0;

		$.each(data, function(index, val) 
		{
			if (tmpMadre != val.idMadre)
			{
				tmpMadre = val.idMadre;
				if (index > 0)
				{
					tds += '</table></td>';
					tds += '</tr>';
					//tds = tds.replace('aquiVaElRowSpan', idxNNA);
				}

				idxNNA = 0;

				tds += '<tr class="cntAsignados_Madre">';
					tds += '<td>';
				      tds += '<h3 class="panel-title">' + val.Madre + '</h3>';
		              tds += '<p>' + val.Direccion + '<br>' + val.Barrio + '<br>' + val.Municipio + '</p>';
		              tds += '<small>Centro Zonal: </small> <strong>' + val.CentroZonal + '</strong>';
		            tds += '</td>';
		            tds += '<td><table class="table table-condensed table-hover">';
			} 

			idxNNA++;

			valor = calcularEdad(val.FechaNacimiento);
			valor = valor.anios + " años, " + valor.meses + " meses y " + valor.dias + " días";

			icon = 'male';
			if (val.Genero == 'F')
			{
				icon = 'female';
			}
			tds += '<tr>';
	        tds += '<td>';
			  	tds += '<i class="icon fa-' + icon + ' font-size-20"></i>';
			tds += '</td>';


			tds += '<td>';
				tds += '<h4>';
					tds += '<a href="#" class="name lnkAsignados_AbrirNNA" idNNA="' + val.id + '">' + val.Nombre + '</a> ';
				tds += '</h4>';
				tds += '<small>' + val.TipoDocumento + ':</small> <strong>' + val.Documento + '</strong><br>';
				tds += '<small>Edad:</small> <strong>' + valor + '</strong>';
				tds += '<small class="pull-right">ingreso ' + calcularTiempoPublicacion(val.FechaIngreso) + ' el ' + val.FechaIngreso + '</small>';
			tds += '</tr>';
		});

		if (tmpMadre != 0)
		{
			tds += '</table></td>';
			tds += '</tr>';
		}

		$("#tblAsignados_NNA tbody").append(tds);

	}, 'json');

	$(document).delegate('.lnkAsignados_AbrirNNA', 'click', function(evento) {
		evento.preventDefault();
		var nombreNNA = $(this).text();
		var idNNA = $(this).attr("idNNA");
		cargarModulo("nna/homeVisita.html", "Visita", function()
		{
			$("#txtHomeVisita_idNNA").val(idNNA);
			$("#lblHomeVisita_NombreNNA").text(nombreNNA);
		});
	});
}