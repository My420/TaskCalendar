const calendarDayTasksTemplate = tasks => {
  if (tasks) {
    const template = tasks
      .map(() => {
        return `*`;
      })
      .join('');

    return template;
  }

  return ``;
};

export default calendarDayTasksTemplate;
