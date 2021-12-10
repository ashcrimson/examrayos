<?php
/**
* upload3.php
*
* @uses ejemplo de uso
* @version 1.0
* @author Damian Suarez
*
* Este Archivo forma parte de un conjunto de archivos posteados en un tutorial denominado 'Ajax File Upload ?'
* Dicho post se encuentra en http://cabeza-de-raton.blogspot.com/2007/02/ajax-file-upload_4846.html
* 
* Mi Blog: http://blog.cabezaderaton.com.ar
* Mi Email: rdsuarez@gmail.com
*/
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es">
<head>
	<title>Ajax File Upload - Formulario</title>
	<link rev="made" href="mailto:rdsuarez@gmail.com" />
	<link rel="shortcut icon" href="../favicon.ico" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>


<script type="text/javascript">
	function resultadoUpload(estado, file) {

	var link = '<br /><br /><a href="upload3.php">Subir Archivo</a> - <a href="verArchivos.php">Ver Imagenes</a>';

	if (estado == 0) var mensaje = 'El Archivo <a href="archs/' + file + '" target="_blank">' + file + '</a> se ha subido al servidor correctamente' + link;
	if (estado == 1) var mensaje = 'Error ! - El Archivo no llego al servdor' + link;
	if (estado == 2) var mensaje = 'Error ! - Solo se permiten Archivos tipo Imagen' + link;
	if (estado == 3) var mensaje = 'Error ! - No se pudo copiar Archivo. Posible problema de permisos en server' + link;

	document.getElementById('formUpload').innerHTML=mensaje;
	}
</script>

<style>
#formUpload {
	width: 600px;
	height: 60px;
	border: 1px solid #aaa;
	background: #EEE;
	padding: 5px;
}

#formUpload input {border: 1px solid #AAA}
</style>

</head>

<body>
<div id="formUpload">
	<form method="post" enctype="multipart/form-data" action="controlUpload3.php" target="iframeUpload">
		Archivo: <input name="fileUpload" type="file" onchange="javascript: submit();" />
		<br /><iframe name="iframeUpload" style="display:none"></iframe>
	</form>
	</body>
</div>

</html>