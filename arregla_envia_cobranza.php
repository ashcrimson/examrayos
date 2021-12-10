<?php
require_once('libs/nusoap/lib/nusoap.php');
include("funciones.global.inc.php");
include("funciones.inc.php");
$client = new soapclient(BUS);
$cod_caja="54";
$codserv_e="4801";
$db=genera_adodb();

$sql="select * from 
orden_rayos a
where 
a.sn_amb='N' and
a.estado='R' and 
a.sn_cobro='E'
and not exists (select 1 from insumo_farmaco b where a.nro_solicitud_rayos=b.NRO_SOLICITUD_RAYOS and b.CODBOD is  null) and inghosp is not null";
 $valores=array();
  $recordset = $db->Execute($sql,$valores);
  
  if (!$recordset) die("hhh".$db->ErrorMsg());  
 
  while ($arr = $recordset->FetchRow()) {
	$datos_hosp=array();
    $datos_hosp = json_decode($client->call('GetHosp', array('inghosp' =>$arr["inghosp"])),true);
	if($datos_hosp["inst"] != $arr["codinst"]){
	  print($datos_hosp["inst"] . " - " .$arr["codinst"]."\n");
	  $recordset_upd = $db->Execute("update orden_rayos set codinst=? where nro_solicitud_rayos=?",array($datos_hosp["inst"],$arr["nro_solicitud_rayos"]));
	if (!$recordset_upd) die("hhh".$db->ErrorMsg()); 
	}
  }

  $sql="select * from 
orden_rayos a
where 
a.estado='R' and 
a.sn_cobro='E'
and not exists (select 1 from insumo_farmaco b where a.nro_solicitud_rayos=b.NRO_SOLICITUD_RAYOS and b.CODBOD is  null) and inghosp is not null";
  $sql_del="delete from registro_cobro where nro_solicitud_rayos=? and estado='N'";
  $sql_det="select * from
(
(select a.nro_solicitud_rayos ,to_char(a.fecha,'dd/mm/yyyy hh24:mi:ss') as fecha,to_char(a.fecha,'YYYYMMDDHH24MI') as fecha_f,a.codprest,b.dvprest,1 as cantidad,a.codbod from insumo_farmaco a,insumo_farmaco@urgencias b where a.codprest=b.codprest)
union
(select a.nro_solicitud_rayos ,to_char(a.fecha,'dd/mm/yyyy hh24:mi:ss') as fecha,to_char(a.fecha,'YYYYMMDDHH24MI') as fecha_f,a.codprest,b.dvprest,1 as cantidad,0 as codbod from prestacion a,tarifado@urgencias b where a.codprest=b.codprest)
)xx
where xx.nro_solicitud_rayos=? and not exists (select 1 from registro_cobro yy where xx.nro_solicitud_rayos=yy.nro_solicitud_rayos and xx.codprest=yy.codprest)";
  $valores=array();
  $recordset = $db->Execute($sql,$valores);
  
  if (!$recordset) die("hhh".$db->ErrorMsg());  
  $datos=array();  
  while ($arr = $recordset->FetchRow()) {
	
	$recordset_del = $db->Execute( $sql_del,array($arr["nro_solicitud_rayos"]));
	if (!$recordset_del) die("hhh".$db->ErrorMsg()); 
    $recordset_d = $db->Execute($sql_det,array($arr["nro_solicitud_rayos"]));
	$datoscobro=array();
    $datoscobro = $client->call('buscarDatosCobro', array('run' =>$arr["run"],'inst' =>$arr["codinst"]));

    if(($datoscobro["cuenta"] =="")&&(($arr["codinst"] =="12")||($arr["codinst"] =="19")||($arr["codinst"] =="73")||($arr["codinst"] =="70")||($arr["codinst"] =="76")||($arr["codinst"] =="79")||($arr["codinst"] =="80"))){
	     $datoscobro["cuenta"]=str_pad($arr["run"].$arr["dv_run"],11,"0",STR_PAD_LEFT);
      $datoscobro["parentesco"]=1 ;
      $datoscobro["categfam"]=" ";
      $datoscobro["jornada"]=1 ;
      $datoscobro["fofam_fospen"]=0 ;
	  $datoscobro["run"]=$arr["run"] ;
      $datoscobro["dv_run"]=$arr["dv_run"] ;
      $datoscobro["run_r"]=$arr["run"] ;
      $datoscobro["dv_run_r"]=$arr["dv_run"] ;
	}
	elseif(($datoscobro["cuenta"] =="")&&(($arr["codinst"] =="425")||($arr["codinst"] =="424"))){
	  $datosficha=array();
      $datosficha = json_decode($client->call('retorna_datos_ficha_cli', array('run' =>$arr["run"])),true);
      if($datosficha["inst2"] ==$arr["codinst"] ){
	    $datoscobro["cuenta"]=$datosficha["idinsp"];
        $datoscobro["parentesco"]=$datosficha["parentp"] ;
        $datoscobro["categfam"]=$datosficha["idfamp"];
        $datoscobro["jornada"]=1 ;
        $datoscobro["fofam_fospen"]=0 ;
	    $datoscobro["run"]=$datosficha["dsrunp"] ;
        $datoscobro["dv_run"]=$datosficha["dvrunp"] ;
        $datoscobro["run_r"]=$datosficha["dsrunr"] ;
        $datoscobro["dv_run_r"]=$datosficha["dvrunr"] ;
		
	  }
	}
	elseif($datoscobro["cuenta"] ==""){
	  print("No hay parametros de Cobro para institucion para la solicitud.".$arr["nro_solicitud_rayos"]."\n");
	}  
	  if(trim($datoscobro["categfam"]) =="")
        $datoscobro["categfam"]=" ";
	$datos_resp=array();
    $datos_resp = $client->call('buscarDetallePersona', array('run' =>$datoscobro["run_r"]));
    $datoscobro["dv_run_r"]=$datos_resp["dv_run"] ;
	
	$datos[$arr["nro_solicitud_rayos"]]["datos_cobro"]=$datoscobro;
	$i=1;
    while ($arr_d = $recordset_d->FetchRow()) {
	 
	    $datos[$arr["nro_solicitud_rayos"]]["datos"][$i]=array_merge($arr,$arr_d);
		$input=array();
		$input['id_aten']=$arr["nro_solicitud_rayos"];
        $input['inst']=$arr["codinst"];
        $input['idinst']=$datoscobro["cuenta"];
        $input['runr']=$datoscobro["run_r"];
        $input['dvrunr']=$datoscobro["dv_run_r"];
        $input['runp']=$datoscobro["run"];
        $input['dvrunp']=$datoscobro["dv_run"];
        $input['parentezco']=$datoscobro["parentesco"];
        $input['categfam']=$datoscobro["categfam"];
        $input['jornada']=$datoscobro["jornada"];
        $input['tipo_atencion']="2";
        $input['fechahoraaten']=$arr_d["fecha_f"];
        $input['idboleta']=$arr["inghosp"];//Mientras tanto  
        $input['servicio_sol']=$arr["codserv"];
        $input['servicio_ejec']=$codserv_e; 
        $input['correl']=1;
        $input['codbod']=$arr_d["codbod"];
        $input['codprest']=$arr_d["codprest"];
        $input['dvprest']=$arr_d["dvprest"];
        $input['cantidad']=$arr_d["cantidad"];
        $input['tipo_pago']=2;
        $input['forma_pago']=1;
        $input['fofam']=$datoscobro["fofam_fospen"];
        $input['sn_ea']="N";
        $input['fecha_prest']=$arr_d["fecha_f"];
        $input['sn_med_llam']="N";
		$rescal=array();
        $rescal = json_decode($client->call('setPrestacionCalculo', $input),true);
        $input["preunit1"]=str_replace(".",",",$rescal["preunit1"]*1);
        $input["montot1"]=str_replace(".",",",$rescal["montot1"]*1);
        $input["boniva1"]=str_replace(".",",",$rescal["boniva1"]*1);
        $input["totpag1"]=str_replace(".",",",$rescal["totpag1"]*1);
        $input["montodif"]=str_replace(".",",",$rescal["montodif"]*1);
        $input['nivel3md']=$rescal["nivel3md"];
        $input['sisan']=$rescal["sisan"];
        $input['sn_iva']=$rescal["sn_iva"];
        $input['idfamp']=$rescal["idfamp"];
        $input['conpres']=$rescal["conpres"];
        $input['calculo_ea']=$rescal["calculo_ea"];
		
        $input['id']=$arr["inghosp"];
        $input['fecha']=$arr_d["fecha_f"];
        $input['servicio_sol']=$input['servicio_sol'];
        $input['servicio_ejec']=$input['servicio_ejec'];
        $input['far_ins']=$rescal["far_ins"];
        $input['nivel3']=$rescal["nivel3"];
		$input["descrip"]=	$rescal["descrip"];
        $datos[$arr["nro_solicitud_rayos"]]["datos"][$i]["cobro"]=$input;
	   
	   $i++;
	}
  }
  
  $sql_ins="insert into registro_cobro values(?,to_date(?,'dd/mm/yyyy hh24:mi:ss'),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,sysdate)";
  if(count($datos) >0){
	 $i=1;
     foreach($datos as $nro_solicitud_rayos => $fila){
	   print($i.".- :".$nro_solicitud_rayos."\n");
	   $error=0;
      if(count($fila["datos"]) >0){
		 $correl=1;
		 
	     foreach($fila["datos"] as $jj => $fila_d){
		
		
	      $estado='N';
		  $clave_cobro=null;
		  $input=array();
          $input['id_aten']=$nro_solicitud_rayos;
          $input['inst']=$fila_d["cobro"]["inst"];
          $input['conpres']=$fila_d["cobro"]["conpres"];
          $input['idboleta']=$fila_d["cobro"]["idboleta"];
          $input['idinst']=$fila_d["cobro"]["idinst"];
          $input['runr']=$fila_d["cobro"]["runr"];
          $input['dvrunr']=$fila_d["cobro"]["dvrunr"];
          $input['runp']=$fila_d["cobro"]["runp"];
          $input['dvrunp']=$fila_d["cobro"]["dvrunp"];
          $input['parentp']=$fila_d["cobro"]["parentezco"];
          $input['idfamp']=$fila_d["cobro"]["categfam"];
          $input['codjorn']=$fila_d["cobro"]["jornada"];
          $input['tipo_atencion']=$fila_d["cobro"]["tipo_atencion"];
          $input['fechahoraaten']=$fila_d["fecha_f"];
          $input['servicio_sol']=$fila_d["cobro"]["servicio_sol"];
          $input['servicio_ejec']=$fila_d["cobro"]["servicio_ejec"];
          $input['correl']=$correl;
          $input['codbod']=$fila_d["cobro"]["codbod"];
          $input['codprest']=$fila_d["cobro"]["codprest"];
          $input['dvprest']=$fila_d["cobro"]["dvprest"];
          $input['cantidad']=$fila_d["cobro"]["cantidad"];
          $input['tipo_pago']=$fila_d["cobro"]["tipo_pago"];
          $input['forma_pago']=$fila_d["cobro"]["forma_pago"];
          $input['fofam']=$fila_d["cobro"]["fofam"];
          $input['descrip']=$fila_d["cobro"]["descrip"];
          $input['calculo_ea']="N";
          $input["preunit1"]=$fila_d["cobro"]["preunit1"];
          $input["montot1"]=$fila_d["cobro"]["montot1"];
          $input["boniva1"]=$fila_d["cobro"]["boniva1"];
          $input["totpag1"]=$fila_d["cobro"]["totpag1"];
          $input["montodif"]=$fila_d["cobro"]["montodif"];
          $input["idcaja"]=$cod_caja;
		 
		  $result=array();
          $result = json_decode($client->call('setEnvioCobranza', array(json_encode($input))),true);
		  if((isset($result["error"]))&&($result["error"] ==0)){
          $clave_cobro=$result["clave"];
		  $estado="C";
		  }
		  else{
		   $error=1;
		   $estado='N';
		   $clave_cobro=null;
		  }
		  
		  $valores=array();
		  $valores[]=$nro_solicitud_rayos;
		  $valores[]=$fila_d["fecha"];
		  $valores[]=$fila_d["cobro"]["inst"];
		  $valores[]=$fila_d["cobro"]["idinst"];
		  $valores[]=$fila_d["cobro"]["parentezco"];
		  $valores[]=$fila_d["cobro"]["categfam"];
		  $valores[]=$fila_d["cobro"]["jornada"];
		  $valores[]=$fila_d["cobro"]["fofam"];
		  $valores[]=$fila_d["cobro"]["runr"];
		  $valores[]=$fila_d["cobro"]["dvrunr"];
		  $valores[]=$fila_d["cobro"]["codprest"];
		  $valores[]=$fila_d["cobro"]["dvprest"];
		  $valores[]=$fila_d["cobro"]["codbod"];
		  $valores[]=$fila_d["cobro"]["cantidad"];
		  $valores[]=$fila_d["cobro"]["montot1"];
		  $valores[]=$fila_d["cobro"]["boniva1"];
		  $valores[]=$fila_d["cobro"]["totpag1"];
		  $valores[]=$fila_d["cobro"]["montodif"];
		  $valores[]=$estado;
		  $valores[]=$clave_cobro;
		  $valores[]=$fila_d["cobro"]["conpres"];
		
		  $recordset_ins = $db->Execute($sql_ins,$valores);
		  
		  $correl++;
		  
		 }
	  }
	  
	  if($error==0){
	   $valores_upd=array();
       $sql_upd="update orden_rayos set sn_cobro='S' where nro_solicitud_rayos=?";
       $valores_upd[]=$nro_solicitud_rayos ;
       $recordset_upd = $db->Execute($sql_upd,$valores_upd);
	  }
	  else{
	   $valores_upd=array();
       $sql_upd="update orden_rayos set sn_cobro='E' where nro_solicitud_rayos=?";
       $valores_upd[]=$nro_solicitud_rayos ;
       $recordset_upd = $db->Execute($sql_upd,$valores_upd);	
	  }
	  $i++;
	 }
  }
$db->disconnect();
?>
