//
// Async Report Service
//
// This service provides the ability to save to file a report using a set of methods run
// async to allow progress reporting.  The async processing is acheived by using promises 
// and the $q service from angular.  This async work will allow for a repsonsive UI during
// processing, which can be slow on older phones
//
// REQ'D: pdfmake libraries https://github.com/bpampuch/pdfmake
//
(function() {
    'use strict';
    // attach the service to the [starter.services] module in angular
    angular.module('starter.services')
	 	.service('ReportSvc', ['$q', '$rootScope', '$timeout', 'ReportBuilderSvc',
                               reportSvc]);
//
// genReportDef --> genReportDoc --> buffer[] --> Blob() --> saveFile --> return filePath
//
//  Events: ReportSvc::Progress, ReportSvc::Done
//
	 function reportSvc($q, $rootScope, $timeout, ReportBuilderSvc) {
		 this.runReportAsync = _runReportAsync;
		 this.runReportDataURL = _runReportDataURL;
//
// RUN ASYNC: runs the report async mode w/ progress updates and delivers a local fileUrl for use
//
		 function _runReportAsync(player, transcript) {
             var deferred = $q.defer();
			 
             showLoading('1.Processing Transcript');
             generateReportDef(player, transcript).then(function(docDef) {
                 showLoading('2. Generating Report');
                 return generateReportDoc(docDef);
             }).then(function(pdfDoc) {
                 showLoading('3. Buffering Report');
                 return generateReportBuffer(pdfDoc);
             }).then(function(buffer) {
                 showLoading('4. Saving Report File');
                 return generateReportBlob(buffer);
             }).then(function(pdfBlob) {
                 showLoading('5. Opening Report File');
                 return saveFile(pdfBlob);
             }).then(function(filePath) {
                 hideLoading();
                 deferred.resolve(filePath);
             }, function(error) {
                 hideLoading();
                 console.log('Error: ' + error.toString());
                 deferred.reject(error);
             });
             return deferred.promise;
         }
//
// RUN DATAURL: runs the report async mode w/ progress updates and stops w/ pdfDoc -> dataURL string conversion
//
		 function _runReportDataURL(player, transcript) {
             var deferred = $q.defer();
			 
             showLoading('1.Processing Transcript');
             generateReportDef().then(function(docDef) {
                 showLoading('2. Generating Report');
                 return generateReportDoc(docDef);
             }).then(function(pdfDoc) {
                 showLoading('3. Convert to DataURL');
                 return getDataURL(pdfDoc);
             }).then(function(outDoc) {
                 hideLoading();
                 deferred.resolve(outDoc);
             }, function(error) {
                 hideLoading();
                 console.log('Error: ' + error.toString());
                 deferred.reject(error);
             });
             return deferred.promise;
         }
//
// 1.GenerateReportDef: use currentTranscript to craft reportDef JSON for pdfMake to generate report
//
		function generateReportDef() {
            var deferred = $q.defer();
			
            // removed specifics of code to process data for drafting the doc
            // layout based on player, transcript, courses, etc.
            // currently mocking this and returning a pre-built JSON doc definition
            
			//use rpt service to generate the JSON data model for processing PDF
            // had to use the $timeout to put a short delay that was needed to 
            // properly generate the doc declaration
            $timeout(function() {
                var dd = {};
                dd = ReportBuilderSvc.generateReport()
				deferred.resolve(dd);
            }, 100);
            
            return deferred.promise;
		}
//
// 2.GenerateRptFileDoc: take JSON from rptSvc, create pdfmemory buffer, and save as a local file
//	in: json docDef, out: pdfDoc object
//
		function generateReportDoc(docDefinition) {
			//use the pdfmake lib to create a pdf from the JSON created in the last step
			var deferred = $q.defer();
			try {
                //use the pdfMake library to create in memory pdf from the JSON
				var pdfDoc = pdfMake.createPdf( docDefinition );
                deferred.resolve(pdfDoc);
			}
			catch (e) {
				deferred.reject(e);
			}
			
			return deferred.promise;
		}
//
// 3.GenerateRptBuffer: pdfKit object pdfDoc --> buffer array of pdfDoc
//	in: pdfDoc object	out: buffer[]
//
		function generateReportBuffer(pdfDoc) {
			//use the pdfmake lib to get a buffer array of the pdfDoc object
			var deferred = $q.defer();
			try {
                //get the buffer from the pdfDoc
				pdfDoc.getBuffer(function(buffer) {
                    $timeout(function() {
					   deferred.resolve(buffer);
                    }, 100);
				});
			}
			catch (e) {
				deferred.reject(e);
			}
			
			return deferred.promise;
		}
//
// 3b.getDataURL: pdfKit object pdfDoc --> encoded dataUrl
//	in: pdfDoc object	out: dataUrl
//
		 function getDataURL(pdfDoc) {
			//use the pdfmake lib to create a pdf from the JSON created in the last step
			var deferred = $q.defer();
			try {
                //use the pdfMake library to create in memory pdf from the JSON
				pdfDoc.getDataUrl(function(outDoc) {
					deferred.resolve(outDoc);
				});
			}
			catch (e) {
				deferred.reject(e);
			}
			
			return deferred.promise;
		 }
//
// 4.GenerateReportBlob: buffer --> new Blob object
// in: buffer[]		out: Blob object
//
		function generateReportBlob(buffer) {
			//use the global Blob object from pdfmake lib to creat a blob for file processing
			var deferred = $q.defer();
			try {
                //process the input buffer as an application/pdf Blob object for file processing
                var pdfBlob = new Blob([buffer], {type: 'application/pdf'});
                $timeout(function() {
                    deferred.resolve(pdfBlob);
                }, 100);
			}
			catch (e) {
				deferred.reject(e);
			}
			
			return deferred.promise;
		}
//
// 5.SaveFile: use the File plugin to save the pdfBlob and return a filePath to the client
//
		function saveFile(pdfBlob) {
			var deferred = $q.defer();
			
			var filePath = "";
			try {
				console.log('SaveFile: requestFileSystem');
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
			}
			catch (e) {
				console.error('SaveFile_Err: ' + e.message);
				deferred.reject(e);
				throw({code:-1401,message:'unable to save report file'});
			}			

			function gotFS(fileSystem) {
				console.error('SaveFile: gotFS --> getFile');
				fileSystem.root.getFile("rptSample.pdf", {create: true, exclusive: false}, gotFileEntry, fail);
			}

			function gotFileEntry(fileEntry) {
				console.error('SaveFile: gotFileEntry --> (filePath) --> createWriter');
				filePath = fileEntry.toURL();
				fileEntry.createWriter(gotFileWriter, fail);
			}

			function gotFileWriter(writer) {
				console.error('SaveFile: gotFileWriter --> write --> onWriteEnd(resolve)');
				writer.onwriteend = function(evt) {
                    $timeout(function() {
                        deferred.resolve(filePath);
                    }, 100);
				};
				writer.onerror = function(e) {
                    console.log('writer error: ' + e.toString());
					deferred.reject(e);
				};
				writer.write(pdfBlob);
			}

            function fail(error) {
				console.log(error.code);
				deferred.reject(error);
			}
			
			return deferred.promise;
		}
//
// Loading UI Functions: utility functions to show/hide loading UI
//
        function showLoading(msg) {
            $rootScope.$broadcast('ReportSvc::Progress', msg);
        }
        function hideLoading(){
            $rootScope.$broadcast('ReportSvc::Done');
        }
	 }
    
})();