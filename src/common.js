const URL = process.env.REACT_APP_BE_URL;

export const getURL = (p = '') => {
  return `${URL}/${p}`
};
