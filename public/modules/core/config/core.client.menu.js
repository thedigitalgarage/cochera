(function() {
    'use strict';

    angular
        .module('app.core')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus){
      // Add default menu entry
      Menus.addMenuItem('sidebar', 'Dashboard', 'dashboard', null, '/dashboard', true, null, null, 'icon-home');
    }

})();