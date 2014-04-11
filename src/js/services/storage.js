/*global angular */
(function StorageService() {
    'use strict';
    
    //
    var Storage = function (sync) {
        var self = this;
       
        //
        this.save = function (t) {
            sync.put(sync.entities.TASK_LIST, t);
        };
        
        //
        this.clear = function () {
            sync.removeAll(sync.entities.TASK_LIST);
        };
        
    };
    
    // injecting dependencies
    Storage.$inject = ['SyncService'];
    
    // registering angular service
    angular.module('TodoSyncApp').service('StorageService', Storage);
}());