import { getCredit } from "@/utils/auth";
import { useEffect, useState } from "react";
import Loading from "@/components/common/loading";

export default function Credit () {
    const [credit, setCredit] = useState<string>('0');
    const [usedCredit, setUsedCredit] = useState<string>('0');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCredit();
                
                setCredit(response.data.totalCredit);
                setUsedCredit(response.data.totalUsedCredit);

                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

        return () => {
            setCredit('0');
            setUsedCredit('0');
            setLoading(true);
        }
    }, []);
    
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <section className="flex justify-center">
                    <div className="flex flex-col lg:flex-row">
                        <section className="m-2 flex justify-center">
                            <div className="flex flex-col items-start justify-start p-3 w-[22rem] h-40 relative rounded-xl bg-white shadow-xl">
                                <p className="text-lg text-gray-500">Credits Used</p>
                                <div className="text-5xl font-bold absolute top-1/2 right-4 transform -translate-y-1/2 break-all">{usedCredit}</div>
                            </div>
                        </section>

                        <section className="m-2 flex justify-center">
                            <div className="flex flex-col items-start justify-start p-3 w-[22rem] h-40 relative rounded-xl bg-white shadow-xl">
                                <p className="text-lg text-gray-500">Credits Remaining</p>
                                <div className="text-5xl font-bold absolute top-1/2 right-4 transform -translate-y-1/2 break-all">{credit}</div>
                            </div>
                        </section>
                    </div> 
                </section>
            )}
        </>
    )
}