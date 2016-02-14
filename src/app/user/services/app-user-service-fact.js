/**
 * Created by paul on 2/10/16.
 */
(function () {
  'use strict';

  function UserService($q, $http) {

    return {
      getAll: getAll,
      getById: getById,
      getByUsername: getByUsername,
      create: create,
      update: update,
      deleteById: deleteById
    };

    function getAll() {
      return $http.get('/api/users').then(_handleSuccess, _handleError('Error getting all users'));
    }

    function getById(id) {
      return $http.get('/api/users/' + id).then(_handleSuccess, _handleError('Error getting user by id'));
    }

    function getByUsername(username) {
      return $http.get('/api/users/' + username).then(_handleSuccess, _handleError('Error getting user by username'));
    }

    function create(user) {
      return $http.post('/api/users', user).then(_handleSuccess, _handleError('Error creating user'));
    }

    function update(user) {
      return $http.put('/api/users/' + user.id, user).then(_handleSuccess, _handleError('Error updating user'));
    }

    function deleteById(id) {
      return $http.delete('/api/users/' + id).then(_handleSuccess, _handleError('Error deleting user'));
    }

    function _handleSuccess(res) {
      return res.data;
    }

    function _handleError( errMsg ) {
      return function( err ) {
        return $.reject( { err: err , message: errMsg } );
      }
    }
  }
  angular.module('labDoc').factory('UserService', UserService);

})();
