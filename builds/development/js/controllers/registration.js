myApp.controller('RegistrationController', function ($scope, $location, Authentication) {

    $scope.login = function() {
        Authentication.login($scope.user)
        .then(function (user) {
            $location.path('/meetings');
        }).catch(function (error) {
            $scope.message = error.message;
        });
    }; //login

    $scope.register = function() {
        Authentication.register($scope.user)
        .then(function (user) {
            Authentication.login($scope.user);
            $location.path('/meetings');
        }).catch(function (error) {
            $scope.message = error.message;
        });

    }; //register

}); //RegistrationController