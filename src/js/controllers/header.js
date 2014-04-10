/*global angular */

(function HeaderController() {
    'use strict';

    //
    var Header = function () {
        this.syncInProgress = false;
    };

    //
    Header.prototype.sync = function () {
        if (!this.syncInProgress) {
            this.syncInProgress = true;
        }
    };
    
    //
    Header.prototype.onSyncStop = function () {
        this.syncInProgress = false;
    };
    
    // injecting dependencies
    //Header.$inject = ['$scope'];

    // registering controller
    angular.module('TodoSyncApp').controller('HeaderController', Header);
}());