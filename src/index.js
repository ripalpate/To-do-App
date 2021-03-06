import $ from 'jquery';
import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import navbarBuilder from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers';
import tasksPage from './components/TasksPage/tasksPage';
import showAddInput from './components/AddEditTasks/addEditTasks';
import 'bootstrap';
import './index.scss';


const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbarBuilder();
  loginButton();
  authHelpers.checkLoginStatus(tasksPage);
  $('#show-task-input').on('click', showAddInput);
};
initializeApp();
