angular
    .module('expenses')
    .factory('add', function ($log, $window, $rootScope) {
      return function (expenses) {
        $log.debug('addExpense');
        var $scope = this;
        $window.localStorage.setItem('lastLocation', expenses.location);
        $scope.spendings.save({
          url: expenses.url,
          value: expenses.value || 0,
          merchant: expenses.merchant,
          location: expenses.location,
          category: expenses.category,
          tags: expenses.tags,
          note: expenses.note,
          createdBy: $rootScope.currentUser._id,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }, $log.debug);

        $scope.expenses = {};

        return $scope.spendings;
      };
    });
