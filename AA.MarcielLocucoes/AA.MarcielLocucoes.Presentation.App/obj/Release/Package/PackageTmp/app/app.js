'use strict';
var app = angular.module('app', [
    'ngRoute',
    'LocalStorageModule',
    'mask',
    'ui.utils.masks'
]);

app.config(function ($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.withCredentials = true;

    $routeProvider.when('/', {
        templateUrl: '/app/views/home/index.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/empresa', {
        templateUrl: '/app/views/empresa/index.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/clientes', {
        templateUrl: '/app/views/cliente/index.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/solucoes', {
        templateUrl: '/app/views/solucoes/index.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/contato', {
        templateUrl: '/app/views/contato/index.html',
        controller: 'ContatoController'
    });
    
    $routeProvider.otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true).hashPrefix('!');
});
