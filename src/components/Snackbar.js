import {useEffect, Fragment} from 'react';
import Button from '@mui/material/Button';
import MuiSnackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from 'react-redux';
import {selectSnackbar, setSnackbar} from '../store';

const generateMsg = (msg) => {
  return msg;
};

const Snackbar = () => {
  const dispatch = useDispatch();
  const {open, type, msg} = useSelector(selectSnackbar);

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

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        Zamknij
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <div>
      <MuiSnackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={generateMsg(msg, type)}
        action={action}
      />
    </div>
  );
};

export default Snackbar;
