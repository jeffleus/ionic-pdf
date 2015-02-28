angular.module('starter.services', [])
.run(function() {
    // something I used during setup to mark that the services module was built 
    console.log('starter.services module added');
})
.service('versionSvc', function() {
    var self = this;
	self.ver = '1.0.0';
	return self;
});