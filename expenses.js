var Spendings = new Mongo.Collection('spendings');

if (Meteor.isClient) {
  var expenses = angular.module('expenses', ['angular-meteor']);

  expenses
    .controller('ExpensesCtrl', ['$scope', '$meteor', '$log', function ($scope, $meteor, $log) {
      $scope.expenses = {};
      $scope.spendings = $meteor.collection(Spendings).subscribe('spendings');

      $scope.addExpense = function (expenses) {
        $log.debug('add expense');
        $scope.spendings.save({
          value: expenses.value,
          merchant: expenses.merchant,
          location: expenses.location,
          category: expenses.category,
          note: expenses.note,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        return $scope.spendings;
      };

      $scope.removeSpending = function (spending) {
        $log.debug('remove spending');
        $scope.spendings.remove(spending);
      };
    }])

    .directive('spendings', function () {
      return {
        templateUrl: 'spendings.ng.html'
      };
    })

    .directive('spendingDetails', function () {
      return {
        templateUrl: 'spending-details.ng.html'
      };
    })

    .directive('addSpending', function () {
      return {
        templateUrl: 'add-spending.ng.html'
      };
    })
    
    .run(function ($log) {
      $log.debug('running expenses module!');
    });
}

if (Meteor.isServer) {
  Meteor.publish('spendings', function () {
    return Spendings.find({}, { sort: { createdAt: -1 } });
  });
}
