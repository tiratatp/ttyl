var ProfileDetail = function()
{
	this.win = Titanium.UI.createWindow({
		backgroundColor:'#fff'
	});
	var win = this.win;
	
	var table1 =  Titanium.UI.createTableView({
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});

	var section1 = Titanium.UI.createTableViewSection();
	section1.headerTitle = "Visibility";
	var row1 = Titanium.UI.createTableViewRow({title:"Friends"});
	var row2 = Titanium.UI.createTableViewRow({title:"Followers"});
	row1.addEventListener('click', function(e)
	{
		win.close();
	});
	row2.addEventListener('click', function()
	{
		win.close();
	});
	section1.add(row1);
	section1.add(row2);
	
	section2 = createOfferSection();
	table1.setData([section1, section2]);
	
	this.win.add(table1);	
	
	function createOfferSection()
	{
		var section = Titanium.UI.createTableViewSection();
		section.headerTitle = "Offer";
	
		var row = Titanium.UI.createTableViewRow();
	
		var basicSwitch = Titanium.UI.createSwitch({
		    value:false
		});
		
		row.add(basicSwitch);
		
		section.add(row);
		
		return section;
	}
}