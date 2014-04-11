/*global angular */

(function ListController() {
    'use strict';

    //
    var List = function (sync, $log) {
        var self = this;

        // task list
        this.tasks = [];

        // retrieving list
        sync.all().then(
            function (result) {
                self.tasks = result;
            },

            function (e) {
                $log.error('[ERROR]:List # ', e);
            }
        );
        
        // subscribe to TASK_LIST changes
        sync.monitor(sync.entities.TASK_LIST, function (updatedList) {
            self.tasks = updatedList;
        });
        
        //
        this.checkAndSync = function (t) {
            t.doc.complete = !t.doc.complete;
            sync.put(sync.entities.TASK_LIST, t.doc);
        };
        
    };
    
    
    
    // 
    List.prototype.markAsComplete = function(t) {
        this.checkAndSync(t);
    };

    
    // injecting dependencies
    List.$inject = ['SyncService', '$log'];

    
    // registering controller
    angular.module('TodoSyncApp').controller('ListController', List);
}());