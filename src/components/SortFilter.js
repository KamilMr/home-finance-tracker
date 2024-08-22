import {useState} from 'react';

import {Box, Button, Container, Typography} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';
import {format} from 'date-fns';

import MultiSelect from '../components/MultiSelect';

const CustomDatePicker = ({
  selectedDate,
  handleDateChange,
  title,
  variant = 'h6',
}) => {
  return (
    <Container>
      {title && <Typography variant={variant}>{title}</Typography>}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div css={{display: 'flex', alignItems: 'center'}}>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            format="dd/MM/yyyy"
            slotProps={{
              textField: {
                label: 'Date',
                // style: {height: 20}
              },
            }}
          />
        </div>
      </LocalizationProvider>
    </Container>
  );
};

const SortFilter = ({filters, setFilters, handleRemoveFilters, categories}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date(format(new Date(), 'yyyy-MM-01')));
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const handleDateChange = when => d => {
    if (when === 'e') return setSelectedEndDate(d);

    setSelectedStartDate(d);
  };
  return (
    <Box>
      <Container sx={{display: 'flex'}}>
        <CustomDatePicker
          handleDateChange={handleDateChange('s')}
          title="Start"
          selectedDate={selectedStartDate}
        />
        <CustomDatePicker
          handleDateChange={handleDateChange('e')}
          title="End"
          selectedDate={selectedEndDate}
        />
      </Container>
      <Container>
        <MultiSelect
          sxProp={{width: 320}}
          checkedArr={filters}
          items={categories}
          onChange={e => setFilters(e.target.value)}
        />
        <Button onClick={handleRemoveFilters}>Usuń filtry</Button>
      </Container>
    </Box>
  );
};

export default SortFilter;
