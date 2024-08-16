import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useTheme} from '@mui/material/styles';
import {useMediaQuery} from '@mui/material';

import {selectToken, initState, setSnackbar} from './store';
import {getURL} from './common';

export const useFetch = () => {
  const token = useSelector(selectToken);

  return ({path, body, headers, method = 'GET', file = null}) => {
    const opt = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    };

    if (body) opt.body = file ? body : JSON.stringify(body);

    return fetch(getURL(path), opt);
  };
};

export const useFetchIni = () => {
  const cf = useFetch();
  const dispatch = useDispatch();

  useEffect(() => {
    cf({path: 'ini'})
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.err)
          return dispatch(setSnackbar({msg: res.err, type: 'error'}));
        dispatch(initState(res.d));
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useMediaQ = (size) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(size));
  return matches;
};
