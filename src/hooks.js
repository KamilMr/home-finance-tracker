import {selectToken} from './store';
import {useSelector} from 'react-redux';
import {getURL} from './common';

export const useFetch = () => {
  const token = useSelector(selectToken);

  return ({path, body, headers, method = 'GET'}) => {
    const opt = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    }

    if (body) opt.body = JSON.stringify(body);
    if (body) opt.method = 'POST';

    return fetch(getURL(path), opt);
  }
}
