<?php
/**
* controlUpload2.php
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
	<title>Ajax File Upload - uploadControl2.php</title>
	<link rev="made" href="mailto:rdsuarez@gmail.com" />
	<link rel="shortcut icon" href="../favicon.ico" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body>
<?php
	//	Script Que copia el archivo temporal subido al servidor en un directorio.
	$tipo = substr($_FILES['fileUpload']['type'], 0, 5);

	//	Definimos Directorio donde se guarda el archivo
	$dir = 'archs/';

	//	Intentamos Subir Archivo
	//	(1) Comprovamos que existe el nombre temporal del archivo
	if (isset($_FILES['fileUpload']['tmp_name'])) {
		//	(2) - Comprovamos que se trata de un archivo de imágen
		if ($tipo == 'image') {
			//	(3) Por ultimo se intenta copiar el archivo al servidor.
			if (!copy($_FILES['fileUpload']['tmp_name'], $dir.$_FILES['fileUpload']['name']))
				echo '<script> alert("Error al Subir el Archivo");</script>';
			else 
				echo '<script> alert("El archivo '.$_FILES['fileUpload']['name'].' se ha copiado con Exito");</script>';
		}
		else echo '<script> alert("El Archivo que se intenta subir NO ES del tipo Imagen.");</script>';
	}
	else echo '<script> alert("El Archivo no ha llegado al Servidor.");</script>';
?>
</body>

</html>