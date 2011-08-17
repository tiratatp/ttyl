Ti.include('/ttyl/utils/constants.js');
Ti.include('/ttyl/utils/sha1.js');
Ti.include('/ttyl/utils/utils.js');

Ti.include('/ttyl/db/db.js');

Ti.include('/ttyl/home/home.js');
Ti.include('/ttyl/friends/friends.js');
Ti.include('/ttyl/login/login.js');
Ti.include('/ttyl/feed/feed.js');
Ti.include('/ttyl/profile/profile.js');
Ti.include('/ttyl/setting/setting.js');
Ti.include('/ttyl/profile/offer.js');

// create tab group
// var loginTabGroup = Titanium.UI.createTabGroup();
var tabGroup = Titanium.UI.createTabGroup();

login.setOnLoggedInCallback(function(e) {	
	login.onLoading();
	Titanium.API.info(' setOnLoggedInCallback : ' + JSON.stringify(e));
	if(e.type == "login") {
		e.uid = Titanium.Facebook.uid;
	}
	if (e.uid) {
		_db.onLoggedIn(e, function() {
			login.win.close();
			tabGroup.open();
			_utils.hideLoading();
			
			//feed load
			feed.renderRow();
		});		
	}	
});
login.setOnLoggedOutCallback(function(e){
	if(e.type == "logout"){
		Titanium.Facebook.logout();
		tabGroup.close();
		//login.win.open();
		//#todo open login windows after closing tabGroup
	}
});
if(Titanium.Facebook.loggedIn) {
	Titanium.Facebook.fireEvent("login");
}
tabGroup.addEventListener('logout',function(e){
	tabGroup.close();
	login.win.open();
});

tabGroup.addTab(_home.tab);
feed.init();
tabGroup.addTab(feed.tab);
profile = new Profile();
tabGroup.addTab(profile.tab);
tabGroup.addTab(_friends.tab);
//setting = new Setting();
setting.init();
tabGroup.addTab(setting.tab);
_db.addEventListener('meet',function(person_id){
	Titanium.API.info("meet");
	Titanium.API.info(person_id);
	var offer = new Offer(person_id);
	tabGroup.activeTab.open(offer.win);
});
// open login window
// loginTabGroup.open();
login.win.open();
