/**
 * @author Flash
 */
var IMetWhomView = function() {
	var view = Ti.UI.createTableViewRow();
	var youLabel = Ti.UI.createLabel({
		text: 'You',
		font: {
			fontSize:15,
			fontFamily:'Helvetica Neue',
			fontWeight:'bold'
		},
		color: '#32cd32',
		top: 5,
		left: 20
	});
	var metLabel = Ti.UI.createLabel({
		text: 'met',
		font: {
			fontSize:15,
			fontFamily:'Helvetica Neue'
		},
		color: '#000000',
		top: 5,
		left: 60
	});
	var whomImage = Ti.UI.createImageView({
		image: '/ttyl/ggf.JPG',
		width: 32,
		left: 100
	});
	view.add(youLabel);
	view.add(metLabel);
	view.add(whomImage);
	
	return view;
};

var WhoMetMeView = function() {
	var view = Ti.UI.createTableViewRow();
	var youLabel = Ti.UI.createLabel({
		text: 'YOU',
		font: {
			fontSize:15,
			fontFamily:'Helvetica Neue',
			fontWeight:'bold'
		},
		color: '#32cd32',
		top: 5,
		left: 100
	});
	var metLabel = Ti.UI.createLabel({
		text: 'met',
		font: {
			fontSize:15,
			fontFamily:'Helvetica Neue'
		},
		color: '#000000',
		top: 5,
		left: 60
	});
	var whoImage = Ti.UI.createImageView({
		image: '/ttyl/ggf.JPG',
		width: 32,
		left: 20
	});
	view.add(youLabel);
	view.add(metLabel);
	view.add(whoImage);

	return view;
};

var FriMetWhomView = function() {
	var view = Ti.UI.createTableViewRow();
	var friImage = Ti.UI.createImageView({
		image: '/ttyl/ggf.JPG',
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
		image: '/ttyl/ggf.JPG',
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
		image: '/ttyl/ggf.JPG',
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
		image: '/ttyl/ggf.JPG',
		width: 32,
		left: 20
	});
	view.add(friImage);
	view.add(friLabel);
	view.add(metLabel);
	view.add(whomImage);
	
	return view;
};

var NoneView = function(){
	var view = Ti.UI.createTableViewRow();
	var noneLabel = Ti.UI.createLabel({
		text:"none",
	});
	view.add(noneLabel);
	
	return view;
};
