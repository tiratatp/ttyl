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