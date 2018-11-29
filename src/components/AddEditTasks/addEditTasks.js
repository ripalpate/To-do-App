import $ from 'jquery';
import tasksData from '../../data/tasksData';
import initializeTasksPage from '../TasksPage/tasksPage';
import './addEditTasks.scss';
import timeStamp from '../../helpers/timeStamp';
import authHelpers from '../../helpers/authHelpers';

const inputBuilder = (task) => {
  const inputField = `<div>
                        <input class= "m-2" id="input-field" type="text" placeholder="Enter task here" value="${task.task}">
                      </div>`;
  return inputField;
};

const gettingTaskFromInput = () => {
  const currentTime = timeStamp();
  console.log(currentTime);
  const task = {
    task: $('#input-field').val(),
    created: currentTime,
    isCompleted: false,
    uid: authHelpers.getCurrentUid(),
    completedAt: '',
  };
  console.log(task);
  return task;
};

const buildAddTask = () => {
  const emptyTask = {
    task: '',
    created: '',
  };
  let domString = '<div class="text-center m-4">';
  domString += '<h2 class="m-2 add-new-task"> Add New Task </h2>';
  domString += inputBuilder(emptyTask);
  domString += '<button class="btn btn-primary m-2" id="add-task"> Save New Task</button>';
  domString += '</div>';
  $('#add-edit-task').html(domString).show();
  $('#tasks-container').hide();
  $('#input-field').focus();
};

const addNewTask = () => {
  const newTask = gettingTaskFromInput();
  // console.log(newTask);
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
  if (event.keyCode === 13) {
    $('#add-task').click();
  }
});

$('body').on('click', '#add-task', addNewTask);

const showEditInput = (e) => {
  const idToEdit = e.target.dataset.editId;
  tasksData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<div class="text-center m-4">';
      domString += '<h2 class="m-2 edit-task-heading"> Edit Task </h2>';
      domString += inputBuilder(singleTask);
      domString += `<button class="btn btn-primary m-2" id="edit-task" data-single-edit-id=${singleTask.id}>Save Task</button>`;
      domString += '</div>';
      $('#add-edit-task').html(domString).show();
      $('#tasks-container').hide();
      $('#input-field').focus();
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

$('body').on('keyup', '#input-field', (event) => {
  if (event.keyCode === 13) {
    $('#edit-task').click();
  }
});

$('body').on('click', '#edit-task', updteTask);

// $(document).ready(() => {
//   $('#input-field').focus();
// });

export default buildAddTask;
