'use client';

import dynamic from "next/dynamic";
import { Suspense } from 'react';

const PieChart = dynamic(() => import('@/components/chart/PieChart'), { ssr: false });
const DoughnutChart = dynamic(() => import('@/components/chart/DoughnoutChart'), { ssr: false });
const LineChart = dynamic(() => import('@/components/chart/LineChart'), { ssr: false });

export default function DsahboardStatistikAlumni(){

    

    return <section>

        <div className="flex flex-row my-10 gap-3" >

            <div className="basis-4/12  p-3 " >
                <Suspense fallback={<div>Loading...</div>} >
                    <PieChart />
                </Suspense>
            </div>

            <div className="basis-4/12 p-3 " >
                <Suspense fallback={<div>Loading...</div>} >
                    <DoughnutChart />
                </Suspense>
            </div>

            <div className="basis-4/12 p-3 " >
                <Suspense fallback={<div>Loading...</div>} >
                    <LineChart />
                </Suspense>
            </div>
            
        </div>
        
    </section>
}