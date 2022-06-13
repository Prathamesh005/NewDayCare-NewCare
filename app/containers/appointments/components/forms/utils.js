import isPast from 'date-fns/isPast';
import { isToday, toDate, format } from 'date-fns';
import parse from 'date-fns/parse';
import isBefore from 'date-fns/isBefore';
import moment from 'moment';

export const timeSlotAllowedCheck = (values, isBackDatedAllowed) => {
  const appointmentDate = moment(values.appointmentDate).format('DD-MM-YYYY');
  const dateObj = parse(appointmentDate, 'dd-MM-yyyy', new Date());

  const isPastDate = isPast(dateObj);
  const isTodayDate = isToday(dateObj);
  const isPastDateCheck = isPastDate && !isTodayDate;
  const isSlotAllowed = !isPastDateCheck || isBackDatedAllowed;
  if (isSlotAllowed) {
    return true;
  } else {
    return false;
  }
};

export const backDateCheck = (values, isBackDatedAllowed) => {
  const dateObj = parse(values.appointmentDate, 'dd-MM-yyyy', new Date());
  const today = new Date().toISOString().slice(0, 10);
  const todayYear = today.split('-')[0];
  const todayMonth = today.split('-')[1];
  const todayDate = today.split('-')[2];
  const selectedYear = values.appointmentDate.split('-')[0];
  const selectedMonth = values.appointmentDate.split('-')[1];
  const selectedDate = values.appointmentDate.split('-')[2];

  const result = isBefore(
    new Date(
      parseInt(selectedYear),
      parseInt(selectedMonth),
      parseInt(selectedDate),
    ),
    new Date(parseInt(todayYear), parseInt(todayMonth), parseInt(todayDate)),
  );

  const isSlotAllowed = result && isBackDatedAllowed;
  if (isSlotAllowed) {
    return true;
  } else {
    return false;
  }
};

export const isPastDateCheck = values => {
  const appointmentDate = moment(values.appointmentDate).format('DD-MM-YYYY');
  const dateObj = parse(appointmentDate, 'dd-MM-yyyy', new Date());

  const isPastDate = isPast(dateObj);
  const isTodayDate = isToday(dateObj);

  const isPastDateCheck = isPastDate && !isTodayDate;
  return isPastDateCheck;
};
