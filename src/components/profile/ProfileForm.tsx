import React, { useState, FormEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alumni } from '@/hooks/profile/alumni/useStore.hook';
import { toast } from 'sonner'

type Inputs = {
    // * Main
    name: string;
    email: string;
    gender: string;
    password: string;
    confirmPassword: string;

    nim?: string;
    yearIn?: number;
    yearOut?: number;
    phone1?: string;

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

    masa_tunggu?: string;
}

export function ProfileForm({ profileAlumni }: { profileAlumni?: Alumni }){
   
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<Inputs>();

    const [statusField, setStatusField] = useState< "none" | "plane1" | "plane2" | "plane3">("none");
    const [isDisabled, setIsDisabled] = useState<boolean>(false);


    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        if (data.password !== data.confirmPassword) return toast.error("Both password doesnt match");

        setIsDisabled(true);

        const formData = new FormData();

        if (data.name) formData.append("name", data.name);
        if (data.gender) formData.append("jns_kelamin", data.gender);
        if (data.email) formData.append("email", data.email);
        if (data.password) formData.append("password", data.password);
        if (data.confirmPassword) formData.append("password_confirmation", data.confirmPassword);

        if (data.nim) formData.append("nim", data.nim);
        if (data.yearIn) formData.append("tahun_masuk", String(data.yearIn));
        if (data.yearOut) formData.append("tahun_lulus", String(data.yearOut));
        if (data.phone1) formData.append("no_hp", data.phone1);

        if (data.status) formData.append("status", data.status);

        if (data.jobType) formData.append("bidang_job", data.jobType);
        if (data.jobCategory) formData.append("jns_job", data.jobCategory);
        if (data.agencyName) formData.append("nama_job", data.agencyName);
        if (data.jobTitle) formData.append("jabatan_job", data.jobTitle);
        if (data.jobLevel) formData.append("lingkup_job", data.jobLevel);

        if (data.educationCost) formData.append("biaya_studi", data.educationCost);
        if (data.educationYearIn) formData.append("jenjang_pendidikan", String(data.educationYearIn) );
        if (data.educationName) formData.append("universitas", data.educationName);
        if (data.majorName) formData.append("program_studi", data.majorName);
            
        setIsDisabled(false);
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

    return (
        <section>

            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="name" className="text-xs sm:text-sm" >Nama</label>
                    <input  {...register('name')} name="name" id="name" type="text" className="text-xs " placeholder="Jane Doe" />
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
                    <input  {...register('email', { required: { value: true, message: "This field is required" } })} name="email" id="email" type="email" className="text-xs " placeholder="mhs@mhs.com" />
                    {errors.email &&  errors.email.types && <p>{errors.email.types.required}</p>}
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="password" className="text-xs sm:text-sm" >Password</label>
                    <input  {...register('password', { required: { value: true, message: "This field is required" }, minLength: { value: 8, message: "Minimum 8 characters" } })} name="password" id="password" type="password" className="text-xs " placeholder="8 Characters" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="confirmPassword" className="text-xs sm:text-sm" >Konfirmasi Password</label>
                    <input  {...register('confirmPassword', { required: { value: true, message: "This field is required" }, minLength: { value: 8, message: "Minumum 8 characters" } })} name="confirmPassword" id="confirmPassword" type="password" className="text-xs " placeholder="8 Characters" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="nim" className="text-xs sm:text-sm" >NIM</label>
                    <input  {...register('nim')} name="nim" id="nim" type="text" className="text-xs " placeholder="Nomor Induk Mahasiswa" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="yearIn" className="text-xs sm:text-sm" >Tahun Masuk</label>
                    <input  {...register('yearIn')} name="yearIn" id="yearIn" type="number" min={0} className="text-xs " placeholder="2020" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="yearOut" className="text-xs sm:text-sm" >Tahun Lulus</label>
                    <input  {...register('yearOut')} name="yearOut" id="yearOut" type="number" min={0} className="text-xs " placeholder="2024" />
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <label htmlFor="phone1" className="text-xs sm:text-sm" >Nomor Telephone</label>
                    <input  {...register('phone1')} name="phone1" id="phone1" type="text" className="text-xs " placeholder="xxxxxxxxxxxx" />
                </div>

                <div className='mb-5' >
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
                            <label htmlFor="educationYearIn" className="text-xs sm:text-sm" >Tahun Masuk</label>
                            <input  {...register('educationYearIn')} name="educationYearIn" id="educationYearIn" type="number" max={new Date().getFullYear()}  className="text-xs" placeholder="2020"/>
                        </div>

                    </section> }
                </div>

                <button type="submit" className={`px-5 py-2 border rounded-md bg-blue-500 text-white w-full hover:bg-blue-500 active:bg-blue-600`} disabled={isDisabled} >Submit</button>
            </form>

        </section>
    )
}