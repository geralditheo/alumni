'use client';

import { Label, TextInput, Select, Button, Datepicker } from "flowbite-react";
import { FormEvent } from 'react'
import { HiMail } from "react-icons/hi";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useState } from "react";
import moment from 'moment';

type Inputs = {
    // * Main
    name: string;
    gender: string;
    nim: string;
    yearIn: number;
    yearOut: number;
    email: string;
    phone1: string;
    status: string;

    // * Work
    jobType?: string;
    jobCategory?: string;
    agencyName?: string;
    jobTitle?: string;
    jobLevel?: string;

    // * Education
    educationCost?: string;
    educationName?: string;
    majorName?: string;
    eduationYearIn?: Date
}

export default function FormTracerStudi({ userId }: { userId?: string }){

    // * Initiations
    const { register, handleSubmit, reset, control, formState: { errors }, } = useForm<Inputs>();

    const [statusField, setStatusField] = useState< "none" | "plane1" | "plane2" >("plane2");

    // * Functions
    const onChangeStatus = (event: FormEvent<HTMLSelectElement>) => {

        const value = event.currentTarget.value;

        if (value === "Bekerja Full Time" || value === "Bekerja Part Time" || value === "Wiraswasta"){
            setStatusField("plane1");
        }else if (value === "Melanjutkan Pendidikan") {
            setStatusField("plane2");
        }else {
            setStatusField("none");
        }

    }

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {
        
        console.log(data);
        
        reset();
    }

    return <section className="bg-white rounded-md shadow p-5 " >

        <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)} >

            <div className="md:flex items-center gap-x-5 " >
                
                <div className="mb-2 block shrink-0 basis-1/4">

                    <Label htmlFor="name" className="md:text-lg" value="Nama Alumni" />

                </div>

                <div className="border w-full" >

                    <TextInput { ...register("name") } id="name" name='name' type="text" placeholder="Alumni" />

                </div>
                
            </div>

            <div className="md:flex items-center gap-x-5 " >
                
                <div className="mb-2 block shrink-0 basis-1/4">

                    <Label htmlFor="gender" className="md:text-lg" value="Jenis Kelamin" />

                </div>

                <div className="border w-full" >

                    <Select { ...register("gender") } id="gender" name='gender' about="Jenis Kelamin"  >
                        <option value="" >-none-</option>
                        <option value="L" >Laki - Laki</option>
                        <option value="P">Perempuan</option>
                    </Select>

                </div>

            </div>

            <div className="md:flex items-center gap-x-5 " >
                
                <div className="mb-2 block shrink-0 basis-1/4">

                    <Label htmlFor="nim" className="md:text-lg" value="NIM" />

                </div>

                <div className="border w-full" >

                    <TextInput { ...register("nim") } id="nim" name='nim' type="text" placeholder="Nomor Induk Mahasiswa" />

                </div>

            </div>

            <div className="md:flex items-center gap-x-5 " >
                
                <div className="mb-2 block shrink-0 basis-1/4">

                    <Label htmlFor="yearIn" className="md:text-lg" value="Tahun Masuk" />

                </div>

                <div className="border w-full" >

                    <TextInput { ...register("yearIn", { valueAsNumber: true })} id="yearIn" name='yearIn' type="number" placeholder="Tahun Masuk Sebagai Mahasiswa"  />

                </div>

            </div>

            <div className="md:flex items-center gap-x-5 " >
                
                <div className="mb-2 block shrink-0 basis-1/4">

                    <Label htmlFor="yearOut" className="md:text-lg" value="Tahun Lulus" />

                </div>

                <div className="border w-full" >

                    <TextInput { ...register("yearOut", { valueAsNumber: true })} id="yearOut" name='yearOut' type="number" placeholder="Tahun Keluar Sebagai Mahasiswa"  />

                </div>

            </div>

            <div className="md:flex items-center gap-x-5 " >
                
                <div className="mb-2 block shrink-0 basis-1/4">

                    <Label htmlFor="phone1" className="md:text-lg" value="Nomor HP" />

                </div>

                <div className="border w-full" >

                    <TextInput { ...register("phone1") } id="phone1" name='phone1' type="text" placeholder="Nomor Hand Phone" />

                </div>

            </div>

            <div className="md:flex items-center gap-x-5 " >
                
                <div className="mb-2 block shrink-0 basis-1/4">

                    <Label htmlFor="email" className="md:text-lg" value="Alamat Email" />

                </div>

                <div className="border w-full" >

                    <TextInput { ...register("email") } id="email" name='email' type="email" icon={HiMail} placeholder="mhsemail@mhs" />

                </div>

            </div>

            <div className="md:flex items-center gap-x-5 " >
                
                <div className="mb-2 block shrink-0 basis-1/4">

                    <Label htmlFor="status" className="md:text-lg" value="Status Saat Ini" />

                </div>

                <div className="border w-full" >

                    <Select { ...register("status") } id="status" name='status' about="Status" onChange={onChangeStatus} >
                        <option value="" >-none-</option>
                        <option value="Bekerja Full Time" >Bekerja Full Time</option>
                        <option value="Bekerja Part Time">Bekerja Part Time</option>
                        <option value="Wiraswasta">Wiraswasta</option>
                        <option value="Melanjutkan Pendidikan">Melanjutkan Pendidikan</option>
                        <option value="Tidak Bekerja Tetapi Sedang Mencari Pekerjaan">Tidak Bekerja Tetapi Sedang Mencari Pekerjaan</option>
                        <option value="Belum memungkinkan Bekerja">Belum memungkinkan Bekerja</option>
                        <option value="Menikah / Atau Mengurus Keluarga">Menikah / Atau Mengurus Keluarga</option>
                    </Select>

                </div>

            </div>

            {/* Work */}
            { statusField === "plane1" && <section className="flex flex-col gap-4">

                <div className="md:flex items-center gap-x-5 " >
                
                    <div className="mb-2 block shrink-0 basis-1/4">

                        <Label htmlFor="jobType" className="md:text-lg" value="Bidang Pekerjaan" />

                    </div>

                    <div className="border w-full" >

                        <Select { ...register("jobType") } id="jobType" name='jobType' about="jobType" >
                            <option value="" >-none-</option>
                            <option value="infokom" >Infokom</option>
                            <option value="nonInfokom">NonInfokom</option>
                        </Select>

                    </div>

                </div>

                <div className="md:flex items-center gap-x-5 " >
                    
                    <div className="mb-2 block shrink-0 basis-1/4">

                        <Label htmlFor="jobCategory" className="md:text-lg" value="Kategori Pekerjaan" />

                    </div>

                    <div className="border w-full" >

                        <Select { ...register("jobCategory") } id="jobCategory" name='jobCategory' about="jobCategory" >
                            <option value="" >-none-</option>
                            <option value="swasta" >Perusahaan Swasta</option>
                            <option value="nirlaba">Perusahaan Nirlaba</option>
                            <option value="bumn">BUMN / BUMD</option>
                            <option value="lembagaPem">Lembaga Pemerintah</option>
                            <option value="wiraswasta">Wiraushana</option>
                        </Select>

                    </div>

                </div>

                <div className="md:flex items-center gap-x-5 " >
                    
                    <div className="mb-2 block shrink-0 basis-1/4">

                        <Label htmlFor="agencyName" className="md:text-lg" value="Nama Instansi" />

                    </div>

                    <div className="border w-full" >

                        <TextInput { ...register("agencyName") } id="agencyName" name='agencyName' type="text" placeholder="Nama Instansi" />

                    </div>

                </div>

                <div className="md:flex items-center gap-x-5 " >
                    
                    <div className="mb-2 block shrink-0 basis-1/4">

                        <Label htmlFor="jobTitle" className="md:text-lg" value="Jabatan Pekerjaan" />

                    </div>

                    <div className="border w-full" >

                        <Select { ...register("jobTitle") } id="jobTitle" name='jobTitle' about="jobTitle" >
                            <option value="" >-none-</option>
                            <option value="founder" >Founder</option>
                            <option value="coFounder">Co Founder</option>
                            <option value="staff">Staff</option>
                            <option value="freelance">Freelance</option>
                        </Select>

                    </div>

                </div>

                <div className="md:flex items-center gap-x-5 " >
                    
                    <div className="mb-2 block shrink-0 basis-1/4">

                        <Label htmlFor="jobLevel" className="md:text-lg" value="Tingkat Pekerjaan" />

                    </div>

                    <div className="border w-full" >

                        <Select { ...register("jobLevel") } id="jobLevel" name='jobLevel' about="jobLevel" >
                            <option value="" >-none-</option>
                            <option value="localNonLaw" >Lokal / Wilayah tidak berbadan hukum</option>
                            <option value="localLaw" >Lokal / Wilayah berbadan hukum</option>
                            <option value="national" >Nasional</option>
                            <option value="multinational">Multinasional</option>
                            <option value="international">Internasional</option>
                        </Select>

                    </div>

                </div>
            
            </section>}

            {/* Education */}
            { statusField === "plane2" && <section className="flex flex-col gap-4">


                <div className="md:flex items-center gap-x-5 " >
                    
                    <div className="mb-2 block shrink-0 basis-1/4">

                        <Label htmlFor="educationCost" className="md:text-lg" value="Sumber Biaya Melanjutkan Studi" />

                    </div>

                    <div className="border w-full" >

                        <Select { ...register("educationCost") } id="educationCost" name='educationCost' about="educationCost" >
                            <option value="" >-none-</option>
                            <option value="ownself" >Sendiri</option>
                            <option value="scholarship" >Beasiswa</option>
                        </Select>

                    </div>

                </div>

                <div className="md:flex items-center gap-x-5 " >
                    
                    <div className="mb-2 block shrink-0 basis-1/4">

                        <Label htmlFor="educationName" className="md:text-lg" value="Nama Perguruan Tinggi" />

                    </div>

                    <div className="border w-full" >

                        <TextInput { ...register("educationName") } id="educationName" name='educationName' type="text" placeholder="Nama Perguruan Tinggi" />

                    </div>

                </div>

                <div className="md:flex items-center gap-x-5 " >
                    
                    <div className="mb-2 block shrink-0 basis-1/4">

                        <Label htmlFor="majorName" className="md:text-lg" value="Nama Prodi" />

                    </div>

                    <div className="border w-full" >

                        <TextInput { ...register("majorName") } id="majorName" name='majorName' type="text" placeholder="Nama Prodi" />

                    </div>

                </div>

                <div className="md:flex items-center gap-x-5 " >
                    
                    <div className="mb-2 block shrink-0 basis-1/4">

                        <Label htmlFor="eduationYearIn" className="md:text-lg" value="Nama Prodi" />

                    </div>

                    <div className="border w-full" >

                        <Controller
                            name="eduationYearIn"
                            control={control}
                            render={({ field }) => (
                                <Datepicker
                                    id="eduationYearIn"
                                    value={field.value ? moment(field.value).format('YYYY-MM-DD') : ''}
                                    onSelectedDateChanged={(date) => field.onChange(moment(date).format('YYYY-MM-DD'))}
                                />
                            )}
                        />

                    </div>

                </div>

            </section>}

            <div className='md:flex md:justify-end ' >

                <Button type="submit" color={"blue"} className='w-full md:w-fit' >Submit</Button>

            </div>


        </form>
    </section>
}