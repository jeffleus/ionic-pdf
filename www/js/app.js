// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'starter.services', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (window.cordova) {
        //quick check for presence of ngCordovaFile plugin
        console.log('starting cordovaFile check');
        console.log($cordovaFile);
        //check for the docs directory suing File plugin
        $cordovaFile.checkDir(cordova.file.documentsDirectory, "")
        .then(function(success) {
            console.log(success);
        }, function(error) {
            console.log(error);
        });
    } else { console.log( ' no cordova plugins available ' ); }
  });
})
