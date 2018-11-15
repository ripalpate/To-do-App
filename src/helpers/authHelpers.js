import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user name', user.email);
    } else {
      $('#tasks').hide();
      $('#loginContainer').show();
      $('#navbar-button-auth').show();
      $('#navbar-button-tasks').hide();
      $('#navbar-button-logout').hide();
    }
  });
};
export default checkLoginStatus;
