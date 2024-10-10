'use client'

import { Modal } from "flowbite-react";
import { useForm, SubmitHandler } from 'react-hook-form';


type Inputs = {
    pProfile: FileList;
};


export default function ModalProfile({show, hide, uuid}: { show?: boolean , hide?: () => void, uuid?: string }){

    const { register, handleSubmit, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        const file = data.pProfile[0];
        
        reset();
        if (hide) hide();
    }


    return <Modal show={show} onClose={hide} >
        <Modal.Header > <p className="text-blue-500 text-base"> Upload Photo Profile</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="photo-profile-input " >Choose Photo</label>
                    <input  {...register('pProfile')} name="pProfile" id="photo-profile-input" type="file" className="file:bg-red-600" />
                </div>


                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-full text-white">Upload</button>

            </form>
        </Modal.Body>
    </Modal>
}