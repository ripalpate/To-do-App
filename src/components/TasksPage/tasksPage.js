import $ from 'jquery';
import './tasksPage.scss';
import tasksData from '../../data/tasksData';

const printAllTasks = (tasksArray) => {
  let domString = '';
  domString += '<h5 class="task-heading">Tasks </h5>';
  tasksArray.forEach((task) => {
    if (task.isCompleted === false) {
      domString += `<div class="input-group-text w-25 task">
                      <input type="checkbox">
                      <p class="task-desc" data-task-id=${task.id}>${task.task}<p>
                      <input class="delete-button" data-delete-id=${task.id} type="image" src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-512.png" width="20px"></input>
                    </div>`;
      $('#tasks').html(domString);
    }
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

const gettingTaskFromList = (iscompleted, elementToUpdate) => {
  const task = {
    task: $(elementToUpdate).text(),
    isCompleted: iscompleted,
  };
  return task;
};

const completedTask = (e) => {
  const element = e.target;
  element.classList.toggle('checked');
  const iscompleted = $(element).hasClass('checked');
  const elementToUpdate = $(e.target).siblings('p')[0];
  const idToUpdate = elementToUpdate.dataset.taskId;
  const updatedtaskObject = gettingTaskFromList(iscompleted, elementToUpdate);
  tasksData.updateSingleTask(updatedtaskObject, idToUpdate)
    .then(() => {
      if (iscompleted) {
        const taskToMove = $(e.target).closest('.task').text();
        $('#completed-tasks').append(`<div id="${idToUpdate}-done">${taskToMove}</div>`);
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

export default initializeTasksPage;
