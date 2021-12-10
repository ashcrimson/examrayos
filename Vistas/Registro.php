<?php
  include("../funciones.global.inc.php");
  include("../funciones.inc.php");
  $db=genera_adodb();
  verifica_sesion(false);
?>


<!--script type="text/javascript" src="libs/getElementsByAttribute.js"></script-->
 <style>
 	

.ui-autocomplete-loading {
background: white url('images/ui-anim_basic_16x16.gif') right center no-repeat;
}
</style>
<script>
  function muestra_neonato() {
    if($('#codserv').val() =='1601'){
	  $(".neo").show();
	  $(".neo_t").val('');
	  
	}
	else{
	  $(".neo").hide();
	  $(".neo_t").val('');
	  
	}
  }
  function valida_registro(f) {
   if(!isInteger(f.run.value)){
    alert('El rut del paciente debe ser un numero'); 
    return false;
   }

   if(f.dv_run.value ==""){
    alert('El digito verificador del rut del paciente no puede ser nulo'); 
    return false;
   } 
   if ( getRutDv(f.run.value) != f.dv_run.value.toUpperCase()){
      alert('El rut del paciente es incorrecto'); 
      return false;
   }
   
   if (f.nombre.value =="") {
	alert('Los nombres del Paciente no puede ser nulo'); 
      return false;
   }
   if (f.apellido.value =="") {
	alert('Los apellidos del Paciente no puede ser nulo'); 
      return false;
   }
   if (f.codserv.value =="") {
	alert('El servicio solicitante no puede ser nulo'); 
      return false;
   }
   if (f.solicitud.value =="") {
	alert('La solicitud no puede ser nula'); 
      return false;
   }
   if (f.obs_diagnostica.value =="") {
	alert('La observacion diagnostica no puede ser nula'); 
      return false;
   }
    if (f.tipo.value =="") {
	alert('El tipo de solicitud no puede ser nulo'); 
      return false;
   }
   if ($('input[name=sn_contraste]:checked').length == 0) {
	alert('Debe Indicar si es con o sin contraste'); 
      return false;
   }
   if(f.pin != null){
   if(f.pin.value ==""){
    alert('El pin no puede ser nulo');
    return false;
   }
   }
   return true;
  }
function log(id, message ) {
var data=message.split(" - ");
$("#"+id).val(data[0]);

}
$( "#buscar_med" ).autocomplete({
source: "Servicios/getMedicos.php",
minLength: 3,
select: function( event, ui ) {
log("rut_medico", ui.item ?
 ui.item.value  :
"Nada seleccionado, valor buscado " + this.value );
$("#medico").html("Medico Seleccionado : "+ui.item.label);
$(this).val(''); return false;
}
})


 $(function() {

        $( "#busaeu" ).button({icons: {primary: "ui-icon-search"}});
        $( "#guardaraeu" ).button({icons: {primary: "ui-icon-disk"}});
   });       
  $(".neo").hide();      
</script>
<script type="text/javascript">
	
	
	


var optionsbusu = { 
        
        success:       showResponseBusu
  };
  var optionsadmu = { 
        
        success:       showResponseAdmu
  };
  function showResponseBusu(responseText, statusText, xhr, $form)  { 
   resp = JSON.parse(responseText);
    if(resp.hosp[0] != null){
     
	 document.myForm_admu.inghosp.value=resp.hosp[0].inghosp;
	 document.myForm_admu.codinst.value=resp.hosp[0].codinst;
	 if (resp.serv != null) {
        	 $('#codserv').val(resp.serv);

     }
	 
	 }
     else{
       if($('#sn_amb_emb').val()=='S'){
         if ($('#cod_serv_emb').val() != "") {
	   $('#codserv').val($('#cod_serv_emb').val());
         }
		 document.myForm_admu.sn_amb.value='S';
       }
       else{ 
          alert('No se encontraron datos de Hospitalizacion');
          document.myForm_busu.run.value="";
          document.myForm_busu.dv_run.value="";

          return;
       }  
     }
     document.myForm_admu.nombre.value=resp.datos.primer_nombre+ ' '+ resp.datos.segundo_nombre;
     document.myForm_admu.apellido.value= resp.datos.apellido_paterno+ ' '+ resp.datos.apellido_materno;

     document.myForm_admu.fecha_nac.value=resp.datos.fecha_nac;
     document.myForm_admu.edad_a.value=resp.datos.edad;
	 document.myForm_admu.edad_m.value=resp.datos.edad_m;
	 document.myForm_admu.edad_d.value=resp.datos.edad_d;
	 
     document.myForm_admu.run.value=resp.datos.run;
     document.myForm_admu.dv_run.value=resp.datos.dv_run;
     if (resp.datos.sexo =='F')
     document.myForm_admu.ind_sexo[0].checked=true;
     else if (resp.datos.sexo =='M')
     document.myForm_admu.ind_sexo[1].checked=true;
     if(resp.datos.sexo ==null){

     document.myForm_admu.ind_sexo[0].readOnly=false;
     document.myForm_admu.ind_sexo[1].readOnly=false;
     document.myForm_admu.ind_sexo[0].disabled=false;
     document.myForm_admu.ind_sexo[1].disabled=false;
     
     }

   $('#resultreferencialu').html(resp.resbusq);
}
   function showResponseAdmu(responseText, statusText, xhr, $form)  { 
   resp = JSON.parse(responseText);
   if (resp.estado == 1){
     
     alert('Solicitud Ingresada');
     jQuery("#list-registros").jqGrid('setGridParam',{datatype:'json'}).trigger('reloadGrid');

       $('#vwint').dialog('close'); 
 
       
   }
   
  
   else{
     alert(resp.error);
   
   }
   
   }
   
  jQuery.fn.reset = function () {
  $(this).each (function() { this.reset(); });
  }
  function carga(){
	$('#fecha_nac').datepicker({changeMonth:true,changeYear:true,yearRange:"-110:+0",maxDate: new Date(),dateFormat:"dd/mm/yy"}); 
  $('#myForm_busu').ajaxForm(optionsbusu); 
  $('#myForm_admu').ajaxForm(optionsadmu); 
  
  <?php if(($_REQUEST["run_emb"] != "")&&($_REQUEST["run_emb"] != "undefined")){?>
  document.myForm_busu.run.value='<?php echo $_REQUEST["run_emb"];?>';
  document.myForm_busu.dv_run.value='<?php echo $_REQUEST["dv_run_emb"];?>';
  
  $( "#busaeu" ).click();


  <?php }?>
  }
  $(document).ready(carga);
	

</script>
<fieldset>
<legend><b>Registro</b></legend>
<input type="hidden" name="sn_hosp" >

<fieldset>
<legend><b>INGRESAR DATOS</b></legend>

<form id="myForm_busu" name="myForm_busu" onsubmit="return valida_buscar(this);"   action="Servicios/getReferenciales.php" method="post"> 

  <table><tr><td>RUT: <input type="text" name="run" size="8" maxlength="8">-<input type="text" name="dv_run" size="1" maxlength="1"> </td><td> <button type="submit" id="busaeu">Buscar</button> </td><td><div id="resultreferencialu" style="color:#FF0000;"></div></td></tr></table>

</form>
</fieldset>
<form id="myForm_admu" name="myForm_admu" onsubmit="return valida_registro(this);"   action="Servicios/setRegistro.php" method="post"> 
<input type="hidden" name="trans" value="<?php if ($_REQUEST["nro_solicitud_rayos"] == "")echo "add"; else echo "edit";?>">
<input type="hidden" name="nro_solicitud_rayos" >
<input type="hidden" name="estado" >
<input type="hidden" name="inghosp" >
<input type="hidden" name="sn_amb" value='N'>

<input type="hidden" name="codinst" >


<?php if ($_REQUEST["us_emb"] !=""){ ?>
<input type="hidden" name="us_emb" value="<?php echo $_REQUEST["us_emb"]; ?>">
<input type="hidden" name="id_emb" value="<?php echo $_REQUEST["id_emb"]; ?>">
<input type="hidden" name="tipo_emb" value="<?php echo $_REQUEST["tipo_emb"]; ?>">

            <?php }?> 
<fieldset>
<legend><b>1.- DATOS PACIENTE</b></legend>
<table width="100%">
<tr>
 <td>Run:</td>
 <td><input type="text"  name="run" size="8" maxlength="8">-<input type="text"  name="dv_run" size="1" maxlength="1"></td>
 <td>Nombres:</td>
 <td><input type="text"  name="nombre" size="30" maxlength="300"></td>
 <td>Apellido</td>
 <td><input type="text"  name="apellido" size="25" maxlength="300"></td>
  
</tr>
<tr>
 <td>Fecha Nacimiento</td>
 <td><input type="text" name="fecha_nac" id="fecha_nac"  size="10" maxlength="10"></td>
 <td>Sexo:</td>
 <td><input type="radio" name="ind_sexo" value="F" >F<input type="radio" name="ind_sexo" value="M" >M</td>
 <td>Edad:</td>
 <td><input type="text" name="edad_a" value="" size="3" maxlength="3"> Años <input type="text" name="edad_m" value="" size="2" maxlength="2"> Meses <input type="text" name="edad_d" value="" size="2" maxlength="2"> Dias</td>
 </tr>
 <tr class="neo">
  <td>Secuencia Neonatologica</td>
  <td><select name="sec_neonato" class="neo_t">
    <option value="">Elegir</option>
	<option value="1">1</option>
	<option value="2">2</option>
	<option value="3">3</option>
	<option value="4">4</option>
	<option value="5">5</option>
	<option value="6">6</option>
	<option value="7">7</option>
	<option value="8">8</option>
	<option value="9">9</option>
	
  </select></td>
  <td>Descripcion Neonatologica</td>
  <td><input type="desc_neonato" size="100" maxlength="3000" class="neo_t"></td>
  
 </tr>
</table>
</fieldset>
<fieldset>
 <legend><b>2.- DATOS SOLICITUD</b> </legend>
<table width="100%">
<tr>
<td>Servicio de Procedencia:</td>
 <td><select name="codserv" id="codserv" onchange="muestra_neonato();"><option value="">Selecccionar</option>
  <?php
    if($_REQUEST["sn_amb"] =="S"){
    $sql="select 
	*
	 
from servicio_examrayos_amb@as400 
order by 2";
    }
    else{
       $sql="select 
	*
	 
from servicio_examrayos@as400 
order by 2";
}
  $valores=array();
  $recordset = $db->Execute($sql,$valores);
  if (!$recordset) die("hhh".$db->ErrorMsg());  
  while ($arr = $recordset->FetchRow()) {
      
     print("<option value='".$arr["codserv"]."'>".utf8_encode($arr["descrip"])."</option>");
  }
  
  ?>
  
 </select></td>
</tr>  
<tr>
  <td >Solicitud</td >
  <td ><textarea type='text' name="solicitud" rows='10' cols='100'></textarea></td>
</tr>
<tr>
  <td >Observacion Diagnostica</td >
  <td ><textarea type='text' name="obs_diagnostica" rows='10' cols='100'></textarea></td>
</tr>

<tr>
  <td>Tipo</td>
  <td><select name='tipo' class='ing'><option value="">Ninguno</option>
     <option value="R">Rayos</option>
	 <option value="E">Ecografia</option>
	 <option value="S">Scanner</option>
	 <option value="N">Resonancia Nuclear Magnetica</option>
	</select>
	</td>
</tr>
<tr>
<td>¿Con Contraste?:</td>
 <td><input type="radio" name="sn_contraste" value="S" >Si<input type="radio" name="sn_contraste" value="N" >No</td>
</tr>
  <?php
    if($_REQUEST["sn_amb"] !="S"){
  ?>	  
<tr><td>PIN : <input type='password' name='pin' size='4' maxlength='4'></td></tr>
<?php
	}
  ?>
</table>
</fieldset>
<center><button type="submit" id="guardaraeu" >Guardar</button>
</center>
</form>
</fieldset>

<?php
 $db->disconnect();
?>
