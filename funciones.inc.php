<?php
function retorna_edad_exacta($fn){
  $fecha_de_nacimiento = substr($fn,0,4)."-".substr($fn,5,2)."-".substr($fn,8,2);
  $fecha_actual = date ("Y-m-d"); 
  $array_nacimiento = explode ( "-", $fecha_de_nacimiento );
  $array_actual = explode ( "-", $fecha_actual );
  $anos =  $array_actual[0] - $array_nacimiento[0];
  $meses = $array_actual[1] - $array_nacimiento[1]; 
  $dias =  $array_actual[2] - $array_nacimiento[2]; 
  if ($dias < 0)
    { 
    
      --$meses;   
switch ($array_actual[1]) {
  case 1:     $dias_mes_anterior=31; break;
  case 2:     $dias_mes_anterior=31; break;
  case 3: 
    if (bisiesto($array_actual[0]))
      {
	$dias_mes_anterior=29; break;
      } else {
      $dias_mes_anterior=28; break;
    }
  case 4:     $dias_mes_anterior=31; break;
  case 5:     $dias_mes_anterior=30; break;
  case 6:     $dias_mes_anterior=31; break;
  case 7:     $dias_mes_anterior=30; break;
  case 8:     $dias_mes_anterior=31; break;
  case 9:     $dias_mes_anterior=31; break;
  case 10:     $dias_mes_anterior=30; break;
  case 11:     $dias_mes_anterior=31; break;
  case 12:     $dias_mes_anterior=30; break;
  }

  $dias=$dias + $dias_mes_anterior;
} 
   if ($meses < 0)
    {
      --$anos;
      $meses=$meses + 12;
   } 
   $edad=array();
   $edad["a"]=$anos;
   $edad["m"]=$meses;
   $edad["d"]=$dias;
   return $edad;
}

function bisiesto($anio_actual){
  $bisiesto=false; 
if (checkdate(2,29,$anio_actual))
  {
    $bisiesto=true;
  }
return $bisiesto;
}
function retorna_datos_portal($db,$us){
       $recordset = $db->Execute("select nombres,apellido_paterno ,apellido_materno from usuario where email=?",array($us));
  if (!$recordset) die("hhh".$db->ErrorMsg());  
  $nombre="";
while ($arr = $recordset->FetchRow()) {
     
     $nombre=implode(" ",$arr);
  }
 return $nombre;
  
}

?>