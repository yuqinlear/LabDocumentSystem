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

  function UploadPDFCtrl($scope, $rootScope, $sce, uploadService, filesService) {
    //$scope.curr = $rootScope.globals.currentUser.username;
    $scope.customer = {};
    $scope.response = {};

    //set username first to ensure the sequence in FormData,
    //so that server can detect username first to create directory
    $scope.customer.name = '';
    $scope.customer.nameVaild = '';
    $scope.customer.fileValid = 'No file yet';
    $scope.response.status = 'Not upload yet';
    $scope.customer.filenames = [];
    loadFiles();
    function loadFiles() {
    }

    $scope.fileUpload = function () {
      if ($scope.customer.name === '') {
        $scope.customer.nameValid = 'Username cannot be empty!';
        return;
      } else if ($scope.customer.name.search(/[\#<>$%\*!\`&\'\"\|\{\}\?=\/\\:@\s]/g) >= 0) {
        $scope.customer.nameValid = 'Invalid!  Username contains characters';
        return;
      }
      $scope.customer.nameValid = '';
      uploadService.post($scope.customer)
        .then(function (response) {
          $scope.response = response;
        }, function (response) {
          $scope.response = response;
        });
    };

    $scope.getFiles = function () {
      if ($scope.customer.name === '') {
        $scope.customer.nameValid = 'Username cannot be empty!';
        return;
      } else if ($scope.customer.name.search(/[\#<>$%\*!\`&\'\"\|\{\}\?=\/\\:@\s]/g) >= 0) {
        $scope.customer.nameValid = 'Invalid!  Username contains characters';
        return;
      }
      $scope.customer.nameValid = '';
      filesService.getFilenames($scope.customer.name)
        .then(function (response) {
          $scope.customer.filenames = response.data;
        }, function (response) {
          alert(response.data);
        });
    };

    $scope.readFile = function (filename) {
      filesService.getFileByUserAndFilename(filename, $scope.customer.name)
        .then(function (response) {
          //alert(JSON.stringify(response));
          var file = new Blob([response], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          $scope.customer.url = $sce.trustAsResourceUrl(fileURL);

          //window.open(fileURL);
          //$scope.url = fileURL;
          $scope.customer.isLoading = false;
          $scope.customer.info = '';
        }, function (data) {
          $scope.customer.isLoading = false;
          $scope.customer.info = JSON.stringify(data);
        });
    };

  }

  angular.module('labDoc').controller('UploadPDFCtrl', UploadPDFCtrl);

})();
