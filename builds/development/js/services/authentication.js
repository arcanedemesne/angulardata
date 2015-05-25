myApp.factory('Authentication', function($firebase, $firebaseObject, $firebaseAuth, FIREBASE_URL, $rootScope, $routeParams, $location) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function (authUser) {
        if (authUser) {
            var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
            var user = $firebaseObject(ref);
            $rootScope.currentUser = user;
        } else {
            $rootScope.currentUser = null;
        }
    });

    //Temporary Object
    var myObject = {

        login: function(user) {
            return auth.$authWithPassword({
                email: user.email,
                password: user.password
            }); //authWithPassword
        }, //login

        logout: function(user) {
            return auth.$unauth(); //unauth
        }, //logout

        requireAuth: function(user) {
            return auth.$requireAuth(); //requireAuth
        }, //requireAuth

        waitForAuth: function(user) {
            return auth.waitForAuth(); //waitForAuth
        }, //wait until the User is Authenticated

        register: function(user) {
            return auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function (regUser) {
                var ref = new Firebase(FIREBASE_URL + '/users');
                var newUser = $firebaseObject(ref);

                newUser[regUser.uid] = {
                    date: Firebase.ServerValue.TIMESTAMP,
                    regUser: regUser.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }; //userInfo

                newUser.$save();
            }); //createUser
        } //register
    }; //myObject

    return myObject;
}); //myApp factory