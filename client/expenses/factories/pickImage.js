angular
    .module('expenses')
    .factory('pickImage', function ($log, filePickerApiKey, btnPickImageLabel, btnPickImageLoadingLabel) {
      return function () {
        $log.debug('pick image');
        var $scope = this;
        filepicker.setKey(filePickerApiKey);

        $scope.btnPickImageLabel = btnPickImageLoadingLabel;

        function successHandler(Blob) {
          $log.debug('success handler');
          $scope.expenses.url = Blob.url;
          $scope.btnPickImageLabel = btnPickImageLabel;
          $scope.$digest();
        }

        function failHandler(FPError) {
          $log.debug('fail handler');
          $log.debug(FPError);
          $scope.btnPickImageLabel = btnPickImageLabel;
          $scope.$digest();
        }

        filepicker.pick(
          {
            mimetypes: ['image/*'],
            container: 'window',
            services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'SKYDRIVE', 'CLOUDDRIVE', 'WEBCAM'],
            language: 'pt',
          }, successHandler, failHandler
        );
      };
    });
