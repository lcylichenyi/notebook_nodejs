module.exports = function(app,fs){
	//获取功能函数
	var db = require('./db.js')


	app.get('/errbook',function(req,res){
		db.renderIndexPage(res)
	})



	app.get('/errbook/new',function(req,res){
		db.renderNewPage(req,res)
	})



	app.post('/errbook/new',function(req,res){
		db.new(req,res)

	})


	app.get('/errbook/edit',function(req,res){
		db.renderEditPage(req,res)
		
	})

	app.post('/errbook/edit',function(req,res){
		db.update(req,res)
	})

	app.get('/errbook/delete',function(req,res){
		db.delete(req,res)
	})

	app.get('/errbook/deleteall',function(req,res){
		db.deleteAll(req,res)
	})
}




