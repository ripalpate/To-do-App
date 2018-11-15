import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import navbarBuilder from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import checkLoginStatus from './helpers/authHelpers';
import 'bootstrap';
import './index.scss';


const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbarBuilder();
  loginButton();
  checkLoginStatus();
};
initializeApp();