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
			_db.getProfileByPersonId( function(data) {
				if(data&&data.rows) {
					Titanium.API.info("data --------------> "+data);
					var contactlist = typeof(data.rows[0].value.contacts)!= undefined || typeof(data.rows[0].value.contacts)!= null ?data.rows[0].value.contacts:[];
					contactlist.push({
						"field_value1": textfield.value,
						"field_type": title.toLowerCase()
					});
					   var dateT = new Date();
			        dateTime = dateT.getYear()
			        + '/' + (dateT.getMonth()+1)
			        + '/' + (dateT.getDate())
			        + ' ' + (dateT.getHours())
			        + ':' + (dateT.getMinutes())
			        + ':' + (dateT.getSeconds());       
					var insertData = {
						"_id": data.rows[0].value._id ,
						"_rev":data.rows[0].value._rev ,
						"display_name":  data.rows[0].value.display_name,
						"type": "person",
						"contacts":contactlist,
						"created_datetime":dateTime
					};
					_db.create(insertData,function(result){
						Titanium.API.info(" do method .........................");
					});
				}
			});
			win.close();
		});
		row.add(label);
		section.add(row);

		return section;
	}
	

}