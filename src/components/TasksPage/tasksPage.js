import $ from 'jquery';
import './tasksPage.scss';
import tasksData from '../../data/tasksData';
import authHelpers from '../../helpers/authHelpers';
import timeStamp from '../../helpers/timeStamp';
// import timeStamp from '../../helpers/timeStamp';

const printAllTasks = (tasksArray) => {
  let domString = '';
  domString += '<h5 class="header text-center">Tasks </h5>';
  tasksArray.forEach((task) => {
    if (task.isCompleted === false) {
      domString += `<div class="input-group-text tasks-wrapper task">
                      <input type="checkbox">
                      <p class="task-desc m-1" data-task-id=${task.id}>${task.task}</p>
                      <input class="delete-button pt-1" data-delete-id=${task.id} type="image" src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-512.png" width="20px"></input>
                      <input class="edit-button pt-1 ml-2" data-edit-id=${task.id} type="image" src="http://www.iconarchive.com/download/i49407/designcontest/outline/Pencil.ico" width="20px"></input><br>
                      <span class="timeStamp" data-time-id="${task.id}">${task.created} </span>
                      </div>`;
      $('#tasks').html(domString);
    }
  });
};

const tasksPage = () => {
  const uid = authHelpers.getCurrentUid();
  tasksData.getAllTasks(uid)
    .then((tasksArray) => {
      printAllTasks(tasksArray);
    }).catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const gettingTaskFromList = (iscompleted, elementToUpdate, time, openTaskTime) => {
  const task = {
    task: $(elementToUpdate).text(),
    isCompleted: iscompleted,
    uid: authHelpers.getCurrentUid(),
    completedAt: time,
    created: openTaskTime,
  };
  return task;
};

const completedTask = (e) => {
  const element = e.target;
  element.classList.toggle('checked');
  const iscompleted = $(element).hasClass('checked');
  const elementToUpdate = $(e.target).siblings('p')[0];
  const idToUpdate = elementToUpdate.dataset.taskId;
  const elementToDelete = $(e.target).next().next()[0];
  const idToDelete = elementToDelete.dataset.deleteId;
  const time = timeStamp();
  const openTaskTime = $(e.target).siblings('span').text();
  const updatedtaskObject = gettingTaskFromList(iscompleted, elementToUpdate, time, openTaskTime);
  tasksData.updateSingleTask(updatedtaskObject, idToUpdate)
    .then(() => {
      if (iscompleted) {
        const taskToMove = $(elementToUpdate).text();
        $('#completed-tasks').append(`<div class="comp-tasks"><div class="completed-task-text" id="${idToUpdate}-done">${taskToMove} <input class="delete-button-completed" data-completetask-id="${idToDelete}"type="image" src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-512.png" width="20px"></input><span class="complete-time">${time} </span></div></div>`);
        $(elementToUpdate).css('text-decoration', 'line-through');
      } else {
        let incompleteTaskId = '#';
        incompleteTaskId += idToUpdate;
        incompleteTaskId += '-done';
        $(incompleteTaskId).remove();
        $(elementToUpdate).css('text-decoration', 'none');
      }
    }).catch((error) => {
      console.error(error);
    });
};

const initializeTasksPage = () => {
  tasksPage();
};

$('body').on('click', 'input[type=checkbox]', completedTask);

// Delete from Open Tasks
const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  tasksData.deleteTask(idToDelete)
    .then(() => {
      tasksPage();
    }).catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '.delete-button', deleteTask);

// Delete from completed task and opentask
$('body').on('click', '.delete-button-completed', (e) => {
  const elementFromCompletedTask = $(e.target).parents()[1];
  const idTodeleteCompleteTask = e.target.dataset.completetaskId;
  const idToOpenTask = document.querySelectorAll(`[data-task-id='${idTodeleteCompleteTask}']`)[0].parentElement;
  tasksData.deleteTask(idTodeleteCompleteTask)
    .then(() => {
      $(idToOpenTask).remove();
      $(elementFromCompletedTask).remove();
    }).catch((error) => {
      console.error(error);
    });
});

export default initializeTasksPage;
