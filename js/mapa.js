var mapDiligenciamiento = null;

$(document).on("ready", function()
{
	if (mapDiligenciamiento == null)
	{
		var alto = $("body").height();// - 100;
	    $("#cntVisitas_Mapa").height(alto);

	    $( window ).resize(function() 
	    {
	      var alto = $("body").height();// - 100;
	      $("#cntVisitas_Mapa").height(alto);
	    });

	    var mapDiv = document.getElementById("cntVisitas_Mapa");
    
	    mapDiligenciamiento = plugin.google.maps.Map.getMap(mapDiv, {
	      'backgroundColor': 'white',
	      'controls': {
	        'compass': true,
	        'myLocationButton': true,
	        'mapTypeControl' : true,
	        'indoorPicker': true,
	        'zoom': true
	      },
	      'gestures': {
	        'scroll': true,
	        'tilt': true,
	        'rotate': true,
	        'zoom': true
	      }   });

	    mapDiligenciamiento.addEventListener(plugin.google.maps.event.MAP_READY, function() 
	      {
	        mapDiligenciamiento.on(plugin.google.maps.event.MAP_CLICK, function()
	          {
	            if(!$("#cntVisitas_Mapa_Opciones").is(":visible"))
	            {
	              $("#cntVisitas_Marcador_Opciones").slideUp();
	              $("#cntVisitas_Mapa_Opciones").show();
	              $("#img_Marcador_Mira").show();
	            }
	          });

	        mapDiligenciamiento.setZoom(16);
	      });
	}
});