'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAward } from '@/hooks/alumni/award/useStore.hook';
import { toast } from 'sonner';

type Inputs = {
    graduateYear: number;
    totalAlumni: number;
};


export default function StatistikForm({ show, done, uuid }: { show?: boolean , done?: () => void, uuid?: string | null }){

    const { detailAward, updateAward, postAward } = useAward();
    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        const formData = uuid ? new URLSearchParams() :  new FormData();

        if (data.graduateYear) formData.append("nama_award", String(data.graduateYear));
        if (data.totalAlumni) formData.append("institusi_award", String(data.totalAlumni));
        
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

            detailAward(uuid)
                .then((item) => {
                    
                    // setValue("graduateYear", item?.nama_award ? item?.nama_award : "");
                    // setValue("totalAlumni", item?.institusi_award ? item?.institusi_award : "");
                    
                })
            

        }

    }, [uuid])
    

    return <Modal show={show} onClose={done} className="overflow-y-auto">
        <Modal.Header > <p className="text-blue-500 text-base"> Form Award</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="graduateYear" className="text-sm sm:text-base" >Tahun Lulus</label>
                    <input  {...register('graduateYear')} name="graduateYear" id="graduateYear" type="number" min={0} className="text-sm" placeholder="2020" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="totalAlumni" className="text-sm sm:text-base" >Total Alumni</label>
                    <input  {...register('totalAlumni')} name="totalAlumni" id="totalAlumni" type="number" min={0} className="text-sm" placeholder="100" />
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>

            </form>
        </Modal.Body>
    </Modal>
}