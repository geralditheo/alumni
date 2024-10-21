'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useJob } from '@/hooks/alumni/job/useStore.hook';


type Inputs = {
    agency: string; // Nama Instansi
    periodStart: number | null; // Periode Mulai
    periodEnd: number | null; // Periode Akhir
    jobTitle: string; // Jabatan Pekerjaan
    city: string; // Jabatan Kota
    country: string; // Jabatan negara
    note: string; // Jabatan Catatan
};


export default function JobForm({ show, hide, uuid }: { show?: boolean , hide?: () => void, uuid?: string | null }){

    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
    const { detailJob, postJob, updateJob } = useJob();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        const formData = new FormData();

        if (data.agency) formData.append("nama_job", String(data.agency));
        if (data.periodStart) formData.append("periode_masuk_job", String(data.periodStart));
        if (data.periodEnd) formData.append("periode_keluar_job", String(data.periodEnd));
        if (data.jobTitle) formData.append("jabatan_job", String(data.jobTitle));
        if (data.city) formData.append("kota", String(data.city));
        if (data.country) formData.append("negara", String(data.country));
        if (data.note) formData.append("catatan", String(data.note));
        
        if (!uuid) {

            await postJob(formData);

        }

        if (uuid) {

            await updateJob(formData, uuid);

        }
        
        
        reset();
        if (hide) hide();
    }

    useEffect(() => {

        if (uuid) {

            detailJob(uuid)
                .then((item) => {
                    
                    setValue("agency", item?.nama_job ? item?.nama_job : "");
                    setValue("periodStart", item?.periode_masuk_job ? item?.periode_masuk_job : null);
                    setValue("periodEnd", item?.periode_keluar_job ? item?.periode_keluar_job : null);
                    setValue("jobTitle", item?.jabatan_job ? item?.jabatan_job : "");
                    setValue("city", item?.kota ? item?.kota : "");
                    setValue("country", item?.negara ? item?.negara : "");
                    setValue("note", item?.catatan ? item?.catatan : "");
                })
            
        }

    }, [uuid])
    

    return <Modal show={show} onClose={hide} className="overflow-y-auto">
        <Modal.Header > <p className="text-blue-500 text-base"> Form Job</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="agency" className="text-sm sm:text-base" >Nama Instansi</label>
                    <input  {...register('agency')} name="agency" id="agency" type="text" className="text-sm" placeholder="Udinus" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="periodStart" className="text-sm sm:text-base" >Periode</label>
                    <input  {...register('periodStart', { valueAsNumber: true })} name="periodStart" id="periodStart" type="number" className="text-sm" placeholder="2020" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="periodEnd" className="text-sm sm:text-base" >Sampai</label>
                    <input  {...register('periodEnd', { valueAsNumber: true })} name="periodEnd" id="periodEnd" type="number" className="text-sm" placeholder="2020" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="jobTitle" className="text-sm sm:text-base" >Jabatan Pekerjaan </label>
                    <input  {...register('jobTitle')} name="jobTitle" id="jobTitle" type="text" className="text-sm" placeholder="Developer" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="city" className="text-sm sm:text-base" >Kota</label>
                    <input  {...register('city')} name="city" id="city" type="text" className="text-sm" placeholder="Semarang" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="country" className="text-sm sm:text-base" >Negara</label>
                    <input  {...register('country')} name="country" id="country" type="text" className="text-sm" placeholder="Indonesia" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="note" className="text-sm sm:text-base" >Catatan</label>
                    <textarea  {...register('note')} name="note" id="note" className="text-sm" placeholder="Telah melaksanakan dengan baik" />
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>


            </form>
        </Modal.Body>
    </Modal>
}