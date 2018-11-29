import axios from 'axios';
import apiKeys from '../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllTasks = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tasks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const allTasksObject = results.data;
      const tasksArray = [];
      if (allTasksObject !== null) {
        Object.keys(allTasksObject).forEach((taskId) => {
          const newTask = allTasksObject[taskId];
          newTask.id = taskId;
          tasksArray.push(newTask);
        });
      }
      resolve(tasksArray);
    }).catch((error) => {
      reject(error);
    });
});

const getSingleTask = taskId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tasks/${taskId}.json`)
    .then((result) => {
      const singleTask = result.data;
      singleTask.id = taskId;
      resolve(singleTask);
    }).catch((error) => {
      reject(error);
    });
});


const addNewTask = taskObject => axios.post(`${firebaseUrl}/tasks.json`, JSON.stringify(taskObject));

const deleteTask = taskId => axios.delete(`${firebaseUrl}/tasks/${taskId}.json`);

const updateSingleTask = (taskObject, taskId) => axios.put(`${firebaseUrl}/tasks/${taskId}.json`, JSON.stringify(taskObject));


export default {
  getAllTasks,
  getSingleTask,
  updateSingleTask,
  addNewTask,
  deleteTask,
};
