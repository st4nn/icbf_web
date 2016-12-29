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