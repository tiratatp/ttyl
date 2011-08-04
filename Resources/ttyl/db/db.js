/**
 * @author tiratat.patana-anake
 */

var _db = new (function() {
	var base_url = "https://nuttyknot:tiratat@ttyl.iriscouch.com/ttyl/",
	//var base_url = "https://ttyl.iriscouch.com/ttyl/",	
	sqllite,
	that = this,
	callback = [],
	retryQueue = [];
	this.person_id = undefined;
	
	// init
	if(!sqllite) {
		sqllite = Titanium.Database.open('ttyl.local');
	}		
	with(sqllite) {
		//execute('CREATE TABLE IF NOT EXISTS "persons" ("person_id" VARCHAR PRIMARY KEY NOT NULL, "display_name" VARCHAR NOT NULL, "revision" VARCHAR NOT NULL )');					
		execute('CREATE TABLE IF NOT EXISTS "cache" ("request_url" VARCHAR PRIMARY KEY NOT NULL, "response" TEXT NOT NULL, "ETag" VARCHAR NOT NULL )');
	}			
	////
	
	// uncomment code below to clear cache
	/*	
	(function() {
		sqllite.execute("delete from cache");	
	}());
	*/	
	
	function connect(options, callback) {
		/*
		 * options[object]
		 * options[view]
		 * options[args]
		 * options[method]
		 * options[data]
		 * */
		
		// building url
		var url = options['url'] || base_url,
			method = options['method'] || "GET",
			data = ('data' in options?JSON.stringify(options['data']):null),
			headers = {'Authorization': 'Basic ' +Titanium.Utils.base64encode('nuttyknot:tiratat')},
			origArguments = arguments;
		if("object" in options && "view" in options) {
			url+=(options['object']+"/_view/"+options['view']);
		}
		if("args" in options) {
			url+="?";
			for(var i=0, argsLength = options['args'].length;i<argsLength;i++) {
				var arg = options['args'][i],
					key = arg['key'],
					value = arg['value'],
					typeOfValue = typeof(value);					
				Ti.API.info('Arg: key->'+ key +' value->'+ value + " type: "+ typeOfValue);
				if(typeOfValue == "string") {
					url+=(Titanium.Network.encodeURIComponent(key)+"=\""+Titanium.Network.encodeURIComponent(value)+"\"&");
				} else {
					url+=(Titanium.Network.encodeURIComponent(key)+"="+Titanium.Network.encodeURIComponent(value)+"&");
				}
			}
		}
		Titanium.API.info(' _db.connect -> XHR opening: ' + url);			
		
		if(method == "GET") {
			// perform request with If-None-Match
			var rows = sqllite.execute('SELECT response, ETag FROM cache WHERE request_url = ?',url),
				response,
				ETag;
			if (rows.isValidRow()) {   
			    response = rows.fieldByName('response');
			    ETag = rows.fieldByName('ETag');
			}
			rows.close();
			Ti.API.info(" _db.connect -> Cached ETag: "+ETag);
			if(response && ETag) {
				headers["If-None-Match"] = ETag;	
			}						
		} 
		
		if(data) {
			headers["Content-Type"] = 'application/json';
		}
		
		try {		
			var xhr = Titanium.Network.createHTTPClient({
				onload: function() {
					if(method == "GET") {
						var ETag = this.getResponseHeader('ETag');
						response = this.responseText?this.responseText.replace(/\n/g,""):"{}";				
						Ti.API.info(" _db.connect -> Cache MISSED! ("+url+")");				
						Ti.API.info(" _db.connect -> Got response from REAL request New ETag: "+ETag);
						Ti.API.info(sqllite.execute("INSERT OR REPLACE INTO cache (request_url, response, ETag) VALUES (?,?,?)",url,response,ETag));
						Titanium.API.info(' _db.connect -> Response: ' + response);
						if(callback) {
							callback(JSON.parse(response));
						}
					} else {
						response = this.responseText?this.responseText.replace(/\n/g,""):"{}";
						Titanium.API.info(' _db.connect -> Response: ' + response);
						if(callback) {
							callback(JSON.parse(response));
						}
					}
				},
				onerror: function(e) {
					if(e.error=="Not Modified") {
						Ti.API.info(" _db.connect -> Cache HIT! ("+url+") (Please ignore 'Not Modified' error above.)");
						Titanium.API.info(' _db.connect -> Response: ' + response);
						if(callback) {
							callback(JSON.parse(response));
						}
					} else {
						Titanium.API.info(' _db.connect -> Error: ' + e.error);
						retryQueue.push(origArguments);
					}
				},	
				timeout: 60000,
			});								
			
			xhr.open(method, url);				
			
			for (var header in headers) {
				Ti.API.info(' Header: name->'+header +' value->'+headers[header]);
				xhr.setRequestHeader(header, headers[header]);	
			}										
			Titanium.API.info(' _db.connect -> XHR send data: ' + data);
			xhr.send(data);	
		} catch (e) {
			Titanium.API.info(e);
			Titanium.API.info(' _db.connect -> Exception: ' + e.error);
		} finally {
			xhr = null;
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
		var handler = callback[e];
		if(!handler) {
			handler = callback[e] = [];
		}
		handler.push(fn);
	};
	function onEvent(e, data) {
		Titanium.API.info(' _db.onEvent-> event : ' + e);
		if(!callback[e]) {
			return;
		}
		for(var i=0,callbackLength = callback[e].length;i<callbackLength;i++) {
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
		var uid = e.uid,
			logged_in_person = Ti.App.Properties.getString("logged_in_person","");
			
		if(logged_in_person) {
			that.person_id = logged_in_person;
			Titanium.API.info(' _db.onLoggedIn-> fetch person_id from app property : ' + that.person_id);			
	    	privateCallback();
	    	return;
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