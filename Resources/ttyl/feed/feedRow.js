/**
 * @author Flash
 */
Ti.include('/ttyl/feed/views.js');
Ti.include('/ttyl/feed/feedDetail.js');
var FeedRow = function(data) {
	var options = {
		height:50,
		width:null
	};

	var viewRow = null;

	switch(data.viewType) {
		case _cons.I_MET_WHOM:
			view = IMetWhomView();
			break;
		case _cons.WHO_MET_ME:
			view = WhoMetMeView();
			break;
		case _cons.FRI_MET_WHOM:
			view = FriMetWhomView();
			break;
		case _cons.WHO_MET_FRI:
			view = WhoMetFriView();
			break;
		case _cons.NONE:
		default:

	}

	viewRow.addEventListener('click', function(e) {
		var feedDetail = new FeedDetail(data.id)
		tabGroup.activeTab.open(feedDetail.getWin());
	});
	this.addEventListener = function(e, fn) {
		viewRow.addEventListener(e, fn);
	};
	this.setRowHeight = function(a) {
		viewRow.height = a;
		view.height = a;
	};
	this.getRow = function() {
		return viewRow;
	};
}