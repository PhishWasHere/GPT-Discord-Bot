import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getGuildUsage, getUserUsage} from '@/utils/auth';
import { useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  
const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        },
        title: {
        display: true,
        text: 'Usage',
        },
    },
};

const chartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        },
    ],
};

const getData = async () => {
    const usage = await getUserUsage();
    console.log(usage);
    return usage;
}

export default function UsageChart() {
    const [usage, setUsage] = useState<any>(null);

    const usageData = getData();

    return (
    <div>
        <h2>Tokens Chart</h2>
        {/* <Bar options={options} data={usageData} /> */}
      </div>
    );
}