/**
 * Created by paul on 2/10/16.
 */
(function () {
  'use strict';

  function registerController($location, $scope, UserService, flashService) {

    $scope.register = function register() {
      $scope.dataLoading = true;
      UserService.Create($scope.user)
        .then(function (response) {
          if (response.success) {
            flashService.Success('Registration successful', true);
            $location.path('/login');
          } else {
            flashService.Error(response.message);
            $scope.dataLoading = false;
          }
        });
    }
  }

  angular.module('labDoc').controller('registerController', registerController);

})();