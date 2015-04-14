angular
    .module('expenses')
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.html5Mode(true);

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'client/expenses/views/home.ng.html',
          controller: 'HomeCtrl'
        })
        .state('expenses', {
          url: '/expenses',
          templateUrl: 'client/expenses/views/expenses.ng.html',
          controller: 'ExpensesCtrl',
          resolve: {
            currentUser: ['$meteor', function ($meteor) {
              return $meteor.requireUser();
            }]
          }
        });
      
      $urlRouterProvider.otherwise('/');
    }])
    .run(function ($log, $rootScope, $state) {
      $log.debug('running expenses module!');
      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, err) {
        $log.debug('$stateChangeeError');
        if (err === 'AUTH_REQUIRED') {
          $log.debug(err);
          $state.go('home');
        }
      });
    });
