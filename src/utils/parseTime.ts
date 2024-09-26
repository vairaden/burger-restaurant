import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const parseTime = (time: string) => {
  let day = dayjs(time).format('D MMMM');
  const dayDiff = dayjs().diff(time, 'd');

  if (dayDiff === 0) {
    day = 'Сегодня'
  } else if (dayDiff === 1) {
    day = 'Вчера'
  }

  return `${day}, ${dayjs(time).format('HH:mm')}`;
}

export default parseTime;