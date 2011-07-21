/**
 * @author Flash
 */
var IMetWhomView = function() {
	var view = Ti.UI.createView();
	var youLabel = Ti.UI.createLabel({
		text: 'YOU',
		font: {
			fontSize:30,
			fontFamily:'Helvetica Neue',
			fontWeight:900
		},
		color: '#32cd32',
		top: 20,
		left: 20
	});
	var metLabel = Ti.UI.createLabel({
		text: 'met',
		font: {
			fontSize:30,
			fontFamily:'Helvetica Neue',
			fontWeight:500
		},
		color: '#000000',
		top: 20,
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
}

var whoMetMeView = function() {
	var view = Ti.UI.createView();
	var youLabel = Ti.UI.createLabel({
		text: 'YOU',
		font: {
			fontSize:30,
			fontFamily:'Helvetica Neue',
			fontWeight:900
		},
		color: '#32cd32',
		top: 20,
		left: 100
	});
	var metLabel = Ti.UI.createLabel({
		text: 'met',
		font: {
			fontSize:30,
			fontFamily:'Helvetica Neue',
			fontWeight:500
		},
		color: '#000000',
		top: 20,
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
}

var whoMetMeView = function() {
	var view = Ti.UI.createView();
	var youLabel = Ti.UI.createLabel({
		text: 'YOU',
		font: {
			fontSize:30,
			fontFamily:'Helvetica Neue',
			fontWeight:900
		},
		color: '#32cd32',
		top: 20,
		left: 100
	});
	var metLabel = Ti.UI.createLabel({
		text: 'met',
		font: {
			fontSize:30,
			fontFamily:'Helvetica Neue',
			fontWeight:500
		},
		color: '#000000',
		top: 20,
		left: 60
	});
	var whomImage = Ti.UI.createImageView({
		image: '/ttyl/ggf.JPG',
		width: 32,
		left: 20
	});
	view.add(youLabel);
	view.add(metLabel);
	view.add(whomImage);
}