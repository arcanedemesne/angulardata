myApp.controller('CheckInsController', function ($scope, $rootScope, $location, $firebaseArray, $firebaseObject, FIREBASE_URL, $routeParams, Authentication, CountMeetings) {

    $scope.whichmeeting = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    $scope.order = 'firstname';
    $scope.direction = null;
    $scope.recordId = '';
    $scope.query = '';

    var ref = new Firebase(FIREBASE_URL + '/users/' +
        $scope.whichuser + '/meetings/' +
        $scope.whichmeeting + '/checkins'
    );

    $scope.checkins = $firebaseArray(ref);

    $scope.addCheckin = function () {
        var myData = {
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email,
            date: Firebase.ServerValue.TIMESTAMP
        };

        $scope.checkins.$add(myData).then(function (ref) {
            $location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinsList');
        }, function (error) {
            $scope.message = error.message;
        }); //ckeckinsArray

    }; //addCkeckin

    $scope.pickRandom = function () {
        var whichRecord = Math.round(Math.random() * $scope.checkins.length);
        $scope.recordId = $scope.checkins.$keyAt(whichRecord);
    }; //pickWinner

    $scope.deleteCheckin = function (key) {
        var item = $scope.checkins[key];
        $scope.checkins.$remove(item); //removeCheckin
    }; //deleteCkeckin

    $scope.showLove = function(myItem) {

        myItem.show = !myItem.show;

        if (myItem.userState == 'expanded') {
            myItem.userState = '';
        } else {
            myItem.userState = 'expanded';
        }
    }; //showLove

    $scope.giveLove = function(myItem, myGift) {

        var ref = new Firebase(FIREBASE_URL + '/users/' +
            $scope.whichuser + '/meetings/' +
            $scope.whichmeeting + '/checkins/' +
            myItem.$id + '/awards');

        var awards = $firebaseArray(ref);

        var myData = {
            name: myGift,
            date: Firebase.ServerValue.TIMESTAMP
        };

        awards.$add(myData); //addLove
    }; //giveLove

    $scope.deleteLove = function(checkin, award) {
        var ref = new Firebase(FIREBASE_URL + '/users/' +
            $scope.whichuser + '/meetings/' +
            $scope.whichmeeting + '/checkins/' +
            checkin.$id + '/awards/' + award);

        var award = $firebaseObject(ref);

        award.$remove(); //removeAward
    }; //deleteLove

}); // CheckInsController