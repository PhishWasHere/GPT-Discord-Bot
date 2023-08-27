
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getUserUsage } from "@/utils/auth";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function Chart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserUsage() as any;
                const usageData = response.data; // Modify this line based on the structure of the response
    
                // Check if usageData is an array before proceeding
                if (Array.isArray(usageData)) {
                    setData(usageData);
    
                    const labels = usageData.map(item => item.dayName);
                    const totalTokens = usageData.map(item => (item.tokens.length > 0 ? item.tokens[0].total : 0));
                    const countValues = usageData.map(item => item.count);
    
                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Total Tokens',
                                data: totalTokens,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            },
                            {
                                label: 'Count',
                                data: countValues,
                                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            },
                        ],
                    });
    
                    setChartOptions({
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Weekly Usage'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    });
    
                    setLoading(false); // Set loading to false after data is fetched and processed
                } else {
                    console.error("Data is not in the expected array format");
                    setLoading(false); // Make sure loading is set to false even if there's an error
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false); // Make sure loading is set to false even if there's an error
            }
        };

        fetchData();
    }, []);

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    const [chartOptions, setChartOptions] = useState({});

    return (
        <>
            <h2>Token Usage for the Past 7 Days</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Bar data={chartData} options={chartOptions} />
            )}
        </>
    );
}