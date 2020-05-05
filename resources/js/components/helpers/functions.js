export const toLocalTime = (time) => {
    let [hr, min, sec] = time.split(':');
    const am_pm = hr >= 12 ? 'PM' : 'AM';

    hr = hr >= 13 ? hr - 12 : hr;

    return `${hr}:${min} ${am_pm}`;
}