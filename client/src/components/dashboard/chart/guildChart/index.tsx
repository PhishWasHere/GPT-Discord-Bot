
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getGuildUsage, getUserData } from "@/utils/auth";
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
};
  
type TokenArrItem = {
    count: number;
    day: number;
    dayName: string;
    tokens: Token[];
};
  
type GuildData = {
    guild_name: string;
    tokenArr: TokenArrItem[];
};
  
export default function GuildChart() {
    const [data, setData] = useState<GuildData[]>([]);
    const [credit, setCredit] = useState<string>('0');
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userData = await getUserData();
          
          const guild_id = userData.data.guildData.map((guild:any) => guild.guild_id);
          
          const usageDataPromise = guild_id.map(async (guild: string) => {
            
            const response = await getGuildUsage({ guild_id: guild });

            setCredit(response.data.credit)
            
            if (response.data.guild_name === "No guild found"){
                return null;
            }
            
            const usageData: GuildData[] = response.data;
            return usageData;
          });
  
          const usageData = await Promise.all(usageDataPromise);
  
          // Check if usageData is an array before proceeding
          if (Array.isArray(usageData)) {
            setData(usageData);
            
            setLoading(false); // Set loading to false after data is fetched
          } else {
            console.error('Data is not in the expected array format');
            setLoading(false); // Make sure loading is set to false even if there's an error
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false); // Make sure loading is set to false even if there's an error
        } 
      };
  
      fetchData();
    }, []);
    
    const numGuilds = data.filter(guildData => guildData !== null).length;
    const isCentered = numGuilds < 2;
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className={` ${isCentered ? 'mx-auto' : 'grid xl:grid-cols-2 mx-auto grid-cols-1'} container p-`}>
          {data.map((guildData: GuildData | null, index: number) => (
            <div key={index} className={`${isCentered ? 'mx-auto' : ''}`}>
              {guildData === null ? (
                null
              ) : (
                <section className="xl:m-3 bg-white p-3 rounded-xl shadow-xl">
                  <h2 className="text-lg font-semibold mb-2 text-center">{guildData.guild_name}</h2>
                  <h3>Credit{`'`}s remaining: {credit!}</h3>
                  <Bar
                    data={{
                      labels: guildData.tokenArr.map(item => item.dayName), // Corrected property name
                      datasets: [
                        {
                          label: 'Credits Used',
                          data: guildData.tokenArr.map(item => (item.tokens.length > 0 ? item.tokens[0].total : 0)),
                          backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                        {
                          label: 'Usage Count',
                          data: guildData.tokenArr.map(item => item.count), // Using the correct property name
                          backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </section>
              )}
            </div>
          ))}
        </section>
      )}
    </>
  );
}