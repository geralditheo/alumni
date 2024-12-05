import { Modal } from "flowbite-react";

export default function AlumniDetail({ show, done, uuid }: { show?: boolean, done?: () => void, uuid?: number }){

    console.log("ID", uuid);
    

    return (
        <Modal show={show} onClose={done} >
            <Modal.Header>Detail</Modal.Header>
        </Modal>
    )
}