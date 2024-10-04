import FormTracerStudi from "@/components/dashboard/tracer-study/FormTracerStudy"

export default function TracerStudy(){

    return <main className="bg-white shadow-md p-5" >

        <h2 className="text-4xl font-semibold text-gray-500 mb-3 text-center sm:text-left" >Tracer Study Alumni</h2>

        <p className="mb-3 text-gray-500 text-center sm:text-left " >Wajib Mengisi form ini</p>

        <FormTracerStudi  />
        
    </main>
}