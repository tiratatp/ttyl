/**
 * @author tiratat.patana-anake
 */

var _db = new (function() {
	//var base_url = "https://nuttyknot:tiratat@ttyl.iriscouch.com/ttyl/",
	var base_url = "https://ttyl.iriscouch.com/ttyl/",
	xhr = Titanium.Network.createHTTPClient();

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
		Titanium.API.info('XHR open: ' + url);
		xhr.open(method, url);
		//authstr = 'Basic ' +Titanium.Utils.base64encode(username+':'+password);
		authstr = 'Basic ' +Titanium.Utils.base64encode('nuttyknot:tiratat');
		xhr.setRequestHeader('Authorization', authstr);

		xhr.onload = function() {
			Titanium.API.info('Text: ' + this.responseText);
			var jsonObject = JSON.parse(this.responseText);
			if(callback) {
				callback(jsonObject);
			}
		};
		xhr.onerror = function() {
			Titanium.API.info('Error: ' + this.responseText);
		};
		Titanium.API.info('XHR send data: ' + data);
		if(data) {
			xhr.setRequestHeader('Content-Type', 'application/json');
		}
		xhr.send(data);
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
		Titanium.API.info(' _db.onLoggedIn: ' + e.success + ' '+ e.uid);
		if(!e.uid) {
			return false;
		}
		var uid = e.uid;

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
				Titanium.API.info(' _db.onLoggedIn-> logged-in person_id : ' + this.person_id);
				callback();
				onEvent("login");
			} else {
				var timestamp = new Date().getTime();
				create({
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
					Titanium.API.info(' _db.onLoggedIn-> logged-in person_id : ' + this.person_id);
					callback();
					onEvent("login");
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