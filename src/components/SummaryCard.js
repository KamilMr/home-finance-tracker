import {Card, CardContent, Typography, Container} from '@mui/material';
import {Box} from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import {formatPrice} from '../common';
import _ from 'lodash';

const SummaryCard = ({income, outcome, date, costs, ...rest}) => {
  // the amount of costs total
  const sumCosts = _.sumBy(_.values(costs));
  return (
    <Card sx={{mb: 2}}>
      <CardContent sx={{p: 1}}>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {date}
        </Typography>
        <Container
          sx={{display: 'flex', justifyContent: 'space-between', mb: 4, p: 0}}
        >
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <ArrowDownwardIcon style={{color: 'green'}} />
            <Box>
              <Box sx={{display: 'flex'}}>
                <Typography>Wpływy:</Typography>
              </Box>
              <Typography variant="body2">
                {`${formatPrice(income - sumCosts)} `}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <ArrowUpwardIcon style={{color: 'red'}} />
              <Typography variant="body2">
                Wydatki: <br />
                {`${formatPrice(outcome - sumCosts)}`}
              </Typography>
            </Box>
            <Container sx={{mt:2}}>
              <Typography variant="caption" component="p">
                Koszta niewliczone:
              </Typography>
              {_.keys(costs).map((name) => (
                <Typography
                  variant="caption"
                  component="p"
                  key={name}
                >{`${name}: ${formatPrice(costs[name])}`}</Typography>
              ))}
            </Container>
          </Box>
        </Container>
        <Box>{`Saldo: ${formatPrice(income - outcome)}`}</Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
