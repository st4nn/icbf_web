function funUsuarios()
{
	$("#tblUsuarios").crearDataTable("");
	usuarios_CargarUsuarios();	
}

function usuarios_CargarUsuarios()
{
	$.post('../server/php/proyecto/cargarUsuarios.php', {Usuario: Usuario.id}, function(data, textStatus, xhr) 
	{
		if (data == 0)
		{
			Mensaje("Error", "No hay datos en la Tabla", "danger");
		} else
		{
			if (typeof(data) == "object")
			{
				var tds = "";
				$.each(data, function(index, val) 
				{
					tds += '<tr>';
	    				tds += '<td>';
	    					tds += '<div><button type="button" class="btn btn-icon btn-info"><i class="icon wb-edit" aria-hidden="true"></i></button>';
	    					tds += '<button type="button" class="btn btn-icon btn-warning margin-left-5"><i class="icon wb-lock" aria-hidden="true"></i></button></div>';
	    				tds += '</td>';
	    				tds += '<td>' + val.id + '</td>';
	    				tds += '<td>' + val.Usuario + '</td>';
	    				tds += '<td>' + val.Nombre + '</td>';
	    				tds += '<td>' + val.Cargo + '</td>';
	    				tds += '<td>' + val.Perfil + '</td>';
	    				tds += '<td>' + val.Correo + '</td>';
	    				tds += '<td>' + val.Estado + '</td>';
	    			tds += '</tr>';

				});
				
    			$("#tblUsuarios").crearDataTable(tds, function(){});
			} else
			{
				Mensaje("Error", data, "danger");
			}
		}
	}, "json");
}