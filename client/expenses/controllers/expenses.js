angular
    .module('expenses')
    .controller('ExpensesCtrl', ['$scope', '$meteor', '$log', '$window', 'Expense', 'btnPickImageLabel', function ($scope, $meteor, $log, $window, Expense, btnPickImageLabel) {
      $log.debug('Expenses controller');
      var location = $window.localStorage.getItem('lastLocation');
      $scope.expenses = {};
      if (location !== 'null') {
          $scope.expenses.location = location;
      }
      $scope.spendings = $meteor.collection(function () {
        return Spendings.find({}, { sort: { createdAt: -1 } });
      }).subscribe('spendings');
      $scope.merchants = $meteor.collection(Merchants).subscribe('merchants');
      $scope.spendingsArchive = $meteor.collection(SpendingsArchive);
      $scope.btnPickImageLabel = btnPickImageLabel;
      $scope.current = {};

      $scope.addExpense = Expense.add.bind($scope);
      $scope.pickImage = Expense.pickImage.bind($scope);
      $scope.archiveSpending = Expense.archive.bind($scope);
      $scope.cleanCurrent = Expense.cleanCurrent.bind($scope);
      $scope.setCurrentMerchant = Expense.setCurrent.merchant.bind($scope);
      $scope.setCurrentCategory = Expense.setCurrent.category.bind($scope);
      $scope.setCurrentLocation = Expense.setCurrent.location.bind($scope);
      $scope.setCurrentDate = Expense.setCurrent.date.bind($scope);
    }]);
