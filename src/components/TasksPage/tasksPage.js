import $ from 'jquery';
import './tasksPage.scss';
import tasksData from '../../data/tasksData';

const printAllTasks = (tasksArray) => {
  let domString = '';
  domString += '<h5 class="task-heading">Tasks </h5>';
  tasksArray.forEach((task) => {
    domString += `<div class="input-group-text w-25 task">
                    <input type="checkbox" class="task-checkbox">
                    <p class="task-desc">${task.task}<p>
                  </div>
                  `;
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

$('body').on('click', 'input[type=checkbox]', (e) => {
  const taskToMove = $(e.target).closest('.task').text();
  $('#completed-tasks').append(`<div>${taskToMove}</div>`);
});


export default tasksPage;
