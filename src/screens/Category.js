import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import _ from 'lodash';

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
import AddBtn from '../components/AddBtn';
import { useParams } from 'react-router-dom';
import CategoryNew from '../components/CategoryNew';
import MyComponent from '../components/Picker';

const initialState = () => ({
  color: '',
  name: '',
  groupId: null,
  id: '',
});

const CategoryLAE = () => {
  const { param } = useParams();
  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();
  const [state, setState] = useState(initialState());
  const [editable, setEditable] = useState(false);
  const oldVal = useRef(initialState());

  const isEqualData = _.isEqual(oldVal.current, state);
  const textInputRefs = useRef({});

  const handleRowEdit = (id) => () => {
    const { category, color, groupId } = categories.find((c) => c.catId === id);
    setState({ name: category, color, groupId, id });
    setEditable(id);
    oldVal.current = { name: category, color, groupId, id };
  };

  const handleStop = () => {
    oldVal.current = initialState();
    setState(initialState());
    setEditable(false);
  }

  const handleSave = () => {
    const { groupId, name, color, id } = state;
    if (!isEqualData) {
      dispatch(handleCategory({ method: 'PUT', groupId, name, color: color.substring(1), id }));
    }
    setState(initialState());
    setEditable(false);
    oldVal.current = initialState();
  };

  const handleRowChange = (key) => (data) => {
    setState({ ...state, [key]: data.target.value });
  };

  const handleColorChange = ({ target: { name, value } }) => {
    setState(state => ({ ...state, color: value }));
  };

  // Focus the text field when 'editable' changes
  useEffect(() => {
    // Focus the relevant TextField when 'editable' changes
    if (editable && textInputRefs.current[editable]) {
      textInputRefs.current[editable].focus();
    }
  }, [editable]);
  console.log(editable, state, isEqualData);
  return param === 'create' ? <CategoryNew /> : (
    <TableContainer sx={{ width: '100%', bgcolor: 'background.paper', p: 1 }}>
      <Table>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.catId}>
              <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <MyComponent
                  cb={handleColorChange}
                  editable={editable === cat.catId}
                  val={editable === cat.catId ? state.color : cat.color}
                  sx={{
                    '& .MuiButtonBase-root': {
                      width: 60,
                      height: 60
                    },
                    '& .MuiInputBase-input': {
                      display: 'none'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      display: 'none'
                    }
                  }}
                />
                <Box>
                  <TextField
                    // onBlur={oldVal.current.name === state.name ? handleStop : null}
                    size="small"
                    value={!!editable && editable === cat.catId ? state.name : cat.category}
                    onChange={handleRowChange('name')}
                    inputRef={(el) => (textInputRefs.current[cat.catId] = el)}
                    sx={{ // change label and border color when readonly
                      '& .MuiOutlinedInput-root': {
                        // Style for the normal state
                        '& fieldset': {
                          border: 'none', // Remove the border
                        },
                        // Style when the TextField is focused
                        '&.Mui-focused fieldset': {
                          border: editable === cat.catId ? '1px solid' : '', // Add border on focus
                        },
                      },
                    }}
                  />
                  <Stack direction={'row'} spacing={1} justifyContent={'end'}>
                    <IconButton disabled={true}>
                      <DeleteIcon />
                    </IconButton>
                    {editable === cat.catId ? (
                      <IconButton onClick={handleStop}>
                        <CancelIcon />
                      </IconButton>
                    ) : null}
                    <IconButton
                      disabled={cat.catId === editable && isEqualData}
                      onClick={cat.catId === editable ? handleSave : handleRowEdit(cat.catId)}>
                      {cat.catId === editable ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                  </Stack>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddBtn path="/category-list/create" />
    </TableContainer>
  );
};

export default CategoryLAE;
