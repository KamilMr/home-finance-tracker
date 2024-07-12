import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {Bar} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart, LinearScale, Tooltip} from 'chart.js';
import {Button, Container} from '@mui/material';

import {aggregateExpenses} from '../store';
import MultiSelect from '../components/MultiSelect';
import {useState} from 'react';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);

// const chartOptions = (period) => {
//   return {
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true,
//         suggestedMax: period === 30 ? 60 : period === 60 ? 100 : null,
//       },
//     },
//   };
// };

const Charts = () => {
  const {param} = useParams();
  const aggrExpenses = useSelector(
    aggregateExpenses(param.split('-').reverse().join('/')),
  );
  const categories = aggrExpenses.map((o) => o.name);
  const [filters, setFilters] = useState(
    categories.filter((c) => !['Koszta kamil', 'Koszta Aga'].includes(c)),
  );

  const setCat = new Set(filters);
  const filteredData = aggrExpenses.filter((o) =>
    setCat.size ? setCat.has(o.name) : true,
  );

  const handleRemoveFilters = () => setFilters([]);

  const data = {
    labels: filters,
    datasets: [
      {
        data: filteredData.map((c) => c.v),
        backgroundColor: filteredData.map((c) => c.color),
        borderColor: filteredData.map((c) => c.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <MultiSelect
        sxProp={{width: 320}}
        checkedArr={filters}
        items={categories}
        onChange={(e) => setFilters(e.target.value)}
      />
      <Button onClick={handleRemoveFilters}>Usuń filtry</Button>
      <Bar data={data} height={'400px'} />
    </Container>
  );
};

export default Charts;
