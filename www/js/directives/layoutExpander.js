/*global angular */
(function LayoutExpander() {
    'use strict';


    // Directive usage restrictions
    var restrictions = 'A',


        // directive logic
        linkFn = function (scope, elm, attrs) {

            // when expander flag changes
            attrs.$observe('layoutExpander', function (mustExpand) {
                var isExpanded = elm[0].maxcontent,
                    bMustExpand = (mustExpand.toLowerCase() === "true");

                if (!isExpanded && bMustExpand) {
                    elm[0].maxcontent = true;
                } else if (isExpanded && !bMustExpand) {
                    elm[0].maxcontent = false;
                }

            });

        },


        // direction structure
        expander = function () {
            return {
                restrict: restrictions,
                link: linkFn
            };
        };


    // registering directive
    angular.module('TodoSyncApp').directive('layoutExpander', expander);
}());