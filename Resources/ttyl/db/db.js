/**
 * @author tiratat.patana-anake
 */

var _db = new (function() {
	var base_url = "https://nuttyknot:tiratat@ttyl.iriscouch.com/ttyl/",
	//var base_url = "https://ttyl.iriscouch.com/ttyl/",
	xhr = Titanium.Network.createHTTPClient(),
	sqllite;
	
	function initLocalDB() {
		if(!sqllite) {
			sqllite = Titanium.Database.open('ttyl.local');
		}		
		with(sqllite) {
			execute('CREATE TABLE IF NOT EXISTS "persons" ("person_id" VARCHAR PRIMARY KEY NOT NULL, "display_name" VARCHAR NOT NULL, "revision" VARCHAR NOT NULL )');					
			execute('CREATE TABLE IF NOT EXISTS "cache" ("request_url" VARCHAR PRIMARY KEY NOT NULL, "response" TEXT NOT NULL, "ETag" VARCHAR NOT NULL )');
		}	
	}
	initLocalDB();
	
	this.person_id = undefined;
	var that = this;
	var callback = [];

	function connect(options, callback) {
		/*
		 * options[object]
		 * options[view]
		 * options[args]
		 * options[method]
		 * options[data]
		 * */
		
		// building url
		var url=options['url'] || base_url,
		method = options['method'] || "GET",
		data = ('data' in options?JSON.stringify(options['data']):null);
		if("object" in options && "view" in options) {
			url+=(options['object']+"/_view/"+options['view']);
		}
		if('args' in options) {
			url+="?";
			for(var index in options['args']) {
				var arg = options['args'][index];
				Ti.API.info('Arg: key->'+arg['key'] +' value->'+arg['value']);
				Ti.API.info('Typeof Arg: key->'+typeof(arg['key']) +' Typeof value->'+typeof(arg['value']));
				if(typeof(arg['value']) == "string") {
					url+=(Titanium.Network.encodeURIComponent(arg['key'])+"=\""+Titanium.Network.encodeURIComponent(arg['value'])+"\"&");
				} else {
					url+=(Titanium.Network.encodeURIComponent(arg['key'])+"="+Titanium.Network.encodeURIComponent(arg['value'])+"&");
				}

			}
		}
		Titanium.API.info(' _db.connect -> XHR open: ' + url);
		
		var authstr = 'Basic ' +Titanium.Utils.base64encode('nuttyknot:tiratat');		
		
		function real_connect() {
			xhr.onload = function() {
				var ETag = this.getResponseHeader('ETag');
				Ti.API.info(" _db.connect -> Got response from REAL request New ETag: "+ETag);
				var newResponseText = this.responseText?this.responseText.replace(/\n/g,""):"{}";
				Titanium.API.info(' _db.connect -> Response: ' + newResponseText);
				var jsonObject = JSON.parse(newResponseText);
				sqllite.execute("INSERT OR REPLACE INTO cache (request_url, response, ETag) VALUES (?,?,?)",this.location,newResponseText,ETag);
				if(callback) {
					callback(jsonObject);
				}
			};
			xhr.onerror = function() {
				Titanium.API.info(' _db.connect -> Error: ' + this.responseText);
			};
			xhr.open(method, url);		
			xhr.setRequestHeader('Authorization', authstr);		
			Titanium.API.info(' _db.connect -> XHR send data: ' + data);
			if(data) {
				xhr.setRequestHeader('Content-Type', 'application/json');
			}
			xhr.send(data);	
		}
		
		if(method == "GET") {
			// fire HEAD request
			Ti.API.info(" _db.connect -> Perform HEAD request");
			xhr.onload = function() {				
				var ETag = this.getResponseHeader('ETag');
				Ti.API.info(" _db.connect -> Got response from HEAD request ETag: "+ETag);
				var rows = sqllite.execute('SELECT response FROM cache WHERE request_url = ? AND ETag = ?',this.location,ETag);
				var response;  
				if (rows.isValidRow()) {   
				    response = rows.fieldByName('response')
				}
				rows.close();
				
				if(response) {
					Ti.API.info(" _db.connect -> Cache HIT! ("+this.location+")");
					var jsonObject = JSON.parse(response);
					if(callback) {
						callback(jsonObject);
					}
				} else {
					Ti.API.info(" _db.connect -> Cache MISSED! ("+this.location+")");
					real_connect();
				}
			};		 
			xhr.open('HEAD', url);
			xhr.setRequestHeader('Authorization', authstr);
			xhr.send();
		} else {
			real_connect();
		}
	}

	this.getProfileByDisplayName = function(displayName, callback) {

		//prepare for argument ?key=name@example.com
		//var arg = [{key:"key", value:displayName}];

		//connect https://ttyl.iriscouch.com/ttyl/_design/person/_view/by_display_name?key="name@example.com"
		connect({
			url:"https://ttyl.iriscouch.com/ttyl/_design/person/_view/by_display_name?key=" + '"' + displayName + '"'
			//object:"person",
			//view:"by_display_name",
			//args:arg,
		}, callback);
	};
	this.getProfileByPersonId = function(id,callback) {
		if(id){
		connect({
			url:"https://ttyl.iriscouch.com/ttyl/_design/person/_view/by_person_id?key=" + '"' + id + '"'
			//object:"person",
			//view:"by_display_name",
			//args:arg,
		}, callback);
		}else{
			callback("not found person id");
		}
	};
	this.addContacts = function(id,type,value,visibility,offer,callback) {
		if(id){
			 _db.getProfileByPersonId(id, function(data) {
				if(data&&data.rows) {
					Titanium.API.info("data --------------> "+data);
					var contactlist = typeof(data.rows[0].value.contacts)!= undefined || typeof(data.rows[0].value.contacts)!= null ?data.rows[0].value.contacts:[];
					contactlist.push({
						"field_value1": value,
						"field_type": type,
						"visibility": visibility,
						"offer" : offer
					});
					   var dateT = new Date();
			        dateTime = dateT.getYear()
			        + '/' + (dateT.getMonth()+1)
			        + '/' + (dateT.getDate())
			        + ' ' + (dateT.getHours())
			        + ':' + (dateT.getMinutes())
			        + ':' + (dateT.getSeconds());       
					var insertData = {
						"_id": data.rows[0].value._id ,
						"_rev":data.rows[0].value._rev ,
						"display_name":  data.rows[0].value.display_name,
						"type": "person",
						"contacts":contactlist,
						"created_datetime":dateTime
					};
					_db.create(insertData,function(result){
						callback(result);
					});
				}
		});
		}else{
				
				callback("not found person id");
		}
		
	};
	this.updateContacts = function(id,type,oldvalue,newvalue,visibility,offer,callback) {
		if(id){
			 _db.getProfileByPersonId(id,function(data) {
				if(data&&data.rows) {
					Titanium.API.info("data --------------> "+data);
					var contactlist = typeof(data.rows[0].value.contacts)!= undefined || typeof(data.rows[0].value.contacts)!= null ?data.rows[0].value.contacts:[];
					var targetIndex = [];
					for(var i = 0 ; i< contactlist.length ;i++ ){
						Titanium.API.info("contact type --------------> "+contactlist[i].field_type);
						Titanium.API.info("contact value --------------> "+contactlist[i].field_value1);
						if(contactlist[i].field_type == type && contactlist[i].field_value1 == oldvalue){
							targetIndex.push(i);
						}
					}
						var contact = {
							"field_value1": newvalue,
							"field_type": type,
							"visibility": visibility,
							"offer" : offer
						}
					if(targetIndex.length>0){
							for(var j = 0 ; j <  targetIndex.length ;j++){
								contactlist.splice(targetIndex[j],1,contact);	
							}
						
						
						   var dateT = new Date();
				        dateTime = dateT.getYear()
				        + '/' + (dateT.getMonth()+1)
				        + '/' + (dateT.getDate())
				        + ' ' + (dateT.getHours())
				        + ':' + (dateT.getMinutes())
				        + ':' + (dateT.getSeconds());       
						var insertData = {
							"_id": data.rows[0].value._id ,
							"_rev":data.rows[0].value._rev ,
							"display_name":  data.rows[0].value.display_name,
							"type": "person",
							"contacts":contactlist,
							"created_datetime":dateTime
						};
						_db.create(insertData,function(result){
							callback(result);
						});
					}else{
						callback("not found contact");
					}
				}
		});
		}else{
				
				callback("not found person id");
		}
		
	};
	this.deleteContacts = function(id,type,value,callback) {
		if(id){
			 _db.getProfileByPersonId(id,function(data) {
				if(data&&data.rows) {
					Titanium.API.info("data --------------> "+data);
					var contactlist = typeof(data.rows[0].value.contacts)!= undefined || typeof(data.rows[0].value.contacts)!= null ?data.rows[0].value.contacts:[];
					var targetIndex = [];
					for(var i = 0 ; i< contactlist.length ;i++ ){
						Titanium.API.info("contact type --------------> "+contactlist[i].field_type);
						Titanium.API.info("contact value --------------> "+contactlist[i].field_value1);
						if(contactlist[i].field_type == type && contactlist[i].field_value1 == value){
							targetIndex.push(i);
						}
					}
					if(targetIndex.length>0){
						for(var j = 0 ; j <  targetIndex.length ;j++){
							contactlist.splice(targetIndex[j],1);	
						}
						
						
						   var dateT = new Date();
				        dateTime = dateT.getYear()
				        + '/' + (dateT.getMonth()+1)
				        + '/' + (dateT.getDate())
				        + ' ' + (dateT.getHours())
				        + ':' + (dateT.getMinutes())
				        + ':' + (dateT.getSeconds());       
						var insertData = {
							"_id": data.rows[0].value._id ,
							"_rev":data.rows[0].value._rev ,
							"display_name":  data.rows[0].value.display_name,
							"type": "person",
							"contacts":contactlist,
							"created_datetime":dateTime
						};
						_db.create(insertData,function(result){
							callback(result);
						});
					}else{
						callback("not found contact");
					}
					
				}
		});
		}else{
				
				callback("not found person id");
		}
		
	};
	/*
	var uuids=[];
	connect({
	url:"https://ttyl.iriscouch.com/_uuids",
	args:[{
	key:"count",
	value:10
	}]
	}, function(data) {
	uuids=data['uuids'];
	});*/

	// async-ly create new document in database
	// data: javscript object
	this.create = function(data, callback) {
		connect({
			method:"POST",
			data:data
		}, callback);
	};
	this.addEventListener = function(e, fn) {
		// e == login, meet
		if(!callback[e]) {
			callback[e] = [];
		}
		callback[e].push(fn);
	};
	function onEvent(e, data) {
		Titanium.API.info(' _db.onEvent-> event : ' + e);
		if(!callback[e]) {
			return;
		}
		for(var i=0;i<callback[e].length;i++) {
			(callback[e])[i].apply(data);
		}
	}
	this.onMeet = function(person_id, callback) {
		var timestamp = new Date().getTime();
		create({
			type:'meet',
			person_id1:this.person_id,
			person_id2:person_id,
			created_datetime:timestamp,
			place_id:'test',
		}, function(data) {
			if(callback) {
				callback(data);
			}
			onEvent("meet",data);
		});
	};
	this.onLoggedIn = function(e, callback) {
		function privateCallback() {
			Ti.App.Properties.setString("logged_in_person",that.person_id)
			Titanium.API.info(' _db.onLoggedIn-> logged-in person_id : ' + that.person_id);
			if(callback) {
				callback()
			};
			onEvent("login");
		}
		Titanium.API.info(' _db.onLoggedIn: ' + e.success + ' '+ e.uid);
		if(!e.uid) {
			return false;
		}
		var uid = e.uid;
		
		var logged_in_person = Ti.App.Properties.getString("logged_in_person","");
		if(logged_in_person) {
			that.person_id = logged_in_person;
			Titanium.API.info(' _db.onLoggedIn-> fetch person_id from app property : ' + that.person_id);			
	    	privateCallback();
		}	    		

		connect({
			object:"_design/person",
			view:"by_facebook_uid",
			args: [{
				key:"key",
				value:uid
			}]
		}, function (data) {
			Titanium.API.info(' _db.onLoggedIn-> cb : ' + JSON.stringify(data));
			if(data.rows.length!=0) {
				that.person_id = data.rows[0].id;
				privateCallback();
			} else {
				var timestamp = new Date().getTime();
				_db.create({
					type:'person',
					display_name:uid,
					created_datetime:timestamp,
					last_seen_datetime:timestamp,
					contacts: [{
						field_type:'facebook',
						field_value1:uid,
					}]
				}, function(data) {
					Titanium.API.info(' _db.onLoggedIn-> cb : ' + JSON.stringify(data));
					that.person_id = data.id;
					privateCallback();
				});
			}
		});
	};
	this.getFriends = function(person_id, callback) {
		Titanium.API.info(' _db.getFriends-> person_id : ' + person_id);
		connect({
			object:"_design/relationship",
			view:"friends",
			args: [{
				key:"key",
				value:person_id
			},{
				key:"include_docs",
				value:true
			}]
		}, function(data) {			
			if(callback) {
				callback(data);
			}
		});
	}
})();