$(document).ready(function(){
       $('.carousel.carousel-slider').carousel({fullWidth: true});
        $(".button-collapse").sideNav({
	      menuWidth: 150,
	    });
    });

document.getElementById("orden").setAttribute("hidden","true");

// Array con los ids de los checkbox
var ids=["brioche","concha","cuernito","dona1","dona2","muffin","chilaquiles","campesino","huevos","panini","club","vegetariano","cheesecake","pastel","frutas1","frutas2","hotCakes","tarta","caldo","ensaladaMexicana","ensaladaChef","sopaTortilla","sopaHuerta","sopaEspecial","camarones","cecina","enchiladas","filetePescado","milanesa","tacos","malteada","smoothie","helado","banana","teFrio","raspado","caldoOlla","consome","ensaladaPollo","quesoFundido","sopaFideo","sopaHongos","alitas","hamburguesa","milanesaHawaiana","molletes","omelett","sandwich","cheesecakeFresa","cheesecakeGuayaba","crepaHelado","crepas","payLimon","Waffles","cerveza","margarita","mojitos","vinoTinto","piñaColada","vodkaSabores","cafeAmericano","expresso","chocolate","teOrganico","capuccino","tizana","teFrutos","aguasSabor","refresco","smoothie","frapuccino","jugosNaturales"];

//FUNCION PARA CHECAR LOS INPUT QUE SELECCIONO EL USUARIO Y OBTENER EL NOMBRE DE LA COMIDA E IR SUMANDO EL PRECIO
function checarElementos(){
	var pedido=[]; //ARRAY PARA ALMACENAR LOS OBJETOS CON LA INFORMACION DE LAS COMIDAS QUE EL USUARIO PIDIO
	var totalPrecio=0; //VARIABLE PARA IR SUMANDO LOS PRECIOS DE LAS COMIDAS
	document.getElementById("orden").removeAttribute("hidden");
	document.getElementById("tabla").innerHTML='';
	//SE ITERA SOBRE EL ARRAY DE IDS
	ids.forEach(function(item,index,arra){
		let elemento=document.getElementById(item);//OBTENEMOS EL ELEMENTO
		//SE VERIFICA SI EL INPUT A SIDO SELECCIONADO O NO
		if(elemento.checked==true){
			//EN CASO DE HABER SIDO SELECCIONADO

			let obj=JSON.parse(elemento.value);//LA CADENA OBTENIDA DE SU PROPIEDAD VALUE SE PASA A UN OBJETO JSON
			//EL OBJETO SE ALMACENA EN EL ARRAY PEDIDO
			pedido.push(obj);
			totalPrecio+=obj.precio;//EL PRECIO DE CADA COMIDA SE VA SUMAND
		 }
	});
	// SE SELECCIONA LA TABLA
	let tabla=document.getElementById("tabla");
	//FUNCION ITERAR SOBRE LOS OBJETOS DE LA COMIDA
	pedido.forEach(function(item,index,arra){
		//SE AGREGA A LA TABLA EL NOMBRE DE LA COMIDA Y SU PRECIO
		tabla.innerHTML+='<tr><td>'+item.descripcion+'</td>'+'<td>'+item.precio+'</td></tr>';
	});

	//AL FINAL DE LA TABLA SE AGREGA EL TOTAL
	tabla.innerHTML+='<tr><td>Total:</td>'+'<td>'+totalPrecio+'</td></tr>';
	//SE RESETEAN LOS CHECKBOX DE LA CARTA
	document.getElementById("frmCarta").reset();
}

//-------------------------------------------FIREBASE-----------------------------------------------------

  function Comentar(){
	  	var config = {
	    apiKey: "AIzaSyCoP1JuA4KkvgtJPx5II1j9C2vV9sbak8o",
	    authDomain: "menu-restaurante.firebaseapp.com",
	    databaseURL: "https://menu-restaurante.firebaseio.com",
	    projectId: "menu-restaurante",
	    storageBucket: "menu-restaurante.appspot.com",
	    messagingSenderId: "327373634763"
	  };
  	//OBTENER LOS DATOS DEL FORMULARIO
  	var name=document.getElementById("name").value.toString();
  	var comment=document.getElementById('comment').value.toString();

  	firebase.initializeApp(config);

  	firebase.database().ref('comentarios/').push({
	    nombre: name,
	    comentario: comment
	  });

  	document.getElementById("formulario").reset();
  }
