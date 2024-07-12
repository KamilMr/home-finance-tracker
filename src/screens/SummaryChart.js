import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart, LinearScale, Tooltip} from 'chart.js';
import {Container} from '@mui/material';

import {aggregateExpenses} from '../store';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);

const chartOptions = (period) => {
  return {
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        suggestedMax: period === 30 ? 60 : period === 60 ? 100 : null,
      },
    },
  };
};

const Charts = () => {
  const {param} = useParams();
  const aggrExpenses = useSelector(
    aggregateExpenses(param.split('-').reverse().join('/')),
  );
  const categories = aggrExpenses.map(o => o.name);
  const data = {
    labels: categories,
    datasets: [
      {
        data: aggrExpenses.map((c) => c.v),
        backgroundColor: aggrExpenses.map((c) => c.color),
        borderColor: aggrExpenses.map((c) => c.color),
        borderWidth: 1,
      },
    ],
  };
  return (
    <Container sx={{overflowX: 'auto'}}>
      <Bar data={data} options={chartOptions()} height="400%"/>
    </Container>
  );
};

export default Charts;
