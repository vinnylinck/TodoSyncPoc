/*global angular */
(function DeckLauncher() {
    'use strict';


    // Directive usage restrictions
    var restrictions = 'A',

        
        // directive logic
        linkFn = function (scope, elm, attrs) {
            
        },


        // direction structure
        launcher = function () {
            return {
                restrict: restrictions,
                link: linkFn
            };
        };


    // registering directive
    angular.module('TodoSyncApp').directive('deckLauncher', launcher);
}());