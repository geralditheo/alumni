'use client'

import { Modal } from "flowbite-react";
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};


export default function ModalChangePassword({ show, hide, uuid }: { show: boolean , hide?: () => void, uuid?: string }){

    const { register, handleSubmit, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        console.log("Data", data);
        
        
        reset();
        if (hide) hide();
    }

    return <Modal show={show} onClose={hide} >
        <Modal.Header > <p className="text-blue-500 text-base"> Change Password</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-full text-white">Submit</button>
            </form>
        </Modal.Body>
    </Modal>

}