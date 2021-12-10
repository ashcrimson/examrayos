function getRutDv(T){var M=0,S=1;for(;T;T=Math.floor(T/10))

	S=(S+T%10*(9-M++%6))%11;return S?S-1:'K';}
function Traspasa_Tabla(JSONData, ReportTitle, ShowLabel,headers,excludeColumns,
    fileName) {
    //alert(JSONData);
var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

var html = '';    
if (ShowLabel) {
    var row = "";

    if(headers)
    {
        row = headers.join('</th><th>') ;
    }
    else
    {
        for (var index in arrData[0]) {
		 
		  if(excludeColumns && excludeColumns.indexOf(index) != -1)
            continue;
            row += index + '</th><th>';
            //alert(arrData[0][index]);
        }
    }
    html += "<tr><th>"+row +"</th></tr>";;
}
for (var i = 0; i < arrData.length; i++) {
    var row = "";

    for (var colName in arrData[i]) {
	    if(excludeColumns && excludeColumns.indexOf(colName) != -1)
            continue;
        row += '<td>' + arrData[i][colName] + '</td>';
    }
    html += '<tr>' +row + '</tr>';
}

if (html == '') {        
    alert("Datos Invalidos");
    return;
}
$('#exl_exp').empty();
$('#exl_exp').html(html);
var dl=null;
var type='xlsx';
var fn=fileName;

var elt = document.getElementById('exl_exp');
   var wb = XLSX.utils.table_to_book(elt, {sheet:"Sheet JS"});
   return dl ?
      XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
      XLSX.writeFile(wb, fn || ('Export.' + (type || 'xlsx')));
}	
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headers,excludeColumns,
    fileName) {
//If JSONData is not an object then JSON.parse will parse the JSON string in an Object

var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

var CSV = '';    
//Set Report title in first row or line

//CSV += ReportTitle + '\r\n\n';

//This condition will generate the Label/Header
if (ShowLabel) {
    var row = "";

    if(headers)
    {
        row = headers.join(',');
    }
    else
    {
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
		 
		  if(excludeColumns && !excludeColumns.indexOf(index))
            continue;
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
    }
    row = row.slice(0, -1);     

    //append Label row with line break
    CSV += row + '\r\n';
}
//1st loop is to extract each row
for (var i = 0; i < arrData.length; i++) {
    var row = "";

    //2nd loop will extract each column and convert it in string comma-seprated
    for (var colName in arrData[i]) {
	    if(excludeColumns && !excludeColumns.indexOf(colName))
            continue;
        row += '"' + arrData[i][colName] + '",';
    }
    row.slice(0, row.length - 1);

    //add a line break after each row
    CSV += row + '\r\n';
}

if (CSV == '') {        
    alert("Invalid data");
    return;
}   

if(!fileName)
{
    //Generate a file name
     fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
}

if (navigator.appName == "Microsoft Internet Explorer") {    
    var oWin = window.open();
    oWin.document.write('sep=,\r\n' + CSV);
    oWin.document.close();
    oWin.document.execCommand('SaveAs', true, fileName + ".csv");
    oWin.close();
  }  
else
{

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
 }
   }
function isInteger (n) {

	//return n===+n && n===(n|0);

	

	var er = /^[0-9]+$/;

	return ( er.test(n) ) ? true : false;

}
function valida_buscar(f){
	 
   if(f.run.value ==""){
    alert('El rut a buscar no puede ser nulo'); 
    return false;
   }
   if(!isInteger(f.run.value)){
    alert('El rut a buscar debe ser un numero'); 
    return false;
   }

   if(f.dv_run.value ==""){
    alert('El digito verificador del run a buscar no puede ser nulo'); 
    return false;
   } 
   if ( getRutDv(f.run.value) != f.dv_run.value.toUpperCase()){
      alert('El run es incorrecto'); 
      return false;
   }
   return true;
}


function onInit() {

	if($('#conectado').attr("value") =="S"){

         
	}else{
          function showResponseLogin(responseText, statusText, xhr, $form)  { 
                resp = JSON.parse(responseText);
                if (resp.estado==1){
                  window.location="index.php";
                }  
                else{ 
                  alert(resp.mensaje);
                } 
            }  
	    var optionslogin = { 
                success:       showResponseLogin
            };   
            $('#form_login').ajaxForm(optionslogin);
	    var loginDialog = $("#form_login");
	    $(loginDialog).dialog({
	        title: 'RAM',
	        autoOpen: true,    
                dialogbeforeclose: false,  
	        closeOnEscape: false,
	        draggable: false,
	        width: 350,
	        
                minHeight: 50,
	        modal: true,
	        resizable: false,
	        open: function(event, ui) {
	            // scrollbar fix for IE
	            $('body').css('overflow','hidden');
                    $(".ui-dialog-titlebar-close").hide(); 
	        },
	        close: function() {
	            // reset overflow
	            $('body').css('overflow','auto');
	        }
	    }); // end of dialog

	

        }
}
function printinterconsulta(listId) {
        var selected = jQuery(listId).jqGrid('getGridParam','selrow');
	if (selected == null) alert('Debe seleccionar una fila.');
        if (selected != null){
	var nro_interconsulta = jQuery(listId).jqGrid('getCell',selected,'nro_interconsulta');
	var cod_estado = jQuery(listId).jqGrid('getCell',selected,'estado');
         //if(cod_estado=='R') {
          document.form_pdf.nro_interconsulta.value=nro_interconsulta;
          document.form_pdf.submit();
		 /*}
		 else{
			
            alert('No se puede imprimir porque esta Interconsulta no esta realizada'); 
			
		 }*/
        }
}
function actestado(listId,estado) {
    
    var selected = jQuery(listId).jqGrid('getGridParam','selrow');
    if (selected == null) alert('Debe seleccionar una fila.');
    if (selected != null){
        var nro_interconsulta = jQuery(listId).jqGrid('getCell',selected,'nro_interconsulta');
        var cod_estado = jQuery(listId).jqGrid('getCell',selected,'estado');
        var medico = jQuery(listId).jqGrid('getCell',selected,'usr_d');
        var cod_servicio_origen = jQuery(listId).jqGrid('getCell',selected,'cod_servicio_origen');
        var cod_servicio_destino = jQuery(listId).jqGrid('getCell',selected,'cod_servicio_destino');
        
        if(estado=='A'){
          if((cod_estado=='S')&&((($('#tipo_usuario').val()=="1")&&($('#jefe_servicio').val()=="1")&&($('#cod_servicio').val()==cod_servicio_destino))||(($('#tipo_usuario').val()=="2")&&($('#cod_servicio').val()==cod_servicio_destino))||(($('#tipo_usuario').val()=="2")&&($('#cod_servicio').val()==cod_servicio_origen))))
           asignar_interconsulta(nro_interconsulta,"");
          else
            alert('Ya no se puede asignar'); 
        }
        else if(estado=='RA'){
          if((cod_estado=='A')&&((($('#tipo_usuario').val()=="1")&&($('#jefe_servicio').val()=="1")&&($('#cod_servicio').val()==cod_servicio_destino))||(($('#tipo_usuario').val()=="2")&&($('#cod_servicio').val()==cod_servicio_destino))||(($('#tipo_usuario').val()=="2")&&($('#cod_servicio').val()==cod_servicio_origen))))
           reasignar_interconsulta(nro_interconsulta,"");
          else
            alert('Debe Estar Asignada para poder Reasignar'); 
        }
       else if(estado=='R'){
         if((cod_estado=='A')||(cod_estado=='RA')&&($('#usuario').val()==medico))
            ver_interconsulta(nro_interconsulta,"");
          else
            alert('No se puede realizar interconsulta');  
        }
//-----------
 
 else if(estado=='E'){
          if((cod_estado=='S')||(cod_estado=='R')||(cod_estado=='A')||(cod_estado=='RA')&&($('#tipo_usuario').val()=="1")&&($('#jefe_servicio').val()=="1"))
           ver_examenes(nro_interconsulta,"");
          else
            alert('no hay examenes'); 
        }


//-----------


    }
}

function act_interconsulta(nro_interconsulta,estado){
$.post("Servicios/setActEstadoInterconsulta.php", {
  'nro_interconsulta' : nro_interconsulta ,'estado' : estado},
  function(data) {

   if(data=='1'){
     alert('Interconsulta Actualizada');
     jQuery("#list-interconsultas").jqGrid('setGridParam',{datatype:'json'}).trigger('reloadGrid');


   }
   else{
     alert("Problema al Actualizar");
   }
     

  }, "json");

}
function asignar_interconsulta(nro_interconsulta,options){
  
  var titulo="Asignacion de Interconsulta";
  options = options || {};
  $("#vwasigint").remove();
  var tag = $("<div id='vwasigint'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: 'Vistas/Asignar.php?nro_interconsulta='+nro_interconsulta,
    type: 'GET',
    async:false,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal,position:[200,100], title: titulo,width:'50%',height:'200',resizable:false,close: function(event, ui) {  $("#vwasigint").remove(); }}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal:true,position:[100,50], title: titulo,width:'50%',height:'200',resizable:false,close: function(event, ui) {  $("#vwasigint").remove(); }}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });
}
function reasignar_interconsulta(nro_interconsulta,options){
  
  var titulo="Reasignacion de Interconsulta";
  options = options || {};
  $("#vwasigint").remove();
  var tag = $("<div id='vwasigint'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: 'Vistas/Reasignar.php?nro_interconsulta='+nro_interconsulta,
    type: 'GET',
    async:false,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal,position:[200,100], title: titulo,width:'50%',height:'200',resizable:false,close: function(event, ui) {  $("#vwasigint").remove(); }}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal:true,position:[100,50], title: titulo,width:'50%',height:'200',resizable:false,close: function(event, ui) {  $("#vwasigint").remove(); }}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });
}
//-----------

function ver_examenes(nro_interconsulta,options){
  
  var titulo="Examenes Solicitados en la Interconsulta";
  options = options || {};
  $("#vwasigint").remove();
  var tag = $("<div id='vwasigint'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: 'Vistas/Examenes.php?nro_interconsulta='+nro_interconsulta,
    type: 'GET',
    async:false,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal,position:[200,100], title: titulo,width:'70%',height:'500',resizable:false,close: function(event, ui) {  $("#vwasigint").remove(); }}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal:true,position:[100,50], title: titulo,width:'85%',height:'500',resizable:false,close: function(event, ui) {  $("#vwasigint").remove(); }}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });
}

//-------------



function ver_registro(nro_interconsulta,options){
  if(nro_interconsulta=="")
   titulo="Ingreso de Registro";
  else
   titulo="Actualizacion de Registro";
  options = options || {};
  $("#vwint").remove();
  var tag = $("<div id='vwint'></div>"); //This tag will the hold the dialog content.
  $.ajax({
	  url: 'Vistas/Registro.php?nro_interconsulta='+nro_interconsulta+'&sn_amb='+$('#sn_amb_emb').val()+'&us_emb='+$('#us_emb').val()+'&id_emb='+$('#id_emb').val()+'&tipo_emb='+$('#tipo_emb').val()+'&run_emb='+$('#run_emb').val()+'&dv_run_emb='+$('#dv_run_emb').val(),
    type: 'GET',
    async:false,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal,position:[200,100], title: titulo,width:'80%',height:'500',resizable:false,close: function(event, ui) {  $("#vwint").remove(); }}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal:true,position:[100,50], title: titulo,width:'90%',height:'550',resizable:false,close: function(event, ui) {  $("#vwint").remove(); }}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });
}
function ver_procedimiento(nro_procedimiento,options){
  if(nro_procedimiento=="")
   titulo="Ingreso de procedimiento";
  else
   titulo="Actualizacion de procedimiento";
  options = options || {};
  $("#vwproc").remove();
  var tag = $("<div id='vwproc'></div>"); //This tag will the hold the dialog content.
  $.ajax({
    url: 'Vistas/Procedimiento.php?nro_procedimiento='+nro_procedimiento,
    type: 'GET',
    async:false,
    success: function(data, textStatus, jqXHR) {
      if(typeof data == "object" && data.html) { //response is assumed to be JSON
        tag.html(data.html).dialog({modal: options.modal,position:[200,100], title: titulo,width:'80%',height:'500',resizable:false,close: function(event, ui) {  $("#vwproc").remove(); }}).dialog('open');
      } else { //response is assumed to be HTML
        tag.html(data).dialog({modal:true,position:[100,50], title: titulo,width:'90%',height:'550',resizable:false,close: function(event, ui) {  $("#vwproc").remove(); }}).dialog('open');
      }
      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);
    }
  });
}
function VistaEsperar(texto) {

  $("#vw_esperar").remove();
  var tag = $("<div id='vw_esperar'></div>"); //This tag will the hold the dialog content.                                                                                         
  $.ajax({
    url: 'Vistas/Esperar.php?texto='+texto,
        type: 'GET',
        async:false,
        success: function(data, textStatus, jqXHR) {
        if(typeof data == "object" && data.html) { //response is assumed to be JSON                                                                                                
	  tag.html(data.html).dialog({modal: true, title: 'Esperando ',width:600,resizable:false,close: function(event, ui) {  $("#vw_esperar").remove(); }}).dialog('open');
        } else { //response is assumed to be HTML                                                                                                                                  
          tag.html(data).dialog({modal: true, title: 'Esperando ',width:600,resizable:false,close: function(event, ui) {  $("#vw_esperar").remove(); },open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }}).dialog('open');
        }
        //,open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }                                                                                                    
        //      $.isFunction(options.success) && (options.success)(data, textStatus, jqXHR);                                                                                       
      }
    });
}
function excel(grid) {
       
       JSONToCSVConvertor($(grid).jqGrid("getRowData"), "Registros".trim(),true,"",["estado"],"Report");
}
function export_excel(grid) {
       
       Traspasa_Tabla($(grid).jqGrid("getRowData"), "Registros".trim(),true,['RUT Paciente','Nombre Paciente','Medico Derivador','Control (S/N)','Fecha Propuesta','Fundamentos','Especialidad','Estado'],["estado","nro_interconsulta"],"Reporte.xlsx");
}

function solicitar(listId) {
    
               var selected = jQuery(listId).jqGrid('getGridParam','selrow');
	if (selected == null) alert('Debe seleccionar una fila.');
        if (selected != null){ 
    
                    VistaEsperar("Solicitando. Por favor Espere");
                    
                
						var nro_solicitud_rayos=   jQuery(listId).jqGrid('getCell', selected, 'nro_solicitud_rayos');
						var estado = jQuery(listId).jqGrid('getCell',selected,'estado');
						var fecha_sol_informe = jQuery(listId).jqGrid('getCell',selected,'fecha_sol_informe');
                        var tipo = jQuery(listId).jqGrid('getCell',selected,'tipo');
                        //alert(tipo + ' ' +estado);
         if(tipo !='N') {              
        // if(estado == 'S'){
            if (fecha_sol_informe =="") {
            
            
                        $.ajax({
            url: 'Servicios/setSolicitaInforme.php?nro_solicitud_rayos='+nro_solicitud_rayos,
            type: 'GET',
            async:false,
            success: function(data, textStatus, jqXHR) {
            resp = JSON.parse(data);
            if (resp.estado==1){
             alert("Informe Solicitado");
            }
            else{
             }
            }
            });
            }
            else{
                alert("Ya se encuentra solicitado el informe de rayos.");
            }
		// }        
                    
				  $("#vw_esperar").dialog('close');
				jQuery("#list-registros").jqGrid('setGridParam',{datatype:'json'}).trigger('reloadGrid');	
				}
                else{
                   alert("A este tipo de orden no se le puede solicitar el informe de rayos."); 
                }
        }		
				
}
function agendar(listId) {
    
                var ids = jQuery(listId).jqGrid('getGridParam','selarrrow');
                if (ids.length>0) {
                    VistaEsperar("Agendando. Por favor Espere");
                    for (var i=0;  i < ids.length; i++) {
						var nro_interconsulta=   jQuery(listId).jqGrid('getCell', ids[i], 'nro_interconsulta');
						var estado = jQuery(listId).jqGrid('getCell',ids[i],'estado');
						
         if(estado == 'D'){
                        $.ajax({
            url: 'Servicios/setAgenda.php?nro_interconsulta='+nro_interconsulta,
            type: 'GET',
            async:false,
            success: function(data, textStatus, jqXHR) {
            resp = JSON.parse(data);
            if (resp.estado==1){
             
            }
            else{
             }
            }
            });
		 }        
                    }
				  $("#vw_esperar").dialog('close');
				jQuery("#list-registros").jqGrid('setGridParam',{datatype:'json'}).trigger('reloadGrid');	
				}
				else{
				  alert("No ha seleccionado Registros");
				  
				}
				
}

function verInforme(listId,tipo) {

	var selected = jQuery(listId).jqGrid('getGridParam','selrow');
	if (selected == null) alert('Debe seleccionar una fila.');
        if (selected != null){ 
        var id_aten = jQuery(listId).jqGrid('getCell',selected,'id_atencion');
         if(tipo==1)
         window.open('Servicios/getPdfInformeUrgencias.php?id_atencion=' + id_aten);
         else
         window.open('Servicios/getPdfReceta.php?id_atencion=' + id_aten);
        }        
}




$(document).ready(onInit);
