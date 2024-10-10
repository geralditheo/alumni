import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend, Tooltip, Title, SubTitle } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, Title, SubTitle);

export default function DoughnutChart(){
    const data: ChartData<'doughnut'> = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'Skills',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            }
        }
    };

    return <Doughnut data={data} options={options}  />
}