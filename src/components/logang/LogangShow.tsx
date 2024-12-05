import { Modal } from "flowbite-react";
import { HiLocationMarker } from "react-icons/hi";
import { useLogangMahasiswa, useLogangAdmin, useLogangAlumni, Logang } from "@/hooks/logang/useStore.hook";
import { rupiahFormat } from "@/helper/formatRupiah";
import { useEffect, useState } from "react";
import { getUser, User } from '@/hooks/auth/authClient';
import Link from 'next/link';


export default function LogangShow({ uuid, show, onDone }: {uuid?: string, show?: boolean, onDone?: () => void}){
    
    const { show: getDataLogang } = useLogangAdmin();
    const { show: getDataLogangAlumni } = useLogangAlumni();
    const { show: getDataLogangMhs } = useLogangMahasiswa();
    const [ role, setRole ] = useState< "alumni" | "admin" | "mahasiswa" >();
    const [ data, setData ] = useState<Logang>();


    const setTags = (tags: string) => {
        const split = tags.split(',');
        return split.map((tag) => {
            return <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">{tag}</span>
        })
    }

    useEffect(() => {
        
        if (uuid && role){

            if (role === 'admin') getDataLogang(uuid).then((result) => {
                setData(result);    
            })

            if (role === 'alumni') getDataLogangAlumni(uuid).then((result) => {
                setData(result);    
            })

            if (role === 'mahasiswa') getDataLogangMhs(uuid).then((result) => {
                setData(result);    
            })
                
        }

    }, [uuid, role]);

    useEffect(() => {
        const result = getUser();
        if (result) {

            const roleAlumni: boolean | undefined = result?.roles?.includes('alumni');
            const roleAdmin: boolean | undefined = result?.roles?.includes('admin');
            const roleMahasiswa: boolean | undefined = result?.roles?.includes('mahasiswa');

            if (roleAlumni) setRole('alumni');
            if (roleAdmin) setRole('admin');
            if (roleMahasiswa) setRole('mahasiswa');
        } 
    }, [])

    return (
        <Modal show={show} onClose={onDone} >
            <Modal.Header > <p className="text-blue-500 text-base"> Detail Magang</p></Modal.Header>
            <Modal.Body>
                <div className="flex items-center justify-center text-center bg-blue-500 bg-opacity-30 p-3 rounded-lg">
                    <div className="flex flex-col items-center">
                    <img
                        src={data?.Logo ? `${process.env.NEXT_PUBLIC_API_URL}/storage/imglogo/${data.Logo}` : ''}
                        alt={`${data?.NamaPerusahaan || 'Perusahaan'} Logo`}
                        className="h-24 w-24 object-contain"
                    />
                        <h1 className="text-xl font-bold text-gray-800">{data?.Posisi}</h1>
                        <p className="text-sm text-gray-600">{data?.NamaPerusahaan}</p>
                        <div className="flex space-x-2 mt-2">
                            {
                                data?.Tags && setTags(data.Tags)
                            }
                        </div>
 
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 flex items-center">
                                <HiLocationMarker /> {data?.Alamat}
                            </p>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-xl font-bold text-gray-800">Deskripsi</h2>
                            <p>{data?.Deskripsi}</p>
                            <div className="mt-4 space-y-1">
                                <p><span className="font-bold">Tipe magang:</span> {data?.TipeMagang}</p>
                                <p><span className="font-bold">Pengalaman:</span> {data?.Pengalaman}</p>
                                <p><span className="font-bold">Gaji:</span> {data?.Gaji}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col space-y-2">
                            <Link href={`mailto:${data?.Email}?subject=${"Magang"}&body=${"Body Magang"}`} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Contact Employer
                            </Link>
                            <Link passHref href={`${data?.Website}`} rel="noopener noreferrer" target="_blank" className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
                                Visit Website
                            </Link>
                        </div>
                    </div>
                </div>
            </Modal.Body>

        </Modal>
    )
}