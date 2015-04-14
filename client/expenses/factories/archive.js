angular
    .module('expenses')
    .factory('archive', function ($log) {
      return function (spending) {
        $log.debug('archive');
        var $scope = this;
        $scope.spendingsArchive.save({
          url: spending.url,
          value: spending.value,
          merchant: spending.merchant,
          location: spending.location,
          category: spending.category,
          note: spending.note,
          createdAt: spending.createdAt,
          updatedAt: Date.now()
        });
        $scope.spendings.remove(spending);
      };
    });
