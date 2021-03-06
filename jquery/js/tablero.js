var uboxes = 6; // Numero de boxes
var updateTime =4000; // Tiempo entre cada actualizacion de la lista de pacientes
var draggingPaciente = false;  // Usado para evitar actualizaciones mientras se hace un drag & drop
var cant_le_r=0;
var cant_le_t=0;
var cant_le_a=0;
var cant_le_o=0;
var cant_bl_r=0;
var cant_bl_t=0;
var cant_bl_a=0;
var cant_bl_o=0;
var cant_bo_r=0;
var cant_bo_t=0;
var cant_bo_a=0;
var cant_bo_o=0;

var lastUpdate = 0; // Usado en la emulacion del "paso del tiempo"

function validaRangos(datos,tipo) {
    datos.tipo=tipo;
    var resp;
    $.ajax({
    type: "POST",
    url: "Servicios/validaRangos.php",
    dataType: "json",
    data:datos,
    async:false,
    complete: function(data){
      resp=data.responseText;
     
    }
  });    
  return resp; 
}
function ver_VisLabExamen(run,nro_orden){
  
  $("#vwvislabexamen").remove();
  var tag = $("<div id='vwvislabexamen'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: "Servicios/getVisLabExamen.php?run="+run+"&nro_orden="+nro_orden,
    type: 'GET',
    error: "No se Encuentra Disponible",
    success: function(data, textStatus, jqXHR) {
        tag.html(data).dialog({modal: true, title: 'Visualizador de Examenes de Laboratorio',width:1000,resizable:false}).dialog('open');
      

    }
  });
}

function ver_VistaAdmision(url, options){
  options = options || {};
  $("#vwmod").remove();
  var tag = $("<div id='vwmod'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: url,
    type: (options.type || 'GET'),
    beforeSend: options.beforeSend,
    error: options.error,
    complete: options.complete,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal, title: data.title,width:1000,resizable:false}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal: options.modal, title: options.title,width:1000,resizable:false}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });
}
function Ocupacion_Fisica(id){
  if (confirm("Esta seguro que el paciente ha sido trasladado dentro de esta ubicacion")){
     $.ajax({
    type: "POST",
    url: "Servicios/setBoxEstado.php?id_atencion="+id+"&estado_box=of",
    dataType: "json",
    async:false,
    complete: function(data){
           	
       $('#vwficha').load('ficha.php?id_atencion='+id);  
    }
    });       
     
  }

}
function Liberacion_Fisica(id_atencion,options){
  options = options || {};
  $("#transfiereubicacion").remove();
  var tag = $("<div id='transfiereubicacion'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: 'Vistas/Transfiere_Ubicacion.php?id_atencion='+id_atencion,
    type: 'GET',
    async:false,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal,position:[200,100], title: 'Seleccione Sala',width:'25%',resizable:false}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal: options.modal,position:[200,100], title: 'Seleccione Sala',width:'25%',resizable:false}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });

}

function Recibe_Paciente(cod_u,cod_u_r){
  if ($('#det_pac_id_aten').html() == null){
     alert('No ha seleccionado paciente a recibir');
  }
  else{ 
     $.ajax({
    type: "POST",
    url: "Servicios/setResponsabilidad.php?id_atencion="+$('#det_pac_id_aten').html()+"&cod_u="+cod_u_r,
    dataType: "json",
    async:false,
    complete: function(data){
       alert('Paciente Transferido');      	
       $('#transfiere_resp').load('Vistas/Transfiere_Responsabilidad.php?cod_u='+cod_u);  
  }
});       
     
  }
}
function ver_detalle_paciente(id_atencion){
  $('#div_detalle_paciente').fadeOut('slow').load('Vistas/Detalle_Paciente.php?id_atencion='+id_atencion).fadeIn("slow");

}
function ver_solicitar_medicamento(id_atencion,options){
 
  options = options || {};
  $("#destinopaciente").remove();
  var tag = $("<div id='solicitudmedicamento'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: 'Vistas/Solicitud_MI.php?id_atencion='+id_atencion,
    type: 'GET',
    async:false,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal,position:[300,100], title: 'Solicitud de Medicamentos / Insumos',width:'50%',height:'300',resizable:false}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal: options.modal,position:[300,100], title: 'Solicitud de Medicamentos / Insumos',width:'50%',height:'300',resizable:false}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });
}
function ver_destino(id_atencion,options){
 
  options = options || {};
  $("#destinopaciente").remove();
  var tag = $("<div id='destinopaciente'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: 'Vistas/Destino_Paciente.php?id_atencion='+id_atencion,
    type: 'GET',
    async:false,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal,position:[200,100], title: 'Destino Paciente',width:'25%',resizable:false}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal: options.modal,position:[200,100], title: 'Destino Paciente',width:'25%',resizable:false}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });
}
function ver_clasificacion(id_atencion,options){
 
  options = options || {};
  $("#clasificaciontriage").remove();
  var tag = $("<div id='clasificaciontriage'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: 'Vistas/Clasificacion_Triage.php?id_atencion='+id_atencion,
    type: 'GET',
    async:false,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal,position:[200,100], title: 'Clasificacion Triage',width:'25%',resizable:false}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal: options.modal,position:[200,100], title: 'Clasificacion Triage',width:'25%',resizable:false}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });
}
function ver_transfiere_responsabilidad(cod_u,options){
  options = options || {};
  $("#transfiere_resp").remove();
  var tag = $("<div id='transfiere_resp'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: 'Vistas/Transfiere_Responsabilidad.php?cod_u='+cod_u,
    type: 'GET',
    async:false,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal,position:[100,10], title: 'Transferencia de Responsabilidad',width:'80%',resizable:false,close:function(){Resetea_Sesion_r();}}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal: options.modal,position:[100,10], title: 'Transferencia de Responsabilidad',width:'80%',resizable:false,close:function(){Resetea_Sesion_r();}}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });
}
function ver_resp_paciente(cod_u,nombre_u,options){
  options = options || {};
  $("#listado_resp").remove();
  var tag = $("<div id='listado_resp'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: 'Vistas/Responsabilidad.php?cod_u='+cod_u,
    type: 'GET',
    async:false,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal, title: 'Pacientes bajo Responsabilidad DR(a). '+nombre_u,width:400,resizable:false}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal: options.modal, title: 'Pacientes bajo Responsabilidad DR(a). '+nombre_u,width:400,resizable:false}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });
}
 	   
function onInit() {
	lastUpdate = new Date().getTime() / 1000;
	
	// Define un widget para representar un box
	
	$.widget( "custom.ubox", {
		// default options
		options: {
			id : '', // identificador del paciente
			paciente: '', // nombre del paciente
			triage: '',
			medico: '',
                        seccion_rf:'',
                        id_medico: '',
			acompanante: '',
			numero: 0, // numero del box
                        numero_rf: 0, // numero del box
                        tipo:0,
                        desc_tipo:'',
			// callbacks
			change: null   // Invocado cuando se modifica un box
		},
		// the constructor
		_create: function() {
			this.element
			// add a class for theming
			.addClass( "ubox" )
			// prevent double click to select text
			.disableSelection();
			this._refresh();
		},
		_refresh: function() {
                        /*var html = '<h2>'+this.options.desc_tipo+' ' + this.options.numero + '</h2>';
			html = html + 'Nombre Paciente: <br />' + this.options.paciente + '<br />';
			html = html + 'Triage: ' + this.options.triage + '<br />';
			html = html + 'M??dico: ' + this.options.medico + '<br />';
			html = html + 'Acompa??ante: ' + this.options.acompanante + '<br />';*/
                        var html = '<center><b>'+this.options.desc_tipo+' ' + this.options.numero_rf + '</b></center>';  
                        if((this.options.id_medico != null)&&(this.options.id_medico != '')){
                        html = html + '<center><img src="images/doctor_24.gif"></center>';
                            
                        }
                        else{
                        html = html + '<br><center>&nbsp;</center>';
                         
                        }   
			this.element.html(html);
		},
		// events bound via _on are removed automatically
		// revert other modifications here
		_destroy: function() {
		},
		_setOptions: function() {
                     // _super and _superApply handle keeping the right this-context

                        if(this.options.id != ''){
			if(this.options.id_medico == null){
                        this._superApply( arguments );
			this._refresh();
			if (this.options.change){ 
                           
			  
                            this.options.change(this.options);
                        }
                        }
                        else{
                          alert('Ya hay un medico asignado a esta atencion');
                        } 
                        }
                        else{
                           this._superApply( arguments );
			this._refresh();
			if (this.options.change){ 
                           
			  
                            this.options.change(this.options);
                        }
                        
                        }  
		}
	});
	
        
	
	// Configura los boxes para que sean droppables
	
	
	// Carga y despliega los medicos.
	loadMedicos();
	loadEnfermeras();
        loadAuxiliares();
	// Carga y despliega los pacientes
	loadPacientes();
         
       loadPacientesBoxes(); 
}
function loadPacientesBoxes() {
    $.ajax({
    type: "POST",
    url: "Servicios/getPacientesBoxes.php",
    dataType: "json",
    async:false,
    complete: function(data){
    var testData = JSON.parse(data.responseText);
     renderPacientesBoxes(testData);
    }
  });    
}
function loadPacientes() {
	// Aqui deberia ir la llamada Ajax que obtiene el JSON de pacientes y se lo pasa a renderPacientes
           $.ajax({
    type: "POST",
    url: "Servicios/getListaEspera.php",
    dataType: "json",
    async:false,
    complete: function(data){
    var testData = JSON.parse(data.responseText);
     renderPacientes(testData);
    }
});  
	
}

function loadMedicos() {
	// Aqui deberia ir la llamada Ajax que obtiene el JSON de medicos y se lo pasa a renderMedicos
    $.ajax({
    type: "POST",
    url: "Servicios/getMedicos.php",
    dataType: "json",
    async:false,
    complete: function(data){
    var testData = JSON.parse(data.responseText);
     renderMedicos(testData);
    }
});  
}

function loadEnfermeras() {
	// Aqui deberia ir la llamada Ajax que obtiene el JSON de medicos y se lo pasa a renderMedicos
    $.ajax({
    type: "POST",
    url: "Servicios/getEnfermeras.php",
    dataType: "json",
    async:false,
    complete: function(data){
    var testData = JSON.parse(data.responseText);
     renderEnfermeras(testData);
    }
});  
}
function loadAuxiliares() {
	// Aqui deberia ir la llamada Ajax que obtiene el JSON de medicos y se lo pasa a renderMedicos
    $.ajax({
    type: "POST",
    url: "Servicios/getAuxiliares.php",
    dataType: "json",
    async:false,
    complete: function(data){
    var testData = JSON.parse(data.responseText);
     renderAuxiliares(testData);
    }
});  
}


function renderPacientesBoxes(pacientes) {
	if (draggingPaciente) {
		setTimeout(loadPacientesBoxes, updateTime); // reintentar m??s tarde
		return;
	}
        cant_bl_r=0;
        cant_bl_t=0;
        cant_bl_a=0;
        cant_bl_o=0;
        cant_bo_r=0;
        cant_bo_t=0;
        cant_bo_a=0;
        cant_bo_o=0;
  
	var cant_r=0;
        var cant_t=0;
        var cant_a=0;
        var cant_o=0;
        
        for(var i=0; i<pacientes.length; i++) {
          var paciente = pacientes[i];  
          $("#seccion"+paciente.cod_seccion_rf).empty();
           
        }  
        var seccion_ant="\e"; 
        var cont_boxes;
        var br=1;    
        var st="";  
	for(var i=0; i<pacientes.length; i++) {
                var paciente = pacientes[i];
                var parent = $("#seccion"+paciente.cod_seccion_rf);
                
                if(paciente.id_atencion == null){ 
                var ubox = $('<div id="ubox' + paciente.cod_rf  +'" />').ubox({
			numero:paciente.cod_rf,numero_rf:paciente.numero,tipo:paciente.cod_tipo_rf,desc_tipo:paciente.desc_tipo_rf,id: '',paciente: '', triage: '',acompanante: '',id_medico: '',medico: '',seccion_rf:paciente.cod_seccion_rf,
			change: function(options) {
                                saveBox(options);
			}
		});
                if(paciente.cod_seccion_rf == 1)    
                  cant_bl_r++;
                else if(paciente.cod_seccion_rf == 2)
                  cant_bl_t++;
                else if(paciente.cod_seccion_rf == 3)
                  cant_bl_a++;
                else if(paciente.cod_seccion_rf == 4)
                  cant_bl_o++;
        
  
                parent.append(ubox);
                
                
                parent.append('&nbsp;&nbsp;&nbsp;');
                 
                $('#ubox'+paciente.cod_rf ).removeClass( "ubox_ol" );
                $('#ubox'+paciente.cod_rf ).removeClass( "ubox_of" );
                $('#ubox'+paciente.cod_rf ).addClass( "ubox" );
                }  
                else{
                 if(paciente.cod_seccion_rf == 1)    
                  cant_bo_r++;
                 else if(paciente.cod_seccion_rf == 2)
                  cant_bo_t++;
                 else if(paciente.cod_seccion_rf == 3)
                  cant_bo_a++;
                 else if(paciente.cod_seccion_rf == 4)
                  cant_bo_o++;
                 if(paciente.cod_seccion_rf == 1)
                   cant_r++;
                 else if (paciente.cod_seccion_rf == 2)
                   cant_t++;
                 else if (paciente.cod_seccion_rf == 3)
                   cant_a++;
                 else if (paciente.cod_seccion_rf == 4)
                   cant_o++;
                   
  var ubox = $('<div id="ubox' + paciente.cod_rf  + '" />').ubox({
			numero:paciente.cod_rf,numero_rf:paciente.numero,tipo:paciente.cod_tipo_rf,desc_tipo:paciente.desc_tipo_rf,id: paciente.id_atencion,paciente: paciente.nombre, acompanante:     paciente.nombre_acomp,id_medico: paciente.cod_u,medico: paciente.nombre_u,triage: paciente.triage,seccion_rf:paciente.cod_seccion_rf,
			change:function(options) {
                                saveBoxMed(options);
			}
		 });
                
                parent.append(ubox);
              
                
                
                parent.append('&nbsp;&nbsp;&nbsp;');
                 
               
                  
                 $('#ubox'+paciente.cod_rf ).removeClass( "ubox" );
                 $('#ubox'+paciente.cod_rf ).removeClass( "estado1" );
                 $('#ubox'+paciente.cod_rf ).removeClass( "estado2" );
                 $('#ubox'+paciente.cod_rf ).removeClass( "estado3" );
                 $('#ubox'+paciente.cod_rf ).removeClass( "estado4" );
                 $('#ubox'+paciente.cod_rf).addClass( "ubox_"+paciente.estado_box );
                 $('#ubox'+paciente.cod_rf).addClass(paciente.cls );
                  
                 $('#ubox'+paciente.cod_rf ).bind("dblclick",{msg: paciente.id_atencion}, (function (event) {
	showFicha('ficha.php?id_atencion='+event.data.msg, {modal:true,error: function() { alert('Could not load form') }});

}));

$('#ubox'+paciente.cod_rf  ).tooltip({
my: "center bottom-10",
at: "center top",items: "div",
content: function() {
var el = $( this );
var options=el.ubox("option");
 var contentdiv = '<center><h2>'+options.desc_tipo+' ' + options.numero_rf + '</h2></center>';
			contentdiv = contentdiv + 'Nombre Paciente: <br />' + options.paciente+ '<br />';
			contentdiv = contentdiv + 'Triage: ' + options.triage + '<br />';
			contentdiv = contentdiv + 'M??dico: ' + options.medico+ '<br />';
			contentdiv = contentdiv + 'Acompa??ante: ' + options.acompanante + '<br />';
return contentdiv;

}
});
//$('#ubox'+paciente.cod_rf  ).attr('title', title); 

            /*  $('#ubox'+paciente.cod_rf + paciente.cod_tipo_rf ).attr('title', title); 
$( '#ubox'+paciente.cod_rf + paciente.cod_tipo_rf ).tooltip({
position: {
my: "center bottom-20",
at: "center top",
using: function( position, feedback ) {
$( this ).css( position );
$( "<div>" )
.addClass( "arrow" )
.addClass( feedback.vertical )
.addClass( feedback.horizontal )
.appendTo( this );
}
}
});*/

                }
	}
$('#cant_r').html(' '+cant_r+' ');
$('#cant_t').html(' '+cant_t+' ');
$('#cant_a').html(' '+cant_a+' ');
$('#cant_o').html(' '+cant_o+' ');

	setupDroppableBoxes();
	// Volver a cargar los boxes m??s tarde
	setTimeout(loadPacientesBoxes, updateTime);
}
function renderPacientes(pacientes) {
	// No actualizar lista de pacientes si se est?? realizando un drag & drop
	if (draggingPaciente) {
		setTimeout(loadPacientes, updateTime); // reintentar m??s tarde
		return;
	}
	cant_le_r=0;
cant_le_t=0;
 cant_le_a=0;
 cant_le_o=0;
	var cant_e=0;
      var cant_p=0;
	// La lista de pacientes se despliega en el contenedor tblPacientes
	$('#tblPacientes').empty();
	for(var i=0; i<pacientes.length; i++) {
		var paciente = pacientes[i];
                 if((paciente.destino_ord !=null)&&(paciente.cod_rf ==null)){   
		  var container = $('<div class="paciente " id="paciente' + paciente.id + '"></div>');
                 }
                 else{
                   var container = $('<div  id="paciente' + paciente.id + '"></div>');
                   
                 } 
		var triage = paciente.triage;
		if (triage == '') triage = '&nbsp;';
		var row =
                        '<div id="paciente'+paciente.id +'"class="tablerow c1 '+ paciente.cls +'">' + paciente.id + '</div>' + 
                        '<div class="tablerow c2 '+ paciente.cls +'">' + paciente.triage + '</div>' +
			'<div class="tablerow c3 '+ paciente.cls +'">' + paciente.destino + '</div>' +
			'<div class="tablerow c4 '+ paciente.cls +'">' + paciente.nombre + '</div>' +
			'<div class="tablerow c5 '+ paciente.cls +'">' + paciente.rut + '</div>' +
			'<div class="tablerow c6 '+ paciente.cls +'">' + paciente.edad + '</div>' +
			'<div class="tablerow c7 '+ paciente.cls +'">' + paciente.ind_sexo + '</div>' +
			'<div class="tablerow c8 '+ paciente.cls +'">' + paciente.derivacion + '</div>' +
			'<div class="tablerow c9 '+ paciente.cls +'" id="tiempo' + paciente.id + '">' + formatTime(paciente.tpoespera) + '</div>' +
                        '<div class="tablerow c10 '+ paciente.cls +'">' + paciente.motivo + '</div>' +
		        '<div class="tablerow c11 '+ paciente.cls +'">' + paciente.estado + '</div>'+
                        '<div class="tablerow c12 '+ paciente.cls +'">' + paciente.ubicacion + '</div>' +
                        '<div class="tablerow c13 '+ paciente.cls +'">' + paciente.destino_ord + '</div>' +
                        '<div class="tablerow c14 '+ paciente.cls +'">' + paciente.prioridad + '</div>' +
                        '<div class="tablerow c15 '+ paciente.cls +'">' + paciente.acomp + '</div>' ;
                        
		if(paciente.destino_ord ==1)
                   cant_le_r++;
                else if (paciente.destino_ord ==2)
                   cant_le_t++;
                else if (paciente.destino_ord ==3)
                   cant_le_a++;
                else if (paciente.destino_ord ==4)
                   cant_le_o++;
                             
		container.html(row);
		$('#tblPacientes').append(container);
                $('#paciente'+paciente.id).bind("dblclick",{msg: paciente.id}, (function (event) {
	showFicha('ficha.php?id_atencion='+event.data.msg, {modal:true,error: function() { alert('Could not load form') }});

}));
                 if(paciente.cod_estado_atencion =="A"){ 
                 cant_e++;
                 }
                 else if(paciente.cod_estado_atencion =="P"){ 
                 cant_p++;
                 } 
	}
	
        $('#cant_e').html(' '+cant_e+' ');
        $('#cant_p').html(' '+cant_p+' ');
	// Configurar la lista de pacientes para que sea draggable
	setupDraggablePacientes();
	
	// Volver a cargar la lista m??s tarde
	setTimeout(loadPacientes, updateTime);
}

function renderMedicos(medicos) {
        if (draggingPaciente) {
		setTimeout(loadMedicos, updateTime); // reintentar m??s tarde
		return;
	}
	// La lista de medicos se despliega en el contenedor tblMedicos
	$('#tblMedicos').empty();
	for(var i=0; i<medicos.length; i++) {
		var medico = medicos[i];
                var row= '<div class="med1">'+medico.cod_u+'</div>' +'<div class="med2"><a href="#" onclick="ver_resp_paciente(\''+medico.cod_u+'\',\''+medico.nombre_u+'\',{modal:true,error: function() { alert(\'Could not load form\') }});">'+medico.nombre_u+'</a></div>'+'<div class="med3">['+medico.cod_rol+']</div>';
		var container = $('<div class="medico"></div>');
		container.html(row);
                
		$('#tblMedicos').append(container);
	}
	setTimeout(loadMedicos, updateTime);
	// Configurar la lista de medicos para que sea draggable
	setupDraggableMedicos();
}
function renderEnfermeras(enfermeras) {
         if (draggingPaciente) {
		setTimeout(loadEnfermeras, updateTime); // reintentar m??s tarde
		return;
	}
	// La lista de medicos se despliega en el contenedor tblMedicos
	$('#tblEnfermeras').empty();
	for(var i=0; i<enfermeras.length; i++) {
		var enfermera = enfermeras[i];
                var row= '<div class="enf1">'+enfermera.nombre_u+'</div>'+'<div class="enf2">['+enfermera.cod_rol+']</div>';
		var container = $('<div class="enfermera"></div>');
		container.html(row);
                
		$('#tblEnfermeras').append(container);
	}
	setTimeout(loadEnfermeras, updateTime);
	
}
function renderAuxiliares(auxiliares) {
          if (draggingPaciente) {
		setTimeout(loadAuxiliares, updateTime); // reintentar m??s tarde
		return;
	}
	// La lista de medicos se despliega en el contenedor tblMedicos
	$('#tblAuxiliares').empty();
	for(var i=0; i<auxiliares.length; i++) {
		var auxiliar = auxiliares[i];
                var row= '<div class="aux1">'+auxiliar.nombre_u+'</div>'+'<div class="aux2">['+auxiliar.cod_rol+']</div>';
		var container = $('<div class="auxiliar"></div>');
		container.html(row);
                
		$('#tblAuxiliares').append(container);
	}
	setTimeout(loadAuxiliares, updateTime);
	
}
function setupDraggablePacientes() {


	// Al hacer un drag de un paciente, desplegar su nombre con el estilo css div.paciente-draggable 
	$('div.paciente').draggable({ opacity: 0.7, 
		cursor: "move",
		cursorAt: { top: 0, left: 0 },
		helper: function( event ) {
			var nombre = $( this ).children(':first').next().next().next().html();
			return $( "<div class='paciente-draggable'>" + nombre + "</div>" );
		},
		// Esto es para saber cuando se est?? haciendo un drag.  Para no modificar interfaz en ese momento
		start: function() {draggingPaciente = true},
		stop: function()  {draggingPaciente = false}
		
	});	
}

function setupDraggableMedicos() {
	// Al hacer un drag de un medico, desplegar su nombre con el estilo css div.medico-draggable 
	$('div.medico').draggable({ opacity: 0.7, 
		cursor: "move",
		cursorAt: { top: 0, left: 0 },
		helper: function( event ) {
			var nombre = $( this ).children(':first').next().children().html();
			return $( "<div class='medico-draggable'>" + nombre + "</div>" );
		},
                start: function() {draggingPaciente = true},
		stop: function()  {draggingPaciente = false}
	});
}

function setupDroppableBoxes() {
	// Configurar los boxes para que al hacer drop distinga si est?? llegando un m??dico o un paciente
	// Al terminar el drop, obtiene los valores desde el draggable y los asigna al box
	
	$('div.ubox_of').droppable({
                
                hoverClass:"ui-state-hover",
                tolerance:"pointer",
		drop: function( event, ui ) {
                    // alert('Hola '+$( this ).attr('id'));
			var el = $( this );
                        var draggable = $(ui.draggable);
                        if (draggable.hasClass('medico')) {
                          var cod_u = draggable.children().eq(0).html();
                          var nombre_u = draggable.children().eq(1).children().html();
                          el.ubox( "option", {id_medico: cod_u,medico: nombre_u});
                       }
                       if (draggable.hasClass('paciente')) {
                          alert('Ya hay un paciente asignado.'); 
                       }
		}
	});
        $('div.ubox_ol').droppable({
                
                hoverClass:"ui-state-hover",
                tolerance:"pointer",
		drop: function( event, ui ) {
                    // alert('Hola '+$( this ).attr('id'));
			var el = $( this );
                        var draggable = $(ui.draggable);
                        if (draggable.hasClass('medico')) {
                          var cod_u = draggable.children().eq(0).html();
                          var nombre_u = draggable.children().eq(1).children().html();
                          el.ubox( "option", {id_medico: cod_u,medico: nombre_u});
                       }
                       if (draggable.hasClass('paciente')) {
                          alert('Ya hay un paciente asignado.'); 
                       }     
		}
	});
        $('div.ubox').droppable({
                hoverClass:"ui-state-hover",
                tolerance:"pointer",
		drop: function( event, ui ) {
			var el = $( this );
                        var draggable = $(ui.draggable);
			if (draggable.hasClass('paciente')) {
                              var options=el.ubox("option");
                              var asignar=1; 
                              var no_confirm=0;
                              var id = draggable.children().eq(0).html();
				var nombre = draggable.children().eq(1).html();
				var acom = draggable.children().eq(14).html();
				var triage = draggable.children().eq(4).html();
                                var destino = draggable.children().eq(12).html();
                                var prioridad = draggable.children().eq(13).html();
                                if((options.seccion_rf == 1)&&(options.seccion_rf != destino)&&(cant_bl_r <=cant_le_r)&&(asignar==1)){
                                   if(confirm("Hay "+cant_le_r+" paciente(s) en la lista de espera de la seccion escogida, la cual posee "+cant_bl_r+" recurso(s) disponible(s)  y este paciente esta destinado a otra seccion. A pesar de lo indicado,??Desea continuar la accion?")){
                                   asignar=1; 
                                   no_confirm=1; 
                                   }
                                   else{
                                    asignar=0;
                                   }
                                }
                                if((options.seccion_rf == 2)&&(options.seccion_rf != destino)&&(cant_bl_t <=cant_le_t)&&(asignar==1)){
                                   if(confirm("Hay "+cant_le_t+" paciente(s) en la lista de espera de la seccion escogida, la cual posee "+cant_bl_t+" recurso(s) disponible(s)  y este paciente esta destinado a otra seccion. A pesar de lo indicado,??Desea continuar la accion?")){
                                   asignar=1; 
                                   no_confirm=1; 
                                   }
                                   else{
                                    asignar=0;
                                   }
                                } 
                                if((options.seccion_rf == 3)&&(options.seccion_rf != destino)&&(cant_bl_a <=cant_le_a)&&(asignar==1)){
                                   if(confirm("Hay "+cant_le_a+" paciente(s) en la lista de espera de la seccion escogida, la cual posee "+cant_bl_a+" recurso(s) disponible(s)  y este paciente esta destinado a otra seccion. A pesar de lo indicado,??Desea continuar la accion?")){
                                   asignar=1; 
                                   no_confirm=1;
                                   }
                                   else{
                                    asignar=0;
                                   }
                                } 
                                if((options.seccion_rf == 4)&&(options.seccion_rf != destino)&&(cant_bl_o <=cant_le_o)&&(asignar==1)){
                                   if(confirm("Hay "+cant_le_o+" paciente(s) en la lista de espera de la seccion escogida, la cual posee "+cant_bl_o+" recurso(s) disponible(s)  y este paciente esta destinado a otra seccion. A pesar de lo indicado,??Desea continuar la accion?")){
                                   asignar=1;
                                   no_confirm=1;  
                                   }
                                   else{
                                    asignar=0;
                                   }
                                }
                                if ((prioridad != 1)&&(asignar==1)){
                                   if(confirm("El paciente no es la primera prioridad en la lista de espera de esta seccion. A pesar de lo indicado,??Desea continuar la accion?")){
                                   asignar=1; 
                                   }
                                   else{
                                    asignar=0;
                                   } 
                                }
                                if ((options.seccion_rf != destino)&&(asignar==1)&&(no_confirm==0)){
                                   if(confirm("La seccion de destino del paciente no corresponde con la seccion escogida. A pesar de lo indicado,??Desea continuar la accion?")){
                                   asignar=1; 
                                   }
                                   else{
                                    asignar=0;
                                   } 
                                } 
                                   
				if(asignar == 1){
                                el.removeClass( "ubox" );
                                el.addClass( "ubox_ol" );
                                el.ubox("option", {id: id,paciente: nombre, acompanante: acom, triage: triage});
                                }  
			}
		}
	});  
}

function saveBox(options) {

	         $.ajax({
    type: "POST",
    url: "Servicios/setBox.php?id_atencion="+options.id+"&cod_rf="+options.numero+"&estado_box=of",
    dataType: "json",
    async:false,
    complete: function(data){
resp = JSON.parse(data.responseText);
    if (resp.estado ==0){
     alert(resp.error);
    }
    else{   
      alert(options.desc_tipo +" " + options.numero_rf + " actualizado\n" );
    }
    // loadPacientesBoxes();	
    }
}); 
	
}
function saveBoxMed(options) {

	// Aqui va la llamada Ajax que guarda el estado actual del box
		$.ajax({
    type: "POST",
    url: "Servicios/setResponsabilidad.php?id_atencion="+options.id+"&cod_u="+options.id_medico,
    dataType: "json",
    async:false,
    complete: function(data){
    
alert(options.desc_tipo +" " + options.numero_rf + " actualizado con los datos del medico\n" );
     //loadPacientes();
     //loadPacientesBoxes();
      	
    }
});       
	
}
function formatTime(sec_numb) {
    // Esto puede ir en una biblioteca compartida
    var days    = Math.floor(sec_numb / 86400);
    var hours   = Math.floor((sec_numb - (days * 86400)) / 3600);
    var minutes = Math.floor((sec_numb - (days * 86400) - (hours * 3600)) / 60);
    var seconds = sec_numb - (days * 86400) - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time="";
    if(days >0) time=time+days+':';
    if(hours >0) time=time+hours+':';
    if(minutes >0) time=time+minutes; else time=time+'0';
   // if(seconds >0) time=time+seconds+'';
    
    return time;
}


$(document).ready(onInit);
