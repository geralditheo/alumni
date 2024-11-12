import TracerStudyIndex from "@/components/tracer-study/TracerStudyIndex"
import TracerStudyChart from "@/components/tracer-study/TracerStudyChart"


export default function TracerStudy(){

    return <main className="container mx-auto lg:px-32" >

        <h2 className="text-2xl font-semibold text-gray-500 mb-3 text-center sm:text-left" >Tracer Study Alumni</h2>

        <TracerStudyChart />

        <TracerStudyIndex />

    </main>
}