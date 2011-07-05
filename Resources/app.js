// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// namespace
var ttyl = {};

(function() {
	var console = {
		log: function(str) {
			return Ti.API.info(str);
		}
	};

	// create tab group
	var tabGroup = Titanium.UI.createTabGroup();

	//
	// create base UI tab and root window
	//
	var win1 = Titanium.UI.createWindow({
		title:'Tab 1',
		backgroundColor:'#fff'
	});
	var tab1 = Titanium.UI.createTab({
		icon:'KS_nav_views.png',
		title:'Home',
		window:win1
	});

	var init = Titanium.UI.createButton({
		borderColor:'#000',
		borderWidth:'1.0',
		color:'#999',
		title:'Init',
		font: {
			fontSize:20,
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
			fontSize:20,
			fontFamily:'Helvetica Neue'
		},
		textAlign:'center',
		backgroundColor:'#fff',
		top:'55%',
		left:'5%',
		height:'40%',
		width:'90%',
	});
	init.addEventListener("click", function() {
		/*Titanium.Media.showCamera({
		 success:function(event)
		 {
		 var image = event.media;

		 Ti.API.debug('Our type was: '+event.mediaType);
		 if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
		 {
		 var imageView = Ti.UI.createImageView({width:win1.width,height:win1.height,image:event.media});
		 win1.add(imageView);
		 }
		 else
		 {
		 alert("got the wrong type back ="+event.mediaType);
		 }
		 },
		 cancel:function()
		 {
		 alert('You canceled the action.');
		 },
		 error:function(error)
		 {
		 // create alert
		 var a = Titanium.UI.createAlertDialog({title:'Camera'});

		 // set message
		 if (error.code == Titanium.Media.NO_CAMERA)
		 {
		 a.setMessage('Please run this test on device');
		 }
		 else
		 {
		 a.setMessage('Unexpected error: ' + error.code);
		 }

		 // show alert
		 a.show();
		 },
		 saveToPhotoGallery:true,
		 allowEditing:true,
		 mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
		 })*/

		var osname = Titanium.Platform.osname;
		if(osname == "android") {
			var titaniumBarcode = require('com.mwaysolutions.barcode');
			titaniumBarcode.scan({
				success: function (data) {
					if(data && data.barcode) {
						var label = Titanium.UI.createLabel({
							text:'Barcode: ' + data.barcode,
							textAlign:'center',
							width:'auto'
						});
						win.add(label);
					} else {
						alert(JSON.stringify(data));
					}
				},
				error: function (err) {
					alert("Error!! " + err);
				},
				cancel: function () {
					alert("cancel");
				}
			});
		} else if(osname == "ipad" || osname == "iphone") {
			//
		}
/*
		var intent = Ti.Android.createIntent({
			action: "com.google.zxing.client.android.SCAN"
		});
		intent.putExtra("SCAN_MODE", "QR_SCAN_MODE");
		var activity = Ti.Android.currentActivity;
		activity.startActivityForResult(intent, function(e) {
			if (e.resultCode == Ti.Android.RESULT_OK) {
				var contents = e.intent.getStringExtra("SCAN_RESULT");
				var format = e.intent.getStringExtra("SCAN_RESULT_FORMAT");
				Ti.UI.createNotification({
					message: "Contents: " + contents + ", Format: " + format
				}).show();
			} else if (e.resultCode == Ti.Android.RESULT_CANCELED) {
				Ti.UI.createNotification({
					message: "Scan canceled!"
				}).show();
			}
		});
		*/
	});
	// for iPhone either use web service or http://code.google.com/p/tibar/

	receive.addEventListener('click', function() {
		var intent = Ti.Android.createIntent({
			action: "com.google.zxing.client.android.ENCODE"
		});
		intent.putExtra("ENCODE_TYPE", "TEXT_TYPE");
		intent.putExtra("ENCODE_DATA", "me@nuttyknot.com");
		var activity = Ti.Android.currentActivity;
		activity.startActivityForResult(intent, function(e) {
			if (e.resultCode == Ti.Android.RESULT_OK) {
				var contents = e.intent.getStringExtra("SCAN_RESULT");
				var format = e.intent.getStringExtra("SCAN_RESULT_FORMAT");
				Ti.UI.createNotification({
					message: "Contents: " + contents + ", Format: " + format
				}).show();
			} else if (e.resultCode == Ti.Android.RESULT_CANCELED) {
				Ti.UI.createNotification({
					message: "Scan canceled!"
				}).show();
			}
		});
	});
	//win1.add(label1);
	win1.add(init);
	win1.add(receive);

	tabGroup.addTab(tab1);

	// open tab group
	tabGroup.open();
})();