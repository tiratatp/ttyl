//Profile

//Namespace
var profile = {};

profile.win = Titanium.UI.createWindow({
	title:'Profile',
	backgroundColor:'#fff'
});

profile.winSocial = Titanium.UI.createWindow({
	backgroundColor:'#fff'
});
	
profile.tab = Titanium.UI.createTab({
	icon:'KS_nav_views.png',
	title:'Profile',
	window:profile.win
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
	text:"Add More",
	font:{fontSize:16,fontWeight:'bold'},
	width:'auto',
	textAlign:'left',
	top:13,
	left:40,
	height:24
});
	
addRow.add(value);

data.push(addRow);


function openSocialDetailWin(value)
{
	
	var table1 =  Titanium.UI.createTableView({
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});
	
	var section1 = Titanium.UI.createTableViewSection();
	section1.headerTitle = "Visibility";
	var row1 = Titanium.UI.createTableViewRow({title:"Public"});
	var row2 = Titanium.UI.createTableViewRow({title:"Offer"});
	var row3 = Titanium.UI.createTableViewRow({title:"Private"});
	row1.addEventListener('click', function()
	{
		profile.winSocial.close();
	});
	row2.addEventListener('click', function()
	{
		profile.winSocial.close();
	});
	row3.addEventListener('click', function()
	{
		profile.winSocial.close();
	});
	section1.add(row1);
	section1.add(row2);
	section1.add(row3);
	table1.setData([section1]);
	profile.winSocial.add(table1);
	//Titanium.UI.currentTab.open(profile.winSocial);
	tabGroup.activeTab.open(profile.winSocial);
}

TheTable.setData(data);

profile.win.add(TheTable);