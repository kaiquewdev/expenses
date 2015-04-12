var Spendings = new Mongo.Collection('spendings');
var SpendingsArchive = new Mongo.Collection('spendingsArchive');

if (Meteor.isClient) {
  angular
    
    .module('expenses', ['angular-meteor', 'ui.router'])

    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.html5Mode(true);

      $stateProvider
        .state('expenses', {
          url: '/',
          templateUrl: 'expenses.ng.html',
          controller: 'ExpensesCtrl',
        });
      
      $urlRouterProvider.otherwise('/');
    }])

    .controller('ExpensesCtrl', ['$scope', '$meteor', '$log', function ($scope, $meteor, $log) {
      $scope.expenses = {};
      $scope.spendings = $meteor.collection(function () { 
        return Spendings.find({}, { sort: { createdAt: -1 } }); 
      }).subscribe('spendings');
      $scope.spendingsArchive = $meteor.collection(SpendingsArchive);
      $scope.currentMerchant = "";
      $scope.currentCategory = "";
      $scope.currentLocation = "";

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

        $scope.expenses = {};

        return $scope.spendings;
      };

      $scope.archiveSpending = function (spending) {
        $log.debug('archive spending');
        $scope.spendingsArchive.save({
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

      $scope.setCurrentMerchant = function (merchant) {
        $log.debug('set current merchant');
        $scope.currentMerchant = merchant;
      };

      $scope.setCurrentCategory = function (category) {
        $log.debug('set current category');
        $scope.currentCategory = category;
      };

      $scope.setCurrentLocation = function (location) {
        $log.debug('set current location');
        $scope.currentLocation = location;
      };
    }])

    .directive('listControls', function () {
      return {
        templateUrl: 'list-controls.ng.html'
      };
    })

    .directive('spendings', function () {
      return {
        templateUrl: 'spendings.ng.html'
      };
    })

    .directive('totalSpendings', function () {
      return {
        templateUrl: 'total-spendings.ng.html'
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
