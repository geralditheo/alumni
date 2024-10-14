'use client';

import { Table } from "flowbite-react";
import { HiTrash, HiPencilAlt } from 'react-icons/hi';
import AwardForm from "@/components/alumni/Award/AwardForm";
import { useState } from "react";


export default function AwardTable({ userId }: { userId?: string }){

    const [ openModalForm, setOpenModalForm ] = useState<boolean>(false);
    const [ thisUuid, setThisUUid ] = useState<null | string>(null);

    const onHide = () => {
        setThisUUid(null);
        setOpenModalForm(false);
    }

    const onEdit = (uuid: string) => {
        setThisUUid(uuid);
        setOpenModalForm(true);
    }

    const onDelete = async (uuid: string) => {

    }

    return <main>

        <aside>
            {  openModalForm && <AwardForm show={openModalForm} hide={onHide}  uuid={thisUuid} /> }
            
        </aside>

        <section>

            <div className="flex justify-end" >
                <button onClick={() => setOpenModalForm(true)} className="bg-orange-400 font-semibold w-full text-sm sm:text-base sm:w-auto text-white shadow py-2 px-5 mb-3 rounded-lg" >Add +</button> 
            </div>

            <div className="overflow-x-auto shadow" >
                <Table hoverable striped >

                    <Table.Head className="text-xs sm:text-sm " >
                        <Table.HeadCell>Nama Award</Table.HeadCell>
                        <Table.HeadCell>Nama Institusi Award</Table.HeadCell>
                        <Table.HeadCell>Tingkat Award</Table.HeadCell>
                        <Table.HeadCell>Tahun Award</Table.HeadCell>
                        <Table.HeadCell>Deskripsi Award</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y text-xs sm:text-base  ">
                        <Table.Row key={"key"} className="bg-white ">
                            <Table.Cell>Majestic</Table.Cell>
                            <Table.Cell>Master Duel</Table.Cell>
                            <Table.Cell>Regional</Table.Cell>
                            <Table.Cell>2024</Table.Cell>
                            <Table.Cell>Notes</Table.Cell>
                            <Table.Cell className="flex gap-3" >
                                <button onClick={() => onEdit("32")} className="bg-blue-500 px-5 py-3 text-white hover:bg-blue-600" ><HiPencilAlt /></button>
                                <button onClick={() => onDelete("32")} className="bg-red-500 px-5 py-3 text-white hover:bg-red-600" ><HiTrash/></button>
                            </Table.Cell>
                        </Table.Row>
                        
                    </Table.Body>

                </Table>
            </div>
        </section>

    </main>
    
}