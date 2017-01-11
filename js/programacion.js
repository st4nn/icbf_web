function funProgramacion()
{
	jQuery.expr[':'].Contains = function(a, i, m) { 
	  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
	};
	jQuery.expr[':'].contains = function(a, i, m) { 
	  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
	};


	$("#txtProgramacion_Fecha").datepicker({
	  clearBtn: true,
	  language: "es",
	  orientation: "top auto",
	  daysOfWeekHighlighted: "0",
	  autoclose: true,
	  todayHighlight: true
	});

	$("#txtProgramacion_Filtrar").on("change keyup paste", function()
	{
		var str = $(this).val();
		//str = str.replace(/ /g, '%');

		if (str == "")
		{
			$(".cntProgramacion_Madre").show();
		} else
		{
			$(".cntProgramacion_Madre").hide();
			$(".cntProgramacion_Madre:contains('" + str + "')").show();
		}
	});
	
	$("#txtProgramacion_Fecha").val(obtenerFecha().substr(0, 10));

  $("#txtProgramacion_Equipos").on("change", function()
  {
    $("#tblProgramacion_Integrantes tbody tr").remove();
    var valor = $(this).val();
    $.post('../server/php/proyecto/equipos_cargarEquipo.php', {Usuario: Usuario.id, idEquipo : valor}, function(data, textStatus, xhr) 
    {
      if (data == 0)
      {
        Mensaje("Error", "No hay datos en la Tabla", "danger");
      } else
      {
        if (typeof(data) == "object")
        {
          var tds = "";
          var objIntegrantes = {};
          var objIntegrante = {};
          $.each(data, function(index, val) 
          {
            if (val.Integrantes != "")
            {
              objIntegrantes = val.Integrantes.split(",");
              $.each(objIntegrantes, function(idIntegrante, integrante) 
              {
                objIntegrante = integrante.split(":");
                tds += "<tr><td data-id='" + objIntegrante[0] + "' cargo='" + objIntegrante[2] + "'>" + objIntegrante[1] + " " + objIntegrante[2] + "</td></tr>"
              });
              $("#tblProgramacion_Integrantes tbody").append(tds);
            }
          });
        }
      }
    },'json');
  });

  $.post('../server/php/proyecto/equipos_cargarEquipos.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
  {
    $("#txtProgramacion_Equipos option").remove();
    if (data == 0)
    {
      Mensaje("Error", "No hay datos en la Tabla", "danger");
    } else
    {
      if (typeof(data) == "object")
      {
        var tds = "<option value='0'></option>";
        
        $.each(data, function(index, val) 
        {
          tds += '<option value="' + val.id + '">' + val.Nombre + '</option>';
        });

        $("#txtProgramacion_Equipos").append(tds);
      } else
      {
        Mensaje("Error", data, "danger");
      }
    }
  }, "json");

  	/*$("#cntProgramacion_NNA").iniciarResponsables({url : 'typeahead_cargarNNA'}, null, function()
	{
		$("#cntProgramacion_NNA label").text("Nombre del NNA a Agregar");
	});*/

	$(document).delegate('.chkProgramacion_NNA', 'click', function(event) 
	{
		var obj = $(this).parent('div').find('label');

		if ($(this).is(':checked'))
		{
			$(obj).text($("#txtProgramacion_Fecha").val());
		} else
		{
			$(obj).text("");
		}

		obj = $("#cntProgramacion_PanelNNA").find(".chkProgramacion_NNA:checked");
		$("#lblProgramacion_PanelNNA_Programados").text($(obj).length);
		$("#lblProgramacion_PanelNNA_PorProgramar").text(parseInt($("#lblProgramacion_PanelNNA_Cargados").text())- $(obj).length);

	});

	$(document).delegate('.btnProgramacion_ProgramarHogar', 'click', function(event) 
	{
		var obj = this;
		var checks = $(obj).parent('td').parent('tr').find('input[type=checkbox]:visible');
		$(checks).trigger('click');
	});

	$("#btnProgramacion_ProgramarTodos").on("click", function(evento)
	{
		evento.preventDefault();
		var checks = $("#tblProgramacion_NNA").find('input[type=checkbox]:visible:not(:checked)');
		$(checks).trigger('click');
	});

	$("#btnProgramacion_DesprogramarTodos").on("click", function(evento)
	{
		evento.preventDefault();
		var checks = $("#tblProgramacion_NNA").find('input[type=checkbox]:visible:checked');
		$(checks).trigger('click');
	});

	$.post('../server/php/proyecto/programacion_cargarNNA.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		var tds = "";
		var valor = null;

		var tmpMadre = 0;

		$("#lblProgramacion_PanelNNA_Cargados").text(data.length);
		$("#lblProgramacion_PanelNNA_PorProgramar").text(data.length);

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

				tds += '<tr class="cntProgramacion_Madre">';
					tds += '<td>';
				      tds += '<h3 class="panel-title">' + val.Madre + '</h3>';
		              tds += '<p>' + val.Direccion + '<br>' + val.Barrio + '<br>' + val.Municipio + '</p>';
		              tds += '<small>Centro Zonal: </small> <strong>' + val.CentroZonal + '</strong>';
		              tds += '<br><button class="btn btn-primary btnProgramacion_ProgramarHogar" type="button"><i class="icon wb-home"></i> Marcar Hogar</button>';
		            tds += '</td>';
		            tds += '<td><table class="table table-condensed table-hover">';
			} /*else
			{
				if (index > 0)
				{
					tds += '</tr><tr>';
				}
			}*/

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
	          	tds += '<div class="checkbox-custom checkbox-primary">';
	              tds += '<input type="checkbox" id="chkProgramacion_NNA_' + val.id + '" class="chkProgramacion_NNA">';
	              tds += '<label for="chkProgramacion_NNA_' + val.id + '"></label>';
	            tds += '</div>';
	        tds += '</td>';

	        tds += '<td>';
			  	tds += '<i class="icon fa-' + icon + ' font-size-20"></i>';
			tds += '</td>';


			tds += '<td>';
				tds += '<h4>';
					tds += '<a class="name">' + val.Nombre + '</a> ';
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
			//tds = tds.replace('aquiVaElRowSpan', idxNNA);
		}

		$("#tblProgramacion_NNA tbody").append(tds);

	}, 'json');
}