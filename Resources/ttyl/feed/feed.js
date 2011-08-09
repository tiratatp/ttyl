/**
 * @author Flash
 */
Ti.include('/ttyl/feed/model/feedModel.js');
Ti.include('/ttyl/feed/feedRow.js');
Titanium.UI.setBackgroundColor('#FFF');

//namespace
var feed = {
	// view object
	tab: null,
	win: null,
	table: null,
	// mem
	data: [],
	activeRow: null,
	customData: [],
	constructed: false,

	// config
	tab_icon:'KS_nav_views.png',
	rowHeight: 50,
	rowHeight2: 100,
	bgColor: "#FFF",
	bgColor2: "#222",

	//constructor
	init: function() {
		var f = this;
		//init data
		//init view
		f.win = Ti.UI.createWindow({
			title: "Stream",
			backgroundColor: f.bgColor
		});
		f.tab = Ti.UI.createTab({
			window: f.win,
			title: "Feed",
			icon: f.tab_icon
		});
		f.table = Ti.UI.createTableView();

		//temp button
		// var addButton = Titanium.UI.createButton({
		// borderColor:'#000',
		// borderWidth:'1.0',
		// color:'#999',
		// title:'Temporary Add',
		// font: {
		// fontSize:30,
		// fontFamily:'Helvetica Neue'
		// },
		// textAlign:'center',
		// backgroundColor:'#fff',
		// top:0,
		// height:'10%',
		// width:'100%',
		// });
		//bind data
		// f.win.add(addButton);
		f.win.add(f.table);
		f.constructed = true;
	},
	//row process
	renderRow: function() {
		var f = this;
		_db.getMeetList(_db.person_id, function(data) {
			f.customData = data;
			if(typeof(f.customData)!=undefined && typeof(f.customData.rows)!=undefined) {
				Ti.API.debug('customData : ' +JSON.stringify(f.customData));
				Ti.API.debug('customData->rows : ' +f.customData.rows);
				var data = f.customData.rows;
				for (var i = data.length - 1; i >= 0; i--) {
					var feedRow = new FeedRow(data[i]);
					f.data.push(feedRow.getRow());
				}
				f.table.setData(f.data);
			}
		});
	},
	//temporary
	addRow: function() {
		this.customData.push({
			leftImage:'ggf.JPG',
			title:"You have met Mr.P!"
		});
		this.renderRow();
	}
};