angular
    .module('expenses')
    .factory('cleanCurrent', function ($log) {
      return function () {
        $log.debug('cleanCurrent');
        var $scope = this;
        $scope.current = {};
      };
    })
