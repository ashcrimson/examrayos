<?php
  require_once('../libs/nusoap/lib/nusoap.php');
  include("../funciones.global.inc.php");
  include("../funciones.inc.php");
  $db=genera_adodb();
  verifica_sesion(false);

  $client = new soapclient(BUS);
  $result["datos"] = $client->call('buscarDetallePersona', array('run' =>$_REQUEST["run"]));
  $result["datos"]["fecha_nac"]=substr($result["datos"]["fecha_nac"],8,2)."/".substr($result["datos"]["fecha_nac"],5,2)."/".substr($result["datos"]["fecha_nac"],0,4);
  
  if($result["datos"]["fecha_nac"]!=""){

  $f= substr($result["datos"]["fecha_nac"],6,4)."-".substr($result["datos"]["fecha_nac"],3,2)."-".substr($result["datos"]["fecha_nac"],0,2); 
  $res=retorna_edad_exacta($f);
  $result["datos"]["edad"] = $res["a"];
  $result["datos"]["edad_m"] = $res["m"];
  $result["datos"]["edad_d"] = $res["d"];
 }
 else{
$result["datos"]["edad"] = 0;
  $result["datos"]["edad_m"] = 0;
  $result["datos"]["edad_d"] = 0;
}
  $result["hosp"] = $client->call('GetPacHospRunFicha', array('run' =>$_REQUEST["run"]));
  if($result["hosp"][0]["inghosp"] != "")
   $result["serv"] =$client->call('GetServicioActual', array('inghosp' =>$result["hosp"][0]["inghosp"]));

  $result["resbusq"]="";
  $result["estado"]="1";
  $db->disconnect();
    
  echo json_encode($result);

?>
