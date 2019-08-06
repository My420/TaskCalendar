const calendarDayTasksTemplate = tasks => {
  if (tasks) {
    const template = tasks
      .map(task => {
        return `<div class="calendar__task" data-color=${
          task.taskColor
        }></div>`;
      })
      .join('');

    return template;
  }

  return ``;
};

export default calendarDayTasksTemplate;
