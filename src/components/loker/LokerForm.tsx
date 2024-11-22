'use client'

import { Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { getPengalamanMagang } from '@/constant/internship/pengalamanMagang';
import { getTipeMagang } from '@/constant/internship/tipeMagang';
import { getUser, User } from '@/hooks/auth/authClient';
import { useLokerAlumni, useLokerAdmin } from '@/hooks/loker/useStore.hook';
import { toast } from 'sonner';

import moment from "moment";


type Inputs = {
    agencyName: string;
    position: string;
    address: string;
    email: string;
    intershipExperience: string;
    wages: number | null;
    workType: string;
    description: string;
    url: string;
    tags: string;
    logoFile: FileList;
    validPeriod: Date | null | string;
    
};


export default function LokerForm({ show, hide, uuid }: { show?: boolean , hide?: () => void, uuid?: string | null }){

    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
    const [ user, setUser] = useState<User>();
    const [ role, setRole ] = useState< "alumni" | "admin" | "mahasiswa" >();
    const { data: optionsInternExp } = getPengalamanMagang();
    const { data: optionsInternType } = getTipeMagang();
    const { post: postLokerAlumni, show: showLokerAlumni, update: updateLokerAlumni } = useLokerAlumni();
    const { post: postLokerAdmin, show: showLokerAdmin, update: updateLokerAdmin } = useLokerAdmin();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {
        const file = data.logoFile?.[0] ?? null;
        const formData = uuid ? new URLSearchParams() : new FormData();

        if (user?.id) formData.append('user_id', user.id);
        if (data.agencyName) formData.append('NamaPerusahaan', data.agencyName);
        if (data.position) formData.append('Posisi', data.position);
        if (data.address) formData.append('Alamat', data.address);
        if (data.intershipExperience) formData.append('Pengalaman', data.intershipExperience);
        if (data.wages) formData.append('Gaji', String(data.wages));
        if (data.workType) formData.append('TipeKerja', data.workType);
        if (data.description) formData.append('Deskripsi', data.description);
        if (data.url) formData.append('Website', data.url);
        if (data.email) formData.append('Email', data.email);
        if (data.tags) formData.append('Tags', data.tags);
        if (formData instanceof FormData) if (file) formData.append('Logo', file);
        if (data.validPeriod) formData.append('MasaBerlaku', moment(data.validPeriod).format('YYYY-MM-DD'));

        if (!uuid) {
            formData.append('Verify', String("pending"));
            if (role === 'alumni') await postLokerAlumni(formData);
            if (role === 'admin') await postLokerAdmin(formData);
        }

        if (uuid) {
            if (role === 'alumni') await updateLokerAlumni(uuid, formData);
            if (role === 'admin') await updateLokerAdmin(uuid, formData);
        } 
        
        reset();
        if (hide) hide();
    }

    useEffect(() => {

        if (uuid && role) {

            if (role === 'alumni'){
                showLokerAlumni(uuid)
                    .then((result) => {
    
                        const newDate = result?.MasaBerlaku ? moment(result?.MasaBerlaku).format("YYYY-MM-DD") : null;
    
                        setValue("agencyName", result?.NamaPerusahaan ? result?.NamaPerusahaan : "" );
                        setValue("position", result?.Posisi ? result?.Posisi : "" );
                        setValue("address", result?.Alamat ? result?.Alamat : "" );
                        setValue("email", result?.Email ? result?.Email : "" );
                        setValue("intershipExperience", result?.Pengalaman ? result?.Pengalaman : "");
                        setValue("wages", result?.Gaji ? Number(result?.Gaji)  : null);
                        setValue("workType", result?.TipeKerja ? result?.TipeKerja : "");
                        setValue("description", result?.Deskripsi ? result?.Deskripsi : "");
                        setValue("url", result?.Website ? result?.Website : "");
                        setValue("tags", result?.Tags ? result?.Tags : "");
                        setValue("validPeriod", newDate );
    
                    })
                    .catch(() => {
                        toast.error("Failed to show!");
                    });
            }

            if (role === 'admin'){
                showLokerAdmin(uuid)
                    .then((result) => {
    
                        const newDate = result?.MasaBerlaku ? moment(result?.MasaBerlaku).format("YYYY-MM-DD") : null;
    
                        setValue("agencyName", result?.NamaPerusahaan ? result?.NamaPerusahaan : "" );
                        setValue("position", result?.Posisi ? result?.Posisi : "" );
                        setValue("address", result?.Alamat ? result?.Alamat : "" );
                        setValue("email", result?.Email ? result?.Email : "" );
                        setValue("intershipExperience", result?.Pengalaman ? result?.Pengalaman : "");
                        setValue("wages", result?.Gaji ? Number(result?.Gaji)  : null);
                        setValue("workType", result?.TipeKerja ? result?.TipeKerja : "");
                        setValue("description", result?.Deskripsi ? result?.Deskripsi : "");
                        setValue("url", result?.Website ? result?.Website : "");
                        setValue("tags", result?.Tags ? result?.Tags : "");
                        setValue("validPeriod", newDate );
    
                    })
                    .catch(() => {
                        toast.error("Failed to show!");
                    });
            }
        }

    }, [uuid, role])

    useEffect(() => {
        const result = getUser();
        if (result) {

            const roleAlumni: boolean | undefined = result?.roles?.includes('alumni');
            const roleAdmin: boolean | undefined = result?.roles?.includes('admin');
            const roleMahasiswa: boolean | undefined = result?.roles?.includes('mahasiswa');

            setUser(result);

            if (roleAlumni) setRole('alumni');
            if (roleAdmin) setRole('admin');
            if (roleMahasiswa) setRole('mahasiswa');
        } 
    }, [])  
    

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
                    <label htmlFor="workType" className="text-sm sm:text-base" >Tipe</label>
                    <select {...register('workType')} name="workType" id="workType"  >
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
                    <label htmlFor="logoFile" className="text-sm sm:text-base" >Logo Perusahaan</label>
                    <input  {...register('logoFile')} name="logoFile" id="logoFile" type="file" className="text-sm"  />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="validPeriod" className="text-sm sm:text-base" >Masa Berlaku</label>
                    <input  {...register('validPeriod', { valueAsDate: true })} name="validPeriod" id="validPeriod" type="date" className="text-sm" />
                </div>

                <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md text-white w-full sm:w-auto ">Submit</button>

            </form>
        </Modal.Body>
    </Modal>
}