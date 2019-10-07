import AbstractView from './AbstractView';
import taskItemTemplate from './taskItemTemplate';
import findTaskIndex from '../utils/findTaskIndex';
import createElement from '../utils/createElement';
import { ENTER_CODE } from '../utils/constant';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onTaskClick",""]}] */
class TaskListView extends AbstractView {
  constructor(tasks, parentElement) {
    super(parentElement);
    this._tasks = tasks || [];
    this._emptyMessageTemplate = '<li class="taskList__message">задач нет</li>';
    this._onUserClick = this._onUserClick.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
  }

  _findTask(id) {
    return this._taskList.querySelector(`.taskList__item[data-id="${id}"]`);
  }

  _getListTemplate() {
    if (this._tasks.length > 0) {
      const template = this._tasks
        .map((elem, i) => {
          return taskItemTemplate(elem, i);
        })
        .join('');

      return template;
    }

    return this._emptyMessageTemplate;
  }

  _deleteEmptyMessage() {
    this._taskList.querySelector('.taskList__message').remove();
  }

  _showEmptyMessage() {
    this._taskList.insertAdjacentHTML('beforeend', this._emptyMessageTemplate);
  }

  _onKeyUp(evt) {
    const { code } = evt;
    if (code === ENTER_CODE) {
      this._onUserClick(evt);
    }
  }

  _onUserClick(evt) {
    if (evt.target.className === 'taskList__screen') {
      const { date } = evt.target.dataset;
      const { id } = evt.target.dataset;
      this.onTaskClick(date, id);
    }
  }

  get template() {
    return `
      <section class="taskList">
      <h2 class="visually-hidden">Список дел</h2>
      <ul class="taskList__list">${this._getListTemplate()}</ul>     
    </section>
      `;
  }

  changeTasks(newTasks) {
    this.unrender();
    this._tasks = newTasks || [];
    this.render();
  }

  addTaskToList(task) {
    if (this._tasks.length === 0) {
      this._deleteEmptyMessage();
    }
    this._tasks.push(task);
    const newTask = taskItemTemplate(task);
    this._taskList.insertAdjacentHTML('beforeend', newTask);
  }

  deleteTaskFromList(taskId) {
    const task = this._findTask(taskId);
    task.remove();
    const deleteTaskIndex = findTaskIndex(this._tasks, taskId);
    this._tasks.splice(deleteTaskIndex, 1);
    if (this._tasks.length === 0) {
      this._showEmptyMessage();
    }
  }

  changeTask(newTask) {
    const { taskId } = newTask;
    const newTaskElement = createElement(taskItemTemplate(newTask));
    const oldTaskElement = this._findTask(taskId);
    oldTaskElement.replaceWith(newTaskElement);
  }

  _onMouseDown(evt) {
    if (evt.target.className === 'taskList__screen') {
      const taskIndex = evt.target.dataset.index;
      let isMouseMove = false;
      const shiftX = evt.clientX - evt.target.getBoundingClientRect().left;
      const shiftY = evt.clientY - evt.target.getBoundingClientRect().top;

      const startPositionX = evt.clientX;
      const startPositionY = evt.clientY;

      const { offsetWidth: width, offsetHeight: height } = evt.target;
      let currentDroppable = null;

      const clone = evt.target.parentNode.cloneNode(true);
      clone.style.width = `${width}px`;
      clone.style.height = `${height}px`;
      clone.style.zIndex = 1000;
      clone.style.position = 'absolute';

      const moveAt = (pageX, pageY) => {
        clone.style.left = `${pageX - shiftX}px`;
        clone.style.top = `${pageY - shiftY}px`;
      };

      const onMouseMove = event => {
        const posShiftX = startPositionX - event.pageX;
        const posShiftY = startPositionY - event.pageY;

        if (Math.abs(posShiftX) > 3 || Math.abs(posShiftY) > 3) {
          isMouseMove = true;
          document.body.append(clone);
          moveAt(event.pageX, event.pageY);

          clone.hidden = true;
          const elemBelow = document.elementFromPoint(
            event.clientX,
            event.clientY
          );
          clone.hidden = false;
          moveAt(event.pageX, event.pageY);

          if (!elemBelow) return;
          const droppableBelow = elemBelow.closest('.calendar__screen');

          if (currentDroppable !== droppableBelow) {
            if (currentDroppable) {
              console.log(`улетели с `, currentDroppable);
            }

            currentDroppable = droppableBelow;

            if (droppableBelow) {
              console.log(`прилетели на `, droppableBelow.dataset.date);
            }
          }
        }
      };

      const onMouseUp = () => {
        console.log(currentDroppable);

        if (!currentDroppable) {
          if (isMouseMove) {
            clone.remove();
          } else {
            this._onUserClick(evt);
          }
        } else {
          console.log(this._tasks[taskIndex]);
          console.log(`мигрирум на ${currentDroppable.dataset.date}`);
          clone.remove();
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }

  bind() {
    this._taskList = this.element.querySelector('.taskList__list');
    // this._taskList.addEventListener('click', this._onUserClick);
    this._taskList.addEventListener('keyup', this._onKeyUp);
    this._taskList.addEventListener('mousedown', this._onMouseDown);
  }

  unbind() {
    // this._taskList.removeEventListener('click', this._onUserClick);
    this._taskList.removeEventListener('keyup', this._onKeyUp);
    this._taskList.removeEventListener('mousedown', this._onMouseDown);
  }

  onTaskClick() {}
}

export default TaskListView;
