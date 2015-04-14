angular
    .module('expenses')
    .factory('setCurrent', function ($log, cleanCurrent) {
      var factory = {};

      factory.merchant = function (merchant) {
        $log.debug('setCurrent merchant');
        var $scope = this;
        cleanCurrent.call($scope);
        $scope.current.merchant = merchant;
      };

      factory.category = function (category) {
        $log.debug('setCurrent category');
        var $scope = this;
        cleanCurrent.call($scope);
        $scope.current.category = category;
      };
    
      factory.location = function (location) {
        $log.debug('setCurrent location');
        var $scope = this;
        cleanCurrent.call($scope);
        $scope.current.location = location;
      };


      factory.date = function (date) {
        $log.debug('setCurrent date');
        var $scope = this;
        cleanCurrent.call($scope);
        $scope.current.date = date;
      };

      return factory;
    })
