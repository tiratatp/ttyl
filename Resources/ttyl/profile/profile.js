//Profile

Ti.include('/ttyl/profile/detail.js');
Ti.include('/ttyl/profile/addType.js');
Ti.include('/ttyl/profile/model/profileModel.js');

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
	
	
	profileModel = new ProfileModel();
	var CustomData = profileModel.getData();
	
	var infoSection = createInfoSection();
	var addSection = createAddSection();
	
	
	TheTable.setData([infoSection, addSection]);
	
	this.win.add(TheTable);
	
	function createInfoSection()
	{
		var section = Titanium.UI.createTableViewSection();
		
		for (var i = 0; i <= CustomData.length - 1; i++){
	
			var row = Titanium.UI.createTableViewRow();
			
			row.id = CustomData[i].id;
		
			var icon =  Titanium.UI.createImageView({
				image:getInfoIcon(CustomData[i].infotype),
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
			row.className = 'profile_row';
			
			section.add(row);
		}
		
		section.addEventListener('click', function(e)
		{
			var id = e.row.id;
			var profileDetail = new ProfileDetail(id);
			tabGroup.activeTab.open(profileDetail.win);
		});
		
		return section;
	}
	
	function createAddSection()
	{
		var section = Titanium.UI.createTableViewSection();
		
		var row = Titanium.UI.createTableViewRow();
		
		var value = Titanium.UI.createLabel({
			text:"Add...",
			font:{fontSize:16,fontWeight:'bold'},
			width:'auto',
			textAlign:'left',
			top:13,
			left:40,
			height:24
		});
			
		row.add(value);
		row.addEventListener('click', function(){
			var addTypeWin = new AddServiceTypeWindow();
			tabGroup.activeTab.open(addTypeWin.win);
		});
		
		section.add(row);
		return section;
	}
	
	function getInfoIcon(infoType)
	{
		var icon = "/images/icons/" + infoType + ".png";
		return icon;
	}
}