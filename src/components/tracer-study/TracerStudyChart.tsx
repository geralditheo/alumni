'use client';

import dynamic from "next/dynamic";
import { Suspense } from 'react';

const PieChart = dynamic(() => import('@/components/chart/PieChart'), { ssr: false });

export default function TracerStudyChart(){
    return (
        <main className="mb-5" >
            <div className="w-full h-96 grow-0 flex justify-center" >
                <Suspense fallback={<div>Loading...</div>} >
                    <PieChart />
                </Suspense>
            </div>
        </main>
    )
}