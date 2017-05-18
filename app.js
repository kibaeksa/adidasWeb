var fs = require('fs');
var path = require('path');
var express = require('express');

var app = express();
var PORT = process.env.PORT || 20000;
var rootPath = '/';

app.use('/',express.static(path.resolve(__dirname,'./app')));
app.get('/',function(req,res){
	 res.send('Hello World!');
});

app.listen(PORT , function(){
	console.log('Example app lsitening on port '+PORT+'!');
});
