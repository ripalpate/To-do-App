import $ from 'jquery';
import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import 'bootstrap';
import './index.scss';


const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys)
  $('#list').html('works');
};
initializeApp();
