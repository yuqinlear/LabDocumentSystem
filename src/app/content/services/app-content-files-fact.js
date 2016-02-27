/**
 * Created by dingyi on 2/27/16.
 */

(function () {
  'use strict';

  function filesService($http) {

    function getFilenames(username) {
      return $http.get('api/users/files/' + username);
    }

    function getFileByUser(filename, username) {
      return $http.get('api/users/files/' + username + '/' + filename);
    }

    return {
      getFilenames: getFilenames
    };
  }
  angular.module('labDoc').factory('filesService', filesService);

})();
