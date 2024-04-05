import {useDispatch, useSelector} from 'react-redux';

import {handleCategory, selectCategories} from '../store';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import {useRef, useState} from 'react';

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

  const handleRowEdit = (id) => () => {
    const {category, color, groupId} = categories.find((c) => c.catId === id);
    setState({name: category, color, groupId, id});
    setEditable(id);
    oldVal.current = category;
  };

  const handleStop = () => setEditable(false);

  const handleSave = () => {
    const {groupId, name, color, id} = state;
    if (oldVal.current !== name) {
      dispatch(handleCategory({method: 'PUT', groupId, name, color, id}));
    }
    handleStop();
    setState(initialState());
    oldVal.current = '';
  };

  const handleRowChange = (key) => (data) => {
    setState({...state, [key]: data.target.value});
  };

  return (
    <TableContainer sx={{width: '100%', bgcolor: 'background.paper'}}>
      <Table>
        <TableBody>
          {categories.map((cat) =>
            editable === cat.catId ? (
              <TableRow key={cat.catId}>
                <TableCell
                  sx={{
                    width: 20,
                    height: 20,
                    background: '#' + cat.color || '',
                  }}></TableCell>
                <TableCell>
                  <TextField
                    onBlur={handleSave}
                    size="small"
                    value={state.name}
                    onChange={handleRowChange('name')}
                  />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={cat.catId} onClick={handleRowEdit(cat.catId)}>
                <TableCell
                  sx={{
                    width: 20,
                    height: 20,
                    background: '#' + cat.color || '',
                  }}></TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={cat.category}
                    onChange={handleRowChange('name')}
                  />
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
