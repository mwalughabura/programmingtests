var app = angular.module('main', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: './components/home.html',
        controller: 'homeCtrl'
    }).when('/login', {
        templateUrl: './components/login.html',
        controller: 'loginCtrl'
    })
    .otherwise({
        template: '404'
    })
});

app.controller('homeCtrl', function($scope, $location){
    $scope.goToLogin = function() {
        $location.path('/login');
    };
    $scope.register = function() {
        $location.path('/register')
    };
});

app.controller('loginCtrl', function($scope, $http){
    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;
        $http({
            url: 'http://localhost/datatodb/server.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencode'
            },
            data: 'username='+username+'&password='+password
        }).then(function(response){
            console.log(response.data);
        })
    }
});
