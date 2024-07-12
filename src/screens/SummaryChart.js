import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart, LinearScale, Tooltip} from 'chart.js';
import {useSelector} from 'react-redux';
import {aggregateExpenses} from '../store';
import { useParams } from 'react-router-dom';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);

const Charts = () => {
  const {param} = useParams();
  const aggrExpenses = useSelector(aggregateExpenses(param.split('-').reverse().join('/')));
  const data = {
    labels: aggrExpenses.map((c) => c.name),
    datasets: [
      {
        data: aggrExpenses.map((c) => c.v),
        backgroundColor: aggrExpenses.map((c) => c.color),
        borderColor: aggrExpenses.map((c) => c.color),
        borderWidth: 1,
      },
    ],
  };
  return <Bar data={data} />;
};

export default Charts;
