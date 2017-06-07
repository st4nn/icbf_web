function funMadre_Crear()
{
	$("#btnResponsable_VolverALaTabla").on("click", function()
	{
		cargarModulo("madres/madres.html", "Madres");
	});

	$("#frmResponsable .datepicker").datepicker({
	    clearBtn: true,
	    language: "es",
	    orientation: "top auto",
	    daysOfWeekHighlighted: "0",
	    autoclose: true,
	    todayHighlight: true
	});

	 $("#txtResponsable_FechaNacimiento").on("change", function()
	  {
	    var valor = $(this).val();
	    if (valor != "")
	    {
	      valor = calcularEdad(valor);
	      valor = valor.anios + " años, " + valor.meses + " meses y " + valor.dias + " días";
	    } 
	    $("#txtResponsable_Edad").val(valor);
	  });

	$("#btnRegistroResponsable_Galeria").on("change", function(event)
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

			        data.append('Prefijo', $("#txtResponsable_Prefijo").val());
			        data.append('Proceso', 'Foto Madre');
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
			                  	$("#imgResponsable_Foto").attr("src", e.target.result);
			                  }
			            },
			              error: function(jqXHR, textStatus, errorThrown)
			              {
			                  // Handle errors here
			                  Mensaje('Error:', textStatus);
			                  $("#cntIngresar_Archivo").modal("show");
			              }
			          });
				};
			})(f);

			reader.readAsDataURL(f);
		}
	});

	$.post('../server/php/proyecto/configuracion_CargarMunicipios.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		$("#txtResponsable_Localidad option").remove();
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
				
    			$("#txtResponsable_Localidad").append(tds2);
			} else
			{
				Mensaje("Error", data, "danger");
			}
		}
	}, "json");

	$("#btnResponsable_VerPrograma").on("click", function(evento)
	{
		evento.preventDefault();
		$.post('../server/php/proyecto/madres_cargarPrograma.php', {Usuario: Usuario.id, idMadre : $("#lblMadres_Detalle_Codigo").text()}, function(data, textStatus, xhr) 
		{
			if (data != 0)
			{
				cargarModulo("madres/programa.html", "Programa", function()
				{
					$("#txtMadrePrograma_id").val($("#lblMadres_Detalle_Codigo").text());
					$("#txtMadrePrograma_Prefijo").val($("#txtMadre_Prefijo").val());
					$("#lblMadrePrograma_NombreMadre").text($("#lblMadres_Detalle_Nombre").text());

					$.each(data, function(index, val) 
					{
						 if ($("#txtMadrePrograma_" + index).length > 0)
						 {
						 	$("#txtMadrePrograma_" + index).val(val);
						 }
					});

					$("#txtMadrePrograma_GrupoEtnico").trigger('change');
					$("#txtMadrePrograma_FechaResolucion").trigger('change');

					madres_cargarNinosAsignados();
				});
			}
		}, 'json');
	});

	
	$("#cntResponable_Mapa").iniciarMapa({fClick : function(ev)
		{
			responsableMarker.setPosition({lat : ev.latLng.lat(), lng : ev.latLng.lng()});
			$("#txtResponsable_Latitud").val(ev.latLng.lat());
			$("#txtResponsable_Longitud").val(ev.latLng.lng());
		}}, function(mapa)
		{
			responsableMapa = mapa;
			responsableMarker = mapa.addMarker({
	          lat: 4.686804,
	          lng: -74.083867,
	          icon : '../assets/images/icons/home_marker.png'
	        });
		});

	$("#frmResponsable").on("submit", function(evento)
	{
		evento.preventDefault();
		$("#frmResponsable").generarDatosEnvio("txtResponsable_", function(datos)
		{
			$.post('../server/php/proyecto/crearMadre.php', {Usuario : Usuario.id, datos : datos}, function(data, textStatus, xhr) 
			{
				if (isNaN(data))
				{
					Mensaje("Error", data);
				} else
				{
					Mensaje("Hey", "Los datos han sido ingresados");
					$("#txtResponsable_Codigo").val(data);

					var t = $('#tblMadres').DataTable();
						 t.row.add( [
				            '',
						 	data,
				            $("#txtResponsable_Nombre1").val() + ' ' + $("#txtResponsable_Nombre2").val() + ' ' + $("#txtResponsable_Apellido1").val() + ' ' + $("#txtResponsable_Apellido2").val(),
				            $("#txtResponsable_Localidad option:selected").text(),
				            '--',
				            0,
				            0,
				            0
				        ] ).draw( false );
				}
			});
		});
	});
}