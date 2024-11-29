import { Modal } from "flowbite-react";
import { HiLocationMarker } from "react-icons/hi";
import { useLogangMahasiswa, useLogangAdmin,useLogangAlumni } from "@/hooks/logang/useStore.hook";
import { rupiahFormat } from "@/helper/formatRupiah";
import { getUser, User } from '@/hooks/auth/authClient';    
import { useEffect, useState } from "react";

export default function LogangShow({ uuid, show, onDone }: {uuid?: number, show?: boolean, onDone?: () => void}){
    const { data: } = useLogangAlumni();  // Assuming this hook provides a method to get alumni data
    const [alumniData, setAlumniData] = useState<any>(null);

    useEffect(() => {
        if (uuid) {
            // Assuming getAlumniData takes uuid as a parameter to fetch the relevant data
            getAlumniData(uuid).then((data) => {
                setAlumniData(data);  // Store the alumni data
                console.log("Alumni Data:", data);  // Log the data to the console
            });
        }
    }, [uuid]);

    return (
        <Modal show={show} onClose={onDone} >
            <Modal.Header > <p className="text-blue-500 text-base"> Detail Magang</p></Modal.Header>
            <Modal.Body>
                <div className="flex items-center justify-center text-center bg-blue-500 bg-opacity-30 p-3 rounded-lg">
                    <div className="flex flex-col items-center">
                        <img src="logo.png" alt="UDINUS Logo" className="h-16 w-16 mb-4" />
                        <h1 className="text-xl font-bold text-gray-800">Dosen</h1>
                        <p className="text-sm text-gray-600">Universitas Dian Nuswantoro</p>
                        <div className="flex space-x-2 mt-2">
                            <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">UDINUS</span>
                            <span className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-full">Dosen</span>
                            <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">Full Time</span>
                        </div>
 
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 flex items-center">
                                <HiLocationMarker className="h-5 w-5 text-gray-500" />
                                Jl. Imam Bonjol No.207, Pendrikan Kidul, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50131
                            </p>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-xl font-bold text-gray-800">Deskripsi</h2>
                            <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                <li>Dapat Menguasai Materi Tentang Ilmu Komputer</li>
                                <li>Minimal S2</li>
                                <li>Dapat Mengajar Menggunakan Bahasa Inggris</li>
                            </ul>
                            <div className="mt-4 space-y-1">
                                <p><span className="font-bold">Tipe kerja:</span> Full Time</p>
                                <p><span className="font-bold">Pengalaman:</span> Minimal 1 Tahun</p>
                                <p><span className="font-bold">Gaji:</span> 5-7 Juta</p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col space-y-2">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Contact Employer
                            </button>
                            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                                Visit Website
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body>

        </Modal>
    )
}