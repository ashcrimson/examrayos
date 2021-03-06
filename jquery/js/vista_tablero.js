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
			numero:paciente.cod_rf,numero_rf:paciente.numero,tipo:paciente.cod_tipo_rf,desc_tipo:paciente.desc_tipo_rf,id: '',paciente: '', triage: '',acompanante: '',id_medico: '',medico: '',seccion_rf:paciente.cod_seccion_rf
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
			numero:paciente.cod_rf,numero_rf:paciente.numero,tipo:paciente.cod_tipo_rf,desc_tipo:paciente.desc_tipo_rf,id: paciente.id_atencion,paciente: paciente.nombre, acompanante:     paciente.nombre_acomp,id_medico: paciente.cod_u,medico: paciente.nombre_u,triage: paciente.triage,seccion_rf:paciente.cod_seccion_rf
		 });
                
                parent.append(ubox);
              
                
                
                parent.append('&nbsp;&nbsp;&nbsp;');
                 
               
                  $('#ubox'+paciente.cod_rf ).removeClass( "estado1" );
                 $('#ubox'+paciente.cod_rf ).removeClass( "estado2" );
                 $('#ubox'+paciente.cod_rf ).removeClass( "estado3" );
                 $('#ubox'+paciente.cod_rf ).removeClass( "estado4" ); 
                 $('#ubox'+paciente.cod_rf ).removeClass( "ubox" );
                 $('#ubox'+paciente.cod_rf).addClass( "ubox_"+paciente.estado_box );
                $('#ubox'+paciente.cod_rf).addClass(paciente.cls );


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


                }
	}
$('#cant_r').html(' '+cant_r+' ');
$('#cant_t').html(' '+cant_t+' ');
$('#cant_a').html(' '+cant_a+' ');
$('#cant_o').html(' '+cant_o+' ');

	
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
               
                   var container = $('<div  id="paciente' + paciente.id + '"></div>');
                   
               
		var triage = paciente.triage;
		if (triage == '') triage = '&nbsp;';
		var row =
                        '<div id="paciente'+paciente.id +'"class="tablerow c1  '+ paciente.cls +'">' + paciente.id + '</div>' + 
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
          
                 if(paciente.cod_estado_atencion =="A"){ 
                 cant_e++;
                 }
                 else if(paciente.cod_estado_atencion =="P"){ 
                 cant_p++;
                 } 
	}
	
        $('#cant_e').html(' '+cant_e+' ');
        $('#cant_p').html(' '+cant_p+' ');
	
	
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
                var row= '<div class="med1">'+medico.cod_u+'</div>' +'<div class="med2">'+medico.nombre_u+'</div>'+'<div class="med3">['+medico.cod_rol+']</div>';
		var container = $('<div class="medico"></div>');
		container.html(row);
                
		$('#tblMedicos').append(container);
	}
	setTimeout(loadMedicos, updateTime);
	
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
