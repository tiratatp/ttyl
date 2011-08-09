var _friends = new (function() {

	// private variable
	var bgColor = "#FFF";
	var win = Ti.UI.createWindow({
		title: "Friends",
		backgroundColor: bgColor
	});
	var tab = Ti.UI.createTab({
		window: win,
		title: "Friends",
		icon: 'KS_nav_views.png'
	});
	var table = Ti.UI.createTableView({});
	var rows = [];

	// public variable
	this.tab = tab;

	function onRowClick(event) {
		var win = Ti.UI.createWindow({
			title: "Friend Info",
		});
		var text = Titanium.UI.createLabel({
			text:this.datum.display_name,
		});
		win.add(text);
		Ti.UI.currentTab.open(win);
	}

	function renderRow(data) {
		if(data.rows.length<1) {
			//
			return;
		}
		data = data.rows;
		for (var i = 0; i < data.length; i++) {			
			var datum = data[i].doc,
				row;
			Titanium.API.info(datum);			
			if(!datum.picture) {
				for(var j=0;j<datum.contacts.length;j++) {
					Ti.API.info(' _friends -> renderRow: field_type: '+ datum.contacts[i].field_type);
					switch(datum.contacts[i].field_type) {
						case "email":
							datum.picture = "http://www.gravatar.com/avatar/"+Titanium.Utils.md5HexDigest(datum.contacts[i].field_value1.toLowerCase())+"?d=identicon&s=50";
							break;
						case "twitter":
							datum.picture = "http://api.twitter.com/1/users/profile_image?screen_name="+datum.contacts[i].field_value1+"&size=normal";
							break;
						case "facebook":
							datum.picture = "https://graph.facebook.com/"+datum.contacts[i].field_value1+"/picture?type=square";
							break;
					}
					if(datum.picture) {
						break;
					}
				}
			}
			row = Ti.UI.createTableViewRow({
				height:80,
				font: {
					fontSize:16,
					fontWeight:'bold'
				},
				datum: datum,
				title: datum.display_name,
				backgroundColor:bgColor,
				hasDetail: true,
			});
			
			if(datum.picture) {
				Ti.API.info(' _friends -> renderRow: picture: '+ datum.picture);
				row.leftImage = datum.picture;
			}

			rows.push(row);

			row.addEventListener("click", onRowClick);
		}
		table.setData(rows);
	}
	
	function getFriend() {
		_db.getFriends(_db.person_id, function(data) {
			renderRow(data);
		});		
	}

	_db.addEventListener("login", getFriend)
	// add ui components
	win.add(table);
})();