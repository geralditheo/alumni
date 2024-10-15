'use client'

import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { getPengalamanMagang } from '@/constant/internship/pengalamanMagang';
import { getTipeMagang } from '@/constant/internship/tipeMagang';

type Inputs = {
    agencyName: string;
    position: string;
    address: string;
    email: string;
    intershipExperience: string;
    wages: number;
    intershipType: string;
    description: string;
    url: string;
    tags: string;
    isPublic: boolean;
    logoFile: File;
};


export default function LokerForm({ show, hide, uuid }: { show?: boolean , hide?: () => void, uuid?: string | null }){

    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
    const { data: optionsInternExp } = getPengalamanMagang();
    const { data: optionsInternType } = getTipeMagang();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        console.log("Data", data);
        
        
        reset();
        if (hide) hide();
    }

    useEffect(() => {

        if (uuid) {
            
            setValue("agencyName", "Kampus Udinus");
            setValue("position", "Informatics");
            setValue("intershipExperience", "Tanpa Pengalaman");
            setValue("wages", 3000000);
            setValue("isPublic", true);
          
            
        }

    }, [uuid])
    

    return <Modal show={show} onClose={hide} className="overflow-y-auto">
        <Modal.Header > <p className="text-blue-500 text-base"> Form Lowongan</p></Modal.Header>

        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="agencyName" className="text-sm sm:text-base" >Nama Perusahaan</label>
                    <input  {...register('agencyName')} name="agencyName" id="agencyName" type="text" className="text-sm" placeholder="Udinus" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="position" className="text-sm sm:text-base" >Posisi</label>
                    <input  {...register('position')} name="position" id="position" type="text" className="text-sm" placeholder="web Developer" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="address" className="text-sm sm:text-base" >Alamat</label>
                    <input  {...register('address')} name="address" id="address" type="text" className="text-sm" placeholder="Jl Nakula" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="email" className="text-sm sm:text-base" >Email</label>
                    <input  {...register('email')} name="email" id="email" type="email" className="text-sm" placeholder="interhsip@intern.com" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="intershipExperience" className="text-sm sm:text-base" >Pengalaman</label>
                    <select {...register('intershipExperience')} name="intershipExperience" id="intershipExperience"  >
                            <option value="" >-none-</option>
                            { optionsInternExp?.map((item) => {
                                return  <option key={item.key} value={item.value} >{item.label}</option>
                            })}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="wages" className="text-sm sm:text-base" >Gaji</label>
                    <input  {...register('wages')} name="wages" id="wages" type="number" min={0} className="text-sm" placeholder="Semarang" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="intershipType" className="text-sm sm:text-base" >Tipe Magang</label>
                    <select {...register('intershipType')} name="intershipType" id="intershipType"  >
                            <option value="" >-none-</option>
                            { optionsInternType?.map((item) => {
                                return  <option key={item.key} value={item.value} >{item.label}</option>
                            })}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="description" className="text-sm sm:text-base" >Deskripsi</label>
                    <textarea  {...register('description')} rows={10} name="description" id="description" className="text-sm" placeholder="Telah melaksanakan dengan baik" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="url" className="text-sm sm:text-base" >Website</label>
                    <input  {...register('url')} name="url" id="url" type="text" className="text-sm" placeholder="http://" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="tags" className="text-sm sm:text-base" >Tags</label>
                    <input  {...register('tags')} name="tags" id="tags" type="text" className="text-sm" placeholder="nodejs, web" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="isPublic" className="text-sm sm:text-base" >Publikasikan</label>
                    <div className="flex items-center gap-3" >
                        <input  {...register('isPublic')} name="isPublic" id="isPublic" type="checkbox" className="text-sm"  /> 
                        <label htmlFor="isPublic" className="text-sm sm:text-base" >Setuju</label>
                    </div>
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="logoFile" className="text-sm sm:text-base" >Logo Perusahaan</label>
                    <input  {...register('logoFile')} name="logoFile" id="logoFile" type="file" className="text-sm"  />
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>


            </form>
        </Modal.Body>
    </Modal>
}