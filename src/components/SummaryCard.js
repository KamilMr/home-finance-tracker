import {Card, CardContent, Typography, Container} from '@mui/material';
import {Box} from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import {formatPrice} from '../common';

const SummaryCard = ({income, outcome, date}) => {
  return (
    <Card sx={{mb: 2}}>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {date}
        </Typography>
        <Container
          sx={{display: 'flex', justifyContent: 'space-around', mb: 4}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <ArrowDownwardIcon style={{color: 'green'}} />
            <Typography variant="body2">{`Wpływy: ${formatPrice(income)}`}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <ArrowUpwardIcon style={{color: 'red'}} />
            <Typography variant="body2">{`Wydatki: ${formatPrice(outcome)}`}</Typography>
          </Box>
        </Container>
        <Box>{`Saldo: ${formatPrice(income - outcome)}`}</Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
