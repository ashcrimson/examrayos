<?php
header("Expires: Tue, 03 Jul 2001 06:00:00 GMT");
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
/*
   Funcion Script : Libreria de Funciones Globales del Sistema 
   Ultima Modificacion: 05/01/2013  
*/
define('ADODB_ASSOC_CASE',0);
define("BUS",'http://172.25.16.18/bus/webservice/ws.php?wsdl');



require_once 'libs/Smarty/libs/Smarty.class.php';
include "libs/adodb5/adodb.inc.php";
function genera_smarty() {
  $smarty = new Smarty;
  $smarty->template_dir = '../smarty/templates';
  $smarty->compile_dir  = '../smarty/templates_c';
  $smarty->config_dir   = '../smarty/configs';
  $smarty->cache_dir    = '../smarty/cache';
  $smarty->caching = false;
  $smarty->compile_check = true;
  $smarty->debugging = false;
  return $smarty;
}
function genera_adodb($tipo=null){
    if($tipo=="portal"){
       $db=NewADOConnection("oci8po://portal:portal@172.25.23.84:1521/orcl");
    }
    else{
    $db=NewADOConnection("oci8po://examrayos:examrayos@172.25.23.84:1521/orcl");
    }
  if(!$db){
    $db->ErrorMsg();
  }
  $db->SetFetchMode(ADODB_FETCH_ASSOC);
  
  return $db;
}

function genera_adodb_portal(){

  $db=NewADOConnection("oci8po://portal:portal@172.25.23.84:1521/orcl");
  if(!$db){
    $db->ErrorMsg();
  }
  $db->SetFetchMode(ADODB_FETCH_ASSOC);
  
  return $db;
}


function verifica_sesion($redir = true) {
  if (!isset($_SESSION) || count($_SESSION) < 1) {
    session_start();
  }
  if (!isset($_SESSION['email']) && $redir) {
    header('Location: index.php');
    exit(0);
  }
}
function verifica_sesion1($redir = true) {
  if (!isset($_SESSION["registrominsal"]) || count($_SESSION["registrominsal"]) < 1) {
    ini_set("session.cookie_domain", ".hospitalnaval.cl");
    session_start();
   
   
    

  }
  if (!isset($_SESSION["registrominsal"]['usuario']) && $redir) {
    header('Location: index.php');
    exit(0);
  }
  if (!isset($_SESSION["portal"]['email'])) {
    header('Location: http://registrosclinicos.hospitalnaval.cl');
    exit(0);
  }
}
function datos_usuariod($db, &$arreglo, $run) {
  
  $res=array();
  $valores=array();
  $valores[]=$run;
  $recordset = $db->Execute("select * from usuario where email=? ",$valores);
    if (!$recordset) die($db->ErrorMsg());  
  $encontrado=0;

  while ($arr = $recordset->FetchRow()) {

    foreach($arr as $c => $v)
      $arreglo[$c]=utf8_encode($v);
    $encontrado=1;
  }
  if ($encontrado==0){
    return;
  }
  return;
}
function datos_usuario($db, &$arreglo, $cod_u,$clave) {
  $res=array();
  $valores=array();
  if(count(split('@',$cod_u))>1)
    $email   = $cod_u;
  else
    $email   = $cod_u."@sanidadnaval.cl";
  $valores[]=$email;
  $valores[]=$cod_u;
  if($clave =="")
    $clave=" ";
  $valores[]=$clave;
  $recordset = $db->Execute("select * from usuario where ((email=? and ind_auth=1) or (email=? and clave=toolkit.encrypt(?) and ind_auth=2))",$valores);
  if (!$recordset) die($db->ErrorMsg());
  $encontrado=0;
  while ($arr = $recordset->FetchRow()) {
    foreach($arr as $c => $v)
      $arreglo[$c]=utf8_encode($v);
    $encontrado=1;
  }
  if ($encontrado==0){
    return;
  }
  return;
}

?>