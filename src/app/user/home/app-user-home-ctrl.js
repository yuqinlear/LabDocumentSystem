/**
 * Created by paul on 2/10/16.
 */
(function () {
  'use strict';

  function homeController($scope, $rootScope, User) {

    $scope.user = null;
    $scope.allUsers = [];
    $scope.deleteUser = deleteUser;

    loadCurrentUser();
    loadAllUsers();

    function loadCurrentUser() {
      User.GetByUsername($rootScope.globals.currentUser.username)
        .then(function (user) {
          $scope.user = user;
        });
    }

    function loadAllUsers() {
      User.GetAll()
        .then(function (users) {
          $scope.allUsers = users;
        });
    }

    function deleteUser(id) {
      User.Delete(id)
        .then(function () {
          loadAllUsers();
        });
    }
  }

  angular.module('labDoc').controller('homeController', HomeController);

})();
