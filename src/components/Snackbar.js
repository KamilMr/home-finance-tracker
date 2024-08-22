import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import MuiSnackbar from '@mui/material/Snackbar';
import {selectSnackbar, setSnackbar} from '../store';
import {Alert} from '@mui/material';

const Snackbar = () => {
  const dispatch = useDispatch();
  let {open, type = '', msg} = useSelector(selectSnackbar);

  if (!['success', 'info', 'warning', 'error'].includes(type)) type = 'success';

  if (typeof msg !== 'string') msg = '';

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setSnackbar());
  };

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setSnackbar());
    }, 4000);

    return () => {
      clearTimeout(id);
    };
  }, [open, type, msg, dispatch]);

  return (
    <MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{width: '100%'}}
      >
        {msg}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
