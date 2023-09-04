import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getUserUsage } from "@/utils/auth";
import Loading from "@/components/common/loading";
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

type Token = {
    total: number;
}

type UsageData = {
    day: number;
    dayName: string;
    tokens: Token[];
    count: number;
}

type ChartDataType = {
    labels: string[];
    datasets: Dataset[];
}

type Dataset = {
    label: string;
    data: number[];
    backgroundColor: string;
}

export default function UserChart() {
    const [data, setData] = useState<UsageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [credit, setCredit] = useState<string>('0');
    const [chartData, setChartData] = useState<ChartDataType>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserUsage();
                const usageData: UsageData[] = response.data.tokenArr;

                setCredit(response.data.credit.toString());                
                
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
                                label: 'Credits Used',
                                data: totalTokens,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            },
                            {
                                label: 'Usage Count',
                                data: countValues,
                                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            },
                        ],
                    });
                    
                    setChartOptions({
                        responsive: true,
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

    const [chartOptions, setChartOptions] = useState({});

    return (
        <section className="">
            <h2 className="text-xl font-semibold mb-4"></h2>
            {loading ? (
                <Loading />
            ) : (
                <div className="lg:mx-10 bg-white p-3 rounded-xl shadow-xl">
                    <h2 className="text-lg font-semibold mb-2 text-center">Direct Messages</h2>
                    <h3>Credit{`'`}s remaining: {credit!}</h3>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            )}
        </section>
    );
}