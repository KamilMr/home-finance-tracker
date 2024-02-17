import {selectToken, initState} from './store';
import {useDispatch, useSelector} from 'react-redux';
import {getURL} from './common';
import {useEffect} from 'react';

export const useFetch = () => {
  const token = useSelector(selectToken);

  return ({path, body, headers, method = 'GET'}) => {
    const opt = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    };

    if (body) opt.body = JSON.stringify(body);

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
        dispatch(initState(res.d));
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
