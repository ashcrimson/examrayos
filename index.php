<?php
  include("funciones.global.inc.php");
  include("funciones.inc.php");
  verifica_sesion(false);
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Solicitudes Examenes de Rayos - Hospital Naval Almirante NEF</title>
<link rel="stylesheet" href="jquery-ui/css/ui-lightness/jquery-ui-1.10.0.custom.min.css" />
<script src="jquery/js/jquery-1.9.0.min.js"></script>
<script src="jquery-ui/js/jquery-ui-1.10.0.custom.js"></script>
<link rel="stylesheet" type="text/css" media="screen" href="jquery/css/ui.jqgrid.css" />
<script src="jquery/js/i18n/grid.locale-es.js" type="text/javascript"></script>
<script src="jquery/js/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="jquery/js/jquery.form.js"></script>
<script type="text/javascript" src="sheetjs/dist/xlsx.full.min.js"></script>

<script src="examrayos.js?dummy=<?php echo rand(); ?>"></script>
<style>
html, body {
	margin: 0;			/* Remove body margin/padding */
	padding: 0;
	overflow: hidden;	/* Remove scroll bars on browser window */	
    font-size: 85%;
}
</style>
<script>
  function onInit() {
	
  $("#btn-buscar").button({icons: {primary: "ui-icon-search"}}); 
$("#btn-limpiar").button({icons: {primary: "ui-icon-trash"}}); 
	$("#btnAddRegistro").button({icons: {primary: "ui-icon-pencil"}});
  
        $("#btnPrintRegistro").button({icons: {primary: "ui-icon-print"}});
        $("#btnActEstadoRegistro1").button({icons: {primary: "ui-icon-pencil"}});
        $("#btnActEstadoRegistro2").button({icons: {primary: "ui-icon-pencil"}});
		$("#btnExcelRegistro").button({icons: {primary: "ui-icon-print"}});
		
//------
  $("#btnexamenes").button({icons: {primary: "ui-icon-pencil"}});
      
//---      
  $("#btnActRegistro").button({icons: {primary: "ui-icon-pencil"}});
      
	$("#list-registros").jqGrid({
	    url:'Servicios/getRegistros.php?us_emb='+$('#us_emb').val()+'&tipo_emb='+$('#tipo_emb').val()+'&id_emb='+$('#id_emb').val()+'&run_rez='+$('#run_rez').val(),
            width:1100,height:300,
	    datatype: 'json', loadonce: false,
	    colNames:[
				   <?php if($_REQUEST["sn_rez"] =="S"){?>
				   'Id Encuentro',
				   <?php }?>
				   
				  'RUT Paciente','Nombre Paciente','Fecha','Solicitud','Servicio de Procedencia',
				   'Estado','','',
				   <?php if($_REQUEST["sn_rez"] =="S"){?>
				   'Tipo Solicitud',
				   <?php }elseif($_REQUEST["sn_amb"] !="S"){?>
				   
				   'Fecha Solicitud Informe',
				   <?php }?>
				   
				   ''
				  ],
	    colModel :[
			  <?php if($_REQUEST["sn_rez"] =="S"){?>
				{name:'id', index:'id', width:30, align:'center',editable:false}, 
			  <?php }?> 	   
              {name:'run', index:'run', width:30, align:'center',editable:false}, 
              {name:'nombre', index:'nombre', width:40, align:'center',editable:false},
			  
              {name:'fecha_creacion', index:'fecha_creacion', width:40, align:'center',editable:false},  
              	 
			  {name:'solicitud', index:'solicitud', width:40, align:'center',editable:false},
			  {name:'servicio', index:'servicio', width:40, align:'center',editable:false},
			  
			
              {name:'desc_estado', index:'desc_estado', width:20, align:'center',editable:false},  
                            
{name:'estado', index:'estado', width:50, align:'center',editable:false,hidden:true},
{name:'nro_solicitud_rayos', index:'nro_solicitud_rayos', width:50, align:'center',editable:false,hidden:true},
 <?php if($_REQUEST["sn_rez"] =="S"){?>
					{name:'desc_tipo', index:'desc_tipo', width:40, align:'center',editable:false},
				   <?php }elseif($_REQUEST["sn_amb"] !="S"){?>
				   
				 	{name:'fecha_sol_informe', index:'fecha_sol_informe', width:40, align:'center',editable:false},
				   <?php }?>
		
{name:'tipo', index:'tipo', width:50, align:'center',editable:false,hidden:true},
			
             ],jsonReader: { repeatitems : false, id: "10" }, 
	   rowNum:1000, rowList:[100,200,300], sortname: 'id_atencion', viewrecords: true, sortorder: "asc", caption:"Registros"
	
	  });
	}
	$(document).ready(onInit);
</script>
<?php
    if($_REQUEST["sn_rez"] !="S"){
  ?>	
 <?php if($_REQUEST["run_emb"] != ""){?>
<script>
  function gatilla() {
	
      $( "#btnAddRegistro" ).click();
  }
  $(document).ready(gatilla);
</script>
  <?php }?>
    <?php }?> 	
</head>
<body>
  

<h2 style="font-family: Tahoma, Ubuntu;">Solicitudes Examenes de Rayos - Hospital Naval Almirante NEF</h2>
<?php if ($_SESSION["examrayos"]["usuario"] !=""){ ?>
<input type="hidden" id="conectado" value="S">

<div id="cuadrologin" style="font-family: Tahoma, Ubuntu;font-size:12px;"><b ><?php echo $_SESSION["examrayos"]["nombres"]." ".$_SESSION["examrayos"]["apellido_paterno"]." ".$_SESSION["examrayos"]["apellido_materno"].""; ?></b>
&nbsp;&nbsp;&nbsp;</div><br><br>
<?php } ?>
<div id="content-box">
			<center>
			  		 
    <?php
	// <span style="font-family: Tahoma, Ubuntu;font-size:12px;"> Busqueda : </span>
//<input type="text" id="busq" name="busq" size="20" maxlength="40" onkeyup="if(this.value.length >= 0){$('#list-registros').setGridParam({url:'Servicios/getRegistros.php?busq='+$('#busq').val()});$('#list-registros').trigger( 'reloadGrid' );}">
?>	
			<?php if ($_REQUEST["us_emb"] !=""){ ?>


 
<input type="hidden" id="conectado" value="S">
<input type="hidden" id="us_emb" value="<?php echo $_REQUEST["us_emb"]; ?>">
<input type="hidden" id="tipo_emb" value="<?php echo $_REQUEST["tipo_emb"]; ?>">
<input type="hidden" id="id_emb" value="<?php echo $_REQUEST["id_emb"]; ?>">
<input type="hidden" id="run_emb" value="<?php echo $_REQUEST["run_emb"]; ?>">
<input type="hidden" id="dv_run_emb" value="<?php echo $_REQUEST["dv_run_emb"]; ?>">
<input type="hidden" id="sn_amb_emb" value="<?php echo $_REQUEST["sn_amb"]; ?>">
<input type="hidden" id="cod_serv_emb" value="<?php echo $_REQUEST["cod_serv"]; ?>">
            <?php }elseif($_REQUEST["run_rez"] !=""){?>
			 <input type="hidden" id="run_rez" value="<?php echo $_REQUEST["run_rez"]; ?>">
			<?php }?>
			 
			<table id="list-registros"> 
			
				<tr><td/></tr></table>
			<div class="actions">
	<?php
    if($_REQUEST["sn_rez"] !="S"){
  ?>			     
<button id="btnAddRegistro" onclick='ver_registro("","");$("#vwint").dialog("close"); ver_registro("","");'>Ingresar Registro</button>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <?php
    if($_REQUEST["sn_amb"] !="S"){
  ?><button onclick="solicitar('#list-registros');" id="btnActEstadoRegistro1">Solicitar Informe</button>
<?php
	}
  ?>
  <?php
	}
  ?>
			</div>
			</center>
</div>
<table id="exl_exp" style="display:none"></table>
</body>
</html>
