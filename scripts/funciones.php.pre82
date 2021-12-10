<?php

	function fecha_sql2($fecha) {
		$dia=substr($fecha,0,2);
		$mes=substr($fecha,3,2);
		$ano=substr($fecha,6,4);
		$fecha_visible=$ano."-".$mes."-".$dia;
		return $fecha_visible;
	}
	
	function fecha_sql($fecha, $hora) {
		$dia=substr($fecha,0,2);
		$mes=substr($fecha,3,2);
		$ano=substr($fecha,6,4);
		$hora= $hora.":00";
		$fecha_visible=$ano."-".$mes."-".$dia." ".$hora;
		return $fecha_visible;
		}
		
	function fecha_vis($fecha) {
		$ano=substr($fecha,0,4);
		$mes=substr($fecha,5,2);
		$dia=substr($fecha,8,2);
		$fecha_visible=$dia."-".$mes."-".$ano;
		return $fecha_visible;
		}
		
	function fecha_hora_vis($fecha, $hora) {
		$dia=substr($fecha,0,4);
		$mes=substr($fecha,5,2);
		$ano=substr($fecha,8,2);
		$fecha_visible=$dia."-".$mes."-".$ano." ".$hora.":00";
		return $fecha_visible;
		}
		
		function fecha_visf($fecha) {
		$ano=substr($fecha,0,4);
		$mes=substr($fecha,5,2);
		$dia=substr($fecha,8,2);
		$hora=substr($fecha,10,9);
		$fecha_visible=$dia."-".$mes."-".$ano." ".$hora;
		return $fecha_visible;
		}

		function MsgBox($str)
		{
		$language = "language=\"javascript\"";
		
		echo "<script $language>\n";
		echo " alert('$str');\n";
		echo "</script>\n";
		}
		
		function puntos_cm ($medida, $resolucion=72)
		{
		   //// 2.54 cm / pulgada
		   return ($medida/(2.54))*$resolucion;
		}
		
		function limpiar_acentos($s) {
			$s = ereg_replace("[áàâãªä]","a",$s);
			$s = ereg_replace("[ÁÀÂÃÄ]","A",$s);
			$s = ereg_replace("[ÍÌÎÏ]","I",$s);
			$s = ereg_replace("[íìîï]","i",$s);
			$s = ereg_replace("[éèêë]","e",$s);
			$s = ereg_replace("[ÉÈÊË]","E",$s);
			$s = ereg_replace("[óòôõºö]","o",$s);
			$s = ereg_replace("[ÓÒÔÕÖ]","O",$s);
			$s = ereg_replace("[úùûü]","u",$s);
			$s = ereg_replace("[ÚÙÛÜ]","U",$s);
			$s = str_replace("ç","c",$s);
			$s = str_replace("Ç","C",$s);
			$s = str_replace("ñ","n",$s);
			$s = str_replace("Ñ","N",$s);			
			$s = str_replace("'","´",$s);		
			return $s;
		}		
		
?>