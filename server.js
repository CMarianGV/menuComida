var express =require('express');
var app = express();

app.use(express.static(__dirname+'/'));

app.get('/', function(request,response){
	response.sendFile('index.html');
});

app.listen(3000, function(){
	console.log('Servidor corriendo en el puerto 3000');
});

