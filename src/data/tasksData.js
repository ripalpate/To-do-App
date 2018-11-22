import axios from 'axios';
import apiKeys from '../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllTasks = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tasks.json`)
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

const updateSingleTask = (taskObject, taskId) => axios.put(`${firebaseUrl}/tasks/${taskId}.json`, JSON.stringify(taskObject));
// .then((result) => {
//   resolve(result);
// }).catch((error) => {
//   reject(error);
// });

export default { getAllTasks, updateSingleTask };
