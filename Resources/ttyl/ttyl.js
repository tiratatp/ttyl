Ti.include('/ttyl/home/home.js');
Ti.include('/ttyl/login.js');
Ti.include('/ttyl/feed/feed.js')
// create tab group
var tabGroup = Titanium.UI.createTabGroup();

tabGroup.addTab(login.tab);
tabGroup.addTab(_home.tab);
tabGroup.addTab(feed.tab);
// open tab group
tabGroup.open();
tabGroup.hide();
