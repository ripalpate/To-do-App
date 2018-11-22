import $ from 'jquery';
import tasksData from '../../data/tasksData';
import initializeTasksPage from '../TasksPage/tasksPage';

const inputBuilder = (task) => {
  const inputField = `<div>
                        <input id="input-field" type="text" placeholder="Enter message here" value=${task.task}>
                      </div>`;
  return inputField;
};

const gettingTaskFromForm = () => {
  console.log($('#input-field').val());
  const task = {
    task: $('#input-field').val(),
    isCompleted: false,
  };
  return task;
};

const buildAddTask = () => {
  const emptyTask = {
    task: '',
  };
  let domString = '<h2> Add New Task </h2>';
  domString += inputBuilder(emptyTask);
  domString += '<button id="add-task"> Save New Task </button>';
  $('#add-edit-task').html(domString).show();
  $('#tasks-container').hide();
};

const addNewTask = () => {
  const newTask = gettingTaskFromForm();
  console.log(newTask);
  tasksData.addNewTask(newTask)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#tasks-container').show();
      initializeTasksPage();
    }).catch((error) => {
      console.error(error);
    });
};
$('body').on('click', '#add-task', addNewTask);

export default buildAddTask;
