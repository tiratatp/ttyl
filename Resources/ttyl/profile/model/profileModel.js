var ProfileModel = function(id)
{
	var user_id = id;
	var info = [
		// {id:'1', infotype:'email', value:'plub101@gmail.com', visibility:'friends', offer:false},
		// {id:'2', infotype:'facebook', value:'wittawin', visibility:'followers', offer:true},
		// {id:'3', infotype:'twitter', value:'plub', visibility:'followers', offer:true},
		// {id:'4', infotype:'foursquare', value:'plub101', visibility:'friends', offer:false}

	];
	
	this.getData = function()
	{
		return info;
	}
	
	this.getContacts = function(callback)
	{
		// var info = [];
		 var id = 1;
		_db.getProfileByPersonId(user_id, function(data){
			//alert(data);
			contacts = data.rows[0].value.contacts;
			//alert(contacts+"x");
			
			for(var i=0; i<contacts.length; i++)
			{
				//alert(contacts[i].field_value1);
				raw_item = contacts[i];
				var item = {id:id, infotype:raw_item.field_type, value:raw_item.field_value1, visibility:raw_item.visibility, offer:raw_item.offer};
				id++;
				info.push(item);
			}
			var infoSection = getContactInTableViewSection();
			callback(infoSection);
		});
	}
	
	this.getDataById = function(id)
	{
		for(var i=0; i<info.length; i++)
		{
			if(info[i].id == id)
			{
				return info[i];
			}
		}
		return null;
	}
	
	function getContactInTableViewSection()
	{
		var section = Titanium.UI.createTableViewSection({
		});
		
		for (var i = 0; i <= info.length - 1; i++){
	
			var row = Titanium.UI.createTableViewRow();
			
			row.id = info[i].id;
		
			var icon =  Titanium.UI.createImageView({
				image:getInfoIcon(info[i].infotype),
				width:32,
				height:32,
				left:4,
				top:9
			});
			
			var value = Titanium.UI.createLabel({
				text:info[i].value,
				font:{fontSize:16,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:13,
				left:40,
				height:24
			});
			
			var visibility =  Titanium.UI.createLabel({
				text:info[i].visibility,
				font:{fontSize:12},
				width:'auto',
				textAlign:'left',
				top:13,
				right:30,
				height:24
			});
			
			row.add(icon);
			row.add(value);
			row.add(visibility);
		
			row.hasChild=true;
			row.className = 'profile_row';
			
			section.add(row);
		}
		return section;
	}
	
	function getInfoIcon(infoType)
	{
		var icon = "/images/icons/" + infoType + ".png";
		return icon;
	}
}