Ti.include('/ttyl/profile/addInfo.js');

// Class AddWindow
var AddServiceTypeWindow = function()
{
	this.win = Titanium.UI.createWindow({
		title:'Add Info'
	});
	
	var TheTable = Titanium.UI.createTableView({});
	
	var CustomData = [
		{icon:'/images/icons/email.png', value:'Email'},
		{icon:'/images/icons/facebook.png', value:'Facebook'},
		{icon:'/images/icons/twitter.png', value:'Twitter'},
		{icon:'/images/icons/foursquare.png', value:'Foursquare'}
	];
	
	var data=[];
	
	for (var i = 0; i <= CustomData.length - 1; i++){
	
		var row = Titanium.UI.createTableViewRow();
	
		var icon =  Titanium.UI.createImageView({
			image:CustomData[i].icon,
			width:32,
			height:32,
			left:4,
			top:9
		});
		
		var value = Titanium.UI.createLabel({
			text:CustomData[i].value,
			font:{fontSize:16,fontWeight:'bold'},
			width:'auto',
			textAlign:'left',
			top:13,
			left:40,
			height:24
		});
		
		row.add(icon);
		row.add(value);
	
		row.hasChild=true;
		row.className = 'profile_addInforTypeRow';
	
		data.push(row);
	};
	
	TheTable.setData(data);
	TheTable.addEventListener('click', function(e)
	{
		var title = e.row.children[1].text;
		var addInfoWin = new AddInfoWindow(title);
		tabGroup.activeTab.open(addInfoWin.win);
	});
	
	this.win.add(TheTable);
}
