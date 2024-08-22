import {
  IconButton,
  Paper,
  InputBase,
  Divider,
} from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = ({onChange, openFilter, value}) => {
  const handleChange = (e) => {
    const val = e.target.value;
    if (typeof onChange === 'function') {
      onChange(val);
    }
  };
  return (
    <Paper
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        mb: 1,
      }}>
      <InputBase
        sx={{ml: 1, flex: 1}}
        value={value}
        placeholder="Szukaj"
        inputProps={{'aria-label': 'search google maps'}}
        onChange={handleChange}
      />
      <IconButton type="button" aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{height: 28, m: 0.5}} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{p: 1}}
        aria-label="directions"
        onClick={openFilter}>
        <FilterListIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchField;
