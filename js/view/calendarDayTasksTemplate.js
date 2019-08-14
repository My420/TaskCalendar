const calendarDayTasksTemplate = tasks => {
  if (tasks) {
    const template = tasks
      .map(task => {
        const { taskColor, taskStatus, taskId } = task;
        return `<div class="calendar__task" data-color=${taskColor} data-status=${taskStatus} data-id=${taskId}></div>`;
      })
      .join('');

    return template;
  }

  return ``;
};

export default calendarDayTasksTemplate;
