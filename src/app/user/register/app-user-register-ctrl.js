/**
 * Created by paul on 2/10/16.
 */
(function () {
  'use strict';

  function RegisterCtrl($scope, $location, UserService, FlashService) {

    $scope.register = function register() {
      $scope.dataLoading = true;
      UserService.Create($scope.user)
        .then(
        function (response) {
            FlashService.success('Registration successful', true);
            $location.path('/login');
          },
        function (err) {
          FlashService.error(err.message);
          $scope.dataLoading = false;
        });
    };
  }

  angular.module('labDoc').controller('RegisterCtrl', RegisterCtrl);

})();
