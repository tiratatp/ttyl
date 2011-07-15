/**
 * @author Flash
 */
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
	
	// config
	rowHeight: 50,
	rowHeight2: 100,
	bgColor: "#FFF",
	bgColor2: "#222",
	
	//constructor
	init: function(){
		var f = this;
		//init data
		f.customData = [
			{leftImage:'ggf.JPG', title:"You have met Mr.P!" },
			{leftImage:'ggf.JPG', title:"You have met Mr.P!" },
			{leftImage:'ggf.JPG', title:"You have met Mr.P!" },
			{leftImage:'ggf.JPG', title:"You have met Mr.P!" },
			{leftImage:'ggf.JPG', title:"You have met Mr.P!" },
			{leftImage:'ggf.JPG', title:"You have met Mr.P!" }
		];
		//init view
		f.win = Ti.UI.createWindow({
			title: "Stream",
			backgroundColor: f.bgColor
		});
		f.tab = Ti.UI.createTab({
			window: f.win,
			title: "Feed",
			icon: 'KS_nav_views.png'
		});
		f.table = Ti.UI.createTableView({});
		
		f.renderRow();
		
		//bind data
		feed.table.setData(feed.data);
		feed.win.add(feed.table);
		
	},
	
	//row process
	renderRow: function(){
		var f = this;
		//temp render data
		for (var i = f.customData.length - 1; i >= 0; i--) {
			var row = Ti.UI.createTableViewRow({height:f.rowHeight,backgroundColor:f.bgColor});
			var rowView = Ti.UI.createView({
				height:"100%",
				top:0
			});
			
			var leftImage = Ti.UI.createImageView({
				image:f.customData[i].leftImage,
				width: 50,
				left:"5%"
			});
			var title = Ti.UI.createLabel({
				text:f.customData[i].title,
				font:{fontSize:16,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:13,
				left:70,
				height:24
			});
			
			rowView.add(leftImage);
			rowView.add(title);
			row.add(rowView);
			f.data.push(row)
		}
		//bind event
		f.table.addEventListener('click',function(e){
			if(e.index>=0 && f.activeRow != e.row){
				Ti.API.info("index of row : " + e.index);
				if(f.activeRow != null){
					f.activeRow.height=f.rowHeight;
					f.activeRow.children[0].height=f.rowHeight;
					f.activeRow.remove(f.activeRow.children[1]);
					f.activeRow.backgroundColor = f.bgColor;
				}
				f.activeRow = e.row;
				
				var rowButtonView = Ti.UI.createView({
					bottom: 0
				});
				var button1 = Ti.UI.createButton({
					title: "View Offer",
					right: 5,
					bottom: 0,
					width: 100,
					height: 50
				});
				
				button1.addEventListener('click',function(e){
					alert('this is offer!');
				});
				
				rowButtonView.add(button1);
				f.activeRow.height = f.rowHeight2;
				f.activeRow.backgroundColor = f.bgColor2;
				f.activeRow.children[0].height = f.rowHeight2;
				f.activeRow.add(rowButtonView);
			}
		});
	},
	
	//temporary
	addRow: function(){
		this.data.push({leftImage:'ggf.JPG', title:"You have met Mr.P!" });
	}
};
