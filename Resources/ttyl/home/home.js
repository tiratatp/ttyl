// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// namespace
var _home = {};

(function() {

	// private var
	var osname = Titanium.Platform.osname;

	var longitude = null;
	var latitude = null;
	var accuracy = null;
	var isLocationReady = false;

	var isSetLocationCallback = false;

	// UI
	var win = Titanium.UI.createWindow({
		title:'Home',
		backgroundColor:'#fff'
	});
	var tab = Titanium.UI.createTab({
		icon:'KS_nav_views.png',
		title:'Home',
		window:win
	});
	// button
	var init = Titanium.UI.createButton({
		borderColor:'#000',
		borderWidth:'1.0',
		color:'#999',
		title:'Init',
		font: {
			fontSize:30,
			fontFamily:'Helvetica Neue'
		},
		textAlign:'center',
		backgroundColor:'#fff',
		top:'5%',
		left:'5%',
		height:'40%',
		width:'90%',
	});
	var receive = Titanium.UI.createButton({
		borderColor:'#000',
		borderWidth:'1.0',
		color:'#999',
		title:'Receive',
		font: {
			fontSize:30,
			fontFamily:'Helvetica Neue'
		},
		textAlign:'center',
		backgroundColor:'#fff',
		top:'55%',
		left:'5%',
		height:'40%',
		width:'90%',
	});

	// private functions
	function getPersonId() {
		return _db.person_id;
	}

	function generatePersonIdHash(person_id) {
		var daysSinceEpoch = Math.floor((new Date()).getTime() / 86400000);
		var hash = b64_hmac_sha1("Fibosoft_TTYL_2011" + daysSinceEpoch,person_id);
		return hash;
	}

	function getPersonIdWithHash() {
		var person_id = getPersonId();
		var hash = generatePersonIdHash(person_id);
		return person_id+':'+hash;
	}

	function getLocation() {
		if(isSetLocationCallback) {
			return;
		}
		isSetLocationCallback = true;

		function translateErrorCode(code) {
			if (code == null) {
				return null;
			}
			switch (code) {
				case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
					return "Location unknown";
				case Ti.Geolocation.ERROR_DENIED:
					return "Access denied";
				case Ti.Geolocation.ERROR_NETWORK:
					return "Network error";
				case Ti.Geolocation.ERROR_HEADING_FAILURE:
					return "Failure to detect heading";
				case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
					return "Region monitoring access denied";
				case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
					return "Region monitoring access failure";
				case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
					return "Region monitoring setup delayed";
			}
		}

		function onLocation(e) {
			if (!e.success || e.error) {
				//currentLocation.text = 'error: ' + JSON.stringify(e.error);
				Ti.API.info("Code translation: "+translateErrorCode(e.code));
				//alert('error ' + JSON.stringify(e.error));
				return;
			}
			isLocationReady=true;

			//var longitude = e.coords.longitude;
			//var latitude = e.coords.latitude;
			//var altitude = e.coords.altitude;
			//var heading = e.coords.heading;
			//var accuracy = e.coords.accuracy;
			//var speed = e.coords.speed;
			var timestamp = e.coords.timestamp;
			//var altitudeAccuracy = e.coords.altitudeAccuracy;

			latitude = e.coords.latitude;
			longitude = e.coords.longitude;
			accuracy = e.coords.accuracy;

			//Ti.API.info('speed ' + speed);
			//currentLocation.text = 'long:' + longitude + ' lat: ' + latitude;
			Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
		}

		function reverseGeocoder(latitude,longitude) {
			Titanium.Geolocation.reverseGeocoder(latitude,longitude, function(evt) {
				if (evt.success) {
					var places = evt.places;
					if (places && places.length) {
						reverseGeo.text = places[0].address;
					} else {
						reverseGeo.text = "No address found";
					}
					Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
				} else {
					Ti.UI.createAlertDialog({
						title:'Reverse geo error',
						message:evt.error
					}).show();
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
				}
			});
		}

		//
		//  SHOW CUSTOM ALERT IF DEVICE HAS GEO TURNED OFF
		//
		if (Titanium.Geolocation.locationServicesEnabled === false) {
			Titanium.UI.createAlertDialog({
				title:'Kitchen Sink',
				message:'Your device has geo turned off - turn it on.'
			}).show();
		} else {
			if (Titanium.Platform.name != 'android') {
				var authorization = Titanium.Geolocation.locationServicesAuthorization;
				Ti.API.info('Authorization: '+authorization);
				if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
					Ti.UI.createAlertDialog({
						title:'Kitchen Sink',
						message:'You have disallowed Titanium from running geolocation services.'
					}).show();
				} else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
					Ti.UI.createAlertDialog({
						title:'Kitchen Sink',
						message:'Your system has disallowed Titanium from running geolocation services.'
					}).show();
				}
			}
			//
			//  SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
			//
			// Titanium.Geolocation.ACCURACY_BEST
			// Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS
			// Titanium.Geolocation.ACCURACY_HUNDRED_METERS
			// Titanium.Geolocation.ACCURACY_KILOMETER
			// Titanium.Geolocation.ACCURACY_THREE_KILOMETERS
			//
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_KILOMETER;
			//
			//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
			//  THIS VALUE IS IN METERS
			//
			Titanium.Geolocation.distanceFilter = 10;
			//
			// GET CURRENT POSITION - THIS FIRES ONCE
			//
			Titanium.Geolocation.getCurrentPosition(onLocation);
			//
			// EVENT LISTENER FOR GEO EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON DISTANCE FILTER)
			//
			Titanium.Geolocation.addEventListener('location', onLocation);
		}
	}

	// public variables
	_home.tab = tab;
	_home.showQRCode = function(qr_str) {
		function showQRFallback() {
			var url = "https://chart.googleapis.com/chart?cht=qr&chl="+Titanium.Network.encodeURIComponent(qr_str)+"&chs="+win.width+"x"+win.height;
			var imageView = Ti.UI.createImageView({
				width:win.width,
				height:win.height,
				image:url,
				top:0,
				left:0,
				zIndex:100,
			});
			var invite = Titanium.UI.createLabel({
				text:'Invite others to scan this QR code',
				color:"#000",
				textAlign:'center',
				width:'auto',
				top:"80%",
				font: {
					fontSize:20,
					fontFamily:'Helvetica Neue'
				},
				zIndex:1000,
			});
			var win2 = Titanium.UI.createWindow({
				title:'QR Code',
				backgroundColor:'#fff'
			});
			win2.add(invite);
			win2.add(imageView);
			imageView.addEventListener('click', function() {
				win2.close();
			});
			Ti.UI.currentTab.open(win2);
		}

		if(osname == "android") {
			var intent = Ti.Android.createIntent({
				action: "com.google.zxing.client.android.ENCODE"
			});
			intent.putExtra("ENCODE_TYPE", "TEXT_TYPE");
			intent.putExtra("ENCODE_DATA", qr_str);
			var activity = Ti.Android.currentActivity;
			activity.startActivityForResult(intent, function(e) {
				if ("error" in e) {
					showQRFallback();
					return;
				}
			});
		} else {
			showQRFallback();
		}
	};
	// event listeners
	init.addEventListener("click", function() {
		function onError(error) {
			Ti.API.info('ERROR in init.addEventListener: '+error);
		}

		function onQRRead(barcode) {
			_utils.showLoading("Sending to cloud");
			var label = Titanium.UI.createLabel({
				text:'Barcode: ' + barcode,
				textAlign:'center',
				width:'auto'
			});
			win.add(label);
			var components = barcode.split(":");
			if(components.length!=2) {
				onError("component length != 2");
			}
			var person_id = components[0];
			var hash = components[1];
			var real_hash = generatePersonIdHash(person_id);
			if(real_hash!=hash) {
				onError("invalid hash");
			}
			_db.onMeet(person_id, function() {
				_utils.hideLoading();
			});
		}

		if(osname == "android") {
			var titaniumBarcode = require('com.mwaysolutions.barcode');
			titaniumBarcode.scan({
				success: function (data) {
					if(data && data.barcode) {
						onQRRead(data.barcode);
					} else {
						alert(JSON.stringify(data));
					}
				},
				error: function (err) {
					onError(err);
				}
			});
		} else if(osname == "ipad" || osname == "iphone") {
			var TiBar = require('tibar');
			TiBar.scan({
				// simple configuration for iPhone simulator
				configure: {
					classType: "ZBarReaderController",
					sourceType: "Camera",
					cameraMode: "Default",
					symbol: {
						"QR-Code":true,
					}
				},
				success: function(data) {
					Ti.API.info('TiBar success callback!');
					if(data && data.barcode) {
						onQRRead(data.barcode);
					}
				},
				error: function() {
					onError();
				}
			});
		}
	});
	receive.addEventListener('click', function() {
		var qr_str = getPersonIdWithHash();
		_home.showQRCode(qr_str);
	});
	// add components to UI
	win.add(init);
	win.add(receive);

	getLocation();
})();