
// namespace
var _utils = {};

(function() {
	var actInd = Titanium.UI.createActivityIndicator({
		message:"Logging in"
	});

	_utils.showLoading = function(message) {
		actInd.message = message;
		actInd.show();
	};
	_utils.hideLoading = function() {
		actInd.hide();
	};
})();