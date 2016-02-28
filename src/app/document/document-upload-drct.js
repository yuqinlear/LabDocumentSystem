/**
 * Created by paul on 2/27/16.
 */
(function () {
  'use strict';

  function DocumentUploadDrct() {
    return {
      scope: {
        user: '='
      },
      restrict: 'E',
      templateUrl: 'document/document-upload-tmpl.html',
      controller: 'UploadPDFCtrl'
    };
  }

  angular.module('labDoc').directive('documentUpload', DocumentUploadDrct);
})();
