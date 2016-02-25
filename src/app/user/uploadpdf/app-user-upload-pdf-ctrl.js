/**
 * Created by dingyi on 2/23/16.
 */
(function () {
  'use strict';

  angular.module('labDoc').directive('file', function () {
    return {
      restrict: 'A',
      scope: {
        file: '='
      },
      link: function (scope, element, attrs) {
        element.bind('change', function (event) {
          //alert(event.target.files.length);
          var file = event.target.files[0];
          scope.file = file ? file : undefined;
          scope.filename = file.name;
          scope.size = file.size;
          scope.type = file.type;

          //alert(scope.file.size + ' ' + scope.file.type);
          scope.$apply();
        });
      }
    };
  });

  function UploadPDFCtrl($scope, $rootScope, $http, FlashService) {
    //$scope.curr = $rootScope.globals.currentUser.username;

    loadFiles();
    function loadFiles() {

    }

    $scope.fileUpload = function () {
      $scope.filename = $scope.file.name;
      $scope.size = $scope.file.size;
      $scope.type = $scope.file.type;
      $http({
        method: 'POST',
        url: 'api/user/pdf',
        headers: {
          'Content-Type': 'application/pdf'
        },
        data: {
          upload: $scope.file
        }
      })
        .success(function (data) {

        })
        .error(function (data, status) {

        });
    };

  }

  angular.module('labDoc').controller('UploadPDFCtrl', UploadPDFCtrl);

})();
