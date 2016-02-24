/**
 * Created by dingyi on 2/23/16.
 */
(function () {
  'use strict';

  angular.directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function () {
          scope.$apply(function () {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);

  angular.service('fileUpload', ['$http', '$log', function ($http, $log) {
    this.uploadFileToUrl = function (file, uploadUrl) {
      var fd = new FormData();
      fd.append('file', file);

      $http.post(uploadUrl, fd, {
          transfromRequest: angular.identity,
          headers: { 'Content-Type': undefined }
        })
        .then(
          function (response) {
            return response;
          },
          function (err) {
            $log.error(err);
            return {
              status: err.status,
              message: 'authentication failed!'
            };
          }
        );
    };
  }]);

  function UploadPDFCtrl($scope, $rootScope, UserService) {

    $scope.curr = $rootScope.globals.currentUser.username;

    loadFiles();
    function loadFiles($rootScope) {

    }

    function signout() {

    }

    function uploadPDF($scope) {
      var file = $scope.myFile;

      console.log('file is');
      console.dir(file);

      var uploadUrl = '/pdfUpload';
      fileUpload.uploadFileToUrl(file, uploadUrl);
    }
  }

  angular.module('labDoc').controller('UploadPDFCtrl', UploadPDFCtrl);

})();
