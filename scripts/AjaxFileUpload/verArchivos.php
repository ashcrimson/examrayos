<?php
/**
* verArchivos.php
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
	<title>Imagenes Subidas</title>
	<link rev="made" href="mailto:rdsuarez@gmail.com" />
	<link rel="shortcut icon" href="../favicon.ico" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<style>
p {
	margin: 2px;
	padding: 2px;
	background: #EEE;
	border: #AAA;
	}

a {
	font-size: 90%;
	text-decoration: none;
	}
</style>

<body>
<h4>Imagenes Subidas al server</h4>
<p>Sientesa libre de Borralas</p>
<?php
$d = "archs/";
// Crea una lista de los ficheros
// del directorio

if ($handle = opendir($d)) {
	while (false !== ($file = readdir($handle)))
	{
	if (is_file($d.$file)) {
	echo '<p><b><a href="archs/'.$file.'" TARGET="_blank">'.$file.'</a></b></p>';
	}
}
			
closedir($handle);
}
?>

<p><a href="upload3.php"><h4>Subir Otro Archivo</h4></a></p>
</body>

</html>