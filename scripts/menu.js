	iva=1.19;

	function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
		return [curleft,curtop];
	}

/*
	function mostrar(menu) {
		if (menu.id != 'menu_cotizacion') $('menu_cotizacion').style.display='none';
		if (menu.id != 'menu_negocios') $('menu_negocios').style.display='none';
		if (menu.id != 'menu_garantia') $('menu_garantia').style.display='none';
	
		if (menu.id != 'menu_logistica') $('menu_logistica').style.display='none';
		if (menu.id != 'menu_repuestos') $('menu_repuestos').style.display='none';
		if (menu.id != 'menu_servicios') $('menu_servicios').style.display='none';
		if (menu.id != 'menu_maquinas') $('menu_maquinas').style.display='none';
		if (menu.id != 'menu_reportes') $('menu_reportes').style.display='none';
		if (menu.id != 'menu_sgc') $('menu_sgc').style.display='none';
		if (menu.id != 'menu_documentos') $('menu_documentos').style.display='none';
		if (menu.id != 'menu_administracion') $('menu_administracion').style.display='none';
		Element.toggle(menu);
	}*/
	
	function cambiar_pagina(titulo,mostrar,numero) {
		var formulario= '';
		var parametro = '';
if (mostrar=="tprioridad") {
		//alert('1');
			formulario = 'contenido/tprioridad.php';
		}
		if (mostrar=="usuarios") {
		//alert('1');
			formulario = 'contenido/usuarios.php';
		}
		
		if (mostrar=="examenes") {
		//alert('1');
			formulario = 'contenido/examenes.php';
		}
		if (mostrar=="admision_pab1") {
		//alert('1');
			formulario = 'contenido/admision_pab1.php';
		}
		if (mostrar=="perfil") {
		//alert('1');
			formulario = 'contenido/perfiles.php';
		}
		
		if (mostrar=="organizacion") {
		//alert('1');
			formulario = 'contenido/organizacion.php';
		}
		
		
		if (mostrar=="casilla") {
		//alert('1');
			formulario = 'contenido/tpcasilla.php';
		}
		if (mostrar=="control") {
		//alert('1');
			formulario = 'contenido/control.php';
		}
	if (mostrar=="mensaje") {
		//alert('1');
			//formulario = 'contenido/0101.php';
			formulario = 'contenido/distribuirmensaje.php';
		}
		
		if (mostrar=="busqueda") {
		//alert('1');
			formulario = 'contenido/busqueda.php';
		}
		if (mostrar=="flujo") {
		//alert('1');
			formulario = 'contenido/0104.php';
		}
		if (mostrar=="ingreso") {
		//alert('1');
			parametro ='&idmensaje=-1'; 
			formulario = 'contenido/ingreso.php';
		
		}
		if (mostrar=="visados") {
		//alert('1');
			parametro ='&dia11='; 
		
			formulario = 'contenido/visadosalida.php';
		
		}

		if (mostrar=="msj_devuelto") {
			parametro ='&tiporeporte=0'; 
			mostrar ="devuelto";
			formulario = 'devueltos/devueltos.php';
		}

		if (mostrar=="estadisticaodm") {
			parametro =''; 
			mostrar ="estadisticaodm";
			formulario = 'informes/estadisticaodm.php';
		}
		
		if (mostrar=="doc_devuelto") {
			parametro ='&tiporeporte=1'; 
			mostrar ="devuelto";
			formulario = 'devueltos/devueltos.php';
		}

		if (mostrar=="estado") {
		//alert('1');
			formulario = 'contenido/estado.php';
		}

		if (mostrar=="estadodoc") {
			formulario = 'docnavales/estado.php';
		}

		if (mostrar=="avancerx") {
			parametro ='&tiporeporte=0'; 
			mostrar ="avance";
			formulario = 'informes/avance.php';
		}

		if (mostrar=="avancetx") {
			parametro ='&tiporeporte=1'; 
			mostrar ="avance";
			formulario = 'informes/avance.php';
		}

		if (mostrar=="sinrespuestarx") {
			parametro ='&tiporeporte=0'; 
			mostrar ="sinrespuesta";
			formulario = 'informes/sinrespuesta.php';
		}

		if (mostrar=="sinrespuestatx") {
			parametro ='&tiporeporte=1'; 
			mostrar ="sinrespuesta";
			formulario = 'informes/sinrespuesta.php';
		}

		if (mostrar=="directornoinfo") {
			parametro =''; 
			formulario = 'informes/directornoinfo.php';
		}

		if (mostrar=="memo") {
		//alert('1');
			parametro ='&identificador=-1'; 
			formulario = 'docnavales/memo.php';
		}
		if (mostrar=="oficio") {
		//alert('1');
		
			parametro ='&identificador=-1'; 
			formulario = 'docnavales/oficio.php';
		}
		if (mostrar=="resolucion") {
		//alert('1');
		
			parametro ='&identificador=-1'; 
			formulario = 'docnavales/resolucion.php';
		}
		
		if (mostrar=="busqueda_docs") {
		//alert('1');
			formulario = 'docnavales/busqueda_docs.php';
		}
		if (mostrar=="flujo_doc") {
		//alert('1');
			formulario = 'docnavales/flujo_doc.php';
		}
		if (mostrar=="visadoc") {
		//alert('1');
			formulario = 'docnavales/flujo_doc_salida.php';
		}
		
		if (mostrar=="documentosxdistribuir") {
			formulario = 'contenido/distribuirdocumento.php';
		}

		if (mostrar=="cambio_clave") {
			formulario = 'cambio_clave.php';
			opc_menu = '0';
		}
		
	if (mostrar=="protocolo") {
		//alert('1');
			formulario = 'contenido/protocolo.php';
		}
		

//Administracion
		//alert('2');
		
	//	$('titulogrande').cambiapor = titulo;
	//	$('reloj_cargando').style.display='block';
	//	window.document.body.style.cursor='wait';
	//	alert('2.2');
		var myAjax = new Ajax.Updater(
		
			'contenido2', 
			formulario, 
			{
				
		
				method: 'get', 
				parameters: 'form=' + mostrar+parametro,
				evalScripts: true,
				onSuccess: function() {
			//		alert('3');
					Element.remove('contenido2');
					new Insertion.Top('contenedor','<div id=\'contenido2\' class=\'content\'   align=\'center\'></div>');
				}
			}
		);
					//$('contenido').style.display='block';
					//$('titulogrande').innerHTML=$('titulogrande').cambiapor;
					//$('reloj_cargando').style.display='none';
					window.document.body.style.cursor='default';
	}
	
	function cambiar_pagina2(titulo,mostrar) {
		var formulario='';
		var parametro = '';

		if (mostrar=="visados") {
		//alert('1');
			parametro ='&dia='+titulo; 
		
			formulario = 'contenido/visadosalida.php';
		
		}
	

//Administracion
		//alert('2');
		
	//	$('titulogrande').cambiapor = titulo;
	//	$('reloj_cargando').style.display='block';
	//	window.document.body.style.cursor='wait';
	//	alert('2.2');
		var myAjax = new Ajax.Updater(
		
			'contenido2', 
			formulario, 
			{
				
		
				method: 'get', 
				parameters: parametro,
				evalScripts: true,
				onSuccess: function() {
			//		alert('3');
					Element.remove('contenido2');
					new Insertion.Top('contenedor','<div id=\'contenido2\'class=\'content\' align=\'center\'></div>');
				}
			}
		);
					//$('contenido').style.display='block';
					//$('titulogrande').innerHTML=$('titulogrande').cambiapor;
					//$('reloj_cargando').style.display='none';
					window.document.body.style.cursor='default';
	}
	function cambiar_pagina3(titulo,mostrar) {
		var formulario='';
		var parametro = '';

		
	if (mostrar=="visados") {
		//alert('1');
			parametro ='&dia='+titulo; 
		
			formulario = 'contenido/admision_pab1.php';
		}
	

//Administracion
		//alert('2');
		
	//	$('titulogrande').cambiapor = titulo;
	//	$('reloj_cargando').style.display='block';
	//	window.document.body.style.cursor='wait';
	//	alert('2.2');
		var myAjax = new Ajax.Updater(
		
			'contenido2', 
			formulario, 
			{
				
		
				method: 'get', 
				parameters: parametro,
				evalScripts: true,
				onSuccess: function() {
			//		alert('3');
					Element.remove('contenido2');
					new Insertion.Top('contenedor','<div id=\'contenido2\'class=\'content\' align=\'center\'></div>');
				}
			}
		);
					//$('contenido').style.display='block';
					//$('titulogrande').innerHTML=$('titulogrande').cambiapor;
					//$('reloj_cargando').style.display='none';
					window.document.body.style.cursor='default';
	}
	function isDate(dateStr) {

    var datePat = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var matchArray = dateStr.match(datePat); // is the format ok?

    if (matchArray == null) {
        return false;
    }

    month = matchArray[3]; // parse date into variables
    day = matchArray[1];
    year = matchArray[4];

    if (month < 1 || month > 12) { // check month range
        return false;
    }

    if (day < 1 || day > 31) {
        return false;
    }

    if ((month==4 || month==6 || month==9 || month==11) && day==31) {
        return false;
    }

    if (month == 2) { // check for february 29th
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day==29 && !isleap)) {
            return false;
        }
    }
	
    return true; // date is valid
}

	function serializar(objeto) {
		
		serializado=$(objeto).serialize();
		serializado=serializado.replace($(objeto).id+'=','');
			
		return serializado;
		
	}
	
	function sel_valor(objeto, valor) {
		
		selector = $(objeto);
		
		selector.selectedIndex=0;
		
		for(i=0;i<selector.options.length;i++) {
			if(selector.options[i].value==valor) selector.selectedIndex=i;
		}
		
	}
	
	function formatoDinero(num) {
		num = num.toString().replace(/\$|\,/g,'');
		if(isNaN(num))
		num = "0";
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(num*100+0.50000000001);
		cents = num%100;
		num = Math.floor(num/100).toString();
		if(cents<10)
		cents = "0" + cents;
		for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
		num = num.substring(0,num.length-(4*i+3))+'.'+
		num.substring(num.length-(4*i+3));
		return (((sign)?'':'-') + '$' + num + ',' + cents);
	}
	
	function serializar_objetos(fuente) {
	
		var registros = new Object;
			
		// Toma los inputs dentro de la fuente...
	
		campos=$(fuente).getElementsByTagName('input');
			
			for(a=0;a<campos.length;a++) {
				switch(campos[a].type.toLowerCase()) {
				case 'checkbox':
					registros[campos[a].name]=campos[a].checked;
					break;
				default:
					registros[campos[a].name]=campos[a].value;
					break;
				}
			}
			
			offset=campos.length;
	
		// Toma los selects dentro de la fuente...
			
		campos=$(fuente).getElementsByTagName('select');
			
			for(a=0;a<campos.length;a++) {
				registros[campos[a].name]=campos[a].value;
			}
			
		return $H(registros).toQueryString();
	
	}
	
	function trim(str)
	{
  		 return str.replace(/^\s*|\s*$/g,"");
	}
	
	String.prototype.repeat = function(multiplier) {
    var newString = '';

    for (var i = 0; i < multiplier; i++) {
        newString += this;
    }

    return newString;
	} 

	function html_entity_decode(str) {
	  var ta=document.createElement("textarea");
	  ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
	  return ta.value;
	}
	
	
		mousein_tr = function(fila,clase) {
			if (fila.className!="tabla_selected") {
				fila.className=clase;
			}
		}

		mouseout_tr = function(fila,clase) {
			if (fila.className!="tabla_selected") {
				fila.className=clase;
			}
		}
		
		seleccionar_tr = function(tabla,fila){
			elementos = getElementsByAttribute(document.getElementById(tabla), "tr", "id");
			for (var i=0; i<elementos.length; i++) {
				if((i%2)==0) {
					elementos[i].className = "tabla_fila";
				} else {
					elementos[i].className = "tabla_fila2";
				}
	    }
	    elementos[fila].className="tabla_selected";
		}

		seleccionar_tr = function(tabla,fila){
			elementos = getElementsByAttribute(document.getElementById(tabla), "tr", "id");
			for (var i=0; i<elementos.length; i++) {
				if((i%2)==0) {
					elementos[i].className = "tabla_fila";
				} else {
					elementos[i].className = "tabla_fila2";
				}
	    }
	    elementos[fila].className="tabla_selected";
		}

		limpia_seleccion = function(tabla){
			elementos = getElementsByAttribute(document.getElementById(tabla), "tr", "id");
			for (var i=0; i<elementos.length; i++) {
				if((i%2)==0) {
					elementos[i].className = "tabla_fila";
				} else {
					elementos[i].className = "tabla_fila2";
				}
	    }
		}
		
		
	function resizetable(tabla_header, tabla_body, contenedor) {   
		thetableh = document.getElementById(tabla_header);   
		thetableb = document.getElementById(tabla_body); 
		divcontenedor = document.getElementById(contenedor); 
		//numberOfcolumns = thetableh.firstChild.firstChild.childNodes.length-1;   
		numberOfcolumns = document.getElementById(tabla_header).getElementsByTagName('tr')[0].getElementsByTagName('td').length -1 ;
		var alto_tabla = thetableb.offsetHeight*1;
		var alto_div = divcontenedor.offsetHeight*1;
		if (alto_tabla<alto_div){
				addColumn(tabla_body);
				numberOfcolumns=numberOfcolumns+1;
		}
		for(i = 0;i < numberOfcolumns; i++) {  
			//tableCellwidth= thetableh.firstChild.firstChild.childNodes[i].style.width;
			//thetableb.firstChild.firstChild.childNodes[i].style.width = tableCellwidth;     
			//alert(document.getElementById(tabla_header).getElementsByTagName('tr')[0].getElementsByTagName('td')[i].offsetWidth);
			tableCellwidth= document.getElementById(tabla_header).getElementsByTagName('tr')[0].getElementsByTagName('td')[i].offsetWidth;
			//tableCellwidth= document.getElementById(tabla_header).getElementsByTagName('tr')[0].getElementsByTagName('td')[i].style.width;
			document.getElementById(tabla_body).getElementsByTagName('tr')[0].getElementsByTagName('td')[i].style.width = tableCellwidth;     
			
		}   
	}
	
	function addColumn(tblId)	{
		var tblBodyObj = document.getElementById(tblId).tBodies[0];
		for (var i=0; i<tblBodyObj.rows.length; i++) {
			var newCell = tblBodyObj.rows[i].insertCell(-1);
			newCell.innerHTML = '<font size="1px">&nbsp;</font>';
		}
	}

	function sel_tr(tabla,fila, css1, css2, css3){
		elementos = getElementsByAttribute(document.getElementById(tabla), "tr", "id");
		for (var i=0; i<elementos.length; i++) {
			if((i%2)==0) {
				elementos[i].className = css1;
			} else {
				elementos[i].className = css2;
			}
		}
		elementos[fila].className= css3;
	}

	function unsel_tr(tabla, css1, css2){
		elementos = getElementsByAttribute(document.getElementById(tabla), "tr", "id");
		for (var i=0; i<elementos.length; i++) {
			if((i%2)==0) {
				elementos[i].className = css1;
			} else {
				elementos[i].className = css1;
			}
	  }
	}
	
	
	mouseintr = function(tabla, fila,clase,csssel) {
		if (document.getElementById(tabla+"_"+fila).className!=csssel) {
			document.getElementById(tabla+"_"+fila).setAttribute("class",clase);
		}
	}

	mouseouttr = function(tabla,fila,clase,csssel) {
		if (document.getElementById(tabla+"_"+fila).className!=csssel) {
			document.getElementById(tabla+"_"+fila).setAttribute("class",clase);
		}
	}

	h_i = function(objeto){
		objeto.style.cursor='pointer';
	}

	h_o = function(objeto){
		objeto.style.cursor='default';
	}