/**
 * @author GuChui
 */

//namespace
var setting={
	//view object
	win : null,	
	tab : null,
	
	//config
	title : 'Setting',
	tab_icon : 'KS_nav_views.png',
	bgColor : '#fff',
	
	//constructor
	init : function(){
		var s = this;
		
		s.win = Titanium.UI.createWindow({
			title: s.title,
			backgroundColor: s.bgColor			
		});
		
		s.tab = Titanium.UI.createTab({
			icon: s.tab_icon,
			title: s.title,
			window: s.win
		});
		var menuList = [{title:"Logout"}];
		var settingTable = Titanium.UI.createTableView({
			data:menuList
		});
		settingTable.addEventListener('click',function(e){
			s.logout();
		});
		s.win.add(settingTable);
	},
	
	logout : function(){
		Titanium.Facebook.fireEvent('logout');
	}	
}

// var Setting = function()
// {	
	// this.win = Titanium.UI.createWindow({
		// title:'Setting',
		// backgroundColor:'#fff'
	// });
// 		
	// this.tab = Titanium.UI.createTab({
		// icon:'KS_nav_views.png',
		// title:'Setting',
		// window:this.win
	// });	
	// var menuList = [{title:"Logout"}];
	// var settingTable = Titanium.UI.createTableView({
		// data:menuList
	// });	
// 	
// 	
	// // logoutRow.add(Titanium.UI.createLabel({
		// // text:'Logout'
	// // }));
// 	
// 	
	// // settingTable.add(logoutRow);
	// this.win.add(settingTable);
// }