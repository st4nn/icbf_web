function funProgramacion()
{

	.datepicker({
	  clearBtn: true,
	  language: "es",
	  orientation: "top auto",
	  daysOfWeekHighlighted: "0",
	  autoclose: true,
	  todayHighlight: true
	});
	
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

  	$("#cntProgramacion_NNA").iniciarResponsables({url : 'typeahead_cargarNNA'}, null, function()
	{
		$("#cntProgramacion_NNA label").text("Nombre del NNA a Agregar");
	});
}