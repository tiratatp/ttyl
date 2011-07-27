var ProfileModel = function()
{
	var info = [
		{id:'1', infotype:'email', value:'plub101@gmail.com', visibility:'friends', offer:false},
		{id:'2', infotype:'facebook', value:'wittawin', visibility:'followers', offer:true},
		{id:'3', infotype:'twitter', value:'plub', visibility:'followers', offer:true},
		{id:'4', infotype:'foursquare', value:'plub101', visibility:'friends', offer:false}
	];
	
	this.getData = function()
	{
		return info;
	}
	
	this.getContacts = function()
	{
		var info = [];
		var id = 1;
		_db.getProfileByDisplayName("plub101", function(data){
			//alert(data);
			contacts = data.rows[0].value.contacts;
			alert(contacts+"x");
			
			for(var i=0; i<contacts.length; i++)
			{
				//alert(contacts[i].field_value1);
				raw_item = contacts[i];
				var item = {id:id, infotype:raw_item.field_type, value:raw_item.field_value1, visibility:'friends', offer:false};
				id++;
				info.push(item);
			}
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
}