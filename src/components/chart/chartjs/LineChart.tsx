import { Line } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PointElement, LineElement, } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PointElement, LineElement,);

export default function LineChart(){

    const data: ChartData<'line'> = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
        ],
        datasets: [{
            label: 'Data',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.5,
        }]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Line Chart',
                position: 'top',
                align: 'center',
                color: 'black',
                padding: 3,
            },
            subtitle: {
                display: true,
                color: 'grey',
                text: "Line Chart"
            }
            
        }
    }

    return <Line data={data} options={options} />
}