<?php


$filter = $_REQUEST['term'];
$diagnostico = array();
	include("../funciones.global.inc.php");
	include("../funciones.inc.php");
	$db=genera_adodb("as400");
	$valores=array();
        $valores[]=$filter;
        $valores[]=$filter;
        $sql= "select dsrunr||'-'|| dvrunr  as value,trim(nomb1) ||' '|| trim(nomb2)||' '|| trim(appat)||' '|| trim(apmat) as label from tb19pf where substr(codmed1,1,1) in ('L','M') and ((upper(nomb1 ||' '|| nomb2||' '|| appat||' '|| apmat) like '%'||upper(?)||'%')or(upper(dsrunr) like '%'||upper(?)||'%'))";
        $recordset = $db->Execute($sql,$valores);
  if (!$recordset) die("hhh".$db->ErrorMsg());  
  $diagnostico=array();
while ($arr = $recordset->FetchRow()) {
     $diagnostico[]=$arr;
  } 
	
       
        $db->disconnect();  

echo json_encode($diagnostico);
