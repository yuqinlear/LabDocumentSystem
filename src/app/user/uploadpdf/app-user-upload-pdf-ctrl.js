/**
 * Created by dingyi on 2/23/16.
 */
(function () {
  'use strict';

  angular.module('labDoc').directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind('change', function () {
          scope.$apply(function () {
            modelSetter(scope, element[0].files);
          });
        });
      }
    };
  }]);
  angular.module('labDoc').service('multipartForm', ['$http', function ($http) {
    this.post = function (uploadUrl, data) {
      var fd = new FormData();
      for (var key in data) {
        if (key) {
          if (key === 'files') {
            for (var fileKey in data[key]) {
              if (fileKey) {
                fd.append(fileKey, data[key][fileKey]);
              }
            }
          }else {
            fd.append(key, data[key]);
          }
        }
      }
      return $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      });
    };
  }]);

  function UploadPDFCtrl($scope, $rootScope, multipartForm) {
    //$scope.curr = $rootScope.globals.currentUser.username;
    $scope.customer = {};
    $scope.response = {};
    $scope.response.status = 'Not upload yet';
    loadFiles();
    function loadFiles() {
    }
    $scope.fileUpload = function () {
      multipartForm.post('api/user/pdf', $scope.customer)
        .then(function (response) {
          $scope.response = response;
        }, function (response) {
          $scope.response = response;
        });
    };
  }

  angular.module('labDoc').controller('UploadPDFCtrl', UploadPDFCtrl);

})();
