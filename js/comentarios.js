var config = {
     apiKey: "AIzaSyCoP1JuA4KkvgtJPx5II1j9C2vV9sbak8o",
     authDomain: "menu-restaurante.firebaseapp.com",
     databaseURL: "https://menu-restaurante.firebaseio.com",
     projectId: "menu-restaurante",
     storageBucket: "menu-restaurante.appspot.com",
     messagingSenderId: "327373634763"
   };

firebase.initializeApp(config);
const dbref= firebase.database().ref().child('comentarios/');

dbref.on("child_added", function(snapshot) {
     let comment = snapshot.val();
     addComment(comment.name, comment.comment, comment.time);
   });

 const addComment = (name, comment, timeStamp) => {
   let comments = document.getElementById("comments");
   comments.innerHTML = `<hr><h4>${name} says<span>${timeStamp}</span></h4><p>${comment}</p>${comments.innerHTML}`;
 }

function Comentar(){
	//OBTENER LOS DATOS DEL FORMULARIO
   // const form = document.querySelector("form");

   // form.addEventListener("submit", postComment);

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

   
     let name = document.getElementById("name").value;
     let comment = document.getElementById("comment").value;

     if (name && comment) {
       dbref.push({
         name: name,
         comment: comment,
         time: timeStamp()
       });
     }

     document.getElementById("name").value = '';
     document.getElementById("comment").value = '';
   

   dbref.on("child_added", function(snapshot) {
     let comment = snapshot.val();
     addComment(comment.name, comment.comment, comment.time);
   });

 const addComment = (name, comment, timeStamp) => {
   let comments = document.getElementById("comments");
   comments.innerHTML = `<hr><h4>${name} says<span>${timeStamp}</span></h4><p>${comment}</p>${comments.innerHTML}`;
 }
}
