
import DashboardAlumni from "@/components/dashboard/dash-alumni/DashboardAlumni";
import DashboardLoker from "@/components/dashboard/lowongan-kerja/DashboardLoker";
import DashboardLogang from "@/components/dashboard/lowongan-magang/DashboardLogang";

export default function Dashboard(){
    return <main className="container mx-auto lg:px-32" >

        <h2 className="font-semibold text-gray-500 text-2xl mb-3" >Welcome, Username</h2>

        <DashboardAlumni />

        <DashboardLogang />

        <DashboardLoker />

    </main>
}