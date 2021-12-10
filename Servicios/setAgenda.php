<?php
include("../funciones.global.inc.php");
include("../funciones.inc.php");
$db=genera_adodb();
verifica_sesion(false);

  $valores=array();
  $sql="update interconsulta set estado='A',fecha_agenda=sysdate where nro_interconsulta=?";

  $valores[]=$_REQUEST["nro_interconsulta"] ;
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