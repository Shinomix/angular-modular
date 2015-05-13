(function() {
    'use strict';

    angular
        .module('angular-modular')
        .config([
            /*UI Router dependencies */
            '$urlRouterProvider',
            '$stateProvider',

            function ($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise('/home');
            }
        ]);
})();
