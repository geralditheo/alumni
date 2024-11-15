'use client';

import LokerForm from "./LokerForm";
import { Table, Popover } from "flowbite-react";
import { HiTrash, HiPencilAlt, HiAdjustments } from 'react-icons/hi';
import { useEffect, useState } from "react";
import { useLokerAlumni, useLokerAdmin } from '@/hooks/loker/useStore.hook';
import { getUser, User } from '@/hooks/auth/authClient';


export default function LokerTable({ userId }: { userId?: string }){

    const [ openModalForm, setOpenModalForm ] = useState<boolean>(false);
    const [ user, setUser] = useState<User>();
    const [ role, setRole ] = useState< "alumni" | "admin" | "mahasiswa" >();
    const [ thisUuid, setThisUUid ] = useState<null | string>(null);
    const [ refresh, setRefresh ] = useState<boolean>(true);
    const { manageData: manageDataAlumni, manage: manageAlumni, remove: removeAlumni } = useLokerAlumni();
    const { manageData: manageDataAdmin, manage: manageAdmin, remove: removeAdmin, verify: verifyAdmin } = useLokerAdmin();

    const onHide = () => {
        setThisUUid(null);
        setOpenModalForm(false);
        setRefresh(!refresh);
    }

    const onEdit = (uuid: string) => {
        setThisUUid(uuid);
        setOpenModalForm(true);
    }

    const onDelete = async (uuid: string) => {
        if (role === 'alumni') await removeAlumni(uuid);
        if (role === 'admin') await removeAdmin(uuid);
        setRefresh(!refresh);
    }

    const onVerified = async (uuid: string) => {
        const formData = new FormData();
        formData.append('action', 'verify');

        if (role === 'admin') await verifyAdmin(uuid, formData);
        setRefresh(!refresh);
    }

    useEffect(() => {
        if (role) {
            if (role === 'alumni')  manageAlumni();
            if (role === 'admin')  manageAdmin();
        }
    }, [refresh, role])

    useEffect(() => {
        const result = getUser();
        if (result) {

            const roleAlumni: boolean | undefined = result?.roles?.includes('alumni');
            const roleAdmin: boolean | undefined = result?.roles?.includes('admin');
            const roleMahasiswa: boolean | undefined = result?.roles?.includes('mahasiswa');

            setUser(result);

            if (roleAlumni) setRole('alumni');
            if (roleAdmin) setRole('admin');
            if (roleMahasiswa) setRole('mahasiswa');
        } 
    }, [])  

    return <main>

        <aside>
            {  openModalForm && <LokerForm show={openModalForm} hide={onHide}  uuid={thisUuid} /> }
            
        </aside>

        <section>

            <div className="flex justify-end" >
                <button onClick={() => setOpenModalForm(true)} className="bg-orange-400 font-semibold w-full text-sm sm:text-base sm:w-auto text-white shadow py-2 px-5 mb-3 rounded-lg" >Add +</button> 
            </div>

            <div className="overflow-x-auto" >
                <Table hoverable striped >

                    <Table.Head className="text-xs sm:text-sm " >
                        <Table.HeadCell>Nama Perusahaan</Table.HeadCell>
                        <Table.HeadCell>Posisi</Table.HeadCell>
                        <Table.HeadCell>Verified</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y text-xs sm:text-base  ">
                        { manageDataAlumni.map((item) => {
                            return (
                                <Table.Row key={item.id} className="bg-white ">
                                    <Table.Cell>{item.NamaPerusahaan}</Table.Cell>
                                    <Table.Cell>{item.Posisi}</Table.Cell>
                                    <Table.Cell>
                                        <div className={`${ item?.Verify ? "bg-lime-500" : "bg-green-500" } shadow px-3 py-1 text-center rounded-lg  text-white`} > {item.Verify ? "true" : "false"} </div>
                                    </Table.Cell>
                                    <Table.Cell className="flex gap-3" >
                                        <button onClick={() => onEdit(String(item.id))} className="bg-blue-500 px-5 py-3 text-white hover:bg-blue-600" ><HiPencilAlt /></button>
                                        <Popover 
                                            trigger="click"
                                            placement="top-end"
                                            content={
                                                <div className="w-auto text-xs h-auto p-2 flex items-center gap-1" >
                                                    <p>Remove this ?</p> 
                                                    
                                                    <button onClick={() => onDelete(String(item.id))} className="bg-red-500 px-3 text-white" >sure</button>
                                                    
                                                </div>
                                            }
                                        >
                                            <button className="bg-red-500 px-5 py-3 text-white hover:bg-red-600" ><HiTrash/></button>
                                        </Popover>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}

                        { manageDataAdmin.map((item) => {
                            return (
                                <Table.Row key={item.id} className="bg-white ">
                                    <Table.Cell>{item.NamaPerusahaan}</Table.Cell>
                                    <Table.Cell>{item.Posisi}</Table.Cell>
                                    <Table.Cell>
                                        <div className={`${ item?.Verify ? "bg-lime-500" : "bg-green-500" } shadow px-3 py-1 text-center rounded-lg  text-white`} > {item.Verify ? "true" : "false"} </div>
                                    </Table.Cell>
                                    <Table.Cell className="flex gap-3" >
                                        <button onClick={() => onEdit(String(item.id))} className="bg-blue-500 px-5 py-3 text-white hover:bg-blue-600" ><HiPencilAlt /></button>
                                        <Popover 
                                            trigger="click"
                                            placement="top-end"
                                            content={
                                                <div className="w-auto text-xs h-auto p-2 flex items-center gap-1" >
                                                    <p>Remove this ?</p> 
                                                    
                                                    <button onClick={() => onDelete(String(item.id))} className="bg-red-500 px-3 text-white" >sure</button>
                                                    
                                                </div>
                                            }
                                        >
                                            <button className="bg-red-500 px-5 py-3 text-white hover:bg-red-600" ><HiTrash/></button>
                                        </Popover>
                                        <Popover 
                                            trigger="click"
                                            placement="top-end"
                                            content={
                                                <div className="w-auto text-xs h-auto p-2 flex items-center gap-1" >
                                                    <p>Verify This Item ?</p> 
                                                    
                                                    <button onClick={() => onVerified(String(item.id))} className="bg-lime-500 px-3 text-white py-1" >sure</button>
                                                    
                                                </div>
                                            }
                                        >
                                            <button  className="bg-yellow-300 px-5 py-3 text-white hover:bg-yellow-400" ><HiAdjustments /></button>
                                        </Popover>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                        
                    </Table.Body>

                </Table>
            </div>
        </section>

    </main>
    
}

