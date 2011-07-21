Titanium.UI.setBackgroundColor('#000');
var login = {};

login.tab = null;
login.win = null;
login.facebookLogin = null;
login.loginButton = null;

login.win = Titanium.UI.createWindow({
	title:'Login',
	backgroundColor:'#fff'
});
login.tab = Titanium.UI.createTab({
	icon:'KS_nav_views.png',
	title:'login',
	window:login.win
});

Titanium.Facebook.appid = '214932645217412';
Titanium.Facebook.permissions = ['publish_stream'];

Titanium.Facebook.addEventListener('login', function(e) {
    if (e.success) {
        alert('Logged in');
    }
});

login.setOnLoggedInCallback = function(fn) {
	Titanium.Facebook.addEventListener('login', fn);	
};

Titanium.Facebook.addEventListener('logout', function(e) {
    alert('Logged out');
});

login.setOnLoggedOutCallback = function(fn) {
	Titanium.Facebook.addEventListener('logout', fn);	
};

login.loginButton = Titanium.Facebook.createLoginButton({
	center:{x:'50%',y:'50%'},
	left:'50%',
	top:'50%',
	style: 'wide',	
});

login.onLoading = function() {
	_utils.showLoading("Logging in");
};

login.loginButton.addEventListener("click",login.onLoading);

login.loginButton.show();
login.win.add(login.loginButton);


// Titanium.win.add(
	// Titanium.Facebook.createLoginButton({
		// center:{x:'50%',y:'50%'},
		// left:'50%',
		// top:'50%'
	// })
// );



