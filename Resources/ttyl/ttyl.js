Ti.include('/ttyl/home.js');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

tabGroup.addTab(_home.tab);

// open tab group
tabGroup.open();