'use client';
import Image from "next/image"
import { useCheckDataAlumni } from '@/hooks/dashboard/data-alumni/useStore.hook';
import { useAcademic, useAcademicMhs } from '@/hooks/alumni/academic/useStore.hook';
import { useJob } from "@/hooks/alumni/job/useStore.hook";
import { useInternship } from "@/hooks/alumni/internship/useStore.hook";
import { useOrganization } from "@/hooks/alumni/organization/useStore.hook";
import { useAward, useAwardMhs } from "@/hooks/alumni/award/useStore.hook";
import { useCourse } from "@/hooks/alumni/course/useStore.hook";
import { useSkill } from "@/hooks/alumni/skill/useStore.hook";
import { HiPencilAlt } from 'react-icons/hi';
import { useProfile } from "@/hooks/profile/alumni/useStore.hook";
import { getUser, User } from "@/hooks/auth/authClient";

import Link from 'next/link';
import { useEffect, useState } from "react";

export default function DataAlumniPage(){

    const getDataAlumni = useCheckDataAlumni();
    const { data, getDataAlumni : fetchDataAlumni } = useProfile();
    const [ filter ] = useState({ currentPage: 1, limit: 10 });

    const { academics, getAcademics } = useAcademic();
    const {data:jobs, getJobs} = useJob();
    const {data:internships, getInternship} = useInternship();
    const {data:organizations, getOrganization} = useOrganization();
    const {data:awards, getAwards} = useAward();
    const {data:courses, getCourses} = useCourse();
    const {data:skills, getSkills} = useSkill();

    const { data: dataAcademicMhs, get: getAcademicMhs } = useAcademicMhs();    
    const { data: dataAwardMhs, getAwards: getAwardMhs } = useAwardMhs()

    const [user, setUser] = useState<User | null>(null);
    const [ role, setRole ] = useState< "alumni" | "admin" | "mahasiswa" >();

    useEffect(() => {
        const fetchedUser = getUser();

        if (fetchedUser){

            const roleAlumni: boolean | undefined = fetchedUser?.roles?.includes('alumni');
            const roleAdmin: boolean | undefined = fetchedUser?.roles?.includes('admin');
            const roleMahasiswa: boolean | undefined = fetchedUser?.roles?.includes('mahasiswa');

            if (roleAlumni) {
                setRole('alumni'); 
                fetchDataAlumni();

                getAcademics(filter);
                getJobs(filter);
                getInternship(filter);
                getOrganization(filter);
                getAwards(filter);
                getCourses(filter);
                getSkills(filter);
            }
            if (roleAdmin) {
                setRole('admin');
            } 
            if (roleMahasiswa) {
                setRole('mahasiswa');
                getAcademicMhs(filter);
                getAwardMhs(filter);
            }

            setUser(fetchedUser);
        }
    }, [])

    return <section className="" >
        <div className='bg-white shadow-md p-6 mx-auto mb-5 rounded-md'>
            <div className='relative'>
                <div className='bg-gray-300 h-32 '>
                    <div className='absolute -bottom-10 left-6 w-[125px] h-[125px] bg-white border-4 border-white rounded-full flex items-center justify-center'>
                        <Image  src="/draw/undraw_Experience_design_re_dmqq.png" alt="Photo Profile" fill className="border size-24 rounded-full"/>
                    </div>
                </div>
            </div>

            <div className='pt-12'>
                { user?.roles?.map((item) => {
                        return (
                            <div key={item} className="w-fit px-3 py-1 bg-orange-300  text-xs shadow -left-14 mb-3" >{item}</div>
                        )
                    })
                }
                <div className="font-semibold" >{ data?.name ?? "" }</div>

                <div className="mb-3" >{ data?.email ?? "" }</div>
            </div>
        </div>

        <div className='flex flex-wrap gap-5 sm:justify-start justify-center' >
            { getDataAlumni.data?.map((item) => {

                if (item.name === "Academic") {                    

                    return <div key={item.key} className='border bg-white shadow-md w-full rounded-md' >
                        <div className='bg-blue-500 flex justify-between items-center p-3 rounded-t-md'>
                            <div className='flex items-center gap-3 text-white'>
                                {item.name}
                            </div>
                            <Link href={`/dashboard/alumni/${item.path}`} className='shrink-0 text-white hover:text-gray-400'>
                                <HiPencilAlt />
                            </Link>
                        </div>
                        <div className="p-3 space-y-6">
                        {
                            academics.map((element, index) => (
                                <div key={`${item.key}-${index}`}>
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{element.jenjang_pendidikan}</h3>
                                                    <p className="text-sm text-gray-700">{element.nama_studi}</p>
                                                    <p className="text-sm text-gray-600">{element.tahun_masuk} - {element.tahun_lulus} &middot; { (element.tahun_lulus && element.tahun_masuk) ? element.tahun_lulus - element.tahun_masuk  : '~' } tahun</p>
                                                    <p className="text-sm text-gray-600">{element.kota}, {element.negara} </p>
                                                    <p className="text-sm text-gray-600">IPK: {element.ipk} </p>
                                                    <p className="text-sm text-gray-600 italic">Catatan: {element.catatan} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        academics.length > 1 && index < academics.length - 1 && ( <hr className="border-gray-300"/> )
                                    }
                                </div>
                            ))
                        }

                        {
                            dataAcademicMhs.map((element, index) => (
                                <div key={`${item.key}-${index}`}>
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{element.jenjang_pendidikan}</h3>
                                                    <p className="text-sm text-gray-700">{element.nama_studi}</p>
                                                    <p className="text-sm text-gray-600">{element.tahun_masuk} - {element.tahun_lulus} &middot; { (element.tahun_lulus && element.tahun_masuk) ? element.tahun_lulus - element.tahun_masuk  : '~' } tahun</p>
                                                    <p className="text-sm text-gray-600">{element.kota}, {element.negara} </p>
                                                    <p className="text-sm text-gray-600">IPK: {element.ipk} </p>
                                                    <p className="text-sm text-gray-600 italic">Catatan: {element.catatan} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        academics.length > 1 && index < academics.length - 1 && ( <hr className="border-gray-300"/> )
                                    }
                                </div>
                            ))
                        }
                        </div>
                    </div>

                } else if(item.name === 'Job'){
                    return <div key={item.key} className='border bg-white shadow-md w-full rounded-md' >
                        <div className='bg-blue-500 flex justify-between items-center p-3 rounded-t-md'>
                            <div className='flex items-center gap-3 text-white'>
                                {item.name}
                            </div>
                            <Link href={`/dashboard/alumni/${item.path}`} className='shrink-0 text-white hover:text-gray-400'>
                                <HiPencilAlt />
                            </Link>
                        </div>
                        <div className="p-3 space-y-6">
                        {
                            jobs.map((job, index) => (
                                <div key={`${item.key}-${index}`}>
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{job.nama_job}</h3>
                                                    <p className="text-sm text-gray-600">{job.jabatan_job}</p>
                                                    <p className="text-sm text-gray-600">{job.periode_masuk_job} - {job.periode_keluar_job} &middot; { (job.periode_keluar_job && job.periode_masuk_job) ? job.periode_masuk_job - job.periode_keluar_job  : '~' } tahun</p>
                                                    <p className="text-sm text-gray-600">{job.kota}, {job.negara} </p>
                                                    <p className="text-sm text-gray-600 italic">Catatan: {job.catatan} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        jobs.length > 1 && index < jobs.length - 1 && ( <hr className="border-gray-300"/> )
                                    }
                                </div>
                            ))
                        }
                        </div>
                    </div>
                } else if(item.name === "Internship"){
                    return <div key={item.key} className='border bg-white shadow-md w-full rounded-md' >
                        <div className='bg-blue-500 flex justify-between items-center p-3 rounded-t-md'>
                            <div className='flex items-center gap-3 text-white'>
                                {item.name}
                            </div>
                            <Link href={`/dashboard/alumni/${item.path}`} className='shrink-0 text-white hover:text-gray-400'>
                                <HiPencilAlt />
                            </Link>
                        </div>
                        <div className="p-3 space-y-6">
                        {
                            internships.map((internship, index) => (
                                <div key={`${item.key}-${index}`}>
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{internship.nama_intern}</h3>
                                                    <p className="text-sm text-gray-600">{internship.jabatan_intern}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {internship.bulan_masuk_intern} {internship.periode_masuk_intern} - {internship.bulan_keluar_intern} {internship.periode_keluar_intern} &nbsp;&middot;&nbsp; 
                                                        {(internship.periode_keluar_intern && internship.periode_masuk_intern) ? internship.periode_keluar_intern - internship.periode_masuk_intern : '~'} tahun</p>
                                                    <p className="text-sm text-gray-600">{internship.kota}, {internship.negara} </p>
                                                    <p className="text-sm text-gray-600 italic">Catatan: {internship.catatan} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {index < academics.length - 1 && <hr className="my-4 border-gray-300" />}
                                </div>
                            ))
                        }
                        </div>
                    </div>
                } else if(item.name === 'Organization'){
                    return <div key={item.key} className='border bg-white shadow-md w-full rounded-md' >
                        <div className='bg-blue-500 flex justify-between items-center p-3 rounded-t-md'>
                            <div className='flex items-center gap-3 text-white'>
                                {item.name}
                            </div>
                            <Link href={`/dashboard/alumni/${item.path}`} className='shrink-0 text-white hover:text-gray-400'>
                                <HiPencilAlt />
                            </Link>
                        </div>
                        <div className="p-3 space-y-6">
                        {
                            organizations.map((organization, index) => (
                                <div key={`${item.key}-${index}`}>
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{organization.nama_org}</h3>
                                                    <p className="text-sm text-gray-600">{organization.jabatan_org}</p>
                                                    <p className="text-sm text-gray-600">{organization.periode_masuk_org} - {organization.periode_keluar_org} &middot; { (organization.periode_keluar_org && organization.periode_masuk_org) ? organization.periode_keluar_org - organization.periode_masuk_org  : '~' } tahun</p>
                                                    <p className="text-sm text-gray-600">{organization.kota}, {organization.negara} </p>
                                                    <p className="text-sm text-gray-600 italic">Catatan: {organization.catatan} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {index < academics.length - 1 && <hr className="my-4 border-gray-300" />}
                                </div>
                            ))
                        }
                        </div>
                    </div>
                } else if(item.name === 'Achievement'){
                    return <div key={item.key} className='border bg-white shadow-md w-full rounded-md' >
                        <div className='bg-blue-500 flex justify-between items-center p-3 rounded-t-md'>
                            <div className='flex items-center gap-3 text-white'>
                                {item.name}
                            </div>
                            <Link href={`/dashboard/alumni/${item.path}`} className='shrink-0 text-white hover:text-gray-400'>
                                <HiPencilAlt />
                            </Link>
                        </div>
                        <div className="p-3 space-y-6">
                        {
                            awards.map((award, index) => (
                                <div key={`${item.key}-${index}`}>
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{award.nama_award}</h3>
                                                    <p className="text-sm text-gray-600">{award.institusi_award}</p>
                                                    <p className="text-sm text-gray-600">Tingkat: {award.tingkat_award} </p>
                                                    <p className="text-sm text-gray-600">Tahun: {award.tahun_award} </p>
                                                    <p className="text-sm text-gray-600 italic">Catatan: {award.deskripsi_award} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {index < academics.length - 1 && <hr className="my-4 border-gray-300" />}
                                </div>
                            ))
                        }
                        </div>
                    </div>
                } else if(item.name === 'Certificate'){
                    return <div key={item.key} className='border bg-white shadow-md w-full rounded-md' >
                        <div className='bg-blue-500 flex justify-between items-center p-3 rounded-t-md'>
                            <div className='flex items-center gap-3 text-white'>
                                {item.name}
                            </div>
                            <Link href={`/dashboard/alumni/${item.path}`} className='shrink-0 text-white hover:text-gray-400'>
                                <HiPencilAlt />
                            </Link>
                        </div>
                        <div className="p-3 space-y-6">
                        {
                            courses.map((course, index) => (
                                <div key={`${item.key}-${index}`}>
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{course.nama_course}</h3>
                                                    <p className="text-sm text-gray-600">{course.institusi_course}</p>
                                                    <p className="text-sm text-gray-600">Tingkat: {course.tingkat_course} </p>
                                                    <p className="text-sm text-gray-600">Tahun: {course.tahun_course} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {index < academics.length - 1 && <hr className="my-4 border-gray-300" />}
                                </div>
                            ))
                        }
                        </div>
                    </div>
                } else if(item.name === 'Skills'){
                    return <div key={item.key} className='border bg-white shadow-md w-full rounded-md' >
                        <div className='bg-blue-500 flex justify-between items-center p-3 rounded-t-md'>
                            <div className='flex items-center gap-3 text-white'>
                                {item.name}
                            </div>
                            <Link href={`/dashboard/alumni/${item.path}`} className='shrink-0 text-white hover:text-gray-400'>
                                <HiPencilAlt />
                            </Link>
                        </div>
                        <div className="p-3 space-y-6">
                        {
                            skills.map((skill, index) => (
                                <div key={`${item.key}-${index}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Kerjasama:</p>
                                            <p className="text-sm text-gray-600">{skill.kerjasama_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Keahlian:</p>
                                            <p className="text-sm text-gray-600">{skill.ahli_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Bahasa Inggris:</p>
                                            <p className="text-sm text-gray-600">{skill.inggris_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Komunikasi:</p>
                                            <p className="text-sm text-gray-600">{skill.komunikasi_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Pengembangan Diri:</p>
                                            <p className="text-sm text-gray-600">{skill.pengembangan_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Kepemimpinan:</p>
                                            <p className="text-sm text-gray-600">{skill.kepemimpinan_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Etos Kerja:</p>
                                            <p className="text-sm text-gray-600">{skill.etoskerja_skill}</p>
                                        </div>
                                    </div>
                                    {index < academics.length - 1 && <hr className="my-4 border-gray-300" />}
                                </div>
                            ))
                        }
                        </div>
                    </div>
                }
            })}

            
        </div>
    </section>
}