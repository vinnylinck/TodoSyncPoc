/*global angular, PouchDB, console */
(function SyncService() {
    'use strict';

    //
    var SyncSvc = function SyncSvc($q, $log, $window) {
        var self = this;

        // remote DB
        this.inprogress = false;
        this.refreshInterval = 25;
        this.remoteHost = 'https://vinnylinck:94kf73GS@vinnylinck.cloudant.com/todosyncpoc';
        this.opts = {
            continuous: false,
            complete: function () {
                self.refresh(self.entities.CLOUD_OPS, 0);
                self.inprogress = false;
            }
        };

        // promisses & log
        this.$q = $q;
        this.$log = $log;


        // database
        this.db = this.open();

        // callback store
        this.hooks = [];

        // entities to be 'monitored'
        this.entities = {
            TASK_LIST: 0,
            CLOUD_OPS: 1
        };

        // job for import
        $window.setInterval(function () {
            if (!self.inprogress) {
                self.inprogress = true;
                self.replicateFrom();
            }
        }, self.refreshInterval * 1000);

    };

    SyncSvc.prototype.info = function () {
        var p = this.$q.defer();
        
        this.db.info(function (err, info) {
            if (err) {
                p.reject(err);
            } else {
                p.resolve(info);
            }
        });
        
        return p.promise;
    };
    
    //
    SyncSvc.prototype.replicateTo = function () {
        this.refresh(this.entities.CLOUD_OPS, 1);

        this.db.replicate.to(this.remoteHost, this.opts);
    };

    //
    SyncSvc.prototype.replicateFrom = function () {
        this.refresh(this.entities.CLOUD_OPS, -1);
        this.db.replicate.from(this.remoteHost, this.opts);
        this.refreshAll(this.entities.TASK_LIST);
    };

    //
    SyncSvc.prototype.open = function () {
        return new PouchDB('todosyncpoc');
    };


    //
    SyncSvc.prototype.all = function () {
        var p = this.$q.defer();

        this.db.allDocs({include_docs: true, descending: false}, function (err, doc) {

            if (err) {
                p.reject(err);
            } else {
                p.resolve(doc.rows);
            }
        });

        return p.promise;
    };


    //
    SyncSvc.prototype.refresh = function (entity, value) {

        var i, fn;

        // looping callbacks
        for (i = 0; i < this.hooks[entity].length; i += 1) {

            // getting callback
            fn = this.hooks[entity][i];

            // running callback
            if (fn !== undefined) {
                fn(value);
            } else {
                // removing reference if was lost
                this.hooks[entity].splice(i, 1);
            }
        }
    };

    //
    SyncSvc.prototype.monitor = function (entity, handler) {

        // initializing hook
        if (this.hooks[entity] === undefined) {
            this.hooks[entity] = [];
        }

        // adding callback
        this.hooks[entity].push(handler);
    };

    //
    SyncSvc.prototype.refreshAll = function (entity) {
        var self = this;

        this.all().then(

            function onSuccess(rows) {
                self.refresh(entity, rows);
            },

            function onError(e) {
                self.$log.error('[ERROR]:SyncService.refreshAll # ', e);
            }
        );
    };

    //
    SyncSvc.prototype.put = function (entity, value) {
        var self = this;

        this.db.put(value, function (err, result) {
            if (!err && result.ok) {
                self.refreshAll(entity);
                self.replicateTo();
            }
        });
    };


    //
    SyncSvc.prototype.removeAll = function (entity) {
        var self = this;

        this.all().then(
            function onSuccess(rows) {
                var i, bulk = [];

                // preparing bulk deletion
                for (i = 0; i < rows.length; i += 1) {
                    rows[i].doc._deleted = true;
                    bulk.push(rows[i].doc);
                }

                // deleting
                self.db.bulkDocs({docs: bulk}, function (err, response) {

                    if (err) {
                        self.$log.error('[ERROR]:SyncService.removeAll # ', err);
                    } else {
                        self.refreshAll(entity);
                        self.replicateTo();
                    }
                });


            },

            function onError(e) {
                self.$log.error('[ERROR]:SyncService.removeAll # ', e);
            }
        );
    };

    // injecting dependencies
    SyncSvc.$inject = ['$q', '$log', '$window'];

    // registering angular service
    angular.module('TodoSyncApp').service('SyncService', SyncSvc);
}());