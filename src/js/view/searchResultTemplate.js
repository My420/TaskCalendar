import { MARK_OPEN, MARK_CLOSE } from '../utils/constant';

const searchResultTemplate = result => {
  const { date, color, status, text } = result;
  const markedText = text
    .replace(MARK_OPEN, "<span class='result__mark'>")
    .replace(MARK_CLOSE, '</span>');

  return `<li class='search__item result'>
  <div class='result__screen' data-date=${date} data-action='set'></div>
    <div class='result__wrapper'>    
      <p class='result__date' data-color=${color} data-status=${status}>${date}</p>    
      <p class='result__name' data-status=${status}>${markedText}</p>   
    </div>    
  </li>`;
};

export default searchResultTemplate;
