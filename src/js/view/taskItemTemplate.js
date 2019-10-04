const taskItemTemplate = task => {
  const { taskColor, taskName, taskStatus, taskDate, taskId } = task;

  return `<li class="taskList__item" data-id=${taskId} data-date=${taskDate}>
  <div class="taskList__screen" data-id=${taskId} data-date=${taskDate} tabindex='0'></div>
  <div class="taskList__wrapper">    
    <div class="taskList__color" data-color=${taskColor} data-status=${taskStatus}></div>
    <div class="taskList__inner">
      <p class="taskList__name" data-status=${taskStatus}>${taskName}</p>
    </div>
    </div>    
  </li>`;
};

export default taskItemTemplate;
