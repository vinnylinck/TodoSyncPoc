/*global angular */

(function HeaderController() {
    'use strict';

    //
    var Header = function ($scope, storage, sync) {
        var self = this;
        
        this.syncInProgress = false;
        this.syncDirection =  "";
        
        this.saveItem = function (t) {
            storage.save(t);
        };
        
        this.clearItems = function () {
            storage.clear();
        };
        
        sync.monitor(sync.entities.CLOUD_OPS, function (direction) {
            console.log(direction);
            self.syncInProgress = (direction !== 0);
            
            if (self.syncInProgress) {
                self.syncDirection = (direction === 1 ? "-upload" : "-download");
            } else {
                self.syncDirection = "";
            }
            
            $scope.$apply();
        });
        
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
    Header.$inject = ['$scope', 'StorageService', 'SyncService'];

    // registering controller
    angular.module('TodoSyncApp').controller('HeaderController', Header);
}());