//Profile
Ti.include('/ttyl/profile/model/profileModel.js');

var Offer = function(receiver_id)
{	
	var user_id = receiver_id; 
	var contacts = [];
	this.win = Titanium.UI.createWindow({
		title:'Offer',
		backgroundColor:'#fff'
	});
		
	this.tab = Titanium.UI.createTab({
		icon:'KS_nav_views.png',
		title:'Offer',
		window:this.win
	});
	
	var that = this;
	var TheTable = Titanium.UI.createTableView({});
	
	
	//var profileModel = new ProfileModel('12345');
	//var CustomData = profileModel.getData();
	
	// var infoSection = profileModel.getContactInTableViewSection();
	var resultInfoSection = null; 
	var myprofileModel = null;				
	var comfirmSection = createCommitSection();
	if(!_db.person_id){
	    _db.addEventListener('login',function(){
	        myprofileModel = new ProfileModel(_db.person_id);
	    	myprofileModel.getOffers(function(infoSection){
	    	  resultInfoSection = infoSection;
	    	 
	    	  resultInfoSection.addEventListener('click', function(e)
				{
					alert("click  offer,,,,,,,,,,,,,,,,");
					var row = e.row;
					row.hasCheck = !row.hasCheck;
					var id = row.id;
					var detail = myprofileModel.getDataById(id);
					if(row.hasCheck){
						contacts.push(detail);
					}else if(!row.hasCheck){
						for(var i = 0 ;i<contacts.length;i++){
							if(contacts[i] == detail){
								contacts.splice(i,1);
							}
						}
					}
					// var profileDetail = new ProfileDetail(id,myprofileModel);
					// tabGroup.activeTab.open(profileDetail.win);
				});
		
				TheTable.setData([resultInfoSection, comfirmSection]);
	    	});
	    });
	}else{
        myprofileModel = new ProfileModel(_db.person_id);
    	myprofileModel.getOffers(function(infoSection){
    	  resultInfoSection = infoSection;
    	 
    	  resultInfoSection.addEventListener('click', function(e)
			{
				alert("click  offer,,,,,,,,,,,,,,,,");
				var row = e.row;
				row.hasCheck = !row.hasCheck;
				var id = row.id;
				var detail = myprofileModel.getDataById(id);
				if(row.hasCheck){
					contacts.push(detail);
				}else if(!row.hasCheck){
					for(var i = 0 ;i<contacts.length;i++){
						if(contacts[i] == detail){
							contacts.splice(i,1);
						}
					}
				}
		
				// var profileDetail = new ProfileDetail(id,myprofileModel);
				// tabGroup.activeTab.open(profileDetail.win);
			});
	
			TheTable.setData([resultInfoSection, comfirmSection]);
    	});
	}
	

	this.win.add(TheTable);
	
	function createCommitSection()
	{
		var section = Titanium.UI.createTableViewSection();
		
		var row = Titanium.UI.createTableViewRow();
		
		var value = Titanium.UI.createLabel({
			text:"commit...",
			font:{fontSize:16,fontWeight:'bold'},
			width:'auto',
			textAlign:'left',
			top:13,
			left:40,
			height:24
		});
			
		row.add(value);
		row.addEventListener('click', function(){
			var insertContacts = [];
			//{id:id, infotype:raw_item.field_type, value:raw_item.field_value1, visibility:raw_item.visibility, offer:raw_item.offer};
			for(var i = 0 ;i<contacts.length;i++){
				var data = {"field_type":contacts[i].infotype,
							"field_value1":contacts[i].value,
							"visibility":contacts[i].visibility,
							"offer":"true"					
						};
				insertContacts.push(data);		
			}
			
			 _db.addRelationShip(user_id,_db.person_id,insertContacts,function(result){
				alert("success");
			 });
		
		});
		
		section.add(row);
		return section;
	}
	
	
}