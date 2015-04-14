 angular
    .module('expenses')
    .directive('listControls', function () {
      return {
        restrict: 'E',
        templateUrl: 'client/expenses/views/list-controls.ng.html'
      };
    });
