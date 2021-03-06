import moment from 'moment';

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const dayAbbervs = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthAbbrevs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getDay = (int) => days[int];
export const getDayAbbrev = (int) => dayAbbervs[int];
export const getMonth = (int) => months[int];
export const getMonthAbbrev = (int) => monthAbbrevs[int];

export const toLocalTime = (time) => {
  let [hr, min, sec] = time.split(':');
  const am_pm = hr >= 12 ? 'PM' : 'AM';

  hr = hr >= 13 ? hr - 12 : hr;

  return `${hr}:${min} ${am_pm}`;
}

/**
 * @todo wrong date, adjust for timezone
 */
export function getReadableDate(date) {
  date = moment(date);
  // console.log(date.getDate());
  return `${date.get('month') + 1}/${date.get('date') + 1}/${date.get('year')}`;
  // return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Get session attribute (session_attributes morhMany table)
 * @param {Array} data Data array of session attributes
 * @param {string} attr Attribute being searched for
 * @param {string|number} fallback Fallback if attribute is not found
 */
export const getSessionAttribute = (data, attr, fallback="0") => {
  if (!data.length) return fallback;

  const find = data.find((att) => att.name === attr);
  if (!find) return fallback;

  return find.attribute || fallback;
}

export const to2digits = (num) => Math.round(num * 100) / 100;