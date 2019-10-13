import AbstractView from './AbstractView';
import taskItemTemplate from './taskItemTemplate';
import findTaskIndex from '../utils/findTaskIndex';
import createElement from '../utils/createElement';
import { ENTER_CODE } from '../utils/constant';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onTaskClick","onTaskChange"]}] */
class TaskListView extends AbstractView {
  constructor(tasks, parentElement) {
    super(parentElement);
    this._tasks = tasks || [];
    this._emptyMessageTemplate = '<li class="taskList__message">задач нет</li>';
    this._onUserClick = this._onUserClick.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onUserPress = this._onUserPress.bind(this);
    this._onPress = this._onPress.bind(this);
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

  _onUserPress(evt, isMouse = true) {
    evt.preventDefault();
    const pressEvt = isMouse ? evt : evt.changedTouches[0];

    const screen = pressEvt.target;
    const task = screen.parentNode;

    let isMove = false;
    const startPositionX = pressEvt.clientX;
    const startPositionY = pressEvt.clientY;
    const shiftX = startPositionX - screen.getBoundingClientRect().left;
    const shiftY = startPositionY - screen.getBoundingClientRect().top;
    const { offsetWidth: width, offsetHeight: height } = screen;
    let currentDroppable = null;

    const clone = task.cloneNode(true);
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;

    const moveAt = (pageX, pageY) => {
      clone.style.left = `${pageX - shiftX}px`;
      clone.style.top = `${pageY - shiftY}px`;
    };

    const onMove = event => {
      const moveEvt = isMouse ? event : event.changedTouches[0];
      const posShiftX = startPositionX - moveEvt.pageX;
      const posShiftY = startPositionY - moveEvt.pageY;

      if (Math.abs(posShiftX) > 3 || Math.abs(posShiftY) > 3) {
        isMove = true;
        task.hidden = true;
        document.body.append(clone);
        moveAt(moveEvt.pageX, moveEvt.pageY);

        clone.hidden = true;
        const elemBelow = document.elementFromPoint(
          moveEvt.clientX,
          moveEvt.clientY
        );
        clone.hidden = false;
        moveAt(moveEvt.pageX, moveEvt.pageY);

        if (!elemBelow) return;
        const droppableBelow = elemBelow.closest('.calendar__screen');

        if (currentDroppable !== droppableBelow) {
          if (currentDroppable) {
            currentDroppable.dataset.droppable = false;
          }

          currentDroppable = droppableBelow;

          if (droppableBelow) {
            currentDroppable.dataset.droppable = true;
          }
        }
      }
    };

    const onEnd = () => {
      if (!currentDroppable) {
        if (isMove) {
          clone.remove();
          task.hidden = false;
        } else {
          this._onUserClick(pressEvt);
        }
      } else {
        currentDroppable.dataset.droppable = false;
        clone.remove();

        const taskIndex = screen.dataset.index;
        const oldTask = this._tasks[taskIndex];
        const oldDate = oldTask.taskDate;
        const newDate = currentDroppable.dataset.date;
        if (newDate === oldDate) {
          task.hidden = false;
        } else {
          const newTask = { ...oldTask, taskDate: newDate };
          const oldTaskClone = { ...oldTask };
          this.onTaskChange({ oldTask: oldTaskClone, newTask });
        }
      }
      if (isMouse) {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
      } else {
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      }
    };

    if (isMouse) {
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
    } else {
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onEnd);
    }
  }

  _onPress(evt) {
    if (evt.target.className === 'taskList__screen') {
      if (evt.type === 'mousedown' && evt.button < 2) {
        this._onUserPress(evt, true);
      } else if (evt.type === 'touchstart') {
        this._onUserPress(evt, false);
      }
    }
  }

  get template() {
    return `
      <section class="app__taskList taskList">
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

  bind() {
    this._taskList = this.element.querySelector('.taskList__list');
    this._taskList.addEventListener('keyup', this._onKeyUp);
    this._taskList.addEventListener('mousedown', this._onPress);
    this._taskList.addEventListener('touchstart', this._onPress);
  }

  unbind() {
    this._taskList.removeEventListener('keyup', this._onKeyUp);
    this._taskList.removeEventListener('mousedown', this._onPress);
    this._taskList.removeEventListener('touchstart', this._onPress);
  }

  onTaskClick() {}

  onTaskChange() {}
}

export default TaskListView;
