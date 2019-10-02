import AppView from '../view/AppView';
import AppModel from '../model/AppModel';

class AppPresenter {
  constructor(rootElement) {
    this._rootElement = rootElement;
    this._model = new AppModel();
    this._view = new AppView(this._model.calendarPeriodData, this._rootElement);
  }

  init() {
    this._view.onPrevButtonClick = () => {
      const newData = this._model.changeMonthToPrev();
      this._view.changeCalendarDate(newData.dates, newData.tasks);
    };
    this._view.onNextButtonClick = () => {
      const newData = this._model.changeMonthToNext();
      this._view.changeCalendarDate(newData.dates, newData.tasks);
    };

    this._view.onCellClick = cellDate => {
      const { newTaskDate, dayTasks } = this._model.changeTasksDate(cellDate);
      this._view.changeTasksDate(newTaskDate, dayTasks);
    };

    this._view.onNewTaskAdd = data => {
      const task = this._model.addNewTask(data);
      this._view.addTask(task);
    };

    this._view.onTaskClick = (date, id) => {
      const task = this._model.getTask(date, id);
      this._view.showTaskCard(task);
    };

    this._view.onTaskDelete = (date, id) => {
      const deletedTask = this._model.deleteTask(date, id);
      const { taskDate, taskId } = deletedTask;
      this._view.deleteTask(taskDate, taskId);
    };

    this._view.onTaskChange = data => {
      const oldTaskDate = data.oldTask.taskDate;
      const newTaskDate = data.newTask.taskDate;
      if (oldTaskDate === newTaskDate) {
        const newTask = this._model.changeTask(data.newTask);
        this._view.changeTask(newTask);
      } else {
        const answer = this._model.migrateTask(data);
        this._view.migrateTask(answer);
      }
    };

    this._view.onSearchButtonClick = async text => {
      this._view.showLoading();
      const result = await this._model.search(text);
      this._view.showSearchResults(result);
    };

    this._view.render();
  }
}

export default AppPresenter;
