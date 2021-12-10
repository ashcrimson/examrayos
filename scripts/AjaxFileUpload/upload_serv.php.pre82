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
	$ida = $_POST['f_req'];
	
	$dir2= '../archivos/virtual/';
	//$dir = 'archs/';
	if (isset($_FILES['archivo_up']['tmp_name'])) {
		if (copy($_FILES['archivo_up']['tmp_name'], $dir.$ida."__".$_FILES['archivo_up']['name'])) 
			{
				$sql = "INSERT INTO archivos (idmensaje,nombre,ruta) ";
				$sql .= "VALUES ($ida,'".$_FILES['archivo_up']['name']."', '".$dir2.$ida."__".$_FILES['archivo_up']['name']."')";

				$personal = $db->Execute($sql);	
				
				$sql1="UPDATE mensajes SET adjunto = 1 where idmensaje = $ida  ";
				$rs = $db->Execute($sql1);
				echo "<script>parent.list_file();</script>";				
			}
			
		else
			{ 
				echo '<script>alert("Error en transferencia de archivo");</script>';
			}
	}
?>
</body>