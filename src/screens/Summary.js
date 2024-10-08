import {useState} from 'react';
import {useSelector} from 'react-redux';

import {ButtonGroup, Typography, Button} from '@mui/material';
import {Container} from '@mui/system';

import SummaryCard from '../components/SummaryCard';
import {selectComparison} from '../store';

const MONTH = 1;
const YEAR = 12;

const Config = ({selection, onChange, title}) => {
  const [active, setActive] = useState(0);
  const handleChange = (e) => {
    const f = e.target.getAttribute('f');
    if (typeof onChange === 'function') {
      onChange(f);
    }
    setActive(selection.map((el) => el[0]).findIndex((n) => n === +f));
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        mb: 2,
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <ButtonGroup>
        {selection.map(([f, name], idx) => (
          <Button
            key={f}
            f={f}
            onClick={handleChange}
            variant={idx === active ? 'contained' : 'outlined'}
          >
            {name}
          </Button>
        ))}
      </ButtonGroup>
    </Container>
  );
};

const Summary = () => {
  const [filter, setFilter] = useState(MONTH);
  const summary = useSelector(selectComparison(filter));
  const handleChange = (f) => setFilter(f);

  return (
    <Container sx={{mb: 8}}>
      <Config
        selection={[
          [MONTH, 'miesiac'],
          [YEAR, 'rok'],
        ]}
        onChange={handleChange}
        title="Podsumowanie"
      />
      {summary.map((c) => (
        <SummaryCard key={c.id} {...c} />
      ))}
    </Container>
  );
};

export default Summary;
