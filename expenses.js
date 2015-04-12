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

    .controller('ExpensesCtrl', ['$scope', '$meteor', '$log', '$window', function ($scope, $meteor, $log, $window) {
      $scope.expenses = {};
      $scope.spendings = $meteor.collection(function () { 
        return Spendings.find({}, { sort: { createdAt: -1 } }); 
      }).subscribe('spendings');
      $scope.spendingsArchive = $meteor.collection(SpendingsArchive);
      $scope.current = {};
      $scope.currentMerchant = "";
      $scope.currentCategory = "";
      $scope.currentLocation = "";
      $scope.currentDate = "";

      $scope.addExpense = function (expenses) {
        $log.debug('add expense');
        $scope.spendings.save({
          url: expenses.url,
          value: expenses.value || 0,
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

      $scope.pickImage = function () {
        $log.debug('pick image');
        filepicker.setKey("ALdyR0MhOQPKVT2xHCL9Fz");

        function successHandler(Blob) {
          $log.debug('success handler');
          $scope.expenses.url = Blob.url;
        }

        function failHandler(FPError) {
          $log.debug('fail handler');
          $log.debug(FPError);
        }

        filepicker.pick(
          {
            mimetypes: ['image/*'],
            container: 'window',
            services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'SKYDRIVE', 'CLOUDDRIVE', 'WEBCAM'],
            language: 'pt',
          }, successHandler, failHandler
        );
      };

      $scope.archiveSpending = function (spending) {
        $log.debug('archive spending');
        $scope.spendingsArchive.save({
          url: spending.url,
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

      function cleanCurrent () {
        $log.debug('clean current object');
        $scope.current = {};
      }
      $scope.cleanCurrent = cleanCurrent;

      $scope.setCurrentMerchant = function (merchant) {
        $log.debug('set current merchant');
        cleanCurrent();
        $scope.current.merchant = merchant;
      };

      $scope.setCurrentCategory = function (category) {
        $log.debug('set current category');
        cleanCurrent();
        $scope.current.category = category;
      };

      $scope.setCurrentLocation = function (location) {
        $log.debug('set current location');
        cleanCurrent();
        $scope.current.location = location;
      };

      $scope.setCurrentDate = function (date) {
        $log.debug('set current date');
        cleanCurrent();
        $scope.current.date = date;
      };
    }])

    .directive('listControls', function () {
      return {
        restrict: 'E',
        templateUrl: 'list-controls.ng.html'
      };
    })

    .directive('listStates', function () {
      return {
        restrict: 'E',
        templateUrl: 'list-states.ng.html'
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

    .filter('prettyDate', function () {
      return function (input) {
        return moment(input).format('DD/MM/YYYY');
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
