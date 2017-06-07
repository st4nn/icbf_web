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

	$(document).delegate('.chkProgramacion_NNA', 'click', function(event) 
	{
		if ($("#txtProgramacion_Equipos").val() == "" || $("#txtProgramacion_Equipos").val() == "0")
		{
			event.preventDefault();
			Mensaje("Error", "Debe seleccionar primero un Equipo", "danger");
			$("#txtProgramacion_Equipos").focus();
			return false;
		} else
		{
			var obj = $(this).parent('div').find('label');
			var idNNA = $(this).attr("id").replace("chkProgramacion_NNA_", "");

			var str = $("#txtProgramacion_Borrados").val();
			
			if ($(this).is(':checked'))
			{
				$(obj).text($("#txtProgramacion_Fecha").val());
				str = str.replace("{idEquipo : " + $("#txtProgramacion_Equipos").val() + ", idNNA : " + idNNA + ", Fecha : '" + $(obj[0]).text() + "'},", '');
			} else
			{
				str += "{idEquipo : " + $("#txtProgramacion_Equipos").val() + ", idNNA : " + idNNA + ", Fecha : '" + $(obj[0]).text() + "'},";
				$(obj).text("");
			}
			$("#txtProgramacion_Borrados").val(str);

			obj = $("#cntProgramacion_PanelNNA").find(".chkProgramacion_NNA:checked");
			$("#lblProgramacion_PanelNNA_Programados").text($(obj).length);
			$("#lblProgramacion_PanelNNA_PorProgramar").text(parseInt($("#lblProgramacion_PanelNNA_Cargados").text())- $(obj).length);
		}
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

	$("#frmProgramacion").on("submit", function(evento)
	{
		evento.preventDefault();
		if ($("#txtProgramacion_Equipos").val() == "" || $("#txtProgramacion_Equipos").val() == "0")
		{
			Mensaje("Error", "Debe seleccionar primero un Equipo", "danger");
		} else
		{
			var Borrados = $("#txtProgramacion_Borrados").val();
			if (Borrados != "")
			{
				Borrados = Borrados.substr(0, Borrados.length-1);
			}
			Borrados = eval('[' + Borrados + ']');

			var datos = [];
			var idx = 0;
			var objFecha = {};
			var idNNA

			var checks = $("#tblProgramacion_NNA").find('input[type=checkbox]:checked');
			if (checks.length > 0)
			{
				$.each(checks, function(index, val) 
				{
					 objFecha = $(val).parent('div').find('label');
					 idNNA = $(val).attr("id").replace("chkProgramacion_NNA_", "");

					 datos[idx] = {idNNA : idNNA, Fecha : $(objFecha).text()};
					 idx++;
				});
			}
			
			$.post('../server/php/proyecto/programacion_CrearProgramacion.php', {Usuario: Usuario.id, Borrados :  Borrados, datos : datos, idEquipo : $("#txtProgramacion_Equipos").val()}, function(data, textStatus, xhr) 
			{
				if (isNaN(data))
				{
					Mensaje("Error", data, "danger");
				} else
				{
					Mensaje("Hey", 'La programación ha sido guardada', "success");
					$("#txtProgramacion_Borrados").val("");
				}
			});

		}
	});

	$.post('../server/php/proyecto/programacion_cargarNNA.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		var tds = "";
		var valor = null;

		var tmpMadre = 99999999999;

		$("#lblProgramacion_PanelNNA_Cargados").text(data.length);
		$("#lblProgramacion_PanelNNA_PorProgramar").text(data.length);

		var idxNNA = 0;


		$.each(data, function(index, val) 
		{
			valor = calcularEdad(val.FechaNacimiento);
			valor = valor.anios + " años, " + valor.meses + " meses y " + valor.dias + " días";

			icon = 'male';
			if (val.Genero == 'F')
			{
				icon = 'female';
			}

			tds += '<tr class="cntProgramacion_Madre">';
		        tds += '<td>';
				  	tds += '<i class="icon fa-' + icon + ' font-size-20"></i>';
				tds += '</td>';
				tds += '<td>';
		          	tds += '<div class="checkbox-custom checkbox-primary">';
		              tds += '<input type="checkbox" id="chkProgramacion_NNA_' + val.id + '" class="chkProgramacion_NNA">';
		              tds += '<label class="lblChkProgramacion_NNA" for="chkProgramacion_NNA_' + val.id + '"></label>';
		            tds += '</div>';
		        tds += '</td>';
		        tds += '<td class="text-center">';
		        	tds +='<a href="#" class="lnkProgramacion_VerProgramados" data-idMadre="' + val.id + '">' + val.Programados + '</a>';
		        tds += '</td>';
				tds += '<td>';
					tds += '<h4>';
						tds += '<a class="name">' + val.Nombre + '</a> <br>';
					tds += '</h4>';
					tds += '<small>Dirección: </small>' + val.Direccion;
				tds += '</td>';
				tds += '<td>';
					tds += '<small>Telefono: </small>' + val.Telefono1;
					tds += '<br><small>Celular: </small>' + val.Celular1;
				tds += '</td>';
				tds += '<td>';
					tds += '<small>Documento: </small> <strong>' + val.Documento + '</strong><br>';
					tds += '<small>Edad:</small> <strong>' + valor + '</strong>';
					tds += '<small class="pull-right">ingresó ' + calcularTiempoPublicacion(val.FechaIngreso) + ' el ' + val.FechaIngreso + '</small>';
				tds += '</td>';
			tds += '</tr>';
		});

		if (tmpMadre != 0)
		{
			tds += '</table></td>';
			tds += '</tr>';
		}

		$("#tblProgramacion_NNA tbody").append(tds);

		if ($("#txtProgramacion_idEquipo").val() != "")
        {
        	$("#txtProgramacion_Equipos").val($("#txtProgramacion_idEquipo").val());
        	//$("#txtProgramacion_Equipos").trigger('change');
        	$("#txtProgramacion_idEquipo").val("");
        }

	}, 'json');

	$("#txtProgramacion_Equipos").on("change", function()
	{
		var idEquipo = $("#txtProgramacion_Equipos").val();
		$(".chkProgramacion_NNA").prop("checked", false);
		$(".lblChkProgramacion_NNA").text("");
		$("#txtProgramacion_Borrados").val("");

		$.post('../server/php/proyecto/programacion_cargarNNAProgramados.php', {Usuario: Usuario.id, idEquipo : idEquipo}, function(data, textStatus, xhr) 
		{
			var tmpFecha = $("#txtProgramacion_Fecha").val();
			if (data != "0")
			{
				$.each(data, function(index, val) 
				{
					 $("#txtProgramacion_Fecha").val(val.fecha);
					$("#chkProgramacion_NNA_" + val.idNNA).trigger('click');
				});
				$("#txtProgramacion_Fecha").val(tmpFecha);
			}
		}, 'json');
	});
}