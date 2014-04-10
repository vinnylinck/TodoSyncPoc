/*global angular */

(function HeaderController() {
    'use strict';

    //
    var Header = function (storage) {
        this.syncInProgress = false;
        this.saveItem = function (t) {
            storage.save(t);
        };
    };

    //
    Header.prototype.add = function () {
        var t = "Some task: " + new Date().getTime();
        this.saveItem(t);
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
    Header.$inject = ['StorageService'];

    // registering controller
    angular.module('TodoSyncApp').controller('HeaderController', Header);
}());