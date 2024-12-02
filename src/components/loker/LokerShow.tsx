import { Modal } from "flowbite-react";
import { HiLocationMarker } from "react-icons/hi";
import { useLokerAdmin, useLokerAlumni, Loker } from "@/hooks/loker/useStore.hook";
import { rupiahFormat } from "@/helper/formatRupiah";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LokerShow({ uuid, show, onDone }: {uuid?: number, show?: boolean, onDone?: () => void}){

    const { show: getDataLoker } = useLokerAdmin();
    const [data, setData] = useState<Loker>();

    const setTags = (tags: string) => {
        const split = tags.split(',');
        return split.map((tag) => {
            return <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">{tag}</span>
        })
    }

    useEffect(() => {
        if (uuid) {
          getDataLoker(uuid).then((result) => {
            setData(result);
          });
        }
      }, []);

    return (
        <Modal show={show} onClose={onDone} >
            <Modal.Header > <p className="text-blue-500 text-base"> Detail</p></Modal.Header>
            <Modal.Body>
            <div className="flex items-center justify-center text-center bg-blue-500 bg-opacity-30 p-3 rounded-lg">
                    <div className="flex flex-col items-center">
                    <img
                        src={data?.Logo ? `${process.env.NEXT_PUBLIC_API_URL}/storage/imglogo/${data.Logo}` : '/default_logo.png'}
                        alt={`${data?.NamaPerusahaan} Logo`}
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
                                <p><span className="font-bold">Tipe kerja:</span> {data?.TipeKerja}</p>
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