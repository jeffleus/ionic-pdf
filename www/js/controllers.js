angular.module('starter.controllers', [])
.run(function() {
    // something I used during setup to mark that the controllers module was built 
    console.log('starter.controllers module added');
})
.controller('MainCtrl', function($scope, $ionicLoading, ReportSvc) {
    console.log('main controller');
    $scope.runReport = _runReport;
    $scope.clearReport = _clearReport;
    _activate();
    
    function _activate() {        
//
// ReportSvc Event Listeners: Progress/Done
//    used to listen for async progress updates so loading text can change in 
//    UI to be repsonsive because the report process can be 'lengthy' on 
//    older devices (chk reportSvc for emitting events)
//
		$scope.$on('ReportSvc::Progress', function(event, msg) {
			_showLoading(msg);
		});		 
		$scope.$on('ReportSvc::Done', function(event, err) {
			_hideLoading();
		});        
    }
    
    function _runReport() {
        //if no cordova, then running in browser and need to use dataURL and iframe
        if (!window.cordova) {
            ReportSvc.runReportDataURL( {},{} )
                .then(function(dataURL) {
                    //set the iframe source to the dataURL created
                    console.log('report run in browser using dataURL and iframe');
                    document.getElementById('pdfImage').src = dataURL;
                });
            return true;
        }
        //if codrova, then running in device/emulator and able to save file and open w/ InAppBrowser
        else {
            ReportSvc.runReportAsync( {},{} )
                .then(function(filePath) {
                    //log the file location for debugging and oopen with inappbrowser
                    console.log('report run on device using File plugin');
                    console.log('ReportCtrl: Opening PDF File (' + filePath + ')');
                    window.open(filePath, '_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
                    hideLoading();
                });
            return true;
        }
	}

    //reset the iframe to show the empty html page from app start
    function _clearReport() {
        document.getElementById('pdfImage').src = "empty.html";
    }
//
// Loading UI Functions: utility functions to show/hide loading UI
//
    function _showLoading(msg) {
        $ionicLoading.show({
          template: msg
        });
    }
    function _hideLoading(){
        $ionicLoading.hide();
    }
});
