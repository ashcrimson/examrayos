<?php

$atenciones = array();
require_once('../libs/nusoap/lib/nusoap.php');
	include("../funciones.global.inc.php");
	include("../funciones.inc.php");
	verifica_sesion(false);
	$db=genera_adodb();
	$db_p=genera_adodb("portal");
	
	$valores=array();
    
	
	   $sql= "select * from ((select 
	r.run || '-'|| r.dv_run as run,
	r.NRO_SOLICITUD_RAYOS, 
	r.nombre|| ' '||r.apellido as nombre,
	to_char(r.fecha_creacion,'dd/mm/YYYY hh24:mi:ss') as fecha_creacion, 
	r.estado,
	e.desc_estado_orden_rayos as desc_estado ,
    r.solicitud,
    s.descrip as servicio,
    to_char(r.fecha_sol_informe,'dd/mm/YYYY hh24:mi:ss') as fecha_sol_informe,r.tipo,r.id,decode(r.tipo,'R','Rayos','S','Scanner','E','Ecografia','N','Resonancia Nuclear Magnetica') as desc_tipo
from ORDEN_RAYOS r,servicio_examrayos@as400 s,sisu.estado_orden_rayos e where r.sn_amb='N' and r.codserv=s.codserv and r.estado=e.cod_estado_orden_rayos
";

if(($_REQUEST["run_rez"]!="")&&($_REQUEST["run_rez"]!="undefined")){
	$sql.=" and r.tipo_id ='RZ'";
	  
}
elseif(($_REQUEST["tipo_emb"]!="")&&($_REQUEST["tipo_emb"]!="undefined")){
          $sql.=" and r.tipo_id=? and r.id=?";

		  $valores[]=$_REQUEST["tipo_emb"];
		  $valores[]=$_REQUEST["id_emb"];
        }
        else{
		  $sql.=" and r.cod_u=?";
          $valores[]=$_SESSION["examrayos"]["usuario"];
		}
		$sql .=" ) union";
 $sql.= "(select 
	r.run || '-'|| r.dv_run as run,
	r.NRO_SOLICITUD_RAYOS, 
	r.nombre|| ' '||r.apellido as nombre,
	to_char(r.fecha_creacion,'dd/mm/YYYY hh24:mi:ss') as fecha_creacion, 
	r.estado,
	e.desc_estado_orden_rayos as desc_estado ,
    r.solicitud,
    s.descrip as servicio,
    to_char(r.fecha_sol_informe,'dd/mm/YYYY hh24:mi:ss') as fecha_sol_informe,r.tipo,r.id,decode(r.tipo,'R','Rayos','S','Scanner','E','Ecografia','N','Resonancia Nuclear Magnetica') as desc_tipo
from ORDEN_RAYOS r,servicio_examrayos_amb@as400 s,sisu.estado_orden_rayos e where r.sn_amb='S' and r.codserv=s.codserv and r.estado=e.cod_estado_orden_rayos
";


if(($_REQUEST["run_rez"]!="")&&($_REQUEST["run_rez"]!="undefined")){
	$sql.=" and r.tipo_id ='RZ' and r.run =?";
	   $valores[]=$_REQUEST["run_rez"];
}
elseif(($_REQUEST["tipo_emb"]!="")&&($_REQUEST["tipo_emb"]!="undefined")){
          $sql.=" and r.tipo_id=? and r.id=?";

		  $valores[]=$_REQUEST["tipo_emb"];
		  $valores[]=$_REQUEST["id_emb"];
        }
        else{
		  $sql.=" and r.cod_u=?";
          $valores[]=$_SESSION["examrayos"]["usuario"];
		}
		$sql .=" ) )xx";
	
	
        $sql .=" order by xx.fecha_creacion";
		
        $recordset = $db->Execute($sql,$valores);
  if (!$recordset) die($sql.$db->ErrorMsg());  

while ($arr = $recordset->FetchRow()) {
     $arr["servicio"]=utf8_encode($arr["servicio"]);		  
     $atenciones[]=$arr;
  } 
	
       
        $db->disconnect();  
 $db_p->disconnect(); 

$result = array();
$result["records"] = count($atenciones);
$result["rows"] = $atenciones;

echo json_encode($result);
?>
