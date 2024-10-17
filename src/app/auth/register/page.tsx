
import Link from 'next/link';
import QuestionerForm from '@/components/kuesioner/questionerForm';

export default function Register(){

    return <main className='py-5 px-8 rounded-lg shadow flex flex-col w-full justify-center max-w-xl mx-10 gap-x-3 ' >

        <QuestionerForm />

        <p className='text-xs mt-3 text-center ' >Already have an account ? please <span className='text-blue-800 font-semibold' > <Link  href={"/auth/login"} >login</Link> </span> </p>
        

    </main>


    
}