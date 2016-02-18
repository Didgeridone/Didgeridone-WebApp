var app = angular.module('didjApp', ['ngRoute', 'ngSanitize']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeController'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    })
    .when('/createAccount', {
      templateUrl: 'partials/createAccount.html',
      controller: 'CreateAccountController'
    })
    .when('/dashboard', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.directive("contenteditable", function() {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});

app.factory('Auth', function($http) {
  var authData = {
    token: null,
    userID: null
  }

  return {
    getToken: function() {
      return authData.token
    },
    getUserID: function() {
      return authData.userID
    },
    setToken: function(token) {
      authData.token = token
      $http.defaults.headers.common.Authorization = 'Bearer ' + token
    },
    setUserID: function(userID) {
      authData.userID = userID
    }
  }
})
