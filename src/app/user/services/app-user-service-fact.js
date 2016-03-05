/**
 * Created by paul on 2/10/16.
 */
(function () {
  'use strict';

  function UserService($q, $http) {

    //function getAll() {
    //  return $http.get('/api/users').then(_handleSuccess, _handleError('Error getting all users'));
    //}

    //function getById(id) {
    //  return $http.get('/api/users/' + id).then(_handleSuccess, _handleError('Error getting user by id'));
    //}

    function getCurrentUser() {
      return $http.get('/api/current-user').then(_handleSuccess, _handleError('Error getting currentUser'));
    }

    //function getByUsername(username) {
    //  return $http.get('/api/users/' + username).then(_handleSuccess, _handleError('Error getting user by username'));
    //}

    function create(user) {
      return $http.post('/api/current-user', user).then(_handleSuccess, _handleError('Error creating user'));
    }

    //function update(user) {
    //  return $http.put('/api/users/' + user.id, user).then(_handleSuccess, _handleError('Error updating user'));
    //}

    //function deleteById(id) {
    //  return $http.delete('/api/users/' + id).then(_handleSuccess, _handleError('Error deleting user'));
    //}

    function _handleSuccess(res) {
      return res.data;
    }

    function _handleError(errMsg) {
      return function (err) {
        return $q.reject({ err: err, message: errMsg + ': ' + err.data.message });
      };
    }

    return {
      getCurrentUser: getCurrentUser,
      create: create
    };
  }
  angular.module('labDoc').factory('UserService', UserService);

})();
