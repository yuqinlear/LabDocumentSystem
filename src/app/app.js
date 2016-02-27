(function () {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('labDoc', [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'ui.bootstrap',
    'blockUI'
  ]).
    config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'HomeCtrl',
          templateUrl: 'user/home/app-user-home-tmpl.html'
        })
        .when('/login', {
          controller: 'LoginCtrl',
          templateUrl: 'user/login/app-user-login-tmpl.html'

        })
        .when('/register', {
          controller: 'RegisterCtrl',
          templateUrl: 'user/register/app-user-register-tmpl.html'

        })
        .when('/upload-pdf', {
          controller: 'UploadPDFCtrl',
          templateUrl: 'content/uploadpdf/app-user-upload-pdf-tmpl.html'
        })
        .otherwise({ redirectTo: '/login' });
    }]).run(
    function ($rootScope, $location, $cookies, $http, FlashService) {
      // keep user logged in after page refresh
      //$rootScope.globals = $cookies.get('globals') || {};
      //if ($rootScope.globals.currentUser) {
      //  $http.defaults.headers.common.Authorization = 'Basic ' + $rootScope.globals.currentUser.authdata;
      //}
      //
      //$rootScope.$on('$locationChangeStart', function (event, next, current) {
      //  FlashService.clearFlashMessage();
      //
      //  // redirect to login page if not logged in and trying to access a restricted page
      //  var restrictedPage = ['/login', '/register'].indexOf($location.path()) === -1;
      //  var loggedIn = $rootScope.globals.currentUser;
      //  if (restrictedPage && !loggedIn) {
      //    $location.path('/login');
      //  }
      //});
    }
  );
})();
