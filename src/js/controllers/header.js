/*global angular */

(function HeaderController() {
    'use strict';

    //
    var Header = function (storage) {
        this.syncInProgress = false;
        
        this.saveItem = function (t) {
            storage.save(t);
        };
        
        this.clearItems = function () {
            storage.clear();
        };
        
    };

    //
    Header.prototype.add = function () {

        var t = {
            _id: new Date().toISOString(),
            title: "Some task: " + new Date().getTime(),
            complete: false
        };
        
        
        this.saveItem(t);
    };
    
    //
    Header.prototype.clear = function () {
        this.clearItems();
    };
    
    
    // injecting dependencies
    Header.$inject = ['StorageService'];

    // registering controller
    angular.module('TodoSyncApp').controller('HeaderController', Header);
}());