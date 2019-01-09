var dbPath = './userdata/userdata.json'
var fs = require("fs")
var url = require("url")

exports.new = function (req,res) {
	var arrdata
	var jsonObj = {}
	fs.readFile(dbPath,'utf8',function(err,data){
		if (err) {
			return res.status(500).send('存储过程中读取文件失败')
		}
		if (data) {
			var arrdata = JSON.parse(data).data
		}else {
			arrdata = []
		}
		var reqBody = req.body
		reqBody.id = arrdata.length + 1
		arrdata.unshift(reqBody)
		jsonObj.data = arrdata
		jsonObj = JSON.stringify(jsonObj)
		fs.writeFile(dbPath,jsonObj,function(){
			console.log('写入成功')
			res.redirect('/errbook')
		})

		})
}




exports.delete = function (req,res) {
	fs.readFile(dbPath,'utf8',function(err,data){
	if (err) {
		return res.status(500).send('读取文件失败')
	}
	if (req.query.id) {
		var arrdata = JSON.parse(data).data
		var currentindex
		arrdata.forEach(function(item,index){
		if (item.id == req.query.id){
			currentindex = index
			return false
		}
	})

	arrdata.splice(currentindex,1)
	arrdata = {"data":arrdata}
	console.log(arrdata)
	fs.writeFile(dbPath,JSON.stringify(arrdata),function(err) {
		if (err) {
			return res.status(500).send('更新文件失败')
		}
	})
	}

	res.redirect('/errbook')
	})
}


exports.update = function(req,res)	{
	fs.readFile(dbPath,'utf8',function(err,data){
	if (err) {
		return res.status(500).send('读取文件失败')
	}
	if (req.query.id){
		var arrdata = JSON.parse(data).data
		var currentitem,currentindex
		arrdata.forEach(function(item,index){
		if (item.id == req.query.id){
			currentitem = JSON.parse(JSON.stringify(item))
			currentindex = index
			return false
		}
	})

	if(currentitem){
		currentitem.title = req.body.title||''
		currentitem.text = req.body.text||''
	}
	console.log(currentindex)
	arrdata.splice(currentindex,1,currentitem)
	arrdata = {"data":arrdata}
	console.log(arrdata)
	fs.writeFile(dbPath,JSON.stringify(arrdata),function(err) {
		if (err) {
			return res.status(500).send('更新文件失败')
		}
	})
	}

	res.redirect('/errbook')
	})

}


exports.deleteAll = function (req,res) {
	fs.writeFile(dbPath,'',function() {
		res.redirect('/errbook')
	})
	
}


//下面是用来渲染页面 不涉及数据库的修改


exports.renderIndexPage = function (res) {
	fs.readFile(dbPath,'utf8',function(err,data){
	if (err) {
		return res.status(500).send('读取文件失败')
	}
	if (data) {
		res.render('index.html',JSON.parse(data))
	}else {
		res.render('index.html')
	}
	})

}






exports.renderEditPage = function (req,res) {
	fs.readFile('./userdata/userdata.json','utf8',function(err,data){
	

	if (err) {
		return res.status(500).send('读取文件失败')
	}


	if (req.query.id){
		var arrdata = JSON.parse(data).data
		var currentitem
		arrdata.forEach(function(item,index){
		if (item.id == req.query.id){
			currentitem = item
			return false
		}
	})
	}
		if(currentitem){
			res.render('edit.html',currentitem)
		}else{
			res.render('edit.html')
		}
	})
}


exports.renderNewPage = function(req,res){
	fs.readFile('./userdata/userdata.json','utf8',function(err,data){
		if (err) {
			return res.status(500).send('读取文件失败')
		}
		res.render('new.html')
		})
}



