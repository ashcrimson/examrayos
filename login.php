<?php
$salida=array();
require_once 'funciones.global.inc.php';
require_once 'funciones.inc.php';
verifica_sesion(false);
session_destroy();
unset($_SESSION["ram"]);
verifica_sesion(false);
$db=genera_adodb();
$cod_u = null;
$clave = '';
$correcta = -1;
if (isset($_REQUEST['email'])) {
  $cod_u   = $_REQUEST['email'];
  $clave = $_REQUEST['clave'];
 }
if (isset($cod_u)) {
$db = genera_adodb();
datos_usuario($db, $_SESSION["ram"], $cod_u,$clave);
if($_SESSION["ram"]["ind_auth"] == 1){
  if(isset($clave)){
    require_once('libs/nusoap/lib/nusoap.php');
    $usuario=split('@',$_SESSION["ram"]["email"]);
    $client = new soapclient('http://172.25.16.18/bus/webservice/ws.php?wsdl');
    $result = $client->call('autentifica_ldap', array('id' =>$usuario[0],'clave'=>$clave));
                    $result["resp"]= 1;
    if($result["resp"]== 1){
      $correcta=1;
    }
    else{
      $correcta=0;
    }
  }
 }
 else{
   $correcta=1;
 }
unset($_SESSION["ram"]['clave']);
$db->disconnect();
}
    
    
    
if ( isset( $_SESSION["ram"]['email'] ) && $correcta == 1 ) {  
  $salida['estado'] = 1;
  $_SESSION["ram"]["usuario"]=$cod_u;
  if($_SESSION["ram"]["tipo_usuario"]==1){
      $_SESSION["ram"]["menu"]["Interconsultas"]="Vistas/Interconsultas.php";
      $_SESSION["ram"]["menu"]["Procedimientos"]="Vistas/Procedimientos.php";

    }
    elseif($_SESSION["ram"]["tipo_usuario"]==2){
      $_SESSION["ram"]["menu"]["Interconsultas"]="Vistas/Interconsultas.php";
 

    }
    elseif($_SESSION["ram"]["tipo_usuario"]==3){
      $_SESSION["ram"]["menu"]["Procedimientos"]="Vistas/Procedimientos.php";

    }
    elseif($_SESSION["ram"]["tipo_usuario"]==4){
      $_SESSION["ram"]["menu"]["Usuarios"]="Vistas/Usuarios.php";

    }
}
else {
  $_SESSION["ram"] = array();
  //  $salida['estado'] = $result["resp"];
  //$salida['mensaje'] = $result["mensaje"];
    $salida['estado'] = 0;
   $salida['mensaje'] = "Usuario sin acceso al Sistema";
}
$db->disconnect();
echo json_encode($salida);
?>
