//Profile

Ti.include('/ttyl/profile/detail.js');
Ti.include('/ttyl/profile/addType.js');
Ti.include('/ttyl/profile/model/profileModel.js');

var Profile = function()
{	
	var that = this;
	this.win = Titanium.UI.createWindow({
		title:'Profile',
		backgroundColor:'#fff'
	});
		
	this.tab = Titanium.UI.createTab({
		icon:'KS_nav_views.png',
		title:'Profile',
		window:this.win
	});
	
	
	var TheTable = Titanium.UI.createTableView();
	
	
    _db.addEventListener("login", function() {
		
			var profileModel = new ProfileModel(_db.person_id);
			// var CustomData = profileModel.getData();
			profileModel.initContacts();
					
			var infoSection = profileModel.getContactInTableViewSection();
			infoSection.addEventListener('click', function(e)
			{
				var id = e.row.id;
				var profileDetail = new ProfileDetail(id);
				tabGroup.activeTab.open(profileDetail.win);
			});
			
			var addSection = createAddSection();
			var profileSection = createProfileSection();
			
			TheTable.setData([profileSection, infoSection, addSection]);
			
			that.win.add(TheTable);
	
	});
	

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
	
	function createProfileSection()
	{
		var profilePictureUrl = 'https://graph.facebook.com/' + Titanium.Facebook.uid + '/picture';

		var value = Titanium.UI.createLabel({
			text:"Display Name",
			font:{fontSize:16,fontWeight:'bold',color:'#fff'},
			width:'auto',
			textAlign:'left',
			top:13,
			left:40,
			height:24
		});
		
		var section = Titanium.UI.createTableViewSection();
		var row = Titanium.UI.createTableViewRow({
			leftImage: profilePictureUrl,
			backgroundColor: '#888',
			height:100
		});
		
		section.add(row);
		//section.add(value);		
		
		return section;
	}
}