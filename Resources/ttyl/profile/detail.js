var ProfileDetail = function()
{
	this.win = Titanium.UI.createWindow({
		backgroundColor:'#fff'
	});
	var win = this.win;
	win.rightNavButton = saveButton();
	
	var table1 =  Titanium.UI.createTableView({
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});

	section1 = createVisibilitySection();
	
	section2 = createOfferSection();
	table1.setData([section1, section2]);
	
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
	
	function createVisibilitySection()
	{
		var visibleValue = ["Friends","Followers"];
		var section = Titanium.UI.createTableViewSection();
		section.headerTitle = "Visibility";
		for(var i=0; i<2; i++)
		{
			var row = Titanium.UI.createTableViewRow({title:visibleValue[i]});
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
			/*
			var row = e.row;
			if(row.hasCheck == true)
			{
				row.hasCheck = false;
			}
			else
			{
				row.hasCheck = true;
			}*/
		});
		return section;
	}
	
	function createOfferSection()
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
		
		row.add(label);
		row.add(offerSwitch);
		
		section.add(row);
		
		return section;
	}
}