<?php
/*
   Funcion Script : Inicio del Sistema 
   Ultima Modificacion: 12/09/2011  
*/
   include_once("../libs/core.php");
   include("../funciones.global.inc.php");
   include("../funciones.inc.php");
   include("../funciones.inc.firma.php");
   verifica_sesion(false);
   $db=genera_adodb();

   if($_REQUEST["trans"] =="add"){
    if(isset($_REQUEST["pin"]) ){
	
 if(($_REQUEST["us_emb"]!="")&&($_REQUEST["us_emb"]!="undefined"))
    $id_us=$_REQUEST["us_emb"];
    else
    $id_us=$_SESSION["examrayos"]["usuario"];
    $pin=$_REQUEST["pin"];
    $retorno=retorna_id_documento($id_us,$pin);
    if(isset($retorno["error"])){
     $results["estado"]=0;
     $results["error"]="Pin Invalido";
     $db->disconnect();
     echo json_encode($results);
     exit(0);
    }
   }
       
   $valores=array();
   $sql="insert into ORDEN_RAYOS 
 values(
    SEC_NRO_SOLICITUD_RAYOS.nextval, 
	null,
	?,
	?,
	?,
	?,
	'S',
	to_date(?,'dd/mm/yyyy'),
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	sysdate,
	'S',
	?,
	?,
	'N',
	null,null,null,?,?,'N',?
	
 )";
   $valores=array();
   $valores[]=$_REQUEST["run"] ;
   $valores[]=$_REQUEST["dv_run"] ;
   $valores[]=$_REQUEST["nombre"] ;
   $valores[]=$_REQUEST["apellido"] ;
   $valores[]=$_REQUEST["fecha_nac"] ;
   
   
   $valores[]=$_REQUEST["edad_a"] ;
   $valores[]=$_REQUEST["edad_m"] ;
   $valores[]=$_REQUEST["edad_d"] ;
   
   $valores[]=$_REQUEST["ind_sexo"] ;
   $valores[]=$_REQUEST["inghosp"] ;
   $valores[]=$_REQUEST["codserv"] ;
   $valores[]=$_REQUEST["codinst"] ;
   
   if(($_REQUEST["us_emb"]!="")&&($_REQUEST["us_emb"]!="undefined"))
	$valores[]=$_REQUEST["us_emb"];
   else
   $valores[]=$_SESSION["examrayos"]["usuario"];
   $valores[]=$_REQUEST["solicitud"] ;
   $valores[]=$_REQUEST["obs_diagnostica"] ;
   $valores[]=$_REQUEST["tipo"] ;
   $valores[]=$_REQUEST["sn_contraste"] ;
   if(($_REQUEST["id_emb"]!="")&&($_REQUEST["id_emb"]!="undefined"))
   $valores[]=$_REQUEST["id_emb"] ;
   else
   $valores[]=null ;
   
   if(($_REQUEST["tipo_emb"]!="")&&($_REQUEST["tipo_emb"]!="undefined"))
   $valores[]=$_REQUEST["tipo_emb"] ;
      else
   $valores[]=null ;
   $valores[]=$_REQUEST["sec_neonato"];
   $valores[]=$_REQUEST["desc_neonato"];
   $valores[]=$_REQUEST["sn_amb"];
   
   $recordset = $db->Execute($sql,$valores);
  if (!$recordset) {
   $results["estado"] = "0";
   $results["error"] =$db->ErrorMsg() . print_r($valores,true);
  }  
  else{
     $results["estado"] = "1";
  	
 }
   
}

  
 
  
  $db->disconnect();
    echo json_encode($results);
?>
