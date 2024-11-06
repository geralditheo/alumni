'use client';

import { useState } from "react";
import { Table, Pagination } from "flowbite-react";
import { HiTrash, HiPencilAlt } from 'react-icons/hi';
import AnnouncementForm from "@/components/announcement/AnnouncementForm";


export default function AnnouncementTable(){

    const data = [{ no: '1', title: 'Pengumuman Event', content: "Pargrap yang cukup panjang da asdaas ad ad ad sad ad asd ad sad asdan jaknsd kajsnd kjand jkasn", id: 1 }];
    const [ openModalForm, setOpenModalForm ] = useState<boolean>(false);
    const [ thisUuid, setThisUUid ] = useState<null | string>(null);
    const [ filter, setFilter] = useState({ currentPage: 1, lastPage:  1, });
    const [ refresh, setRefresh ] = useState<boolean>(true);

    const onEdit = (uuid: string) => {
        setThisUUid(uuid);
        setOpenModalForm(true);
    }

    const onDelete = async (uuid: string) => {
        // await deleteAward(uuid);
        setRefresh(!refresh);
    }

    const onDone = () => {
        setThisUUid(null);
        setOpenModalForm(false);
        setRefresh(!refresh);
    }

    const onPageChange = (page: number) => {
        setFilter({ ...filter, currentPage: page });
        setRefresh(!refresh);
    } 

    return (
        <main>
            <aside>
                {  openModalForm && <AnnouncementForm show={openModalForm} done={onDone}  uuid={thisUuid} /> }
            </aside>

            <section>

                <div className="flex justify-end" >
                    <button onClick={() => setOpenModalForm(true)} className="bg-orange-400 font-semibold w-full text-sm sm:text-base sm:w-auto text-white shadow py-2 px-5 mb-3 rounded-lg" >Add +</button> 
                </div>

                <div className="overflow-x-auto shadow" >
                    <Table hoverable striped >
                        <Table.Head className="text-xs sm:text-sm " >
                            <Table.HeadCell>No</Table.HeadCell>
                            <Table.HeadCell>Judul</Table.HeadCell>
                            <Table.HeadCell>isi Pengumuman</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>

                        <Table.Body className="divide-y text-xs sm:text-base  ">
                            { data.map((item, index) => {
                                return (
                                    <Table.Row key={`${index}-stats`} className="bg-white ">
                                        <Table.Cell>{item.no}</Table.Cell>
                                        <Table.Cell>{item.title}</Table.Cell>
                                        <Table.Cell>{item.content.length > 50 ? `${item.content.slice(0, 50)}...` : item.content}</Table.Cell>
                                        <Table.Cell className="flex gap-3" >
                                            <button onClick={() => onEdit(String(item.id))} className="bg-blue-500 px-5 py-3 text-white hover:bg-blue-600" ><HiPencilAlt /></button>
                                            <button onClick={() => onDelete(String(item.id))} className="bg-red-500 px-5 py-3 text-white hover:bg-red-600" ><HiTrash/></button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </div>

                <Pagination layout="pagination" currentPage={filter.currentPage} totalPages={filter.lastPage} onPageChange={onPageChange} />

            </section>
        </main>
    )
}