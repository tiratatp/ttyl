// Class AddInfoWindow
var AddInfoWindow = function(title) {
	var title = typeof(title) != 'undefined' ? title : "";
	var win = Titanium.UI.createWindow({
		title:title
	});
	this.win = win;
	var textfield = null;
	var inputSection =  createInputSection();
	var saveSection =   createSaveSection();

	var data = [inputSection, saveSection];

	var tableView = Ti.UI.createTableView({
		data:data,
		style: Titanium.UI.iPhone.TableViewStyle.GROUPED
	});

	this.win.add(tableView);

	function createInputSection() {
		var section = Titanium.UI.createTableViewSection();
		var row = Ti.UI.createTableViewRow({
			height:50
		});

		textfield = Titanium.UI.createTextField({
			color:'#336699',
			height:35,
			top:10,
			left:10,
			value:'',
			width:250,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
		});

		row.add(textfield);
		row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
		row.className = 'control';

		section.add(row);

		return section;
	}

	// var saveContact = function() {
	// section
	// }
	function createSaveSection() {
		
		var section = Titanium.UI.createTableViewSection();
		var row = Titanium.UI.createTableViewRow();
		var label = Titanium.UI.createLabel({
			text:"Save",
			font: {
				fontSize:16,
				fontWeight:'bold'
			},
			hintText:'hint',
			textAlign:'center',
		});

		row.addEventListener('click', function(e) {
			//Titanium.API.info('event fire : ' + e.type + ' value  '+textfield.value);
		_db.deleteContacts(title.toLowerCase(),"yong2@facebook",function(result){
			Ti.API.info("success");
		});
					

			win.close();
		});
		row.add(label);
		section.add(row);

		return section;
	}
	

}