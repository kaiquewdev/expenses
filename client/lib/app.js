angular
    .module('expenses', ['angular-meteor', 'ui.router']);

function onReady() {
  angular.bootstrap(document, ['expenses']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
