var ProfileDetail = function(id,model)
{
	var profileModel = model;
	var data = profileModel.getDataById(id);
	
	 
	this.win = Titanium.UI.createWindow({
		backgroundColor:'#fff'
	});
	var win = this.win;
	win.rightNavButton = saveButton();
	
	var table1 =  Titanium.UI.createTableView({
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});

	section1 = createVisibilitySection(data.visibility);
	section2 = createOfferSection(data.offer);
	section3 = createSaveSection();
	
	table1.setData([section1, section2, section3]);
	
	this.win.add(table1);	
	
	function saveButton()
	{
		var saveButton = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.SAVE
		});
		saveButton.addEventListener('click', function()
		{
			//Titanium.UI.createAlertDialog({title:'System Button', message:'SAVE'}).show();
			win.close();
		});
		return saveButton;
	}
	
	function createVisibilitySection(type)
	{
		var visibility = [
			{type:'friends', value:'Friends'},
			{type:'followers', value:'Followers'}
		];
		var section = Titanium.UI.createTableViewSection();
		section.headerTitle = "Visibility";
		for(var i=0; i<visibility.length; i++)
		{
			var row = Titanium.UI.createTableViewRow({title:visibility[i].value});
			if(type == visibility[i].type)
			{
				row.hasCheck = true;
			}
			section.add(row);
		}
		section.addEventListener('click', function(e)
		{
			section = e.section;
			count = section.rowCount;
			index = e.index;
			for(var i=0; i<count; i++)
			{
				var row = section.rows[i];
				if(i == index)
				{
					row.hasCheck = true;
				}
				else
				{
					row.hasCheck = false;
				}
			}
		});
		return section;
	}
	
	function createOfferSection(offer)
	{
		var section = Titanium.UI.createTableViewSection();
		section.headerTitle = "Offer";
	
		var row = Titanium.UI.createTableViewRow();
		
		var label = Titanium.UI.createLabel({
			text:"Offer this info",
			font:{fontSize:16,fontWeight:'bold'},
			width:'auto',
			textAlign:'left',
			left: 10
		});
	
		var offerSwitch = Titanium.UI.createSwitch({
		    value: false,
		    right: 10
		});
		
		if(offer)
		{
			offerSwitch.value = true;
		}
		
		row.add(label);
		row.add(offerSwitch);
		
		section.add(row);
		
		return section;
	}
	
	function createSaveSection()
	{
		var section = Titanium.UI.createTableViewSection();
		var row = Titanium.UI.createTableViewRow();
		var label = Titanium.UI.createLabel({
			text:"Save",
			font:{fontSize:16,fontWeight:'bold'},
			textAlign:'center',
		});
		
		row.addEventListener('click', function(e)
		{
			win.close();
		});
		
		row.add(label);
		section.add(row);
		
		return section;
	}
}