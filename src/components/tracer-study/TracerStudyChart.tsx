'use client';

import dynamic from "next/dynamic";
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTracerStudy } from '@/hooks/tracer-study/tracerStudy.hook';
import { DataDiagram } from '@/components/chart/chartjs/PieChart';

const PieChart = dynamic(() => import('@/components/chart/chartjs/PieChart'), { ssr: false });

export default function TracerStudyChart(){
 
    const { data, check: checkTracerStudy} = useTracerStudy();
    const [ dataDiagram, setDataDiagram ] = useState<DataDiagram[]>([]);

    useEffect(() => {
        checkTracerStudy();
    }, [])

    useEffect(() => {
        if(data?.statusCounts) if (data.statusCounts.length){
            const temp = data.statusCounts.map((item) => ({ label: item.name, data: item.count }));
            setDataDiagram(temp);
        }
    }, [data])

    return (
        <main className="mb-5 grow-0 flex justify-center " >
            <div className="aspect-square h-96 " >
                <Suspense fallback={<div>Loading...</div>} >
                    <PieChart dataDiagram={dataDiagram} title="Tracer Study Diagram"  />
                </Suspense>
            </div>
        </main>
    )
}