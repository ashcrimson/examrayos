<?php
include("../funciones.global.inc.php");
include("../funciones.inc.php");
$db=genera_adodb();
verifica_sesion(false);


  $valores=array();
  $sql="update orden_rayos set sn_sol_informe='S',fecha_sol_informe=sysdate where nro_solicitud_rayos=?";
 
  
  $valores[]=$_REQUEST["nro_solicitud_rayos"] ;
  $recordset = $db->Execute($sql,$valores);
  if (!$recordset) {
    $results = "0";
  print($db->ErrorMsg());


  }
  else{
    $results = "1";
   
  }
  
  $db->disconnect();
  echo json_encode($results);
 
?>