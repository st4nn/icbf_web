function funEquipos()
{
	$("#tblEquipos").crearDataTable("");
	usuarios_CargarEquipos();

	$("#btnEquipos_VerEquipos_Actualizar").on("click", function()
	{
		usuarios_CargarEquipos();
	});

	$('.dd').nestable({
		maxDepth : 1,
		callback: function(l,e){
	        var idObj = $(l).attr("id").replace("cntEquipos_EditarEquipo_", "");

	        var idUsuario = $(e).attr("data-id");
	        var idEquipo = $("#txtEquipos_Edicion_idEquipo").val();
	        
	        var cantidadIntegrantes = $("#cntEquipos_EditarEquipo_Equipo .dd-item");
        	$("#lblEquipos_Edicion_NumIntegrantes").text(cantidadIntegrantes.length);

	        var sujeto = $(e).find("small");
	        var tipo = "";

	        if (idObj == "Equipo")
	        {
	        	$(".cntEquipos_Integrantes_" + idEquipo).append("<p data-id='" + $(e).attr("data-id") + "' cargo='" + $(sujeto).attr("Cargo") + "'>" + $(sujeto).text() + "</p>");
	        	tipo = "INSERT";
	        } else
	        {
	        	$(".cntEquipos_Integrantes_" + idEquipo + " p[data-id=" + $(e).attr("data-id") + "]").remove();
	        	tipo = "DELETE";
	        }

	        $.post('../server/php/proyecto/equipos_editarIntegrantes.php', {Usuario : Usuario.id, idUsuario : idUsuario, idEquipo : idEquipo, Tipo : tipo}, function(data, textStatus, xhr) 
	        {
	        	if (data.Error != "")	
				{
					Mensaje("Error", data.Error, "danger");
				}
	        }, 'json');
	    }
	});

	$("#btnEquipos_EditarEquipo_Usuarios_Buscar").on("click", function()
	{
		$("#txtEquipos_EditarEquipo_Usuarios_Buscar").trigger('change');
	});

	var buscandoUsuarios = false;

	$("#txtEquipos_EditarEquipo_Usuarios_Buscar").on("change keyup paste", function()
	{
		if (!buscandoUsuarios)
		{
			buscandoUsuarios = true;
			$.post('../server/php/proyecto/equipos_buscarUsuarios.php', {Nombre: $("#txtEquipos_EditarEquipo_Usuarios_Buscar").val(), Usuario : Usuario.id}, function(data, textStatus, xhr) 
			{
				buscandoUsuarios = false;

				$("#cntEquipos_EditarEquipo_Usuarios ol").remove();
				$("#cntEquipos_EditarEquipo_Usuarios div").remove();
				$("#cntEquipos_EditarEquipo_Usuarios").append('<ol class="dd-list dd-empty bg-indigo-100"></ol>');

				if (data == 0)
				{
				} else
				{
					var tds = "";
					var objEquipo = {};
					$.each(data, function(index, val) 
					{
						objEquipo = $(".dd-item[data-id='" + val.id + "']");
						
						if ($(objEquipo).length == 0)
						{
							tds += '<li class="dd-item" data-id="' + val.id + '">';
						        tds += '<div class="dd-handle">';
						        	tds += '<h5 class="media-heading">' + val.Cargo + '</h5>';
						        tds += '</div>';
						        tds += '<div class="dd-content">';
						        	tds += '<small Cargo="' + val.Cargo + '">' + val.Nombre + '</small>';
						        tds += '</div>';
						    tds += '</li>';
						}
					});

					var obj = $("#cntEquipos_EditarEquipo_Usuarios .dd-empty");
				    if ($(obj).length > 0)
				    {
				    	$("#cntEquipos_EditarEquipo_Usuarios .dd-empty").remove();
				    	$("#cntEquipos_EditarEquipo_Usuarios").append('<ol class="dd-list"></ol>');
				    }

				    $("#cntEquipos_EditarEquipo_Usuarios ol").prepend(tds);
				}			

			}, "json").fail(function()
			{
				buscandoUsuarios = false;
			});
		}
	});

	$("#btnEquipos_CrearEquipo").on("click", function()
	{
		$("#cntEquipos_CrearEquipo").modal("show");
	});

	$("#btnEquipos_VerEquipos").on("click", function()
	{
		$("#btnEquipos_VerEquipos").hide();
		$("#cntEquipos_EditarEquipo").slideUp();
		$("#cntEquipos_VerEquipos_Body").slideDown();
		$("#btnEquipos_CrearEquipo").slideDown();
	});

	$(document).delegate('.btnEquipos_Borrar', 'click', function(event) 
	{
		var obj = this;
		alertify.set({"labels" : {"ok" : "Si, Borrar", "cancel" : "No, Volver"}});
		alertify.confirm("Confirma que desea borrar este Equipo?", function (ev) 
		{
			if (ev)
			{
			      
			  $.post("../server/php/proyecto/equipos_BorrarEquipo.php", {Usuario : Usuario.id, idEquipo: $(obj).attr("idEquipo")}, function(data)
			  {
			    if (data.Error != "")
			    {
			      Mensaje("Error", data.Error, "danger");
			    } else
			    {
					var t = $("#tblEquipos").DataTable();
				    t.row($(obj).parent("div").parent("td").parent("tr")).remove().draw();
			    }
			  }, 'json');
			} 
		});
	});
	

	$(document).delegate('.btnEquipos_EditarDatos', 'click', function(event) 
	{
		var fila = $(this).parent("div").parent("td").parent("tr").find("td");
		$("#lblEquipos_Edicion_NomEquipo").text($(fila[2]).text());
		$("#txtEquipos_Edicion_idEquipo").val($(this).attr("idEquipo"));

		$("#cntEquipos_EditarEquipo_Equipo ol").remove();
		$("#cntEquipos_EditarEquipo_Equipo div").remove();
		$("#cntEquipos_EditarEquipo_Equipo").append('<ol class="dd-list dd-empty bg-indigo-100"></ol>');
		var objIntegrantes = $(".cntEquipos_Integrantes_" + $("#txtEquipos_Edicion_idEquipo").val()).find("p");
		
		if ($(objIntegrantes).length > 0)
		{
			var tds = "";
			$.each(objIntegrantes, function(index, val) 
			{
				tds += '<li class="dd-item" data-id="' + $(val).attr("data-id") + '">';
			        tds += '<div class="dd-handle">';
			        	tds += '<h5 class="media-heading">' + $(val).attr("cargo") + '</h5>';
			        tds += '</div>';
			        tds += '<div class="dd-content">';
			        	tds += '<small Cargo="' + $(val).attr("cargo") + '">' + $(val).text() + '</small>';
			        tds += '</div>';
			    tds += '</li>';
			});

			$("#cntEquipos_EditarEquipo_Equipo ol").append(tds);
		}

		var cantidadIntegrantes = $("#cntEquipos_EditarEquipo_Equipo .dd-item");
        $("#lblEquipos_Edicion_NumIntegrantes").text(cantidadIntegrantes.length);

		$("#cntEquipos_VerEquipos_Body").slideUp();
		$("#btnEquipos_CrearEquipo").hide();
		$("#btnEquipos_VerEquipos").slideDown();

		$("#cntEquipos_EditarEquipo").slideDown();

	});

	$("#frmEquipos_CrearEquipo").on("submit", function(evento)
	{
		evento.preventDefault();

		if ($("#txtEquipos_Crear_Nombre").val() == "")
		{
			Mensaje("Error", "El nombre no puede estar vacío", "danger");
		} else
		{
			$.post('../server/php/proyecto/equipos_CrearEquipo.php', {Nombre : $("#txtEquipos_Crear_Nombre").val(), Usuario : Usuario.id}, function(data, textStatus, xhr) 
			{
				if (data.Error != "")	
				{
					Mensaje("Error", data.Error, "danger");
				} else
				{
					var tds = "";
					tds += '<div>';
						tds += '<button type="button" idEquipo="' + data.datos + '" class="btn btn-icon btn-info btnEquipos_EditarDatos"><i class="icon wb-edit" aria-hidden="true"></i></button>';
						tds += '<button type="button" idEquipo="' + data.datos + '" class="btn btn-icon btn-danger btnEquipos_Borrar margin-left-5"><i class="icon wb-trash" aria-hidden="true"></i></button>';
					tds += '</div>';

					var tds2 = "";
					tds2 += '<div class="col-xs-12 cntEquipos_Integrantes_' + data.datos  + '"></div>';

					var t = $('#tblEquipos').DataTable();

					 t.row.add( [
			            tds,
					 	data.datos,
			            $("#txtEquipos_Crear_Nombre").val(),
			            tds2
			        ] ).draw( false );

					$(".btnEquipos_EditarDatos[idEquipo=" + data.datos + "]").trigger('click');

					$("#cntEquipos_CrearEquipo").modal("hide");
				}
			}, "json");
		}
	});
}

function usuarios_CargarEquipos()
{
	$.post('../server/php/proyecto/equipos_cargarEquipos.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
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
					tds += '<tr>';
	    				tds += '<td>';
	    					tds += '<div>';
	    						tds += '<button type="button" idEquipo="' + val.id + '" class="btn btn-icon btn-info btnEquipos_EditarDatos"><i class="icon wb-edit" aria-hidden="true"></i></button>';
								tds += '<button type="button" idEquipo="' + val.id + '" class="btn btn-icon btn-danger btnEquipos_Borrar margin-left-5"><i class="icon wb-trash" aria-hidden="true"></i></button>';
	    					tds += '</div>';
	    				tds += '</td>';
	    				tds += '<td>' + val.id + '</td>';
	    				tds += '<td>' + val.Nombre + '</td>';
	    				tds += '<td><div class="col-xs-12 cntEquipos_Integrantes_' + val.id  + '">';
	    					if (val.Integrantes != "")
	    					{
	    						objIntegrantes = val.Integrantes.split(",");
	    						$.each(objIntegrantes, function(idIntegrante, integrante) 
	    						{
	    							objIntegrante = integrante.split(":");
	    							tds += "<p data-id='" + objIntegrante[0] + "' cargo='" + objIntegrante[2] + "'>" + objIntegrante[1] + "</p>"
	    						});
	    					}
	    				tds += '</div></td>';
	    			tds += '</tr>';

				});
				
    			$("#tblEquipos").crearDataTable(tds, function(){});
			} else
			{
				Mensaje("Error", data, "danger");
			}
		}
	}, "json");
}