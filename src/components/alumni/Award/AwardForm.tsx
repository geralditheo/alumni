'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    awardName: string;
    awardAgency: string;
    awardLevel: string;
    year: number;
    note: string;
};


export default function AwardForm({ show, hide, uuid }: { show?: boolean , hide?: () => void, uuid?: string | null }){

    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        console.log("Data", data);
        
        
        reset();
        if (hide) hide();
    }

    useEffect(() => {

        if (uuid) {
            
            setValue("awardName", "Majesty");
            setValue("awardAgency", "Master Duel");
            setValue("awardLevel", "nasional");
            setValue("year", 2020);
            setValue("note", "Notes");

        }

    }, [uuid])
    

    return <Modal show={show} onClose={hide} className="overflow-y-auto">
        <Modal.Header > <p className="text-blue-500 text-base"> Form Award</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="awardName" className="text-sm sm:text-base" >Nama Award</label>
                    <input  {...register('awardName')} name="awardName" id="awardName" type="text" className="text-sm" placeholder="Majesty" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="awardAgency" className="text-sm sm:text-base" >Nama Institusi Award</label>
                    <input  {...register('awardAgency')} name="awardAgency" id="awardAgency" type="text" className="text-sm" placeholder="Master Duel" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="awardLevel" className="text-sm sm:text-base" >Tingkat Award</label>
                    <select {...register('awardLevel')} name="awardLevel" id="awardLevel"  >
                            <option value="" >-none-</option>
                            <option value="lokal" >Lokal</option>
                            <option value="nasional" >Nasional</option>
                            <option value="internasional" >Internasional</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="year" className="text-sm sm:text-base" >Tahun Award</label>
                    <input  {...register('year', { valueAsNumber: true })} name="year" id="year" type="number" min={0} className="text-sm" placeholder="2020" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="note" className="text-sm sm:text-base" >Catatan</label>
                    <textarea  {...register('note')} rows={10} name="note" id="note" className="text-sm" placeholder="Telah melaksanakan dengan baik" />
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>


            </form>
        </Modal.Body>
    </Modal>
}