/*global angular */
(function SyncService() {
    'use strict';
    
    //
    var SyncSvc = function SyncSvc() {
        this.hooks = {};
        this.entities = {
            TASK_LIST: 'tasklist'
        };
    };
    
    //
    SyncSvc.prototype.refresh = function (entity, value) {
        var fn = this.hooks[entity];
        
        if ( fn !== undefined) {
            fn(value);
        }
    };
    
    //
    SyncSvc.prototype.monitor = function (entity, handler) {
        this.hooks[entity] = handler;
    };
    
    // registering angular service
    angular.module('TodoSyncApp').service('SyncService', SyncSvc);
}());