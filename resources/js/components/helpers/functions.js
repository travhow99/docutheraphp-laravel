const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dayAbbervs = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthAbbrevs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getDay = (int) => days[int];
export const getDayAbbrev = (int) => dayAbbervs[int];
export const getMonthAbbrev = (int) => monthAbbrevs[int];

export const toLocalTime = (time) => {
  let [hr, min, sec] = time.split(':');
  const am_pm = hr >= 12 ? 'PM' : 'AM';

  hr = hr >= 13 ? hr - 12 : hr;

  return `${hr}:${min} ${am_pm}`;
}

export function getReadableDate(date) {
  console.log(date);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
