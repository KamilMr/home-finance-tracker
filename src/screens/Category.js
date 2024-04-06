import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { handleCategory, selectCategories } from '../store';
import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const initialState = () => ({
  color: '',
  name: '',
  groupId: null,
  id: '',
});

const CategoryLAE = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState());
  const [editable, setEditable] = useState(false);
  const oldVal = useRef('');

  const textInputRefs = useRef({});

  const handleRowEdit = (id) => () => {
    const { category, color, groupId } = categories.find((c) => c.catId === id);
    setState({ name: category, color, groupId, id });
    setEditable(id);
    oldVal.current = category;
  };

  const handleStop = () => setEditable(false);

  const handleSave = () => {
    const { groupId, name, color, id } = state;
    if (oldVal.current !== name) {
      dispatch(handleCategory({ method: 'PUT', groupId, name, color, id }));
    }
    handleStop();
    setState(initialState());
    oldVal.current = '';
  };

  const handleRowChange = (key) => (data) => {
    setState({ ...state, [key]: data.target.value });
  };

  // Focus the text field when 'editable' changes
  useEffect(() => {
    // Focus the relevant TextField when 'editable' changes
    if (editable && textInputRefs.current[editable]) {
      textInputRefs.current[editable].focus();
    }
  }, [editable]);

  return (
    <TableContainer sx={{ width: '100%', bgcolor: 'background.paper', p: 1 }}>
      <Table>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.catId}>
              <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    background: '#' + cat.color || '',
                  }} />
                <Box>
                  <TextField
                    onBlur={handleStop}
                    size="small"
                    value={editable === cat.catId ? state.name : cat.category}
                    onChange={handleRowChange('name')}
                    inputRef={(el) => (textInputRefs.current[cat.catId] = el)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        // Style for the normal state
                        '& fieldset': {
                          border: 'none', // Remove the border
                        },
                        // Style when the TextField is focused
                        '&.Mui-focused fieldset': {
                          border: '1px solid', // Add border on focus
                        },
                      },
                    }}
                  />
                  <Stack direction={'row'} spacing={1} justifyContent={'end'}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={editable === cat.catId ? handleSave : handleRowEdit(cat.catId)}>
                      {editable === cat.catId ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                  </Stack>
                </Box>
              </TableCell>
            </TableRow>
          ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryLAE;
