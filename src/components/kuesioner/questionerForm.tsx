'use client';

import { useState, FormEvent } from "react"
import { IoIosCheckbox, IoIosContact, IoIosCloudy } from "react-icons/io";
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    // * Main
    name: string;
    email: string;
    gender: string;
    password: string;
    confirmPassword: string;

    nim: string;
    yearIn: number;
    yearOut: number;
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
    educationYearIn?: number
}

export default function QuestionerForm({ done } : { done?: () => void }){

    const { register, handleSubmit, reset, control, formState: { errors }, } = useForm<Inputs>();

    const [steps] = useState([
        { key: 1, icon: IoIosContact  },
        { key: 2, icon: IoIosCloudy  },
        { key: 3, icon: IoIosCheckbox  },
    ]);
    const [current, setCurrent] = useState(1);
    const [statusField, setStatusField] = useState< "none" | "plane1" | "plane2" | null | undefined >("none");


    const onNext =(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (current - 1 !== steps.length - 1) return setCurrent(current + 1);
        
    }

    const onBack = (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();

        if (current !== 1) return setCurrent(current - 1);
        
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log("Data", data);
        
        setStatusField('none');
        reset();

        if (done) done();
    }

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

    return <main className="border border-blue-500 rounded-md max-w-[100em] w-full transition-all ease-in" >

        <div className="relative mb-20" >
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 aspect-square rounded-full border-4 border-white overflow-hidden">
                <img src="/draw/undraw_pancakes_238t.png" alt="pancakes" className="w-full h-full object-cover" />
            </div>
        </div>

        {/* Stepper */}
        <div className="p-3 " >    

            <ol className="flex items-center justify-between w-full  ">
                
                { steps.map((item, index) => {
                    if (steps.length - 1 === index) return (
                        <li key={item.key} className="flex items-center">
                            <span className={`${current === index + 1 ? "bg-blue-100 border-2 border-yellow-300" : "bg-gray-100"} flex items-center justify-center w-10 h-10 text-blue-600  rounded-full lg:h-12 lg:w-12  shrink-0`}>
                                <item.icon />
                            </span>
                        </li>
                    )

                    return (
                        <li key={item.key} className={`flex w-full items-center text-blue-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block`}>
                            <span className={`${ current === item.key ? "bg-blue-100 border-2 border-yellow-300" : "bg-gray-100"} flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0`}>
                                <item.icon />
                            </span>
                        </li>
                    )
                })}

            </ol>
        </div>

        {/* Question */}
        <div className="p-3" >

            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="mb-3" >

                    {/* Step 1 */}
                    <div className={`${ current === 1 ? "block" : "hidden" }`} >

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="name" className="text-xs sm:text-sm" >Nama</label>
                            <input  {...register('name')} name="name" id="name" type="text" className="text-xs text-blue-500" placeholder="Jane Doe" />
                        </div>

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="gender" className="text-xs sm:text-sm" >Jenis Kelamin</label>
                            <select { ...register("gender") } id="gender" name='gender' about="Jenis Kelamin" className="text-xs" >
                                <option value="" >-none-</option>
                                <option value="Laki-Laki" >Laki - Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="email" className="text-xs sm:text-sm" >Email</label>
                            <input  {...register('email')} name="email" id="email" type="email" className="text-xs text-blue-500" placeholder="mhs@mhs.com" />
                        </div>

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="password" className="text-xs sm:text-sm" >Password</label>
                            <input  {...register('password')} name="password" id="password" type="password" className="text-xs text-blue-500" placeholder="8 Characters" />
                        </div>

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="confirmPassword" className="text-xs sm:text-sm" >Konfirmasi Password</label>
                            <input  {...register('confirmPassword')} name="confirmPassword" id="confirmPassword" type="password" className="text-xs text-blue-500" placeholder="8 Characters" />
                        </div>

                    </div>
                    
                    {/* Step 2 */}
                    <div className={`${ current === 2 ? "block" : "hidden" }`} >

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="nim" className="text-xs sm:text-sm" >NIM</label>
                            <input  {...register('nim')} name="nim" id="nim" type="text" className="text-xs text-blue-500" placeholder="Nomor Induk Mahasiswa" />
                        </div>

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="yearIn" className="text-xs sm:text-sm" >Tahun Masuk</label>
                            <input  {...register('yearIn')} name="yearIn" id="yearIn" type="number" min={0} className="text-xs text-blue-500" placeholder="2020" />
                        </div>

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="yearOut" className="text-xs sm:text-sm" >Tahun Lulus</label>
                            <input  {...register('yearOut')} name="yearOut" id="yearOut" type="number" min={0} className="text-xs text-blue-500" placeholder="2024" />
                        </div>

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="phone1" className="text-xs sm:text-sm" >Nomor Telephone</label>
                            <input  {...register('phone1')} name="phone1" id="phone1" type="text" className="text-xs text-blue-500" placeholder="xxxxxxxxxxxx" />
                        </div>

                    </div>

                    {/* Step 3 */}
                    <div className={`${ current === 3 ? "block" : "hidden" }`} >

                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="status" className="text-xs sm:text-sm" >Status Saat Ini</label>
                            <select { ...register("status") } id="status" name='status' about="status" className="text-xs" onChange={onChangeStatus} >
                                <option value="" >-none-</option>
                                <option value="Bekerja Full Time" >Bekerja Full Time</option>
                                <option value="Bekerja Part Time">Bekerja Part Time</option>
                                <option value="Wiraswasta">Wiraswasta</option>
                                <option value="Melanjutkan Pendidikan">Melanjutkan Pendidikan</option>
                                <option value="Tidak Bekerja Tetapi Sedang Mencari Pekerjaan">Tidak Bekerja Tetapi Sedang Mencari Pekerjaan</option>
                                <option value="Belum memungkinkan Bekerja">Belum memungkinkan Bekerja</option>
                                <option value="Menikah / Atau Mengurus Keluarga">Menikah / Atau Mengurus Keluarga</option>
                            </select>
                        </div>

                        
                        {/* Work */}
                        { statusField === "plane1" && <section className="flex flex-col gap-4">

                            <div className="flex flex-col gap-1">
                                <label htmlFor="jobType" className="text-xs sm:text-sm" >Bidang Pekerjaani</label>
                                <select { ...register("jobType") } id="jobType" name='jobType' about="jobType" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="infokom" >Infokom</option>
                                    <option value="nonInfokom">Non Infokom</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="jobCategory" className="text-xs sm:text-sm" >Kategori Pekerjaan</label>
                                <select { ...register("jobCategory") } id="jobCategory" name='jobCategory' about="jobCategory" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="swasta" >Perusahaan Swasta</option>
                                    <option value="nirlaba">Perusahaan Nirlaba</option>
                                    <option value="bumn">BUMN / BUMD</option>
                                    <option value="lembagaPem">Lembaga Pemerintah</option>
                                    <option value="wiraswasta">Wiraushana</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="agencyName" className="text-xs sm:text-sm" >Nama Instansi</label>
                                <input  {...register('agencyName')} name="agencyName" id="agencyName" type="text" className="text-xs" placeholder="Udinus" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="jobTitle" className="text-xs sm:text-sm" >Jabatan Pekerjaan</label>
                                <select { ...register("jobTitle") } id="jobTitle" name='jobTitle' about="jobTitle" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="founder" >Founder</option>
                                    <option value="coFounder">Co Founder</option>
                                    <option value="staff">Staff</option>
                                    <option value="freelance">Freelance</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="jobLevel" className="text-xs sm:text-sm" >Tingkat Pekerjaan</label>
                                <select { ...register("jobLevel") } id="jobLevel" name='jobLevel' about="jobLevel" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="localNonLaw" >Lokal / Wilayah tidak berbadan hukum</option>
                                    <option value="localLaw" >Lokal / Wilayah berbadan hukum</option>
                                    <option value="national" >Nasional</option>
                                    <option value="multinational">Multinasional</option>
                                    <option value="international">Internasional</option>
                                </select>
                            </div>

                        </section> }

                        {/* Education */}
                        { statusField === "plane2" && <section className="flex flex-col gap-4">

                            <div className="flex flex-col gap-1">
                                <label htmlFor="educationCost" className="text-xs sm:text-sm" >Sumber Biaya Pendidikan</label>
                                <select { ...register("educationCost") } id="educationCost" name='educationCost' about="educationCost" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="ownself" >Sendiri</option>
                                    <option value="scholarship" >Beasiswa</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="educationName" className="text-xs sm:text-sm" >Nama Perguruan Tinggi</label>
                                <input  {...register('educationName')} name="educationName" id="educationName" type="text" className="text-xs" placeholder="Udinus" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="majorName" className="text-xs sm:text-sm" >Nama Program Studi</label>
                                <input  {...register('majorName')} name="majorName" id="majorName" type="text" className="text-xs" placeholder="Informatika" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="educationYearIn" className="text-xs sm:text-sm" >Nama Program Studi</label>
                                <input  {...register('educationYearIn')} name="educationYearIn" id="educationYearIn" type="number" max={new Date().getFullYear()}  className="text-xs" placeholder="2020"/>
                            </div>

                        </section> }

                    </div>

                </div>

                <div className="flex gap-3 flex-col sm:flex-row " >

                    <button type="button" onClick={onBack} className={`${ current === 1 ? "hidden" : "block" } px-5 py-2 border rounded-md bg-white-500  w-full hover:bg-gray-100 active:bg-gray-200`} >Back</button>
                    <button type="button" onClick={onNext} className={`${ current === steps.length ? "hidden" : "block" } px-5 py-2 border rounded-md bg-white  w-full hover:bg-gray-100 active:bg-gray-200`} >Next</button>
                    <button type="submit" className={`${ current === steps.length ? "block" : "hidden" } px-5 py-2 border rounded-md bg-blue-500 text-white w-full hover:bg-blue-500 active:bg-blue-600`} >Submit</button>

                </div>

            </form>

        </div>

    </main>
}