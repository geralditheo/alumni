import type { Metadata } from "next";
import Sidebar from "@/components/sidebar/Sidebar";
import Navigationbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return <section className="flex h-screen " >
    <Sidebar/>

    <main className="w-full overflow-y-auto " >

      <Navigationbar />

      <div className="p-5" > {children} </div>

    </main>
    
  </section>
  
}
