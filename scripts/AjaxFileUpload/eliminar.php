<?php
/**
* eliminar.php
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

<?php
$nmbArch = $_GET['arch'];

if (unlink('archs/'.$nmbArch)) echo 'Archivo Eliminado.';
else echo 'No se pudo Eliminar el archivo, vaya a saber uno porque.';