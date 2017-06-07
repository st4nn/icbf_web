function funRepPredefinidos() {
    $("#txtReportesPredefinidos_Desde, #txtReportesPredefinidos_Hasta").datepicker({
        clearBtn: true,
        language: "es",
        orientation: "top auto",
        daysOfWeekHighlighted: "0",
        autoclose: true,
        todayHighlight: true
    });

    $("#txtReportesPredefinidos_Desde").val(obtenerFecha().substr(0, 8) + '01');

    $("#txtReportesPredefinidos_Hasta").val(obtenerFecha().substr(0, 10));


    $('#cntReportesPredefinidos_Opciones').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });

    $("#cntReportesPredefinidos_Opciones a").on("click", function(evento) {
        evento.preventDefault();
        var idObj = $(this).attr("href");
        $(".cntReportesPredefinidos_Tab").hide();
        $(idObj).slideDown();
    });

    $("#btnRepPredefinidos_Sabana_Actualizar").on("click", function(evento) {
        evento.preventDefault();

        $.post('../server/php/proyecto/reportes_Pred_CargarSabana.php', { Usuario: Usuario.id, Desde: $("#txtReportesPredefinidos_Desde").val(), Hasta: $("#txtReportesPredefinidos_Hasta").val() }, function(data, textStatus, xhr) {
            if (data == 0) {
                Mensaje("Error", "No hay datos en la Tabla", "danger");
            } else {
                if (typeof(data) == "object") {
                    var tds = "";

                    $.each(data, function(index, val) {
                        tds += '<tr>';
                        tds += '<td></td>';
                        tds += '<td>' + val.idNna + '</td>';
                        tds += '<td>' + val.m_SIM + '</td>';
                        tds += '<td>' + val.Regional + '</td>';
                        tds += '<td>' + val.CentroZonal + '</td>';
                        tds += '<td>' + val.Operador + '</td>';
                        tds += '<td>' + val.Madres + '</td>';
                        tds += '<td>' + val.Cantidad + '</td>';
                        tds += '<td>' + val.m_Apellido1 + '</td>';
                        tds += '<td>' + val.m_Apellido2 + '</td>';
                        tds += '<td>' + val.m_Nombre1 + '</td>';
                        tds += '<td>' + val.m_Nombre2 + '</td>';
                        tds += '<td>' + val.m_FechaNacimiento + '</td>';
                        tds += '<td>' + val.m_Genero + '</td>';
                        tds += '<td>' + val.m_Edad + '</td>';
                        tds += '<td>' + val.m_TipoIdentificacion + '</td>';
                        tds += '<td>' + val.m_Identificacion + '</td>';
                        tds += '<td>' + val.m_GrupoEtnico + '</td>';
                        tds += '<td>' + val.m_GrupoEtnicoCual + '</td>';
                        tds += '<td>' + val.m_FechaApertura + '</td>';
                        tds += '<td>' + val.m_NumeroResolucionApertura + '</td>';
                        tds += '<td>' + val.m_FechaResolucion + '</td>';
                        tds += '<td>' + val.m_FechaResolucionDePerdida + '</td>';
                        tds += '<td>' + val.m_NumeroResolucionDePerdida + '</td>';
                        tds += '<td>' + val.m_FechaIngreso + '</td>';
                        tds += '<td>' + val.m_NivelAcademico + '</td>';
                        tds += '<td>' + val.m_UltimoSemestreAprobado + '</td>';
                        tds += '<td>' + val.m_Municipio + '</td>';
                        tds += '<td>' + val.Direccion + '</td>';
                        tds += '<td>' + val.Barrio + '</td>';
                        tds += '<td>' + val.Urbano + '</td>';
                        tds += '<td>' + val.Celular1 + '</td>';
                        tds += '<td>' + val.Celular2 + '</td>';
                        tds += '<td>' + val.Telefono1 + '</td>';
                        tds += '<td>' + val.Telefono2 + '</td>';
                        tds += '<td>' + val.Correo + '</td>';
                        tds += '<td>' + val.m_AfiliadaFondoPension + '</td>';
                        tds += '<td>' + val.m_NombreFondoPension + '</td>';
                        tds += '<td>' + val.m_ActivoFondoPension + '</td>';
                        tds += '<td>' + val.m_BeneficiarioPension + '</td>';
                        tds += '<td>' + val.m_AfiliadoSalud + '</td>';
                        tds += '<td>' + val.m_TipoAfiliacionSalud + '</td>';
                        tds += '<td>' + val.m_NombreEPS + '</td>';
                        tds += '<td>' + val.m_NombreEPSDeseada + '</td>';
                        tds += '<td>' + val.m_RegimenEspecial + '</td>';
                        tds += '<td>' + val.m_Discapacidad + '</td>';
                        tds += '<td>' + val.m_EnfermedadCronica + '</td>';
                        tds += '<td>' + val.m_TipoDiagnostico + '</td>';
                        tds += '<td>' + val.m_AfiliacionCajaCompensacionFamiliar + '</td>';
                        tds += '<td>' + val.m_TipoVivienda + '</td>';
                        tds += '<td>' + val.m_CalculoActuarial + '</td>';
                        tds += '<td>' + val.m_NumeroBeneficiarios + '</td>';
                        tds += '<td>' + val.m_CarnetManipulacionAlimentos + '</td>';
                        tds += '<td>' + val.m_CursoPrimerosAuxilios + '</td>';
                        tds += '<td>' + val.m_Banco + '</td>';
                        tds += '<td>' + val.m_NoCuenta + '</td>';
                        tds += '<td>' + val.n_Apellido1 + '</td>';
                        tds += '<td>' + val.n_Apellido2 + '</td>';
                        tds += '<td>' + val.n_Nombre1 + '</td>';
                        tds += '<td>' + val.n_Nombre2 + '</td>';
                        tds += '<td>' + val.n_Genero + '</td>';
                        tds += '<td>' + val.n_TipoDocumento + '</td>';
                        tds += '<td>' + val.n_Identificacion + '</td>';
                        tds += '<td>' + val.n_Edad + '</td>';
                        tds += '<td>' + val.n_FechaNacimiento + '</td>';
                        tds += '<td>' + val.n_SIM + '</td>';
                        tds += '<td>' + val.n_Discapacidad + '</td>';
                        tds += '<td>' + val.n_Diagnostico + '</td>';
                        tds += '<td>' + val.n_FechaIngreso + '</td>';
                        tds += '<td>' + val.n_FechaEgreso + '</td>';
                        tds += '<td>' + val.n_CentroZonal + '</td>';
                        tds += '<td>' + val.n_Salio + '</td>';
                        tds += '<td>' + val.n_PARD + '</td>';
                        tds += '<td>' + val.n_DefensorDeFamilia + '</td>';
                        tds += '<td>' + val.n_idCentroZonal + '</td>';
                        tds += '<td>' + val.n_DeclaradoAdoptabilidad + '</td>';
                        tds += '<td>' + val.n_Desplazado + '</td>';
                        tds += '<td>' + val.n_AutoridadAdministrativa + '</td>';
                        tds += '<td>' + val.n_Observaciones + '</td>';
                        tds += '<td></td>';
                        tds += '</tr>';
                    });

                    $("#tblRepPredefinidos_Sabana").crearDataTable(tds, function() {});
                } else {
                    Mensaje("Error", data, "danger");
                }
            }
        }, "json");
    });

    $("#btnRepPredefinidos_Ingresos_Actualizar").on("click", function(evento) {
        evento.preventDefault();

        $.post('../server/php/proyecto/reportes_Pred_CargarIngresos.php', { Usuario: Usuario.id, Desde: $("#txtReportesPredefinidos_Desde").val(), Hasta: $("#txtReportesPredefinidos_Hasta").val() }, function(data, textStatus, xhr) {
            if (data == 0) {
                Mensaje("Error", "No hay datos en la Tabla", "danger");
            } else {
                if (typeof(data) == "object") {
                    var tds = "";

                    $.each(data, function(index, val) {
                        tds += '<tr>';
                        tds += '<td></td>';
                        tds += '<td>' + val.Tipo + '</td>';
                        tds += '<td>' + val.CentroZonal + '</td>';
                        tds += '<td>' + val.FechaSolicitud + '</td>';
                        tds += '<td>' + val.FechaTramite + '</td>';
                        tds += '<td>' + val.Madre + '</td>';
                        tds += '<td>' + val.NNA + '</td>';
                        tds += '<td>' + val.Edad + ' Años</td>';
                        tds += '<td>' + val.SIM + '</td>';
                        tds += '<td>' + val.DefensorDeFamilia + '</td>';
                        tds += '<td>' + val.SolicitadoPor + '</td>';
                        tds += '<td>' + val.ActaUbicacion + '</td>';
                        tds += '<td>' + val.Sede + '</td>';
                        tds += '<td></td>';
                        tds += '</tr>';
                    });

                    $("#tblRepPredefinidos_Ingresos").crearDataTable(tds, function() {});
                } else {
                    Mensaje("Error", data, "danger");
                }
            }
        }, "json");
    });

    $("#btnRepPredefinidos_Vulneracion_Actualizar").on("click", function(evento) {
        evento.preventDefault();

        $.post('../server/php/proyecto/reportes_Pred_CargarVulneracion.php', { Usuario: Usuario.id, Desde: $("#txtReportesPredefinidos_Desde").val(), Hasta: $("#txtReportesPredefinidos_Hasta").val() }, function(data, textStatus, xhr) {
            if (data == 0) {
                Mensaje("Error", "No hay datos en la Tabla", "danger");
            } else {
                if (typeof(data) == "object") {
                    var tds = "";

                    $.each(data, function(index, val) {
                        tds += '<tr>';
                        tds += '<td></td>';
                        tds += '<td>' + val.CentroZonal + '</td>';
                        tds += '<td>' + val.nna_Ubicados + '</td>';
                        tds += '<td>' + val.m_Vulneracion + '</td>';
                        tds += '<td>' + val.m_Mixtos + '</td>';
                        tds += '<td>0</td>';
                        tds += '<td>' + val.n_AcuIngresos + '</td>';
                        tds += '<td>0</td>';
                        tds += '<td>' + val.n_AcuEgresos + '</td>';
                        tds += '<td>' + val.Sede + '</td>';
                        tds += '<td></td>';
                        tds += '</tr>';
                    });

                    $("#tblRepPredefinidos_Vulneracion").crearDataTable(tds, function() {});
                } else {
                    Mensaje("Error", data, "danger");
                }
            }
        }, "json");
    });

    $("#btnRepPredefinidos_Discapacidad_Actualizar").on("click", function(evento) {
        evento.preventDefault();

        $.post('../server/php/proyecto/reportes_Pred_CargarDiscapacidad.php', { Usuario: Usuario.id, Desde: $("#txtReportesPredefinidos_Desde").val(), Hasta: $("#txtReportesPredefinidos_Hasta").val() }, function(data, textStatus, xhr) {
            if (data == 0) {
                Mensaje("Error", "No hay datos en la Tabla", "danger");
            } else {
                if (typeof(data) == "object") {
                    var tds = "";

                    $.each(data, function(index, val) {
                        tds += '<tr>';
                        tds += '<td></td>';
                        tds += '<td>' + val.CentroZonal + '</td>';
                        tds += '<td>' + val.nna_Ubicados + '</td>';
                        tds += '<td>' + val.m_Discapacidad + '</td>';
                        tds += '<td>' + val.m_Mixtos + '</td>';
                        tds += '<td>0</td>';
                        tds += '<td>' + val.n_AcuIngresos + '</td>';
                        tds += '<td>0</td>';
                        tds += '<td>' + val.n_AcuEgresos + '</td>';
                        tds += '<td>' + val.Sede + '</td>';
                        tds += '<td></td>';
                        tds += '</tr>';
                    });

                    $("#tblRepPredefinidos_Discapacidad").crearDataTable(tds, function() {});
                } else {
                    Mensaje("Error", data, "danger");
                }
            }
        }, "json");
    });

    $("#btnRepPredefinidos_Resumen_Actualizar").on("click", function(evento) {
        evento.preventDefault();

        $.post('../server/php/proyecto/reportes_Pred_CargarResumen.php', { Usuario: Usuario.id, Desde: $("#txtReportesPredefinidos_Desde").val(), Hasta: $("#txtReportesPredefinidos_Hasta").val(), Sede: $("#txtReportesPredefinidos_Sede").val(), Agrupacion : $("#txtReportesPredefinidos_Agrupacion").val()}, function(data, textStatus, xhr) {
            if (data == 0) {
                Mensaje("Error", "No hay datos en la Tabla", "danger");
            } else {
                if (typeof(data) == "object") {
                    if (repResumen_Mapa == null) {
                        $("#cntReportes_Resumen_Mapa").iniciarMapa({
                            fClick: function(ev) {
                                //responsableMarker.setPosition({lat : ev.latLng.lat(), lng : ev.latLng.lng()});
                            }
                        }, function(mapa) {
                            repResumen_Mapa = mapa;
                            repResumen_Marker = repResumen_Mapa.addMarker({
                                lat: 4.686804,
                                lng: -74.083867,
                                icon: '../assets/images/icons/marker16px.png'
                            });
                            repotes_cargarTablaResumen(data);
                        });
                    } else {
                        repotes_cargarTablaResumen(data);
                    }



                } else {
                    Mensaje("Error", data, "danger");
                }
            }
        }, "json");
    });
}

var repResumen_Mapa = null;
var repResumen_Marker = null;

function repotes_cargarTablaResumen(data) {
    var tds = "";
    var idLocalidad = 0;
    var tmpCoordenada;

    $.each(data, function(index, val) {
        if (index != 'Agrupado') {
            if (idLocalidad != val.Localidad) {
                idLocalidad = val.Localidad;
                tmpCoordenada = val.Coordenadas.split(',');
                if (tmpCoordenada[1] != undefined) {
                    repResumen_Marker = repResumen_Mapa.addMarker({
                        lat: tmpCoordenada[0],
                        lng: tmpCoordenada[1],
                        icon: '../assets/images/icons/marker16px.png'
                    });
                }
            }
            tds += '<tr>';
            tds += '<td></td>';
            tds += '<td>' + val.Municipio + '</td>';
            tds += '<td>' + val.munTiempo + '</td>';
            tds += '<td>' + val.NNA_Vulneracion + '</td>';
            tds += '<td>' + val.NNA_Discapacidad + '</td>';
            tds += '<td>' + val.NNA_SinInfo + '</td>';
            tds += '<td>' + (parseInt(val.NNA_Vulneracion) + parseInt(val.NNA_Discapacidad) + parseInt(val.NNA_SinInfo)) + '</td>';
            tds += '<td>' + val.Madres + '</td>';

            if (data.Agrupado[val.Localidad] == undefined) {
                tds += '<td>0</td>';
                tds += '<td>0</td>';
                tds += '<td>0</td>';
                tds += '<td>0</td>';
                tds += '<td>0</td>';
                tds += '<td>0</td>';
                tds += '<td>0</td>';
                tds += '<td>0</td>';
                tds += '<td>0</td>';
                tds += '<td>0</td>';
                tds += '<td>0</td>';
                tds += '<td>0</td>';
            } else {
                for (var i = 1; i <= 11; i++) {
                    if (data.Agrupado[val.Localidad][i] == undefined) {
                        tds += '<td>0</td>';
                    } else {
                        tds += '<td>' + data.Agrupado[val.Localidad][i] + '</td>';
                    }
                }
            }

            tds += '<td></td>';
            tds += '</tr>';
        }
    });

    $("#tblRepPredefinidos_Resumen").crearDataTable(tds, function() {});

    repResumen_Mapa.setZoom(8);
}
