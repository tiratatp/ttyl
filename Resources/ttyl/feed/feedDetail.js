var FeedDetail = function(id){
	var win = Ti.UI.createWindow({
		backgroundColor:'#fff'
	});
	
	win.rightNavButton = createBackButton();
	
	
	function createBackButton(){
		var b = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.SAVE
		});
		b.addEventListener('click', function()
		{
			win.close();
		});
		return b;
	}
	
	this.getWin = function(){
		return win;
	}
}
