import { Modal } from "flowbite-react";

export default function LokerShow({ uuid, show, onDone }: {uuid?: number, show?: boolean, onDone?: () => void}){



    return (
        <Modal show={show} onClose={onDone} >
            <Modal.Header > <p className="text-blue-500 text-base"> Detail</p></Modal.Header>
            <Modal.Body>
                This is the body
            </Modal.Body>

        </Modal>
    )
}