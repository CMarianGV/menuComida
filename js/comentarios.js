/*Esta variable config es una variable que se utiliza para Firebase que es una plataforma
la cual nos va a permitir almacenar todos los comentarios se puede visualizar uan URL donde
se encuentran almacenados todos los comentarios*/
var config = {
     apiKey: "AIzaSyCoP1JuA4KkvgtJPx5II1j9C2vV9sbak8o",
     authDomain: "menu-restaurante.firebaseapp.com",
     databaseURL: "https://menu-restaurante.firebaseio.com",
     projectId: "menu-restaurante",
     storageBucket: "menu-restaurante.appspot.com",
     messagingSenderId: "327373634763"
   };
/*En esta parte se esta inicializando la base de datos*/
firebase.initializeApp(config);
/*La constante dbref es con la cual mandaremos a llamar a la base de datos dentro de una ramificación
llamada comentarios/ en la cual estaran alamacenados los datos o archivos JSON ya que al ser una base
de datos NoSQL cada paquete de información que quieras guardan se almacena en archivos JSON sin necesidad
de hacer una tabla estructurada*/
const dbref= firebase.database().ref().child('comentarios/');

/*En esta parte por medio de la constante dbref y el metodo .on estamos indicando que por medio del
child_added y la funcion con la variable snapshot obtenemos todos los comentarios de la base de datos
por medio de un array para poder visualizarlos y despues los mandamos al metodo addComment con toda
la información que se va a visualizar en este caso nombre, comentario y fecha en que comento*/
dbref.on("child_added", function(snapshot) {
     let comment = snapshot.val();
     addComment(comment.name, comment.comment, comment.time);
   });
/*Una vez que todos los comentarios ya se obtuvieron es momento de visualizarlos en la pagina por la
constante addComment y con los atributos que se estan recibiendo de la función vamos a mandar a llamar
al id comments que es la sección en la cual se van a mostrar los comentarios y despues por el metodo
ineerHTML indicamos que por medio de las etiquetas h4 mostraremos el nombre de quien comento despues
la fecha y hora en que se realizo el comentario y despues se mostrara el comentario*/
 const addComment = (name, comment, timeStamp) => {
   let comments = document.getElementById("comments");
   comments.innerHTML = `<hr><h4 id="t">${name} comento:<span id="letra">${timeStamp}</span></h4><p id="letra">${comment}</p>${comments.innerHTML}`;
 }
/*Con la función comentar que se mando a llamar en el metodo Onclick en el HTML una vez que se presiona la
mandamos a llamar y empieza el proceso del obtención del comentario y guardarlo en la base de datos*/
function Comentar(){
	//OBTENER LOS DATOS DEL FORMULARIO
    /*Por medio de la constante timeStamp estaremos obteniendo el mes, el dia, el año, la hr y los minutos
    en los cuales se hizo el comentario y vamos a indicar que se va a obtener la fecha local en esta caso de
    México y que la fecha se tiene que mostrar como se escribe en México*/
   const timeStamp = () => {
     let options = {
       month: '2-digit',
       day: '2-digit',
       year: '2-digit',
       hour: '2-digit',
       minute:'2-digit'
     };
     let now = new Date().toLocaleString('es-MX', options);
     return now;
   };

    /*Aqui vamos a obtener por medio del getElementById lo que tenga el id de name y el de comment que
    se especificaron previamente en el documento HTML*/
     let name = document.getElementById("name").value;
     let comment = document.getElementById("comment").value;
     /*Una vez que se obtuvieron por medio de la constante bdref para mandar a llamar a la base de datos
     y por medio de push estamos indicando que se tiene que guargar un nuevo documento JSON con sus
     repectivos campos en este caso el nombre, el comentario y la fecha y hora en la cual se hizo el
     comentario mandando a llamar al metodo timeStamp*/
     if (name && comment) {
       dbref.push({
         name: name,
         comment: comment,
         time: timeStamp()
       });
     }
    /*En esta sección estamos indicando que una vez que el comentario ha sido agregado a la base de datos
    los campos con el id name y el id comment tienen que borrar lo que se escribio para que un nuevo
    comentario pueda ser agregado*/
     document.getElementById("name").value = '';
     document.getElementById("comment").value = '';

  /*las siguientes dos funciones hacen el mismo procedimiento que las primeras pero en este caso es unicamente
  para poder obtener de la base de datos y poder visualizar el comentario que se acaba de realizar*/
   dbref.on("child_added", function(snapshot) {
     let comment = snapshot.val();
     addComment(comment.name, comment.comment, comment.time);
   });

 const addComment = (name, comment, timeStamp) => {
   let comments = document.getElementById("comments");
   comments.innerHTML = `<hr><h4>${name} says<span>${timeStamp}</span></h4><p>${comment}</p>${comments.innerHTML}`;
 }
}
