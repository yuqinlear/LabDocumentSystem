/**
 * Created by dingyi on 2/24/16.
 */

(function () {
  'use strict';

  function uploadService($http) {

    function post(data) {
      var fd = new FormData();
      for (var key in data) {
        if (key && key !== 'files') {
          fd.append(key, data[key]);
        }
      }

      //make sure the sequence, files at the end of FormData
      var f = 'files';
      for (var fileKey in data[f]) {
        if (fileKey) {
          fd.append(fileKey, data[f][fileKey]);
        }
      }

      return $http.post('api/users/pdf', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      });
    }

    return {
      post: post
    };
  }
  angular.module('labDoc').factory('uploadService', uploadService);

})();
