export const toLocalTime = (time) => {
    let [hr, min, sec] = time.split(':');
    const am_pm = hr >= 12 ? 'PM' : 'AM';

    hr = hr >= 13 ? hr - 12 : hr;

    return `${hr}:${min} ${am_pm}`;
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  