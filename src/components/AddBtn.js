import React from 'react';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {Fab, useMediaQuery} from '@mui/material';

const AddBtn = ({path}) => {
  const navigate = useNavigate();
  const size = useMediaQuery('(max-width:600px)');
  const handleAdd = () => navigate(path);
  return !size ? null : (
    <Fab
      sx={{
        position: 'fixed',
        right: 20,
        bottom: 100,
      }}
      onClick={handleAdd}>
      <AddIcon />
    </Fab>
  );
};

export default AddBtn;

