(function() {
    'use strict';

    angular
        .module('app.core')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus){
        // Add default menu entry
        Menus.addMenuItem('sidebar', 'Dashboard', 'dashboard', null, '/dashboard', true, null, null, 'icon-home');
        Menus.addMenuItem('sidebar', 'Account', 'account', null, '', true, null, null, 'icon-user');
        Menus.addSubMenuItem('sidebar', 'account', 'Billing', 'account/billing');
        Menus.addSubMenuItem('sidebar', 'account', 'Team', 'account/team');
        Menus.addSubMenuItem('sidebar', 'account', 'Referrals', 'account/referrals');
        Menus.addMenuItem('sidebar', 'User', 'user', null, '', true, null, null, 'icon-people');
        Menus.addSubMenuItem('sidebar', 'user', 'Profile', 'user/profile');
        Menus.addSubMenuItem('sidebar', 'user', 'Security', 'user/security');
        Menus.addSubMenuItem('sidebar', 'user', 'Notifications', 'user/notifications');
    }
    
})();