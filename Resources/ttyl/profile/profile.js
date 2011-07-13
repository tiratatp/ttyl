//Profile

Ti.include('/ttyl/profile/detail.js');
Ti.include('/ttyl/profile/addType.js');

//Namespace
var Profile = function()
{	
	this.win = Titanium.UI.createWindow({
		title:'Profile',
		backgroundColor:'#fff'
	});
		
	this.tab = Titanium.UI.createTab({
		icon:'KS_nav_views.png',
		title:'Profile',
		window:this.win
	});
	
	
	var TheTable = Titanium.UI.createTableView({});
	
	
	
	var CustomData = [
		{icon:'/images/icons/email.png', value:'plub101@gmail.com', visibility:'offer'},
		{icon:'/images/icons/facebook.png', value:'Plub Wittawin', visibility:'private'},
		{icon:'/images/icons/twitter.png', value:'plub', visibility:'public'},
		{icon:'/images/icons/foursquare.png', value:'plub101', visibility:'private'}
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
		
		var visibility =  Titanium.UI.createLabel({
			text:CustomData[i].visibility,
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
		row.addEventListener('click', function()
		{
			openSocialDetailWin(value.text);
		});
		row.className = 'profile_row';
	
	
		data.push(row);
	};
	
	var addRow = Titanium.UI.createTableViewRow();
	
	var value = Titanium.UI.createLabel({
		text:"Add...",
		font:{fontSize:16,fontWeight:'bold'},
		width:'auto',
		textAlign:'left',
		top:13,
		left:40,
		height:24
	});
		
	addRow.add(value);
	addRow.addEventListener('click', function(){
		var addTypeWin = new AddServiceTypeWindow();
		tabGroup.activeTab.open(addTypeWin.win);
	});
	
	data.push(addRow);
	
	function openSocialDetailWin(value)
	{
		var profileDetail = new ProfileDetail();
		tabGroup.activeTab.open(profileDetail.win);
	}
	
	TheTable.setData(data);
	
	this.win.add(TheTable);
}