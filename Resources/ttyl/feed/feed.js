/**
 * @author Flash
 */
Titanium.UI.setBackgroundColor('#000');


//namespace
var feed = {};

//var
feed.win = null;
feed.tab = null;
feed.table = null;
feed.data = [];
feed.rowHeight = 50;
feed.rowHeightExpanded = 100;
feed.activeRow = null;

feed.init_data = [
	{leftImage:'', title:"" },
	{leftImage:'', title:"" },
	{leftImage:'', title:"" },
	{leftImage:'', title:"" },
	{leftImage:'', title:"" },
	{leftImage:'', title:"" }
];


//init var
feed.win = Ti.UI.createWindow({
	title: "Stream"
});
feed.tab = Ti.UI.createTab({
	window: feed.win,
	title: "Feed",
	icon: 'KS_nav_views.png'
});
feed.table = Ti.UI.createTableView({});



//row process
for (var i = feed.init_data.length - 1; i >= 0; i--) {
	var row = Ti.UI.createTableViewRow({height:feed.rowHeight});
	var rowView = Ti.UI.createView({
		height:"100%",
		top:0
	});
	
	var leftImage = Ti.UI.createImageView({
		image:'ggf.JPG',
		width:"20%",
		left:"5%"
	});
	var title = Ti.UI.createLabel({
		text:"You have met Mr.P!",
		font: {
			fontSize:16,
			fontWeight:'bold'
		},
		width:'auto',
		textAlign:'left',
		left:"30%",
		top:"10%"
	});
	
	rowView.add(leftImage);
	rowView.add(title);
	row.add(rowView);
	row.hasDetail=true;
	feed.data.push(row)
}

//bind event
feed.table.addEventListener('click',function(e){
	Ti.API.info("index of row : " + e.index);
	if(e.index>=0){
		if(feed.activeRow != null){
			feed.activeRow.height=feed.rowHeight;
			feed.activeRow.remove(feed.activeRow.children[1]);
			feed.activeRow.backgroundColor = "#000";
		}
		feed.activeRow = e.row;
		
		var rowButtonView = Ti.UI.createView({
			bottom: 0
		});
		var button1 = Ti.UI.createButton({
			title: "View Offer",
			right: 5,
			bottom: 0
		});
		
		button1.addEventListener('click',function(e){
			
		});
		
		rowButtonView.add(button1);
		feed.activeRow.height = feed.rowHeightExpanded;
		feed.activeRow.backgroundColor = "#444";
		feed.activeRow.add(rowButtonView);
	}
});

//bind data
feed.table.setData(feed.data);
feed.win.add(feed.table);
