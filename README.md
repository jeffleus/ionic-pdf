# ionic-pdf

This repo provides a sample pdf generator that:

 * Uses the pdfMake.org library for generating the pdf
 * Outputs base-64 pdf dataURI for display in iframe (*if run in browser*)
 * Saves pdf to a local file using cordova File plugin (*if run on device/emulator*)

## View it now
https://jeffleus.github.io/ionic-pdf/www/#/

## Run locally
This assumes you already have an emulator setup for iOS or Android. Substitute `android` for `ios` below to use Android. (*skip the ionic/cordova install if you are already setup to develop in ionic*)

    sudo npm install -g ionic cordova
    git clone https://github.com/jeffleus/ionic-pdf.git
    cd ionic-pdf
    ionic platform add ios
    ionic emulate ios

## pdfMake.org
The [pdfMake.org](http://pdfMake.org) library is based on the pdfKit library and provides a declarative approach to document definition that provides a number of features: columns, tables, images, limited formatting, etc.  The one piece that was missing for my specific use was generic SVG drawings.  So, I made a small edit to allow me to draw a piechart using SVG path commands.  NOTE - the pdfmake.min.js library used in this example contains my edits and is not the clean code from his repo.
## inline pdf display
To allow the demo to run online and in browser testing, I provide an iframe and base-64 dataURL method to display the pdf inline.  The pdfMake library generates the dataURL using the pdfKit provided method.  My sample assigns this string as the src for the iframe object in the ionic view.
## pdf save to file
To sample the file save method, you will need to run the app in the emulator or device to enable the use of the cordova File plugin.  The app that a pulled this code out of does not use the ngCordova library yet.  But I will eventually port over to match best practices use of plugins w/ Ionic.
## Plugins Used
  * com.ionic.keyboard (*prodvided in ionic starter by default*)
  * org.apache.cordova.console (*prodvided in ionic starter by default*)
  * org.apache.cordova.device (*prodvided in ionic starter by default*)
  * org.apache.cordova.file (**added to allow saving pdf as a local file**)
  * org.apache.cordova.inappbrowser  (**prodvided in ionic starter by default**)


##ToDo List
  * build out a wiki on repo to document the setup a little more
    * ReportBuilderSvc
    * ReportSvc
    * MainCtrl
  * add an email attachment example to the demo
  * refactor the reportSvc to receive docDef instead of ReportBuilderSvc
