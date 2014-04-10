/*global angular */
(function StorageService() {
    'use strict';
    
    //
    var Storage = function (sync) {
        var self = this;
        
        this.items = [];
        this.save = function (t) {
            self.items.push(t);
            sync.refresh(sync.entities.TASK_LIST, self.items);
        };
        
    };
    
    // injecting dependencies
    Storage.$inject = ['SyncService'];
    
    // registering angular service
    angular.module('TodoSyncApp').service('StorageService', Storage);
}());