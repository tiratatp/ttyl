/**
 * @author Flash
 */
Ti.include('/ttyl/feed/views.js');
var FeedRow = function(viewType){
	var options = {
		height:50,
		width:null
	};
	
	var viewRow = Ti.UI.createTableViewRow({
		height: options.height
	});
	var view = null;
		
	switch(viewType){
		case _cons.I_MET_WHOM:
			break;
		case _cons.WHO_MET_ME:
			break;
		case _cons.FRI_MET_WHOM:
			break;
		case _cons.WHO_MET_FRI:
			break;
		case _cons.NONE:
		default:
		
	}
	viewRow.add(view);
	
	
	this.setRowHeight = function(a){
		viewRow.height = a;
		view.height = a;
	}
	
	this.getViewRow = function(){
		return viewRow;
	}
	this.getView = function(){
		return view;
	}
	
}
