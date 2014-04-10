/*global angular */
(function DeckLauncher() {
    'use strict';


    // Directive usage restrictions
    var restrictions = 'A',
        
        // direction structure
        launcher = function ($window) {
            return {
                restrict: restrictions,
                
                // directive logics
                link: function linkFn(scope, elm, attrs) {
                    
                    // simulating app launcher
                    $window.setInterval(function launchApp() {
                        scope.$apply(attrs.deckLauncher);
                        elm[0].showCard(1);
                    }, 350);                
                }
            };
        };

    
    // injecting dependencies
    launcher.$inject = ['$window'];

    // registering directive
    angular.module('TodoSyncApp').directive('deckLauncher', launcher);
}());