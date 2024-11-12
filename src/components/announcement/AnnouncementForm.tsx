'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAward } from '@/hooks/alumni/award/useStore.hook';
import { toast } from 'sonner';

type Inputs = {
    title: string;
    content: string;
};


export default function AnnouncementForm({ show, done, uuid }: { show?: boolean , done?: () => void, uuid?: string | null }){

    const { detailAward, updateAward, postAward } = useAward();
    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        const formData = uuid ? new URLSearchParams() :  new FormData();

        if (data.title) formData.append("nama_award", String(data.title));
        if (data.content) formData.append("institusi_award", String(data.content));
        
        // if (!uuid) await postAward(formData)
        //     .then(() => {
        //         toast.success("Success post data");
        //     })
        //     .catch(() => {
        //         toast.error("Failed post data");
        //     });

        

        // if (uuid) await updateAward(formData, uuid)
        //     .then((result) => {
        //         toast.success("Success update data");
        //     })
        //     .catch((err) => {
        //         toast.error("Failed update data");
        //     });
        
        reset();
        if (done) done();
    }

    useEffect(() => {

        if (uuid) {

            // detailAward(uuid)
            //     .then((item) => {
                    
            //         setValue("graduateYear", item?.nama_award ? item?.nama_award : "");
            //         setValue("totalAlumni", item?.institusi_award ? item?.institusi_award : "");
                    
            //     })
            

        }

    }, [uuid])
    

    return <Modal show={show} onClose={done} className="overflow-y-auto">
        <Modal.Header > <p className="text-blue-500 text-base"> Form Pengumuman</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="title" className="text-sm sm:text-base" >Judul Pengumuman</label>
                    <input  {...register('title')} name="title" id="title" type="text" className="text-sm" placeholder="Judul Pengumuman" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="content" className="text-sm sm:text-base" >Isi pengumuman</label>
                    <textarea {...register('content')} name="content" id="content" rows={10} className="text-sm" placeholder="Isi pengumuman"  />
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>

            </form>
        </Modal.Body>
    </Modal>
}