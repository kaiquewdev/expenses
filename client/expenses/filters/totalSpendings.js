angular
    .module('expenses')
    .filter('totalSpendings', function () {
      return function (input) {
        var out = 0;
        var values = input.map(function (spending) {
          return spending.value;
        });

        function sum(input) {
          var total = 0;

          input.map(function (value) {
            total += value;
          });

          return total;
        }

        out = sum(values);

        return out;
      };
    });
