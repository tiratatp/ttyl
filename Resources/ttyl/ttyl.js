Ti.include('/ttyl/utils/json2.js');
//Ti.include('/ttyl/utils/crypto-sha256-hmac.js');
Ti.include('/ttyl/utils/sha1.js');
Ti.include('/ttyl/db/db.js');

Ti.include('/ttyl/home/home.js');
Ti.include('/ttyl/login/login.js');
Ti.include('/ttyl/feed/feed.js');
Ti.include('/ttyl/profile/profile.js');
Ti.include('/ttyl/setting/setting.js');
// create tab group
// var loginTabGroup = Titanium.UI.createTabGroup();
var tabGroup = Titanium.UI.createTabGroup();

// loginTabGroup.addTab(login.tab);
/*
(function() {
	var test = {};
	test.success = true;
	test.uid = 579110621;
	_db.onLoggedIn(test);
})();
*/

login.setOnLoggedInCallback(function(e) {	
	login.onLoading();
	Titanium.API.info(' setOnLoggedInCallback : ' + JSON.stringify(e));
	if(e.type == "login") {
		e.uid = Titanium.Facebook.uid;
	}
	if (e.uid) {
		// loginTabGroup.hide();
		_db.onLoggedIn(e, function() {
			login.win.close();
			tabGroup.open();
		});		
	}	
});

if(Titanium.Facebook.loggedIn) {
	Titanium.Facebook.fireEvent("login");
}

tabGroup.addTab(_home.tab);
feed.init();
tabGroup.addTab(feed.tab);
profile = new Profile();
tabGroup.addTab(profile.tab);
setting = new Setting();
tabGroup.addTab(setting.tab);
// open login window
// loginTabGroup.open();
login.win.open();
