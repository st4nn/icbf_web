var Usuario = null;
var usuarioPermisos = null;

$(document).ready(function() {
	aplicacion();
  Usuario = JSON.parse(localStorage.getItem('jhyp_icbf'));

  if (Usuario == null || Usuario == undefined)
  {
    cerrarSesion();
  } else
  {
    llenarRestricciones();
    cargarModulo("Inicio.html", "Inicio");
  }

  document.addEventListener("backbutton", function(e)
    { 
          e.preventDefault(); 
    }, false);
});

function aplicacion()
{
  $("#lblCerrarSesion").on("click", cerrarSesion);
    
	$(document).delegate(".lnkMenuBar_Item", "click", function(evento)
    {
      evento.preventDefault();
      var titulo = $(this).find('span').text();
      var vinculo = $(this).attr("vinculo");

      if (vinculo != undefined)
      {
       	cargarModulo(vinculo, titulo);
        if ($(window).width() < 767)
          {
            $("#btnInicio_OcultarMenu").trigger('click');
          }
      }
    });
  
  $(document).delegate(".inputControl", "change" ,function()
    {
      var contenedor = $(this).parent("span").parent("span").parent("div");
      var texto = $(contenedor).find(".inputText");
      var archivo = $(this).val();
      archivo = archivo.split("\\");
      archivo = archivo[(archivo.length - 1)];
      $(texto).val(archivo);
      var barra = $(contenedor).parent("form").find(".progress-bar");
      var percentVal = '0%';
      $(barra).width(percentVal);
      $(barra).text(percentVal);
    });
}

function cargarModulo(vinculo, titulo, callback)
{
	$("#txtCrearProyecto_idProyecto").val("");
  
  titulo = titulo || null;

  if (callback === undefined)
    {callback = function(){};}


	$(".Modulo").hide();
        var tds = "";
        var nomModulo = "modulo_" + vinculo.replace(/\s/g, "_");
        nomModulo = nomModulo.replace(/\./g, "_");
        nomModulo = nomModulo.replace(/\//g, "_");

        if ($('#' + nomModulo).length)
        {
          $('#' + nomModulo).show();
          if (titulo != null)
          {
            $('#' + nomModulo).find('.page-header').find(".page-title").text(titulo);
          }
          callback();
        } else
        {
          tds += '<div id="' + nomModulo + '" class="Modulo"></div>';

          $("#contenedorDeModulos").append(tds);
          $.get(vinculo + "?tmpId=" + obtenerPrefijo(), function(data) 
          {
            $("#" + nomModulo).html(data);
            callback();
          }).fail(function() {
            Mensaje("Error", "No tiene permisos para acceder a este modulo", "danger");
          });
        }
        $("#lblUbicacionModulo").text(titulo);
}
$.fn.generarDatosEnvio = function(restricciones, callback)
{
  if (callback === undefined)
    {callback = function(){};}

    var obj = $(this).find(".guardar");
  var datos = {};
  datos['Usuario'] = Usuario.id;

  $.each(obj, function(index, val) 
  {
    if ($(val).attr("id") != undefined)
    {
      if (!$(val).hasClass('tt-hint'))
      {
        datos[$(val).attr("id").replace(restricciones, "")] = $(val).val();
      }
    }
  });
  datos = JSON.stringify(datos);  

  callback(datos);
}
function Mensaje(Titulo, Mensaje, Tipo)
{
  if (Tipo == undefined)
  {
    Tipo = "success";
  }
  switch (Tipo)
  {
    case "success":
        alertify.success(Mensaje);
      break;
    case "danger":
        alertify.error(Mensaje);
      break;
    default:
        alertify.log(Mensaje);
  }
}

function cerrarSesion()
{
  delete localStorage.jhyp_icbf;
  window.location.replace("../index.html");
}
function readURL(input, idObj) 
{
  var Nombre = input.value.replace("C:\\fakepath\\", "");
  
  if (input.files && input.files[0]) 
  {
      var reader = new FileReader();

      var tds = "";
      var tds2 = "";

      reader.onload = function (e) 
      {
        auditoria_AgregarSoporte(idObj, e.target.result, Nombre, 0);       
      }
      reader.readAsDataURL(input.files[0]);
  }
}

function textObtenerCoordenadas(callback, sierror)
{
  if (callback === undefined)
    {callback = function(){};}

if (sierror === undefined)
    {sierror = function(){};}


  var objCoordenadas ="";
  navigator.geolocation.getCurrentPosition(
    function(datos)
    {
      var lat = datos.coords.latitude;
      var lon = datos.coords.longitude;
      var accu = datos.coords.accuracy;

      objCoordenadas =  lat + "," + lon + "#" + accu;
      callback(lat, lon, accu);
    }, 
    function ()
    {
      objCoordenadas ="No hay precision en el dato";
      if (pMensaje != false)
      {
        Mensaje("Ubicación", objCoordenadas);
      }
      sierror(objCoordenadas);
    });
  return objCoordenadas;
}

 function obtenerCoordenadas()
{
  if ($("#modulo_obras_auditoria_html").is(":visible"))
  {
    navigator.geolocation.getCurrentPosition(devCoordenads, errorMapa);
  } 
}

function devCoordenads(datos)
{
  var lat = datos.coords.latitude;
  var lon = datos.coords.longitude;
  $("#txtCoordenadas").val(lat + "," + lon);
}
function errorMapa()
{
  
}
function abrirURL(url)
{
  var win = window.open(url, "_blank", "directories=no, location=no, menubar=no, resizable=yes, scrollbars=yes, statusbar=no, tittlebar=no");
  win.focus();
}
function obtenerFecha()
{
  var f = new Date();
  return f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 2);
}
function obtenerPrefijo()
{
  var f = new Date();
  return f.getFullYear() + CompletarConCero(f.getMonth() +1, 2) + CompletarConCero(f.getDate(), 2) + CompletarConCero(f.getHours(), 2) + CompletarConCero(f.getMinutes(), 2) + CompletarConCero(f.getSeconds(), 2) + CompletarConCero(Usuario.id, 3);
}
function CompletarConCero(n, length)
{
   n = n.toString();
   while(n.length < length) n = "0" + n;
   return n;
}
$.fn.crearDataTable = function(tds, callback)
{
  if (callback === undefined)
    {callback = function(){};}

  var dtSpanish = {
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Filtrar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
  };

  var options = {
        "aoColumnDefs": [{
          'bSortable': false,
          'aTargets': [-1]
        }],
        "iDisplayLength": 10,
        "aLengthMenu": [
          [10, 25, 50, -1],
          [10, 25, 50, "Todos"]
        ],
        "sDom": '<"dt-panelmenu clearfix"lTfr>t<"dt-panelfooter clearfix"ip>',
        "oTableTools": {
          "sSwfPath": "../assets/vendor/datatables-tabletools/swf/copy_csv_xls_pdf.swf"
        },
        "language" : dtSpanish
      };

  var idObj = $(this).attr("id");
  if ($("#" + idObj + "_wrapper").length == 1)
    {
        $(this).dataTable().fnDestroy();
    } 

    if (tds != undefined && tds != "")
    {
      $(this).find("tbody").find("tr").remove();
      $("#" + idObj + " tbody").append(tds);
    }

  $(this).DataTable(options);
  callback();
}
function sumarFecha(fecha, days)
{
    milisegundos=parseInt(35*24*60*60*1000);
 
    fecha=new Date(fecha);
    day=fecha.getDate();
    month=fecha.getMonth()+1;
    year=fecha.getFullYear();
 
    tiempo=fecha.getTime();
    milisegundos=parseInt(days*24*60*60*1000);
    total=fecha.setTime(tiempo+milisegundos);
    day=fecha.getDate();
    month=fecha.getMonth()+1;
    year=fecha.getFullYear();
 
    return year + "-" + CompletarConCero(month, 2)  + "-" + CompletarConCero(day, 2);   
}

function calcularEdad(fecha)
{
  if (fecha != "")
  {
    // Si la fecha es correcta, calculamos la edad
    var values=fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth()+1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if ( ahora_mes < mes )
    {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia))
    {
        edad--;
    }
    if (edad > 1900)
    {
        edad -= 1900;
    }

    // calculamos los meses
    var meses=0;
    if(ahora_mes>mes)
        meses=ahora_mes-mes;
    if(ahora_mes<mes)
        meses=12-(mes-ahora_mes);
    if(ahora_mes==mes && dia>ahora_dia)
        meses=11;

    // calculamos los dias
    var dias=0;
    if(ahora_dia>dia)
        dias=ahora_dia-dia;
    if(ahora_dia<dia)
    {
        ultimoDiaMes=new Date(ahora_ano, ahora_mes, 0);
        dias=ultimoDiaMes.getDate()-(dia-ahora_dia);
    }
      
      return {anios : edad, meses : meses, dias : dias};
  } else
  {
    return {anios : 0, meses : 0, dias : 0};
  }
}

$.fn.iniciarMapa = function(parametros, callback)
{
  if (callback === undefined)
  {
    callback = function(){};
  }
  var contenedor = '#' + $(this).attr("id");

  var objMapa = parametros.objMapa || null;
  if (parametros.fClick === undefined)
  {
    parametros.fClick = function(){};
  }
  if (typeof GMaps == "undefined")
  {
    $(contenedor).slideUp();
  } else
  {
    if (contenedor === undefined)
    {
      
    } else
    {
      if (parametros.Lat === undefined && parametros.Lon === undefined)
      {
        parametros.Lat = 4.686804;
        parametros.Lon = -74.083867;
      }
        objMapa = new GMaps({
          el: contenedor,
          lat : parametros.Lat,
          lng : parametros.Lon,
          click : parametros.fClick,
          zoomControl: true,
          zoomControlOpt: {
            style: "SMALL",
            position: "TOP_LEFT"
          },
          panControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          overviewMapControl: true

        });

        callback(objMapa);
    }
  }
}

$.fn.iniciarResponsables = function(parametros, funcionSelect, callback)
{
  if (funcionSelect === undefined || funcionSelect == null)
  {
    funcionSelect = function(ev, suggestion) {
      var obj = $('#cnt' + idObj + '_Correos').find('.list-group-item[idUsuario=' + suggestion.id + ']');
      if (obj.length == 0)
      {
        var tds = "";
          tds += '<li class="list-group-item" idUsuario="' + suggestion.id + '">';
            tds += '<div class="media">';
              tds += '<div class="media-left text-center">';
                  tds += '<i class="icon wb-user margin-left-10 font-size-20"></i>';
              tds += '</div>';
              tds += '<div class="media-body">';
                tds += '<h4 class="media-heading">' + suggestion.name + '</h4>';
                tds += '<small>' + suggestion.mail + '</small>';
              tds += '</div>';
              tds += '<div class="media-right">';
                tds += '<a class="btnResponsables_Quitar" href="javascript:void(0)">';
                  tds += '<i class="icon wb-close">';
                tds += '</a>';
              tds += '</div>';
            tds += '</div>';
          tds += '</li>';

        $('#cnt' + idObj + '_Correos').append(tds);
      }

      $('#txt' + idObj + '_Responsable').typeahead('val', '');
    }
  }

  if (callback === undefined)
  {
    callback = function(){};
  }

  var idObj = $(this).attr("id").replace("cnt", "");
  var tds = ""
  tds += '<div class="col-md-12 form-group">';
    tds += '<label for="txt' + idObj + '_Responsable" class="control-label" data-plugin="select2">Responsable a Agregar</label>';
    tds += '<div class="input-group input-group-file">';
      tds += '<input type="text" class="form-control" id="txt' + idObj + '_Responsable" value="" placeholder="Ingrese el Nombre del Responsable" />';
      tds += '<span id="" class="input-group-btn">';
          tds += '<button type="button" class="btn btn-success">';
            tds += '<i class="icon fa-user-plus" aria-hidden="true"></i>';
          tds += '</button>';
      tds += '</span>';
    tds += '</div>';
    tds += '<div class="row">';
      tds += '<ul id="cnt' + idObj + '_Correos" class="list-group list-group-full">';
      tds += '</ul>';
    tds += '</div>';
  tds += '</div>';

  $(this).append(tds);

  var jsonUsuarios = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,

      remote: {
        url: '../server/php/proyecto/' + parametros.url + '.php?q=%QUERY',
         q : 'algo',
        wildcard: '%QUERY'
      }
    });

    $('#txt' + idObj + '_Responsable').typeahead(null, {
      name: 'Usuarios',
      display: 'name',
      source: jsonUsuarios,
      templates: {
        empty: [
          '<div class="empty-message">',
            'No se ha encontrado usuarios que coincidad con el texto',
          '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<div><strong>{{name}}</strong> – ({{mail}})</div>')
      }
    });

    $(document).delegate('.btnResponsables_Quitar', 'click', function(event) 
    {
      event.preventDefault();
      $(this).parent('div').parent('div').parent('li').remove();
    });
    

    $('#txt' + idObj + '_Responsable').bind('typeahead:select', funcionSelect);
    callback();
}

function llenarRestricciones()
{
  usuarioPermisos = {};
  $.post('../server/php/proyecto/configuracion_CargarRestricciones.php', {Usuario : Usuario.id}, function(data, textStatus, xhr) 
  {
    if (data != 0)
    {
      usuarioPermisos = data;
    }
    controlarPermisos();
  }, 'json');
}

function controlarPermisos()
{
  $.each(usuarioPermisos, function(index, val) 
  {
     $(val.control).hide();
  });
}

function iniciarWizard(elemento, controles, funFinish, funBeforeChange)
{
  if (funBeforeChange == undefined)
  {
    funBeforeChange = function(from, to){};
  }

  if (funFinish == undefined)
  {
    funFinish = function(){};
  }
  var defaults = $.components.getDefaults("wizard");
  var options = $.extend(true, {}, defaults, {
    autoFocus: false,
    buttonsAppendTo: controles,
    buttonLabels: {
            next: 'Siguiente',
            back: 'Anterior',
            finish: 'Cerrar'
        },
    onBeforeChange: funBeforeChange,
    onFinish : funFinish
  });

  var wizard = elemento.wizard(options).data('wizard');
}

function calcularTiempoPublicacion(fecha)
{
    fecha = new Date(fecha.replace(" ", "T") + "Z");
    var fechaActual = new Date();
    
    var tiempo = fecha.getTime();
    var tiempoActual = fechaActual.getTime();

    var diferencia = tiempoActual-tiempo;

    diferencia = parseInt(((diferencia/1000)/60)-300);

    var respuesta = "";
    if (diferencia < 2)
    {
      respuesta = "hace un momento";
    } else
    {
      if (diferencia < 60)
      {
        respuesta = "hace " + diferencia + " minutos";
      } else
      {
          if (diferencia < 120)
          {
            respuesta = "hace " + 1 + " hora";
          } else
          {
            if (diferencia < 1440)
            {
              respuesta = "hace " + parseInt(diferencia/60) + " horas";
            } else
            {
              if (diferencia < 43200)
              {
                respuesta = "hace " + parseInt(diferencia/60/24) + " dias";
              } else
              {
                respuesta = "hace " + parseInt(diferencia/60/24/30) + " meses";
              }
            }
          }
      }
    }

    return respuesta;
}

$(document).delegate('.rdbFormato input', 'click', function(event) 
{
  var valor = $(this).val();
  var obj = $(this).parent("div").parent("div").find(".rdbFormato_Value");
  $(obj).val(valor);  
});

$.fn.cargarCargarPanelEstadistico = function(parametros)
{
  parametros.Filtros = parametros.Filtros || {};
  parametros.Prefijo = parametros.Prefijo || '';
  parametros.Sufijo = parametros.Sufijo || '';
  parametros.callbackFila = parametros.callbackFila || function(tds, val){return tds;};
  var obj = this;

  $(obj).find(".counter").remove();

  $.post('../server/php/proyecto/' + parametros.Script, parametros.Filtros, function(data, textStatus, xhr) 
  {
    var fechaDesde = '';
    var fechaHasta = '';

    if (parametros.Filtros.Desde != "")
    {
      fechaDesde = 'fechaCargue_Desde="' + parametros.Filtros.Desde + '"';
    }

    if (parametros.Filtros.Hasta != "")
    {
      fechaHasta = 'fechaCargue_Hasta="' + parametros.Filtros.Hasta + '"';
    }

    if (data != 0)
    {
      var tds = "";
      var porcentaje = 0;
      $.each(data.datos, function(index, val) 
      {
        porcentaje = (val.Cantidad / data.total * 100);
        tds += '<div class="counter counter-md text-left">';
                tds += '<div class="counter-number-group margin-bottom-10">';
                  tds += '<span class="counter-number">' + parametros.Prefijo + separadorMiles(val.Cantidad) + parametros.Sufijo + '</span>';
                tds += '</div>';
                tds += '<div class="counter-label">';
                  tds += '<div class="progress progress-xs margin-bottom-5">';
                    tds += '<div class="progress-bar progress-bar-info ' + parametros.Color + '" aria-valuenow="' + porcentaje + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + porcentaje + '%" role="progressbar">';
                      tds += '<span class="sr-only">' + porcentaje.toFixed(2) + '%</span>';
                    tds += '</div>';
                  tds += '</div>';
                tds += '</div>';
                tds += '<div class="counter-label text-uppercase margin-bottom-5"><a href="#" ' + parametros.Criterio + '="' + val.id + '" ' + fechaDesde + ' ' + fechaHasta + ' class="lnkOportunidades">' + val.Nombre + '</a></div>';
            tds += '</div>';

            tds = parametros.callbackFila(tds, val);
      });

      $(obj).append(tds);
    }
  }, 'json');
}


function separadorMiles(num)
{
  if(!isNaN(num)){
    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
    num = num.split('').reverse().join('').replace(/^[\.]/,'');
    return num;
  } 
  else{ 
    alert('Solo se permiten numeros');
    return false;
  }
}