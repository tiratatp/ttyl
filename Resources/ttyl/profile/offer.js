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
		
	// this.tab = Titanium.UI.createTab({
		// icon:'KS_nav_views.png',
		// title:'Offer',
		// window:this.win
	// });
	
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
	    	  var initialData = myprofileModel.getData();
	    	  for(var index = 0; index < initialData.length; index++ ){
	    	  	 if(initialData[index].offer == "true"){
	    	  	 	contacts.push(initialData[index]);
	    	  	 }
	    	  	 
	    	  }
	    	  resultInfoSection.addEventListener('click', function(e)
				{
					// alert("click  offer,,,,,,,,,,,,,,,,");
					var row = e.row;
					row.hasCheck = !row.hasCheck;
					var id = row.id;
					var detail = myprofileModel.getDataById(id);
					if(row.hasCheck ){
						var found = false;
						for(var i = 0 ;i<contacts.length;i++){
							if(contacts[i] == detail){
								found = true;
							}
						
						}
						if(!found){
							    contacts.push(detail);
						}
					}else if(!row.hasCheck){
						var deleteIdex = -1;
						for(var i = 0 ;i<contacts.length;i++){
							if(contacts[i] == detail){
								deleteIdex = i;
							}
						}
						if(deleteIdex != -1){
						    contacts.splice(deleteIdex,1);
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
    	  var initialData = myprofileModel.getData();
    	  for(var index = 0; index < initialData.length; index++ ){
    	  	 if(initialData[index].offer == "true"){
	    	  	 	contacts.push(initialData[index]);
    	  	 }
	    	  	 
    	  }
    	  resultInfoSection.addEventListener('click', function(e)
			{
				// alert("click  offer,,,,,,,,,,,,,,,,");
				var row = e.row;
				row.hasCheck = !row.hasCheck;
				var id = row.id;
				var detail = myprofileModel.getDataById(id);
				if(row.hasCheck){
					var found = false;
						for(var i = 0 ;i<contacts.length;i++){
							if(contacts[i] == detail){
								found = true;
							}
						
						}
						if(!found){
							    contacts.push(detail);
						}
				}else if(!row.hasCheck){
					var deleteIdex = -1;
					for(var i = 0 ;i<contacts.length;i++){
						if(contacts[i] == detail){
							deleteIdex = i;
						}
					}
					if(deleteIdex != -1){
					    contacts.splice(deleteIdex,1);
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
			// alert(contacts.length);
			//{id:id, infotype:raw_item.field_type, value:raw_item.field_value1, visibility:raw_item.visibility, offer:raw_item.offer};
			
			for(var i = 0 ;i<contacts.length;i++){
				var data = {"field_type":contacts[i].infotype,
							"field_value1":contacts[i].value,
							"visibility":contacts[i].visibility,
							"offer":"true"					
						};
				insertContacts.push(data);		
			}
			if(insertContacts.length >0){
			 _db.addRelationShip(user_id,_db.person_id,insertContacts,function(result){
				that.win.close();				
			 });
			}else{
				alert("no contact offer");
			}
		
		});
		
		section.add(row);
		return section;
	}
	
	
}