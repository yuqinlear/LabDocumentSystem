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
          for (var file in element[0].files) {
            if (file && (element[0].files[file].name + '').search(/[\#<>$%\*!\`&\'\"\|\{\}\?=\/\\:@\s]/g) >= 0) {
              alert('find invalid file name');

              //TODO: $parent not match
              scope.$parent.fileValid = 'Invalid!.  File name contains special character.';
              return;
            }
          }
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

    //set username first to ensure the sequence in FormData,
    //so that server can detect username first to create directory
    $scope.customer.name = '';
    $scope.customer.nameVaild = '';
    $scope.customer.fileValid = 'No file yet';
    $scope.response.status = 'Not upload yet';
    loadFiles();
    function loadFiles() {
    }
    $scope.fileUpload = function () {
      if ($scope.customer.name === '') {
        $scope.customer.nameValid = 'Username cannot be empty!';
        return;
      }else if ($scope.customer.name.search(/[\#<>$%\*!\`&\'\"\|\{\}\?=\/\\:@\s]/g) >= 0) {
        $scope.customer.nameValid = 'Invalid!  Username contains characters';
        return;
      }
      $scope.customer.nameValid = '';
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
