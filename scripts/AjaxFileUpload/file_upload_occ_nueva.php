<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body>
<?php

	require_once('../../conexion/conexion.php');
	$tipo = substr($_FILES['archivo_up']['type'], 0, 5);
	$dir = $_POST['ruta'];
	$req = $_POST['f_cot'];
	$cot = $_POST['f_cot'];
	$dir2= 'archivos/clientes/';
	//$dir = 'archs/';
	if (isset($_FILES['archivo_up']['tmp_name'])) {
		if (copy($_FILES['archivo_up']['tmp_name'], $dir.$req."__".$cot."__".$_FILES['archivo_up']['name'])) 
			{
				$sql = "INSERT INTO ARCHIVOS_OC_CLIENTES (ID_REQ, ID_COT, NOMBRE_REAL, NOMBRE_ALMACENADO) ";
				$sql .= "VALUES ($req, $cot,'".$_FILES['archivo_up']['name']."', '".$dir2.$req."__".$cot."__".$_FILES['archivo_up']['name']."')";
				
				$personal = $db->Execute($sql);	
				//ECHO($sql);
				echo "<script>parent.list_file();</script>";				
			}
			
		else
			{ 
				echo '<script>alert("Error de transferencia ");</script>';
			}
	}
?>
</body>