/**
 * Created by mathieudeumie on 07/12/15.
 */

'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }])
    .controller('View1Ctrl', [function() {

    }])