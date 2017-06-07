function funNNA_Crear()
{
	$("#btnNNA_VolverALaTabla").on("click", function()
	{
		cargarModulo("nna/nna.html", "NNA");
	});

	$("#frmNNA .datepicker").datepicker({
	    clearBtn: true,
	    language: "es",
	    orientation: "top auto",
	    daysOfWeekHighlighted: "0",
	    autoclose: true,
	    todayHighlight: true
	});

	 $("#txtNNA_FechaNacimiento").on("change", function()
	  {
	    var valor = $(this).val();
	    if (valor != "")
	    {
	      valor = calcularEdad(valor);
	      valor = valor.anios + " años, " + valor.meses + " meses y " + valor.dias + " días";
	    } 
	    $("#txtNNA_Edad").val(valor);
	  });

	$("#btnRegistroNNA_Galeria").on("change", function(event)
	{
		var files = event.target.files; // FileList object

		// Obtenemos la imagen del campo "file".
		for (var i = 0, f; f = files[i]; i++) 
		{
			//Solo admitimos imágenes.
			if (!f.type.match('image.*')) 
			{
				continue;
			}

			var reader = new FileReader();

			reader.onload = (function(theFile) 
			{
				return function(e) 
				{
					var data = new FormData();

			        $.each(files, function(key, value)
			        {
			            data.append(key, value);
			        });

			        data.append('Prefijo', $("#txtNNA_Prefijo").val());
			        data.append('Proceso', 'Foto NNA');
			        data.append('Observaciones', '');
			        data.append('Usuario', Usuario.id);

			        $.ajax({
			              url: '../server/php/subirArchivos.php',
			              type: 'POST',
			              data: data,
			              cache: false,
			              dataType: 'html',
			              processData: false, // Don't process the files
			              contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			              success: function(data, textStatus, jqXHR)
			              {
			                  if( parseInt(data) >= 1)
			                  {
			                  	$("#imgNNA_Foto").attr("src", e.target.result);
			                  }
			            },
			              error: function(jqXHR, textStatus, errorThrown)
			              {
			                  // Handle errors here
			                  Mensaje('Error:', textStatus);
			              }
			          });
				};
			})(f);

			reader.readAsDataURL(f);
		}
	});

	$("#btnNNA_VerPrograma").on("click", function(evento)
	{
		evento.preventDefault();
		nna_VerPrograma();
	});


	$("#frmNNA").on("submit", function(evento)
	{
		evento.preventDefault();
		$("#frmNNA").generarDatosEnvio("txtNNA_", function(datos)
		{
			console.log(datos);
			
			$.post('../server/php/proyecto/crearNNA.php', {Usuario : Usuario.id, datos : datos}, function(data, textStatus, xhr) 
			{
				if (isNaN(data))
				{
					Mensaje("Error", data);
				} else
				{
					Mensaje("Hey", "Los datos han sido ingresados");
					$("#txtNNA_Codigo").val(data);

					var t = $('#tblNnas').DataTable();
						 t.row.add( [
				            '',
						 	data,
				            $("#txtNNA_Nombre1").val() + ' ' + $("#txtNNA_Nombre2").val() + ' ' + $("#txtNNA_Apellido1").val() + ' ' + $("#txtNNA_Apellido2").val(),
				            $("#txtNNA_Documento").val(),
				            $("#txtNNA_Edad").val()
				        ] ).draw( false );
				}
			});
		});
	});
}