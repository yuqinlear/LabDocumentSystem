/**
 * Created by dingyi on 2/27/16.
 */

(function () {
  'use strict';

  function filesService($http) {

    function getFilenames(username) {
      return $http.get('api/users/' + username + '/files/');
    }

    function getFileByUserAndFilename(filename, username) {
      return $http.get('api/users/' + username + '/files/' + filename, { responseType: 'arraybuffer' });
    }

    return {
      getFilenames: getFilenames,
      getFileByUserAndFilename: getFileByUserAndFilename
    };
  }
  angular.module('labDoc').factory('filesService', filesService);

})();
