/**
 * Created by paul on 2/10/16.
 */
(function () {
  'use strict';

  function LoginCtrl($scope, $location, FlashService, AuthenticationService) {

    $scope.login = login;

    AuthenticationService.clearCredentials();

    function login() {
      $scope.dataLoading = true;
      AuthenticationService.login($scope.username, $scope.password, function (response) {
        if (response.success) {
          AuthenticationService.setCredentials($scope.username, $scope.password);
          $location.path('/');
        } else {
          FlashService.error(response.message);
          $scope.dataLoading = false;
        }
      });
    };
  }

  angular.module('labDoc').controller('LoginCtrl', LoginCtrl);

})();
