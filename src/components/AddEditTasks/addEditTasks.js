import $ from 'jquery';
import tasksData from '../../data/tasksData';
import initializeTasksPage from '../TasksPage/tasksPage';

const inputBuilder = (task) => {
  const inputField = `<div>
                        <input id="input-field" type="text" placeholder="Enter task here" value="${task.task}">
                      </div>`;
  return inputField;
};

const gettingTaskFromInput = () => {
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
  const newTask = gettingTaskFromInput();
  tasksData.addNewTask(newTask)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#tasks-container').show();
      initializeTasksPage();
    }).catch((error) => {
      console.error(error);
    });
};

$('body').on('keyup', '#input-field', (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    $('#add-task').click();
  }
});

$('body').on('click', '#add-task', addNewTask);

const showEditInput = (e) => {
  const idToEdit = e.target.dataset.editId;
  tasksData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<h2> Edit Task </h2>';
      domString += inputBuilder(singleTask);
      domString += `<button id="edit-task" data-single-edit-id=${singleTask.id}>Save Task</button>`;
      $('#add-edit-task').html(domString).show();
      $('#tasks-container').hide();
    }).catch((error) => {
      console.error(error);
    });
};

const updteTask = (e) => {
  const updateTask = gettingTaskFromInput();
  const taskId = e.target.dataset.singleEditId;
  tasksData.updateSingleTask(updateTask, taskId)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#tasks-container').show();
      initializeTasksPage();
    }).catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '.edit-button', showEditInput);
$('body').on('click', '#edit-task', updteTask);

export default buildAddTask;
