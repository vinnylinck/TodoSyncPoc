/*global angular */

(function RootController() {
    'use strict';
    
    //
    var Root = function () {
        this.fullscreen = true;
    };
    
    //
    Root.prototype.hideBoundaries = function () {
        this.fullscreen = true;
    };
    
    //
    Root.prototype.showBoundaries = function () {
        this.fullscreen = false;
    };
            
    // registering controller
    angular.module('TodoSyncApp').controller('RootController', Root);
}());