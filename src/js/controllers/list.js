/*global angular */

(function ListController() {
    'use strict';
    
    //
    var List = function (sync) {
        var self = this;
        
        this.tasks = [];
        
        sync.monitor(sync.entities.TASK_LIST, function (updatedList) {
            self.tasks = updatedList;
        });
    };
    
    // injecting dependencies
    List.$inject = ['SyncService'];
            
    // registering controller
    angular.module('TodoSyncApp').controller('ListController', List);
}());