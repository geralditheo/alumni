import React, { useState, useEffect, FormEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alumni, useProfile } from '@/hooks/profile/alumni/useStore.hook';
import { HiPencilAlt } from 'react-icons/hi';
import { toast } from 'sonner'


type Inputs = {
    // * Main
    name: string;
    email: string;
    gender: string;

    nim?: string;
    yearIn?: number | null;
    yearOut?: number | null;
    phone1?: string;

    status: string;
    // * Work
    jobType?: string;
    jobCategory?: string;
    agencyName?: string;
    jobTitle?: string;
    jobLevel?: string;
    waitingPeriod?: string;

    // * Education
    educationCost?: string;
    educationName?: string;
    majorName?: string;
    educationStats?: string;

    masa_tunggu?: string;
}

export function ProfileForm({ profileAlumni, onDone }: { profileAlumni?: Alumni, onDone?: () => void }){
   
    const { register, handleSubmit, setValue } = useForm<Inputs>();
    const { updateDataAlumni } =  useProfile()

    const [statusField, setStatusField] = useState< "none" | "plane1" | "plane2" | "plane3">("none");
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isEditMode, setisEditMode] = useState<boolean>(false);


    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setIsDisabled(true);

        const formData = new URLSearchParams();

        if (data.name) formData.append("name", data.name);
        if (data.gender) formData.append("jns_kelamin", data.gender);
        if (data.email) formData.append("email", data.email);

        if (data.nim) formData.append("nim", data.nim);
        if (data.yearIn) formData.append("tahun_masuk", String(data.yearIn));
        if (data.yearOut) formData.append("tahun_lulus", String(data.yearOut));
        if (data.phone1) formData.append("no_hp", data.phone1);

        if (data.status) formData.append("status", data.status);

        if (data.waitingPeriod) formData.append("masa_tunggu", data.waitingPeriod);
        if (data.jobType) formData.append("bidang_job", data.jobType);
        if (data.jobCategory) formData.append("jns_job", data.jobCategory);
        if (data.agencyName) formData.append("nama_job", data.agencyName);
        if (data.jobTitle) formData.append("jabatan_job", data.jobTitle);
        if (data.jobLevel) formData.append("lingkup_job", data.jobLevel);

        if (data.educationCost) formData.append("biaya_studi", data.educationCost);
        if (data.educationStats) formData.append("jenjang_pendidikan", data.educationStats );
        if (data.educationName) formData.append("universitas", data.educationName);
        if (data.majorName) formData.append("program_studi", data.majorName);

        await updateDataAlumni(formData)
            .then(() => {
                toast.success("Succes in update data alumni");
            })
            .catch(() => {
                toast.error("Failed in update data alumni");
            })
            
        setIsDisabled(false);
        setisEditMode(false);

        if (onDone) onDone();
    }

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

    const changeStatusPlame = (value: string) => {
        
        if (value === "Bekerja Full Time" || value === "Bekerja Part Time" || value === "Wiraswasta"){
            setStatusField("plane1");
        }else if (value === "Melanjutkan Pendidikan") {
            setStatusField("plane2");
        }else {
            setStatusField("none");
        }
    }

    useEffect(() => {
        setValue("name", profileAlumni?.name ? profileAlumni?.name : "");
        setValue("gender", profileAlumni?.jns_kelamin ? profileAlumni?.jns_kelamin : "");
        setValue("nim", profileAlumni?.nim ? profileAlumni?.nim : "");
        setValue("email", profileAlumni?.email ? profileAlumni?.email : "");
        setValue("phone1", profileAlumni?.no_hp ? profileAlumni?.no_hp : "");
        setValue("yearIn", profileAlumni?.tahun_masuk ?  Number(profileAlumni?.tahun_masuk) : null);
        setValue("yearOut", profileAlumni?.tahun_lulus ?  Number(profileAlumni?.tahun_lulus) : null);
        setValue("status", profileAlumni?.status ?  profileAlumni?.status : "");

        setValue("waitingPeriod", profileAlumni?.masa_tunggu ?  profileAlumni?.masa_tunggu : "");
        setValue("jobType", profileAlumni?.bidang_job ?  profileAlumni?.bidang_job : "");
        setValue("jobCategory", profileAlumni?.jns_job ?  profileAlumni?.jns_job : "");
        setValue("agencyName", profileAlumni?.nama_job ?  profileAlumni?.nama_job : "");
        setValue("jobTitle", profileAlumni?.jabatan_job ?  profileAlumni?.jabatan_job : "");
        setValue("jobLevel", profileAlumni?.lingkup_job ?  profileAlumni?.lingkup_job : "");

        setValue("educationCost", profileAlumni?.biaya_studi ?  profileAlumni?.biaya_studi : "");
        setValue("educationStats", profileAlumni?.jenjang_pendidikan ? profileAlumni?.jenjang_pendidikan : "");
        setValue("educationName", profileAlumni?.universitas ?  profileAlumni?.universitas : "");
        setValue("majorName", profileAlumni?.program_studi ?  profileAlumni?.program_studi : "");
        
        if (profileAlumni?.status) changeStatusPlame(profileAlumni.status);

    }, [profileAlumni])

    return (
        <section>

            <div className='flex justify-end mb-3' >
                <button className={`${isEditMode ? "bg-blue-500 text-white" : ""} text-xs sm:text-lg p-3 w-full sm:w-fit flex justify-center shadow-sm rounded-md border border-blue-300 border-dashed`} onClick={() => setisEditMode(!isEditMode)} ><HiPencilAlt /></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} >

                <div className='flex gap-3' >
                    <div className="basis-full flex flex-col gap-1 mb-5">
                        <label htmlFor="name" className="text-xs sm:text-sm" >Nama</label>
                        {
                            isEditMode 
                            ? <input  {...register('name')} name="name" id="name" type="text" className="text-xs " placeholder="Jane Doe" required />
                            : <div className='text-sm font-semibold' >{profileAlumni?.name}</div>
                        }
                    </div>

                    <div className="basis-full flex flex-col gap-1 mb-5">
                        <label htmlFor="nim" className="text-xs sm:text-sm" >NIM</label>
                        {
                            isEditMode
                            ? <input  {...register('nim')} name="nim" id="nim" type="text" className="text-xs " placeholder="Nomor Induk Mahasiswa" required/>
                            : <div className='text-sm font-semibold' >{profileAlumni?.nim}</div>
                        }
                    </div>

                    <div className="basis-full flex flex-col gap-1 mb-5">
                        <label htmlFor="gender" className="text-xs sm:text-sm" >Jenis Kelamin</label>
                        {
                            isEditMode 
                            ? <select { ...register("gender") } id="gender" name='gender' about="Jenis Kelamin" className="text-xs" required >
                                <option value="" >-none-</option>
                                <option value="Laki-Laki" >Laki - Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                            : <div className='text-sm font-semibold' >{profileAlumni?.jns_kelamin}</div>
                        }
                    </div>
                </div>

                <div className='flex gap-3'>
                    <div className="basis-full flex flex-col gap-1 mb-5">
                        <label htmlFor="email" className="text-xs sm:text-sm" >Email</label>
                        {
                            isEditMode
                            ? <input  {...register('email', { required: { value: true, message: "This field is required" } })} name="email" id="email" type="email" className="text-xs " placeholder="mhs@mhs.com" required />
                            : <div className='text-sm font-semibold' >{profileAlumni?.email}</div>
                        }
                    </div>

                    <div className="basis-full flex flex-col gap-1 mb-5">
                        <label htmlFor="phone1" className="text-xs sm:text-sm" >Nomor Telephone</label>
                        {
                            isEditMode
                            ? <input  {...register('phone1')} name="phone1" id="phone1" type="text" className="text-xs " placeholder="xxxxxxxxxxxx" required />
                            : <div className='text-sm font-semibold' >{profileAlumni?.no_hp}</div>
                        }
                    </div>
                </div>

                <div className='flex gap-3'>
                    <div className="basis-full flex flex-col gap-1 mb-5">
                        <label htmlFor="yearIn" className="text-xs sm:text-sm" >Tahun Masuk</label>
                        {
                            isEditMode
                            ? <input  {...register('yearIn')} name="yearIn" id="yearIn" type="number" min={0} className="text-xs " placeholder="2020" required/>
                            : <div className='text-sm font-semibold' >{profileAlumni?.tahun_masuk}</div>

                        }
                    </div>

                    <div className="basis-full flex flex-col gap-1 mb-5">
                        <label htmlFor="yearOut" className="text-xs sm:text-sm" >Tahun Lulus</label>
                        {
                            isEditMode
                            ? <input  {...register('yearOut')} name="yearOut" id="yearOut" type="number" min={0} className="text-xs " placeholder="2024" required />
                            : <div className='text-sm font-semibold' >{profileAlumni?.tahun_lulus}</div>

                        }
                    </div>
                </div>

                <div className='mb-5' >
                    <div className="flex flex-col gap-1 mb-5">
                        <label htmlFor="status" className="text-xs sm:text-sm" >Status Saat Ini</label>
                        {
                            isEditMode
                            ? <select { ...register("status") } id="status" name='status' about="status" className="text-xs" onChange={onChangeStatus} required>
                                <option value="" >-none-</option>
                                <option value="Bekerja Full Time" >Bekerja Full Time</option>
                                <option value="Bekerja Part Time">Bekerja Part Time</option>
                                <option value="Wiraswasta">Wiraswasta</option>
                                <option value="Melanjutkan Pendidikan">Melanjutkan Pendidikan</option>
                                <option value="Tidak Bekerja Tetapi Sedang Mencari Pekerjaan">Tidak Bekerja Tetapi Sedang Mencari Pekerjaan</option>
                                <option value="Belum memungkinkan Bekerja">Belum memungkinkan Bekerja</option>
                                <option value="Menikah / Atau Mengurus Keluarga">Menikah / Atau Mengurus Keluarga</option>
                            </select>
                            : <div className='text-sm font-semibold' >{profileAlumni?.status}</div>

                        }
                    </div>

                    {/* Work */}
                    { statusField === "plane1" && <section className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="waitingPeriod" className="text-xs sm:text-sm" >Masa Tunggu</label>
                            {
                                isEditMode
                                ? <select { ...register("waitingPeriod") } id="jwaitingPeriod" name='waitingPeriod' about="waitingPeriod" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="kurang dari 6 bulan" >Kurang dari 6 bulan</option>
                                    <option value="6 bulan - 12 bulan" >6 bulan - 12 bulan</option>
                                    <option value="lebih dari 12 bulan">Lebih dari 12 bulan</option>
                                </select>
                                : <div className='text-sm font-semibold' >{profileAlumni?.masa_tunggu}</div>

                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="jobType" className="text-xs sm:text-sm" >Bidang Pekerjaani</label>
                            {
                                isEditMode
                                ? <select { ...register("jobType") } id="jobType" name='jobType' about="jobType" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="infokom" >Infokom</option>
                                    <option value="nonInfokom">Non Infokom</option>
                                </select>
                                : <div className='text-sm font-semibold' >{profileAlumni?.bidang_job}</div>

                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="jobCategory" className="text-xs sm:text-sm" >Kategori Pekerjaan</label>
                            {
                                isEditMode
                                ? <select { ...register("jobCategory") } id="jobCategory" name='jobCategory' about="jobCategory" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="swasta" >Perusahaan Swasta</option>
                                    <option value="nirlaba">Perusahaan Nirlaba</option>
                                    <option value="bumn">BUMN / BUMD</option>
                                    <option value="lembagaPem">Lembaga Pemerintah</option>
                                    <option value="wiraswasta">Wiraushana</option>
                                </select>
                                : <div className='text-sm font-semibold' >{profileAlumni?.jns_job}</div>

                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="agencyName" className="text-xs sm:text-sm" >Nama Instansi</label>
                            {
                                isEditMode
                                ? <input  {...register('agencyName')} name="agencyName" id="agencyName" type="text" className="text-xs" placeholder="Udinus" />
                                : <div className='text-sm font-semibold' >{profileAlumni?.nama_job}</div>

                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="jobTitle" className="text-xs sm:text-sm" >Jabatan Pekerjaan</label>
                            {
                                isEditMode
                                ? <select { ...register("jobTitle") } id="jobTitle" name='jobTitle' about="jobTitle" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="founder" >Founder</option>
                                    <option value="coFounder">Co Founder</option>
                                    <option value="staff">Staff</option>
                                    <option value="freelance">Freelance</option>
                                </select>
                                : <div className='text-sm font-semibold' >{profileAlumni?.jabatan_job}</div>

                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="jobLevel" className="text-xs sm:text-sm" >Tingkat Pekerjaan</label>
                            {
                                isEditMode
                                ? <select { ...register("jobLevel") } id="jobLevel" name='jobLevel' about="jobLevel" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="localNonLaw" >Lokal / Wilayah tidak berbadan hukum</option>
                                    <option value="localLaw" >Lokal / Wilayah berbadan hukum</option>
                                    <option value="national" >Nasional</option>
                                    <option value="multinational">Multinasional</option>
                                    <option value="international">Internasional</option>
                                </select>
                                : <div className='text-sm font-semibold' >{profileAlumni?.lingkup_job}</div>

                            }
                        </div>

                        </section> }

                    {/* Education */}
                    { statusField === "plane2" && <section className="flex flex-col gap-4">

                        <div className="flex flex-col gap-1">
                            <label htmlFor="educationCost" className="text-xs sm:text-sm" >Sumber Biaya Pendidikan</label>
                            {
                                isEditMode
                                ? <select { ...register("educationCost") } id="educationCost" name='educationCost' about="educationCost" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="ownself" >Sendiri</option>
                                    <option value="scholarship" >Beasiswa</option>
                                </select>
                                : <div className='text-sm font-semibold' >{profileAlumni?.biaya_studi}</div>

                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="educationName" className="text-xs sm:text-sm" >Nama Perguruan Tinggi</label>
                            {
                                isEditMode
                                ? <input  {...register('educationName')} name="educationName" id="educationName" type="text" className="text-xs" placeholder="Udinus" />
                                : <div className='text-sm font-semibold' >{profileAlumni?.universitas}</div>

                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="majorName" className="text-xs sm:text-sm" >Nama Program Studi</label>
                            {
                                isEditMode
                                ? <input  {...register('majorName')} name="majorName" id="majorName" type="text" className="text-xs" placeholder="Informatika" />
                                : <div className='text-sm font-semibold' >{profileAlumni?.program_studi}</div>

                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="educationStats" className="text-xs sm:text-sm" >Jenjang Pendidikan</label>
                            {
                                isEditMode
                                ? <select { ...register("educationStats") } id="educationStats" name='educationStats' about="educationStats" className="text-xs"  >
                                    <option value="" >-none-</option>
                                    <option value="Sarjana" >Sarjana</option>
                                    <option value="Magister" >Magister</option>
                                    <option value="Doctor" >Doctor</option>
                                </select>
                                : <div className='text-sm font-semibold' >{profileAlumni?.jenjang_pendidikan}</div>

                            }
                        </div>

                    </section> }
                </div>

                { isEditMode && <button type="submit" className={`px-5 py-2 border rounded-md bg-blue-500 text-white w-full hover:bg-blue-500 active:bg-blue-600`} disabled={isDisabled} >Submit</button>}
            </form>

        </section>
    )
}