var myApp = angular.module('myApp', []);


myApp.config(function ($routeProvider) {

    $routeProvider
    .when('/user',
    {
        controller: 'userCtrl1',
        templateUrl: 'user.html'
    })
    .when('/index',
    {
        controller: 'userCtrl2',
        templateUrl: 'index.html'
    })
    .otherwise({redirect: '/'});

});

myApp.controller('userCtrl1', function ($scope, $http) {
    console.log('userCtrl');


//    =======================================GET =================================
//    var responsePromise = $http.get("http://localhost:8888/user");
//
//
//    responsePromise.success(function (data, status, headers, config) {
//        $scope.userList = data;
//
//    });
//    responsePromise.error(function (data, status, headers, config) {
//        alert("AJAX failed!");
//    });


//    ================================  POST  ==============================================
    var obj = {
                Name:'sandeep',
                Age:32
              };

    var responsePromise = $http.post("http://localhost:8888/user",obj);


    responsePromise.success(function (data, status, headers, config) {
        console.log('POST: ',data);
//        $scope.userList = data;

    });
    responsePromise.error(function (data, status, headers, config) {
        alert("AJAX failed!");
    });

});


myApp.controller('userCtrl2', function () {
    console.log('userCtrl2');
});
