var express = require('express')
var fs = require('fs')
var router = require('./router.js')
var bodyParser = require('body-parser')

var app = express()

app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))
app.use('/errbook/',express.static('./errbook/'))
app.use('/userdata/',express.static('./userdata/'))

app.engine('html', require('express-art-template'))

app.get('/',function(req,res){
		res.redirect('/errbook')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router(app,fs)

app.listen(3000,function(){
	console.log('running')
})

