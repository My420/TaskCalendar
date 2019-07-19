const calendarDayTemplate = (dateNumber, tasks = 3) => {
  return `<td class="calendar__day">
    <div class='calendar__cell-wrapper'
    <span class="calendar__day-number">${dateNumber}</span>
    <span class="calendar__tasks-amount visually-hidden">${tasks}</span>
    </div>
</td>`;
};

export default calendarDayTemplate;
