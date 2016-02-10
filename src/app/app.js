'use strict';

// Declare app level module which depends on views, and components
  angular.module('labDoc', [
    'ngRoute',
  ]).
  config(['$routeProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'homeCtrl',
        templateUrl: 'user/home/app-user-home-tmpl.html'

      })
      .when('/login', {
        controller: 'loginCtrl',
        templateUrl: 'user/login/login-view.html'

      })
      .when('/register', {
        controller: 'registerCtrl',
        templateUrl: 'user/home/register-view.html'

      })
      .otherwise({redirectTo: '/login'});
  }]);
