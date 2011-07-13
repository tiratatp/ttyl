Ti.include('/ttyl/home/home.js');
Ti.include('/ttyl/login/login.js');
Ti.include('/ttyl/feed/feed.js')
Ti.include('/ttyl/profile/profile.js')
// create tab group

var loginTabGroup = Titanium.UI.createTabGroup();
var tabGroup = Titanium.UI.createTabGroup();

loginTabGroup.addTab(login.tab);

login.setOnLoggedInCallback(function() {
	loginTabGroup.hide();
	tabGroup.open();
});

if(Titanium.Facebook.loggedIn) {
	Titanium.Facebook.fireEvent("login");
}

tabGroup.addTab(_home.tab);
tabGroup.addTab(feed.tab);
profile = new Profile();
tabGroup.addTab(profile.tab);

// open tab group
loginTabGroup.open();