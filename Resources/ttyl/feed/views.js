/**
 * @author Flash
 */
var IMetWhomView = function(person_id2, place_id) {
	var main = Ti.UI.createTableViewRow();
	Ti.API.info('..............loading image created!');
	var loadingImage = Ti.UI.createImageView({
		images:_cons.LOADING_IMAGES,
		duration:100,
		repeatCount:0,
		height:24,
		width:24,
		top:10
	});
	loadingImage.start();
	var loadingView = Ti.UI.createView({
		height:'100%',
		visible:true
	});
	loadingView.add(loadingImage);

	var view = Ti.UI.createView({
		visible:false
	});
	_db.getProfileByPersonId(person_id2, function(data) {
		var mainLabel = Ti.UI.createLabel({
			text: 'You met',
			font: {
				fontSize:15,
				fontFamily:'Helvetica Neue',
				fontWeight:'bold'
			},
			color: '#32cd32',
			top: 5,
			left: 20,

		});
		var whomImage = Ti.UI.createImageView({
			image: 'https://graph.facebook.com/'+data.rows[0].value.display_name+'/picture',
			width: 32,
			left: 100
		});
		whomImage.addEventListener('load', function() {
			Ti.API.info('.......................Image 1 load fire event!')
			loadingView.visible = false;
			view.visible = true;
			main.remove(loadingView);
		});
		view.add(mainLabel);
		view.add(whomImage);
	});
	main.add(loadingView);
	// main.add(view);

	return main;
};
var WhoMetMeView = function(person_id1) {
	var main = Ti.UI.createTableViewRow();

	var loadingImage = Ti.UI.createImageView({
		visible:true,
		images:_cons.LOADING_IMAGES,
		duration:100,
		height:24,
		width:24,
		top:10
	});
	loadingImage.start();
	var loadingView = Ti.UI.createView({
		height:'100%',
		visible:true
	});
	loadingView.add(loadingImage);

	var view = Ti.UI.createView({
		visible:false
	});
	_db.getProfileByPersonId(person_id1, function(data) {
		var mainLabel = Ti.UI.createLabel({
			text: 'You met',
			font: {
				fontSize:15,
				fontFamily:'Helvetica Neue',
				fontWeight:'bold'
			},
			color: '#32cd32',
			top: 5,
			left: 60
		});
		var whoImage = Ti.UI.createImageView({
			image: 'https://graph.facebook.com/'+data.rows[0].value.display_name+'/picture',
			width: 32,
			left: 20
		});
		whoImage.addEventListener('load', function() {
			Ti.API.info('.......................Image 2 load fire event!')
			loadingView.visible = false;
			view.visible = true;
			main.remove(loadingView);
		});
		view.add(mainLabel);
		view.add(whoImage);
	});
	main.add(loadingView);
	main.add(view);

	return main;
};
var FriMetWhomView = function() {
	var view = Ti.UI.createTableViewRow();
	var friImage = Ti.UI.createImageView({
		image: '/ggf.JPG',
		width: 32,
		left: 20
	});
	var friLabel = Ti.UI.createLabel({
		text: 'Mr.Plub Wittawin',
		font: {
			fontSize:15,
			fontFamily:'Helvetica Neue',
			fontWeight:900
		},
		color: '#32cd32',
		top: 5,
		left: 100
	});
	var metLabel = Ti.UI.createLabel({
		text: 'met',
		font: {
			fontSize:15,
			fontFamily:'Helvetica Neue',
			fontWeight:500
		},
		color: '#000000',
		top: 5,
		left: 60
	});
	var whomImage = Ti.UI.createImageView({
		image: '/ggf.JPG',
		width: 32,
		left: 20
	});
	view.add(friImage);
	view.add(friLabel);
	view.add(metLabel);
	view.add(whomImage);

	return view;
};
var WhoMetFriView = function() {
	var view = Ti.UI.createTableViewRow();
	var friImage = Ti.UI.createImageView({
		image: '/ggf.JPG',
		width: 32,
		left: 20
	});
	var friLabel = Ti.UI.createLabel({
		text: 'Mr.Plub Wittawin',
		font: {
			fontSize:15,
			fontFamily:'Helvetica Neue',
			fontWeight:900
		},
		color: '#32cd32',
		top: 5,
		left: 100
	});
	var metLabel = Ti.UI.createLabel({
		text: 'met',
		font: {
			fontSize:15,
			fontFamily:'Helvetica Neue',
			fontWeight:500
		},
		color: '#000000',
		top: 5,
		left: 60
	});
	var whomImage = Ti.UI.createImageView({
		image: '/ggf.JPG',
		width: 32,
		left: 20
	});
	view.add(friImage);
	view.add(friLabel);
	view.add(metLabel);
	view.add(whomImage);

	return view;
};
var NoneView = function() {
	var view = Ti.UI.createTableViewRow();
	var noneLabel = Ti.UI.createLabel({
		text:"none",
	});
	view.add(noneLabel);

	return view;
};