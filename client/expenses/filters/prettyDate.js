angular
    .module('expenses')
    .filter('prettyDate', function () {
      return function (input) {
        return moment(input).format('DD/MM/YYYY');
      };
    });
