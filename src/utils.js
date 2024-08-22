import {isAfter, isBefore, isSameDay} from 'date-fns';

const dh = {
  isBetweenDates: (d, s, e) =>
    (isBefore(d, e) && isAfter(d, s)) || isSameDay(d, s) || isSameDay(d, e),
};

export {dh};
