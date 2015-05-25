myApp.controller('MeetingsController', function($scope, $rootScope, $firebaseArray, FIREBASE_URL, $location, CountMeetings) {

    var ref = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/meetings');

    $scope.meetings = $firebaseArray(ref);

    $scope.addMeeting = function() {
        $scope.meetings.$add({
            name: $scope.meetingname,
            date: Firebase.ServerValue.TIMESTAMP
        }).then(function (ref) {
            $scope.meetingname = null;
        }, function (error) {
            $scope.message = error.message;
        });
    }; //addMeeting

    $scope.deleteMeeting = function(key) {
        var item = $scope.meetings[key];
        $scope.meetings.$remove(item);
    }; //deleteMeeting

}); //MeetingsController