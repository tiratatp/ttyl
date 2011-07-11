Ti.include('/ttyl/home.js');
Ti.include('/ttyl/login.js');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

tabGroup.addTab(_home.tab);
tabGroup.addTab(login.tab);

// open tab group
tabGroup.open();