import deleteTimePart from '../utils/deleteTimePart';

const calendarDayTemplate = (cellDate, tasksDate, tasks = 3) => {
  const newCellDate = deleteTimePart(cellDate);
  const newTasksDate = deleteTimePart(tasksDate);
  const dateDate = newCellDate.slice(-2);

  const isActive = newCellDate === newTasksDate;

  return `<td class="calendar__day" data-date=${newCellDate}>
    <div class="calendar__cell" data-date=${newCellDate} data-active=${isActive}>
    <span class="calendar__day-number" data-date=${newCellDate}>${dateDate}</span>
    <span class="calendar__tasks-amount visually-hidden" data-date=${newCellDate}>${tasks}</span>
    </div>
</td>`;
};

export default calendarDayTemplate;
