import TracerStudyTable from "@/components/tracer-study/TracerStudyTable";

export default function StatusTracerStudy({ params }: { params: {status: string} }){

    const { status } = params;
    
    return (
        <main className="container mx-auto lg:px-32" >
            <h2 className="text-2xl font-semibold text-gray-500 mb-1 text-center sm:text-left" >Data Untuk Status {status}</h2>
            <p className="mb-1 text-gray-500" >Berikut adalah informasi untuk datanya</p>

            <TracerStudyTable status={status} />

        </main>
    )
}