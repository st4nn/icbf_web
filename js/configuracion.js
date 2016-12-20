function funConfiguracion()
{
	configuracion_CargarRegionales();
	configuracion_CargarCentrosZonales();
	configuracion_CargarMunicipios();

	$('#cntConfiguracion_Opciones').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3
    });	

    $("#cntConfiguracion_Opciones a").on("click", function(evento)
	{
		evento.preventDefault();
		var idObj = $(this).attr("href");
		$(".cntConfiguracion_Tab").hide();
		$(idObj).slideDown();
	});

    $("#frmConfiguracion_Regional_Crear").on("submit", function(evento)
    {
    	evento.preventDefault();
    	if ($("#txtConfiguracion_Regional_Crear_Nombre").val() == "")
    	{
    		Mensaje("Error", "El nombre no puede estar vacío", "danger");
    	} else
    	{
    		$("#frmConfiguracion_Regional_Crear").generarDatosEnvio("txtConfiguracion_Regional_Crear_", function(datos)
			{
	    		$.post('../server/php/proyecto/configuracion_CrearRegional.php', {datos : datos}, function(data, textStatus, xhr) 
				{
					if (data.Error != "")	
					{
						Mensaje("Error", data.Error, "danger");
					} else
					{

						var obj = $('#tblRegionales .btnConfiguracion_Regional_Editar[idRegional="' + data.datos + '"]');
						if (obj.length == 0)
						{
							var tds = "";

							tds += '<div>';
								tds += '<button type="button" idRegional="' + data.datos + '" class="btn btn-icon btn-info btnConfiguracion_Regional_Editar"><i class="icon wb-edit" aria-hidden="true"></i></button>';
								tds += '<button type="button" idRegional="' + data.datos + '" class="btn btn-icon btn-danger btnConfiguracion_Regional_Borrar margin-left-5"><i class="icon wb-trash" aria-hidden="true"></i></button>';
							tds += '</div>';
							
							var t = $('#tblRegionales').DataTable();

							 t.row.add( [
					            tds,
							 	data.datos,
					            $("#txtConfiguracion_Regional_Crear_Nombre").val(),
					            Usuario.nombre,
					            obtenerFecha()
					        ] ).draw( false );
						} else
						{
							obj = $(obj).parent("div").parent("td").parent("tr").find("td");
							$(obj[2]).text($("#txtConfiguracion_Regional_Crear_Nombre").val());
							$(obj[3]).text(Usuario.nombre);
							$(obj[4]).text(obtenerFecha());

						}


						$("#btnConfiguracion_Regional_Cancelar").trigger('click');						
					}
				}, "json");
			});
    	}
    });

    $("#frmConfiguracion_CentrosZonales_Crear").on("submit", function(evento)
    {
    	evento.preventDefault();
    	if ($("#txtConfiguracion_CentrosZonales_Crear_Nombre").val() == "")
    	{
    		Mensaje("Error", "El nombre no puede estar vacío", "danger");
    	} else
    	{
    		$("#frmConfiguracion_CentrosZonales_Crear").generarDatosEnvio("txtConfiguracion_CentrosZonales_Crear_", function(datos)
			{
	    		$.post('../server/php/proyecto/configuracion_CrearCentroZonal.php', {datos : datos}, function(data, textStatus, xhr) 
				{
					if (data.Error != "")	
					{
						Mensaje("Error", data.Error, "danger");
					} else
					{

						var obj = $('#tblCentrosZonales .btnConfiguracion_CentroZonal_Editar[idCentroZonal="' + data.datos + '"]');
						if (obj.length == 0)
						{
							var tds = "";

							tds += '<div>';
								tds += '<button type="button" idCentroZonal="' + data.datos + '" class="btn btn-icon btn-info btnConfiguracion_CentroZonal_Editar"><i class="icon wb-edit" aria-hidden="true"></i></button>';
								tds += '<button type="button" idCentroZonal="' + data.datos + '" class="btn btn-icon btn-danger btnConfiguracion_CentroZonal_Borrar margin-left-5"><i class="icon wb-trash" aria-hidden="true"></i></button>';
							tds += '</div>';
							
							var t = $('#tblCentrosZonales').DataTable();

							 t.row.add( [
					            tds,
							 	data.datos,
					            $("#txtConfiguracion_CentrosZonales_Crear_Nombre").val(),
					            '<div idRegional="' + $("#txtConfiguracion_CentrosZonales_Crear_idRegional").val() + '">' + $("#txtConfiguracion_CentrosZonales_Crear_idRegional option:selected").text() + '</div>',
					            Usuario.nombre,
					            obtenerFecha()
					        ] ).draw( false );
						} else
						{
							obj = $(obj).parent("div").parent("td").parent("tr").find("td");
							$(obj[2]).text($("#txtConfiguracion_CentrosZonales_Crear_Nombre").val());
							$(obj[3]).find("div").text($("#txtConfiguracion_CentrosZonales_Crear_idRegional option:selected").text());
							$(obj[3]).find("div").attr("idRegional" , $("#txtConfiguracion_CentrosZonales_Crear_idRegional").val());
							$(obj[4]).text(Usuario.nombre);
							$(obj[5]).text(obtenerFecha());

						}


						$("#btnConfiguracion_CentrosZonales_Cancelar").trigger('click');						
					}
				}, "json");
			});
    	}
    });

    $("#frmConfiguracion_Municipios_Crear").on("submit", function(evento)
    {
    	evento.preventDefault();
    	if ($("#txtConfiguracion_Municipios_Crear_Nombre").val() == "")
    	{
    		Mensaje("Error", "El nombre no puede estar vacío", "danger");
    	} else
    	{
    		$("#frmConfiguracion_Municipios_Crear").generarDatosEnvio("txtConfiguracion_Municipios_Crear_", function(datos)
			{
	    		$.post('../server/php/proyecto/configuracion_CrearMunicipio.php', {datos : datos}, function(data, textStatus, xhr) 
				{
					if (data.Error != "")	
					{
						Mensaje("Error", data.Error, "danger");
					} else
					{

						var obj = $('#tblMunicipios .btnConfiguracion_Municipio_Editar[idMunicipio="' + data.datos + '"]');
						if (obj.length == 0)
						{
							var tds = "";

							tds += '<div>';
								tds += '<button type="button" idMunicipio="' + data.datos + '" class="btn btn-icon btn-info btnConfiguracion_Municipio_Editar"><i class="icon wb-edit" aria-hidden="true"></i></button>';
								tds += '<button type="button" idMunicipio="' + data.datos + '" class="btn btn-icon btn-danger btnConfiguracion_Municipio_Borrar margin-left-5"><i class="icon wb-trash" aria-hidden="true"></i></button>';
							tds += '</div>';
							
							var t = $('#tblMunicipios').DataTable();

							 t.row.add( [
					            tds,
							 	data.datos,
					            $("#txtConfiguracion_Municipios_Crear_Nombre").val(),
					            '',
					            '<div idCentroZonal="' + $("#txtConfiguracion_Municipios_Crear_idCentroZonal").val() + '">' + $("#txtConfiguracion_Municipios_Crear_idCentroZonal option:selected").text() + '</div>',
					            Usuario.nombre,
					            obtenerFecha()
					        ] ).draw( false );
						} else
						{
							obj = $(obj).parent("div").parent("td").parent("tr").find("td");
							$(obj[2]).text($("#txtConfiguracion_Municipios_Crear_Nombre").val());
							$(obj[4]).find("div").text($("#txtConfiguracion_Municipios_Crear_idCentroZonal option:selected").text());
							$(obj[4]).find("div").attr("idCentroZonal" , $("#txtConfiguracion_Municipios_Crear_idCentroZonal").val());
							$(obj[5]).text(Usuario.nombre);
							$(obj[6]).text(obtenerFecha());

						}


						$("#btnConfiguracion_Municipios_Cancelar").trigger('click');						
					}
				}, "json");
			});
    	}
    });

    $("#btnConfiguracion_Regional_Cancelar").on("click", function()
    {
    	$("#btnConfiguracion_Regional_Cancelar").slideUp();
    	$("#txtConfiguracion_Regional_Crear_id").val("");
    	$("#txtConfiguracion_Regional_Crear_Nombre").val("");
		$("#lblConfiguracion_Regional_Crear_Tipo").text("Crear");
    });

    $(document).delegate('.btnConfiguracion_Regional_Editar', 'click', function(event) 
    {
    	var fila = $(this).parent("div").parent("td").parent("tr").find("td");
    	
    	$("#btnConfiguracion_Regional_Cancelar").slideDown();

    	$("#txtConfiguracion_Regional_Crear_id").val($(fila[1]).text());
    	$("#txtConfiguracion_Regional_Crear_Nombre").val($(fila[2]).text());
    	$("#lblConfiguracion_Regional_Crear_Tipo").text("Editar");
    });

    $(document).delegate('.btnConfiguracion_CentroZonal_Editar', 'click', function(event) 
    {
    	var fila = $(this).parent("div").parent("td").parent("tr").find("td");
    	
    	$("#btnConfiguracion_CentrosZonales_Cancelar").slideDown();

    	$("#txtConfiguracion_CentrosZonales_Crear_id").val($(fila[1]).text());
    	$("#txtConfiguracion_CentrosZonales_Crear_idRegional").val($(fila[3]).find("div").attr("idRegional"));
    	$("#txtConfiguracion_CentrosZonales_Crear_Nombre").val($(fila[2]).text());
    	$("#lblConfiguracion_CentrosZonales_Crear_Tipo").text("Editar");
    });

    $("#btnConfiguracion_CentrosZonales_Cancelar").on("click", function()
    {
    	$("#btnConfiguracion_CentrosZonales_Cancelar").slideUp();
    	$("#txtConfiguracion_CentrosZonales_Crear_id").val("");
    	$("#txtConfiguracion_CentrosZonales_Crear_Nombre").val("");
		$("#lblConfiguracion_CentrosZonales_Crear_Tipo").text("Crear");
    });

    $(document).delegate('.btnConfiguracion_Municipio_Editar', 'click', function(event) 
    {
    	var fila = $(this).parent("div").parent("td").parent("tr").find("td");
    	
    	$("#btnConfiguracion_Municipios_Cancelar").slideDown();

    	$("#txtConfiguracion_Municipios_Crear_id").val($(fila[1]).text());
    	$("#txtConfiguracion_Municipios_Crear_idRegional").val($(fila[3]).find("div").attr("idRegional"));
    	$("#txtConfiguracion_Municipios_Crear_idCentroZonal").val($(fila[4]).find("div").attr("idCentroZonal"));
    	$("#txtConfiguracion_Municipios_Crear_Nombre").val($(fila[2]).text());
    	$("#lblConfiguracion_Municipios_Crear_Tipo").text("Editar");
    });

    $("#btnConfiguracion_Municipios_Cancelar").on("click", function()
    {
    	$("#btnConfiguracion_Municipios_Cancelar").slideUp();
    	$("#txtConfiguracion_Municipios_Crear_id").val("");
    	$("#txtConfiguracion_Municipios_Crear_Nombre").val("");
		$("#lblConfiguracion_Municipios_Crear_Tipo").text("Crear");
    });
}

function configuracion_CargarRegionales()
{
	$.post('../server/php/proyecto/configuracion_CargarRegionales.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		if (data == 0)
		{
			Mensaje("Error", "No hay datos en la Tabla", "danger");
		} else
		{
			if (typeof(data) == "object")
			{
				var tds = "";
				var tds2 = "";
				
				$.each(data, function(index, val) 
				{
					tds += '<tr>';
	    				tds += '<td>';
	    					tds += '<div>';
	    						tds += '<button type="button" idRegional="' + val.id + '" class="btn btn-icon btn-info btnConfiguracion_Regional_Editar"><i class="icon wb-edit" aria-hidden="true"></i></button>';
								tds += '<button type="button" idRegional="' + val.id + '" class="btn btn-icon btn-danger btnConfiguracion_Regional_Borrar margin-left-5"><i class="icon wb-trash" aria-hidden="true"></i></button>';
	    					tds += '</div>';
	    				tds += '</td>';
	    				tds += '<td>' + val.id + '</td>';
	    				tds += '<td>' + val.Nombre + '</td>';
	    				tds += '<td>' + val.Usuario_Nombre + '</td>';
	    				tds += '<td>' + val.fechaCargue + '</td>';
	    			tds += '</tr>';

	    			tds2 += '<option value="' + val.id + '">' + val.Nombre + '</option>'

				});
				
    			$("#tblRegionales").crearDataTable(tds, function(){});
    			$("#txtConfiguracion_CentrosZonales_Crear_idRegional").append(tds2);
			} else
			{
				Mensaje("Error", data, "danger");
			}
		}
	}, "json");
}

function configuracion_CargarCentrosZonales()
{
	$.post('../server/php/proyecto/configuracion_CargarCentrosZonales.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		if (data == 0)
		{
			Mensaje("Error", "No hay datos en la Tabla", "danger");
		} else
		{
			if (typeof(data) == "object")
			{
				var tds = "";
				var tds2 = "";
				
				$.each(data, function(index, val) 
				{
					tds += '<tr>';
	    				tds += '<td>';
	    					tds += '<div>';
	    						tds += '<button type="button" idCentroZonal="' + val.id + '" class="btn btn-icon btn-info btnConfiguracion_CentroZonal_Editar"><i class="icon wb-edit" aria-hidden="true"></i></button>';
								tds += '<button type="button" idCentroZonal="' + val.id + '" class="btn btn-icon btn-danger btnConfiguracion_CentroZonal_Borrar margin-left-5"><i class="icon wb-trash" aria-hidden="true"></i></button>';
	    					tds += '</div>';
	    				tds += '</td>';
	    				tds += '<td>' + val.id + '</td>';
	    				tds += '<td>' + val.Nombre + '</td>';
	    				tds += '<td><div idRegional="' + val.idRegional + '">' + val.Regional + '</div></td>';
	    				tds += '<td>' + val.Usuario_Nombre + '</td>';
	    				tds += '<td>' + val.fechaCargue + '</td>';
	    			tds += '</tr>';

	    			tds2 += '<option value="' + val.id + '">' + val.Nombre + '</option>';
				});
				
    			$("#tblCentrosZonales").crearDataTable(tds, function(){});
    			$("#txtConfiguracion_Municipios_Crear_idCentroZonal").append(tds2);
			} else
			{
				Mensaje("Error", data, "danger");
			}
		}
	}, "json");
}

function configuracion_CargarMunicipios()
{
	$.post('../server/php/proyecto/configuracion_CargarMunicipios.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		if (data == 0)
		{
			Mensaje("Error", "No hay datos en la Tabla", "danger");
		} else
		{
			if (typeof(data) == "object")
			{
				var tds = "";
				var tds2 = "";
				
				$.each(data, function(index, val) 
				{
					tds += '<tr>';
	    				tds += '<td>';
	    					tds += '<div>';
	    						tds += '<button type="button" idMunicipio="' + val.id + '" class="btn btn-icon btn-info btnConfiguracion_Municipio_Editar"><i class="icon wb-edit" aria-hidden="true"></i></button>';
								tds += '<button type="button" idMunicipio="' + val.id + '" class="btn btn-icon btn-danger btnConfiguracion_Municipio_Borrar margin-left-5"><i class="icon wb-trash" aria-hidden="true"></i></button>';
	    					tds += '</div>';
	    				tds += '</td>';
	    				tds += '<td>' + val.id + '</td>';
	    				tds += '<td>' + val.Nombre + '</td>';
	    				tds += '<td>' + val.Regional + '</td>';
	    				tds += '<td><div idCentroZonal="' + val.idCentroZonal + '">' + val.CentroZonal + '</div></td>';
	    				tds += '<td>' + val.Usuario_Nombre + '</td>';
	    				tds += '<td>' + val.fechaCargue + '</td>';
	    			tds += '</tr>';

	    			tds2 += '<option value="' + val.id + '">' + val.Nombre + '</option>';
				});
				
    			$("#tblMunicipios").crearDataTable(tds, function(){});
    			//$("#txtConfiguracion_Municipios_Crear_idCentroZonal").append(tds2);
			} else
			{
				Mensaje("Error", data, "danger");
			}
		}
	}, "json");
}