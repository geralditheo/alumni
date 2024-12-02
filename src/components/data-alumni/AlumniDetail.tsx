import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useDataAlumni } from '@/hooks/data/dataAlumni.hooks';

export default function AlumniDetail({ show, done, uuid }: { show?: boolean, done?: () => void, uuid?: number }){

    const { showDataCvAlumni } = useDataAlumni();

    console.log("ID", uuid);

    useEffect(() => {
        if (uuid){
            showDataCvAlumni(uuid);
        }
    }, [uuid])
    

    return (
        <Modal show={show} onClose={done} >
            <Modal.Header>Detail</Modal.Header>
        </Modal>
    )
}