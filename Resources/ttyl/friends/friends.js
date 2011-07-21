Titanium.UI.setBackgroundColor('#FFF');

var _friends = {};

(function() {

	// private variable	
	var bgColor = "#FFF";
	var win = Ti.UI.createWindow({
		title: "Friends",
		backgroundColor: bgColor
	});
	var tab = Ti.UI.createTab({
		window: win,
		title: "Friends",
		icon: 'KS_nav_views.png'
	});
	var table = Ti.UI.createTableView({});
	var rows = [];

	// public variable
	_friends.tab = tab;

	var test_data = [{
		image:'ggf.JPG',
		name:"Zynes"
	},{
		image:'ggf.JPG',
		name:"Zynes"
	},];

	function onRowClick(event) {
		var win = Ti.UI.createWindow({
			title: "Friend Info",
		});
		var text = Titanium.UI.createLabel({
			text:this.datum.name,			
		});
		win.add(text);
		Ti.UI.currentTab.open(win);
	}

	function renderRow(data) {
		for (var i = 0; i < data.length; i++) {
			var datum = data[i];
			var row = Ti.UI.createTableViewRow({
				height:50,
				datum:datum,
				backgroundColor:bgColor,
			});
			var rowView = Ti.UI.createView({
				height:"100%",
				top:0
			});
			var leftImage = Ti.UI.createImageView({
				image:datum.image,
				width: 50,
				left:"5%"
			});
			var title = Ti.UI.createLabel({
				text:datum.name,
				font: {
					fontSize:16,
					fontWeight:'bold'
				},
				width:'auto',
				textAlign:'left',
				top:13,
				left:60,
				height:24
			});

			rowView.add(leftImage);
			rowView.add(title);
			row.add(rowView);
			row.hasDetail=true;
			rows.push(row);

			row.addEventListener("click", onRowClick);
		}
		table.setData(rows);
	}

	renderRow(test_data);

	// add ui components
	win.add(table);
})();