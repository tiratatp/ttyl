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

	var viewRow = Titanium.UI.createTableViewRow();
	var viewType = (data.key[2]);
	switch(viewType) {
		case _cons.I_MET_WHOM:
			viewRow = IMetWhomView(data.value.person_id2);
			break;
		case _cons.WHO_MET_ME:
			viewRow = WhoMetMeView(data.value.person_id1);
			break;
		case _cons.FRI_MET_WHOM:
			viewRow = FriMetWhomView();
			break;
		case _cons.WHO_MET_FRI:
			viewRow = WhoMetFriView();
			break;
		case _cons.NONE:
		default:
			viewRow = NoneView();
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