import calendarDayTasksTemplate from './calendarDayTasksTemplate';
import deleteTimePart from '../utils/deleteTimePart';

const calendarDayTemplate = (cellDate, tasksDate, tasks) => {
  const newCellDate = deleteTimePart(cellDate);
  const newTasksDate = deleteTimePart(tasksDate);
  const dateDate = newCellDate.slice(-2);
  const dayTasks = tasks[newCellDate];

  const isActive = newCellDate === newTasksDate;

  return `<td class="calendar__day" data-date=${newCellDate}>
    <div class="calendar__cell" data-date=${newCellDate} data-active=${isActive}>
      <span class="calendar__day-number" data-date=${newCellDate}>${dateDate}</span>    
      <div class="calendar__tasks" data-date=${newCellDate}>
        ${calendarDayTasksTemplate(dayTasks, newCellDate)}
      </div>
    </div>    
</td>`;
};

export default calendarDayTemplate;
