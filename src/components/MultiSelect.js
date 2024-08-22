import {Checkbox, ListItemText, MenuItem, Select} from '@mui/material';

const MultiSelect = ({checkedArr = [], onChange, items = [], sxProp = {}}) => {
  return (
    <Select
      variant="outlined"
      sx={sxProp}
      multiple
      displayEmpty
      value={checkedArr}
      onChange={onChange}
      renderValue={(selected) =>
        selected.length === 0 ? (
          <p css={{color: 'grey'}}>Wszystkie widać</p>
        ) : (
          selected.join(', ')
        )
      }
    >
      {items.map((item) => (
        <MenuItem key={item} value={item}>
          <Checkbox color="primary" checked={checkedArr.includes(item)} />
          <ListItemText primary={item} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default MultiSelect;
