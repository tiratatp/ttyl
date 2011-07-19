//Setting

var Setting = function()
{	
	this.win = Titanium.UI.createWindow({
		title:'Setting',
		backgroundColor:'#fff'
	});
		
	this.tab = Titanium.UI.createTab({
		icon:'KS_nav_views.png',
		title:'Setting',
		window:this.win
	});	
	
	var settingTable = Titanium.UI.createTableView({});
	
	var logoutRow = Titanium.UI.createTableViewRow({});
	// logoutRow.add(Titanium.UI.createLabel({
		// text:'Logout'
	// }));
	
	
	// settingTable.add(logoutRow);
	this.win.add(settingTable);
}