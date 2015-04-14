angular
    .module('expenses')
    .filter('len', function () {
      return function (input) {
        return input.length;
      };
    });
