const taskItemTemplate = task => {
  const { taskColor, taskName, taskStatus } = task;
  return `<li class="taskList__item">
  <div class="taskList__wrapper">
    <div class="taskList__color" data-color=${taskColor} data-status=${taskStatus}></div>
    <div class="taskList__inner">
      <p class="taskList__name" data-status=${taskStatus}>${taskName}</p>
    </div>
    </div>
  </li>`;
};

export default taskItemTemplate;
