<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body>
<?php
	require_once('../../conexion/conexion.php');
	include('../../scripts/funciones.php');
	$tipo = substr($_FILES['archivo_up']['type'], 0, 5);
	$dir = $_POST['ruta'];
	$ID_REQ = $_POST['id_req'];
	$TP_DOC= $_POST['tp_doc'];
	$TP_LINEA= '0';
	$TP_ESTADO= '9';
	$FECHA= fecha_sql($_POST['fecha'],"00:00");
	$OBS = $_POST['obs'];
	$dir2= 'archivos/importacion_rep/';
	$NOMBRE_REAL = $_FILES['archivo_up']['name'];
	$NOMBRE_MODIF = limpiar_acentos($NOMBRE_REAL);
	$NOMBRE_ALMACENADO = $dir2.$ID_REQ."__".$TP_LINEA."__".$TP_ESTADO."__".$NOMBRE_MODIF;
	//$dir = 'archs/';
	if (isset($_FILES['archivo_up']['tmp_name'])) {
		if (copy($_FILES['archivo_up']['tmp_name'], $dir.$ID_REQ."__".$TP_LINEA."__".$TP_ESTADO."__".$NOMBRE_MODIF)) 
			{
				$sql = "INSERT INTO ARCHIVOS_REQ (ID_REQ, NOMBRE_REAL, NOMBRE_ALMACENADO, TP_DOC, TP_LINEA, ";
				$sql.= "TP_ESTADO, FECHA, OBS) VALUES ($ID_REQ, '$NOMBRE_REAL', '$NOMBRE_ALMACENADO', $TP_DOC, ";
				$sql.= " $TP_LINEA, $TP_ESTADO, '$FECHA', '$OBS')";
				$personal = $db->Execute($sql);	
				echo $sql;
				echo "<script>parent.list_file();parent.refreshuploader();</script>";				
			}
			
		else
			{ 
				echo '<script>alert("Error en transferencia de archivo");</script>';
			}
	}
?>
</body>