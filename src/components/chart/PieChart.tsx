import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title, SubTitle } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, Title, SubTitle);

export type DataDiagram = {
  label: string,
  data: number
}

export default function PieChart({ title, lable, dataDiagram = [], isShowLable = false }: { title?: string, lable?: string, dataDiagram?: DataDiagram[], isShowLable?: boolean }){
    
    const inputLabel = dataDiagram?.map((item) => item.label) || [];
    const inputData = dataDiagram?.map((item) => item.data) || [];
    
    const data: ChartData<'pie', number[], string> = {
        labels: inputLabel.length ? inputLabel :  ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label:  lable ? lable : '# of Votes',
            data: inputData.length ? inputData : [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display: isShowLable
          },
          tooltip: {
            enabled: true,
          },
          title: {
            display: true,
            text: title ? title : 'Pie Chart',
            position: 'top',
            align: 'center',
            color: 'black',
            padding: 3,
            }
        },
    };

    return <Pie data={data} options={options} />

}