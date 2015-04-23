angular
    .module('expenses')
    .directive('spendingsEmptyState', function () {
      return {
        templateUrl: 'client/expenses/views/spendings-empty-state.ng.html'
      };
    });
