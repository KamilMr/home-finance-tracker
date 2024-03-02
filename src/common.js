import {v4 as uniqueId} from 'uuid';

const URL = process.env.REACT_APP_BE_URL;

export const getURL = (p = '') => {
  return `${URL}/${p}`;
};

export const formatPrice = (grosz) => {
  const zloty = grosz;
  return `${zloty.toFixed(2)} zł`;
};

export const makeNewIdArr = (number) => {
  const set = new Set();
  let num = number;

  while (num > 0) {
    const id = uniqueId();
    if (set.has(id)) continue;
    set.add(id);
    --num;
  }
  return Array.from(set);
};
