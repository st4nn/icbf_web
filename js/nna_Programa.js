function funnna_Programa()
{
	$("#btnNNAPrograma_VolverALaTabla").on("click", function()
	{
		cargarModulo("nna/nna.html", "NNA");
	});

	$("#frmNNAPrograma .datepicker").datepicker({
	  clearBtn: true,
	  language: "es",
	  orientation: "top auto",
	  daysOfWeekHighlighted: "0",
	  autoclose: true,
	  todayHighlight: true
	});

	$("#txtNNAPrograma_FIngreso").on("change", function()
	  {
	    var valor = $(this).val();
	    if (valor != "")
	    {
	      valor = calcularEdad(valor);
	      valor = valor.anios + " años, " + valor.meses + " meses y " + valor.dias + " días";
	    } 
	    $("#txtNNAPrograma_TiempoHogar").val(valor);
	  });

	$("#cntNNAPrograma_Responsable").iniciarResponsables({url : 'typeahead_cargarMadres'});

	$("#frmNNAPrograma").on("submit", function(evento)
	{
		evento.preventDefault();
		$("#frmNNAPrograma").generarDatosEnvio("txtMadrePrograma_", function(datos)
		{
			console.log(datos);/*
			
			$.post('../server/php/proyecto/madres_crearPrograma.php', {Usuario : Usuario.id, datos : datos}, function(data, textStatus, xhr) 
			{
				if (isNaN(data))
				{
					Mensaje("Error", data);
				} else
				{
					Mensaje("Hey", "Los datos han sido ingresados");
				}
			});*/
		});
	});
}