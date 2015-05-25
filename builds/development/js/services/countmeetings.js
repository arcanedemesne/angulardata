myApp.factory('CountMeetings', function ($firebaseArray, $rootScope, FIREBASE_URL) {

    var ref = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/meetings');

    var meetings = $firebaseArray(ref);

    meetings.$loaded(function(data) {
        $rootScope.howManyMeetings = meetings.length;
    });

    meetings.$watch(function (data) {
        $rootScope.howManyMeetings = meetings.length;
    });

    return true;
}); //CountMeetings