angular
    .module('expenses')
    .directive('listStates', function () {
      return {
        restrict: 'E',
        templateUrl: 'client/expenses/views/list-states.ng.html'
      };
    });
