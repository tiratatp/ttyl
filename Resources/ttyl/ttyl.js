Ti.include('/ttyl/home.js');
Ti.include('/ttyl/feed/feed.js')

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

tabGroup.addTab(_home.tab);
tabGroup.addTab(feed.tab);

// open tab group
tabGroup.open();