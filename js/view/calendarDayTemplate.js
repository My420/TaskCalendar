import calendarDayTasksTemplate from './calendarDayTasksTemplate';
import deleteTimePart from '../utils/deleteTimePart';
import dateToObject from '../utils/dateToObject';

const calendarDayTemplate = (
  cellDate,
  tasksDate,
  todayDate,
  currentMonth,
  tasks
) => {
  const newCellDate = deleteTimePart(cellDate);
  const newTasksDate = deleteTimePart(tasksDate);
  const { date, month } = dateToObject(newCellDate);

  const dayTasks = tasks[newCellDate];

  const isActive = newCellDate === newTasksDate;
  const isToday = deleteTimePart(todayDate) === newCellDate;
  const isCurrentMonth = month === currentMonth;

  return `<td class="calendar__day">
    <div class="calendar__cell" data-date=${newCellDate} data-active=${isActive} data-today=${isToday} data-current=${isCurrentMonth}>
    <div class="calendar__screen" data-date=${newCellDate}></div>
      <span class="calendar__day-number">${date}</span>    
      <div class="calendar__task-wrapper">
        ${calendarDayTasksTemplate(dayTasks)}
      </div>      
    </div>    
</td>`;
};

export default calendarDayTemplate;
