import { isEmpty, isEqual } from 'lodash';
import timeZone from 'moment-timezone';

export const europeBerlinTime = (
  t,
  ifStartOfDay = false,
  ifEndOfDay = false,
) => {
  let time;
  if (ifStartOfDay) {
    time = timeZone(+t)
      .tz('Europe/Berlin')
      .startOf('day')
      .format('x');
  }
  if (ifEndOfDay) {
    time = timeZone(+t)
      .tz('Europe/Berlin')
      .endOf('day')
      .format('x');
  }
  if (!ifStartOfDay && !ifEndOfDay) {
    const d = new Date(+t);
    const UTC_OFFSET = d.getTimezoneOffset();
    d.setMinutes(d.getMinutes() + UTC_OFFSET);
    const berlinOffset = 1 * 60;
    d.setMinutes(d.getMinutes() + berlinOffset);
    time = +d;
  }
  return +time;
};

