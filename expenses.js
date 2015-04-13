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

    .controller('ExpensesCtrl', ['$scope', '$meteor', '$log', '$window', 'Expense', function ($scope, $meteor, $log, $window, Expense) {
      $scope.expenses = {
        location: $window.localStorage.getItem('lastLocation'),
      };
      $scope.spendings = $meteor.collection(function () { 
        return Spendings.find({}, { sort: { createdAt: -1 } }); 
      }).subscribe('spendings');
      $scope.spendingsArchive = $meteor.collection(SpendingsArchive);
      $scope.current = {};

      $scope.addExpense = Expense.add.bind($scope);
      $scope.pickImage = Expense.pickImage.bind($scope);
      $scope.archiveSpending = Expense.archive.bind($scope);
      $scope.cleanCurrent = Expense.cleanCurrent.bind($scope);
      $scope.setCurrentMerchant = Expense.setCurrent.merchant.bind($scope);
      $scope.setCurrentCategory = Expense.setCurrent.category.bind($scope);
      $scope.setCurrentLocation = Expense.setCurrent.location.bind($scope);
      $scope.setCurrentDate = Expense.setCurrent.date.bind($scope);
    }])

    .value('filePickerApiKey', 'ALdyR0MhOQPKVT2xHCL9Fz')

    .factory('add', function ($log, $window) {
      return function (expenses) {
        $log.debug('addExpense');
        var $scope = this;
        $window.localStorage.setItem('lastLocation', expenses.location);
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
    })

    .factory('pickImage', function ($log, filePickerApiKey) {
      return function () {
        $log.debug('pick image');
        var $scope = this;
        filepicker.setKey(filePickerApiKey);

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
    })

    .factory('archive', function ($log) {
      return function (spending) {
        $log.debug('archive');
        var $scope = this;
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
    })

    .factory('cleanCurrent', function ($log) {
      return function () {
        $log.debug('cleanCurrent');
        var $scope = this;
        $scope.current = {};
      };
    })

    .factory('setCurrent', function ($log, cleanCurrent) {
      var factory = {};

      factory.merchant = function (merchant) {
        $log.debug('setCurrent merchant');
        var $scope = this;
        cleanCurrent.call($scope);
        $scope.current.merchant = merchant;
      };

      factory.category = function (category) {
        $log.debug('setCurrent category');
        var $scope = this;
        cleanCurrent.call($scope);
        $scope.current.category = category;
      };
    
      factory.location = function (location) {
        $log.debug('setCurrent location');
        var $scope = this;
        cleanCurrent.call($scope);
        $scope.current.location = location;
      };


      factory.date = function (date) {
        $log.debug('setCurrent date');
        var $scope = this;
        cleanCurrent.call($scope);
        $scope.current.date = date;
      };

      return factory;
    })

    .factory('Expense', function (add, archive, pickImage, cleanCurrent, setCurrent) {
      return {
        add: add,
        archive: archive,
        pickImage: pickImage,
        cleanCurrent: cleanCurrent,
        setCurrent: setCurrent,
      };
    })

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

    .filter('len', function () {
      return function (input) {
        return input.length;
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
