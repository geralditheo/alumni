'use client';

import { Table, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { useTracerStudy } from '@/hooks/tracer-study/tracerStudy.hook';
import { toast } from 'sonner';



export default function TracerStudyTable({ status }: { status: string }){

    const { status: statusTracerStudy, statusData } = useTracerStudy();

    const [ refresh, setRefresh ] = useState<boolean>(true);
    const [ filter, setFilter] = useState({
        currentPage: 1,
        lastPage:  1,
    })

    const onPageChange = (page: number) => {

        setFilter({ ...filter, currentPage: page });
        setRefresh(!refresh);

    } 

    useEffect(() => {

        statusTracerStudy(status);
        
    }, [refresh]);

    return <main>

        <section>

            <div className="overflow-x-auto" >
                <Table hoverable striped >

                    <Table.Head className="text-xs sm:text-sm " >
                        <Table.HeadCell>No</Table.HeadCell>
                        <Table.HeadCell>Nama</Table.HeadCell>
                        <Table.HeadCell>NiM</Table.HeadCell>
                        <Table.HeadCell>Tahun Masuk</Table.HeadCell>
                        <Table.HeadCell>Tahun Lulus</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y text-xs sm:text-base  ">
                        { statusData?.map((item, index) => {

                            return (
                                <Table.Row key={item.id} className="bg-white ">
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.nim}</Table.Cell>
                                    <Table.Cell>{item.tahun_masuk}</Table.Cell>
                                    <Table.Cell>{item.tahun_lulus}</Table.Cell>
                                    <Table.Cell>{item.email}</Table.Cell>                                    
                                </Table.Row>
                            )
                        })}
                        
                    </Table.Body>

                </Table>
            </div>

            <Pagination layout="pagination" currentPage={filter.currentPage} totalPages={filter.lastPage} onPageChange={onPageChange} />
        </section>

    </main>
    
}