import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import _ from 'lodash';
import {
  Autocomplete,
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

import AddBtn from '../components/AddBtn';
import CategoryNew from '../components/CategoryNew';
import MyComponent from '../components/Picker';
import {handleCategory, selectCategories, selectMainCategories} from '../store';

const initialState = () => ({
  color: '',
  name: '',
  groupId: null,
  id: '',
});

const CategoryLAE = () => {
  const {param} = useParams();
  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();
  const [state, setState] = useState(initialState());
  const [editable, setEditable] = useState(false);
  const oldVal = useRef(initialState());

  const mainCat = useSelector(selectMainCategories);
  const sources = mainCat.map((ar) => ar[0]);

  const handleSourceChange = (_, value) => {
    setState({
      ...state,
      groupId: mainCat.find((c) => c[0] === value)?.[1] || '',
    });
  };

  const isEqualData = _.isEqual(oldVal.current, state);
  const textInputRefs = useRef({});
  const handleRowEdit = (id) => () => {
    const {category, color, groupId} = categories.find((c) => c.catId === id);
    setState({name: category, color, groupId, id});
    setEditable(id);
    oldVal.current = {name: category, color, groupId, id};
  };

  const handleStop = () => {
    oldVal.current = initialState();
    setState(initialState());
    setEditable(false);
  };

  const handleSave = () => {
    const {groupId, name, color, id} = state;
    if (!isEqualData) {
      dispatch(
        handleCategory({
          method: 'PUT',
          groupId,
          name,
          color: typeof color === 'string' ? color.substring(1) : null,
          id,
        }),
      );
    }
    setState(initialState());
    setEditable(false);
    oldVal.current = initialState();
  };

  const handleRowChange = (key) => (data) => {
    setState({...state, [key]: data.target.value});
  };

  const handleColorChange = ({target: {value}}) => {
    setState((state) => ({...state, color: value}));
  };

  // Focus the text field when 'editable' changes
  useEffect(() => {
    // Focus the relevant TextField when 'editable' changes
    if (editable && textInputRefs.current[editable]) {
      textInputRefs.current[editable].focus();
    }
  }, [editable]);

  return param === 'create' ? (
    <CategoryNew />
  ) : (
    <TableContainer sx={{width: '100%', bgcolor: 'background.paper', p: 1}}>
      <Table>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.catId}>
              <TableCell
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <MyComponent
                  cb={handleColorChange}
                  editable={editable === cat.catId}
                  val={editable === cat.catId ? state.color : cat.color}
                  sx={{
                    '& .MuiButtonBase-root': {
                      width: 60,
                      height: 60,
                    },
                    '& .MuiInputBase-input': {
                      display: 'none',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      display: 'none',
                    },
                  }}
                />
                <Box>
                  <TextField
                    size="small"
                    value={
                      !!editable && editable === cat.catId
                        ? state.name
                        : cat.category
                    }
                    onChange={handleRowChange('name')}
                    inputRef={(el) => (textInputRefs.current[cat.catId] = el)}
                    sx={{
                      // change label and border color when readonly
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
                  <Autocomplete
                    options={sources}
                    size="small"
                    sx={{mt: 1}}
                    disabled={editable !== cat.catId}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField {...params} label="Kategorie" />
                    )}
                    onChange={handleSourceChange}
                    value={
                      sources.find(
                        (source) =>
                          source ===
                          mainCat.find(
                            (mc) =>
                              mc[1] ===
                              (cat.catId === editable
                                ? state.groupId
                                : cat.groupId),
                          )?.[0],
                      ) || null
                    }
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
                      onClick={
                        cat.catId === editable
                          ? handleSave
                          : handleRowEdit(cat.catId)
                      }
                    >
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
