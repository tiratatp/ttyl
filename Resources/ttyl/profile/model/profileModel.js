var ProfileModel = function(id)
{
	this.usr_id  = id;
	this.info = [];
	var that = this;
	// {id:'1', infotype:'email', value:'plub101@gmail.com', visibility:'friends', offer:false},
		// {id:'2', infotype:'facebook', value:'wittawin', visibility:'followers', offer:true},
		// {id:'3', infotype:'twitter', value:'plub', visibility:'followers', offer:true},
		// {id:'4', infotype:'foursquare', value:'plub101', visibility:'friends', offer:false}	
	this.getData = function()
	{
		return info;
	}
	
	this.initContacts = function(callback)
	{
		var info = that.info;
		var infoSection = null;
		Titanium.API.info("person id ------------------->"+_db.person_id);
		_db.getProfileByPersonId(that.usr_id, function(data){
			if(data&&data.rows) {
				var contactlist = typeof(data.rows[0].value.contacts)!= undefined || typeof(data.rows[0].value.contacts)!= null ?data.rows[0].value.contacts:[];	

				for(var i = 0 ; i< contactlist.length ;i++ ){
						Titanium.API.info("contact type --------------> "+contactlist[i].field_type);
						Titanium.API.info("contact value --------------> "+contactlist[i].field_value1);						
						var item = {id:(i+1),infotype:contactlist[i].field_type,value:contactlist[i].field_value1,visibility:contactlist[i].visibility,offer:contactlist[i].offer};
						info.push(item);
				}
			}
			infoSection =  that.getContactInTableViewSection();
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
	
	this.getContactInTableViewSection = function()
	{
			var info = that.info;
			var section = Titanium.UI.createTableViewSection({
		});
		Titanium.API.info("info length"+info.length);
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