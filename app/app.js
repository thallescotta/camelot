'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'ui.bootstrap',
    'myApp.ferramenta',
    'myApp.view2',
    'myApp.version',
    'myApp.factories',
    'myApp.services',
    'myApp.directives',
    'colorpicker.module'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/ferramenta'});
}]);
