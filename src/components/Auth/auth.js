import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleImage from './google-login-button.png';
import './auth.scss';

const loginButton = () => {
  const domString = `
  <button id="google-auth" class="btn btn-warn">
  <img src="${googleImage}" src= "Login Button" width ="350px;">
  </button>
  `;
  $('#login-container').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginButton;
