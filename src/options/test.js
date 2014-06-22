// this is derived from
// http://stackoverflow.com/questions/15167981/how-do-i-use-firebase-simple-login-with-email-password/15167983#15167983


// CHANGE THIS to your own firebase
var ref = new Firebase("https://mmfvc.firebaseio.com");
// then go to your firebase console, click the auth tab, scroll down to 
// authentication providers, and enable 'email/password'
// Now enter this in the 'Auth' tab to the left.
/*
{
  "rules": {
    "users": {
      "$userid": {
        ".read": "auth.id == $userid",
        ".write": "auth.id == $userid"
      }
    }
  }
}
*/
//

// global user (is this a good thing?)
myUser = -1;

var authClient = new FirebaseSimpleLogin(new Firebase("https://mmfvc.firebaseio.com"), function (error, user) {
    if (error) {
        alert(error);
        return;
    }
    if (user) {
        // User is already logged in.
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
        myUser = user;
        // doLogin(user);
        console.log('logged in')
        $("#data").attr('disabled', false);
        $("#opener-logout").attr('disabled', false);
        $("#opener-login").attr('disabled', true);
        $("#opener-logout").click(function () {
        authClient.logout();
    });
    } else {
        // User is logged out.
        $("#opener-register").click(function () {
        
                var email = $("#register-email").val();
                var password = $("#register-password").val();
                console.log("Creating user " + email + " " + password);

                authClient.createUser(email, password, function (error, user) {
                    if (!error) {
                        console.log('logging new registered user');
                        doLogin(email, password);
                    } else {

                        console.log(error);
                    }
                });
    });
        $("#opener-login").click(function () {
                        console.log('trying to login: ' + $("#login-email").val());

                        

                var email = $("#login-email").val();
                var password = $("#login-password").val();

                doLogin(email, password);


    });
        console.log('logged out');
        $("#data").attr('disabled', true);
        $("#opener-logout").attr('disabled', true);
        $("#opener-login").attr('disabled', false);
        // ("#dialog-form").dialog("open");

    }
});

// $(function () {
//     $("#opener-register").click(function () {
        
//                 var email = $("#register-email").val();
//                 var password = $("#register-password").val();
//                 console.log("Creating user " + email + " " + password);

//                 authClient.createUser(email, password, function (error, user) {
//                     if (!error) {
//                         console.log('logging new registered user');
//                         doLogin(email, password);
//                     } else {

//                         console.log(error);
//                     }
//                 });
//     });

//     $("#opener-login").click(function () {
//                         console.log('trying to login: ' + $("#login-email").val());

                        

//                 var email = $("#login-email").val();
//                 var password = $("#login-password").val();

//                 doLogin(email, password);


//     });

//     $("#opener-logout").click(function () {
//         authClient.logout();
//     });
// });

function doLogin(email1, password1) {
    authClient.login('password', {
        email: email1,
        password: password1
    });
};

function save_options() {
     var name = document.getElementById('username').value;

     chrome.storage.sync.set( {
        username : name,
        id : myUser.id,
        email : myUser.email,
        firebaseAuthToken: myUser.firebaseAuthToken,
        uid: myUser.uid
     });
}

function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    username: 'Test',
  }, function(items) {
    document.getElementById('username').value = items.username;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);
// $('#data').keypress(function (e) {
//     if (e.keyCode == 13) {
//         var data = $('#data').val();
//         console.log(myUser.id);
//         var myRef = new Firebase("https://xxx.firebaseio.com/users/" + myUser.id);
//         myRef.push({
//             data: data
//         });
//         $('#data').val('');
//     }
// });