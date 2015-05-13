(function() {
//    'use strict';

    angular
        .module('angular-modular', [
            /* Shared modules */
            'angular-modular.core',

            /* Features */
            'angular-modular.public'
        ]);

    angular
        .module('angular-modular.core', [
            /* Html templates */
            'templates.app',
            /* 3rd-party modules */
            'ui.router',
            'blocks.router'
        ]);
})();
