'use client';

import dynamic from "next/dynamic";
import { Suspense } from 'react';

const PieChart = dynamic(() => import('@/components/chart/chartjs/PieChart'), { ssr: false });

export default function TracerStudyChart(){
    return (
        <main className="mb-5 grow-0 flex justify-center " >
            <div className="aspect-square h-96 " >
                <Suspense fallback={<div>Loading...</div>} >
                    <PieChart />
                </Suspense>
            </div>
        </main>
    )
}