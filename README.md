# ionic-pdf

This repo provides a sample pdf generator that:

 * Uses the pdfMake.org library for generating the pdf
 * Outputs base-64 encoded pdf file data for display in iframe on screen
 * Saves pdf to a local file using cordova File plugin

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
The [pdfMake.org](http://pdfMake.org) library is based on the pdfKit library and provides a declarative approach to document definition that provides a number of features: columns, tables, images, limited formatting, etc.  The one piece that was missing for my specific use was generic SVG drawings.  So, I made a small edit to allow me to draw a piechart using SVG path commands.  NOTE - the pdfmake.min.js library used in this example contains my edits.
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


And here's some code!

```javascript
$(function(){
  $('div').html('I am a div.');
});
```

This is [on GitHub](https://github.com/jbt/markdown-editor) so let me know if I've b0rked it somewhere.


Props to Mr. Doob and his [code editor](http://mrdoob.com/projects/code-editor/), from which
the inspiration to this, and some handy implementation hints, came.

### Stuff used to make this:

 * [marked](https://github.com/chjj) for Markdown parsing
 * [CodeMirror](http://codemirror.net/) for the awesome syntax-highlighted editor
 * [highlight.js](http://softwaremaniacs.org/soft/highlight/en/) for syntax highlighting in output code blocks
 * [js-deflate](https://github.com/dankogai/js-deflate) for gzipping of data to make it fit in URLs
