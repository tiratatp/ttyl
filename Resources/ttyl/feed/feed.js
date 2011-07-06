/**
 * @author Flash
 */

//namespace
var feed = {};

//var
feed.win = null;
feed.tab = null;
feed.table = null;
feed.data = [];

feed.init_data = [
	{leftImage: '',}
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
	
}

