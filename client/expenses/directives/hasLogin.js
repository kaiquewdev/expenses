angular
    .module('expenses')
    .directive('hasLogin', function () {
      return {
        templateUrl: 'client/expenses/views/has-login.ng.html'
      };
    });
