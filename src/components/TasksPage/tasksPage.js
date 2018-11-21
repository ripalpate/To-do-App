import $ from 'jquery';
import './tasksPage.scss';
import tasksData from '../../data/tasksData';

const printAllTasks = (tasksArray) => {
  let domString = '';
  tasksArray.forEach((task) => {
    domString += `<div class="card bg-light mb-3" style="max-width: 18rem;">
                      <div class="card-header">Tasks</div>
                      <div class="card-body">
                        <p class="card-text">${task.task}</p>
                      </div>
                    </div>`;
    $('#tasks').html(domString);
  });
};

const tasksPage = () => {
  tasksData.getAllTasks()
    .then((tasksArray) => {
      printAllTasks(tasksArray);
    }).catch((error) => {
      console.error('error in getting tasks', error);
    });
};

export default tasksPage;
