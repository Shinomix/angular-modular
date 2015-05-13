(function() {
    'use strict';

    angular
        .module('angular-modular.public', [
            'angular-modular.core'
        ])
        .run(PublicRouterConfig);


    PublicRouterConfig.$inject = ['routerHelper'];

    function PublicRouterConfig(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/home',
                    templateUrl: 'modules/public/home.tpl.html'
                }
            }
        ];
    }
})();
