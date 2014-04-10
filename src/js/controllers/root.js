/*global angular */

(function RootController() {
    'use strict';
    
    //
    var Root = function () {
        this.isFullScreen = false;
    };
    
    //
    Root.prototype.hideBoundaries = function () {
        this.isFullScreen = true;
    };
    
    //
    Root.prototype.showBoundaries = function () {
        this.isFullScreen = false;
    };
    
    // injecting dependencies
    //Root.$inject = ['$rootScope'];
    
    // registering controller
    angular.module('TodoSyncApp').controller('RootController', Root);
}());