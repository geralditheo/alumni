'use client';

import AcademicForm from "@/components/alumni/Academic/AcademicForm";
import { Table, Pagination } from "flowbite-react";
import { HiTrash, HiPencilAlt } from 'react-icons/hi';
import { useEffect, useState } from "react";
import { useAcademic } from '@/hooks/alumni/academic/useStore.hook';
import { toast } from 'sonner';



export default function TracerStudyTable({ status }: { status: string }){

    const { academics, pagination, getAcademics, deleteAcademic } = useAcademic();

    const [ openModalForm, setOpenModalForm ] = useState<boolean>(false);
    const [ thisUuid, setThisUUid ] = useState<null | string>(null);
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

        getAcademics(filter);
        
    }, [refresh]);

    useEffect(() => {

        setFilter({  ...filter, lastPage: pagination?.lastPage ? pagination?.lastPage : 1 });
        
    }, [pagination])


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
                        { academics.map((item) => {

                            return (
                                <Table.Row key={item.id} className="bg-white ">
                                    <Table.Cell>{item.nama_studi}</Table.Cell>
                                    <Table.Cell>{item.prodi}</Table.Cell>
                                    <Table.Cell>{item.ipk}</Table.Cell>
                                    <Table.Cell>{item.tahun_masuk}</Table.Cell>
                                    <Table.Cell>{item.tahun_lulus}</Table.Cell>
                                    <Table.Cell>{item.kota}</Table.Cell>
                                    <Table.Cell>{item.negara}</Table.Cell>
                                    <Table.Cell>{item.catatan}</Table.Cell>
                                    
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