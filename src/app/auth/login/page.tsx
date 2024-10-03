import Image from 'next/image'
import Link from 'next/link';

export default function Login(){

    return <main className='py-5 px-8 rounded-lg shadow flex w-full max-w-2xl mx-10 gap-x-3 ' >

        <div className='w-full flex-initial p-3' >

            <h2 className="text-2xl font-semibold mb-5" >Login</h2>
            
            <form className="mx-auto">

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 ">Your email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="alumni@mhs.co.id" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 ">Your password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='xxxxxxxxx' required />
                </div>

                <p className='text-xs mb-5' >Dont have an account ? you can <span className='text-blue-800' > <Link  href={"/auth/register"} >register</Link> </span>  first</p>

                <div className="flex justify-end" >
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                </div>


            </form>

        </div>

        <div className='hidden w-full flex-initial justify-center h-auto md:flex items-center  ' >

            <div  >
                <Image src="/draw/undraw_Beach_day_cser.png" alt="Beach day illustration" width={400} height={400} style={{ maxWidth: '100%', height: 'auto' }} />

                <p className="font-semibold mb-5 text-gray-400 text-center " >Welcome back, </p>

            </div>

        </div>

    </main>


    
}