import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {

  return (
    <Bar />
  );
};

export default Chart;

