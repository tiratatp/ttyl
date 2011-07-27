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

	var viewRow = Ti.UI.createTableViewRow({
		height: options.height
	});
	var view = null;

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
	viewRow.add(view);

	viewRow.addEventListener('click', function(e) {
		var feedDetail = new feedDetail(data.id)
		tabGroup.activeTab.open(feedDetail.getWin());
	});
	this.addEventListener = function(e, fn) {
		viewRow.addEventListener(e, fn);
	};
	this.setRowHeight = function(a) {
		viewRow.height = a;
		view.height = a;
	};
	this.getViewRow = function() {
		return viewRow;
	};
}