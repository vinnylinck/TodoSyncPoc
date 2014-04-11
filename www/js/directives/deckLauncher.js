/*global angular, console, confirm */
(function DeckLauncher() {
    'use strict';


    // Directive usage restrictions
    var restrictions = 'A',

        // direction structure
        launcher = function (sync, $window) {
            return {
                restrict: restrictions,

                // directive logics
                link: function linkFn(scope, elm, attrs) {

                    // server ping
                    var ping = function () {
                        sync.info().then(
                            function (i) {
                                console.log('- Server answered: ', JSON.stringify(i));
                                scope.$eval(attrs.deckLauncher);
                                elm[0].showCard(1);
                            },

                            function (e) {
                                console.log('- Cannot reach server: ', JSON.stringify(e));

                                if (confirm("Woops! It seems you are not connected to the internet. Do you want a second chance?")) {
                                    ping();
                                }
                            }
                        );                        
                    };

                    // starting app
                    $window.setTimeout(ping, 2000);
                }
            };
        };


    // injecting dependencies
    launcher.$inject = ['SyncService', '$window'];

    // registering directive
    angular.module('TodoSyncApp').directive('deckLauncher', launcher);
}());