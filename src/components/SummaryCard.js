import {useNavigate} from 'react-router-dom';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {Card, CardContent, Typography, Container} from '@mui/material';
import {Box} from '@mui/system';
import _ from 'lodash';

import {formatPrice} from '../common';

const SummaryCard = ({income, outcome, date, costs}) => {
  const navigate = useNavigate();

  const handleNavigate = () =>
    navigate(`/summary/chart/${date.split('/').reverse().join('-')}`);

  // the amount of costs total
  const sumCosts = _.sumBy(_.values(costs));

  return (
    <Card
      sx={{
        mb: 2,
        ':hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{p: 1}}>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {date}
        </Typography>
        <Container
          sx={{display: 'flex', justifyContent: 'space-between', mb: 4, p: 0}}
          onClick={handleNavigate}
        >
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <ArrowDownwardIcon style={{color: 'green'}} />
            <Box>
              <Box sx={{display: 'flex'}}>
                <Typography>Wpływy:</Typography>
              </Box>
              <Typography variant="body2">
                {`${formatPrice(income - sumCosts < 0 ? 0 : income - sumCosts)} `}
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
            <Container sx={{mt: 2}}>
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
