import type { Metadata } from "next";
import Sidebar from "@/components/sidebar/Sidebar";
import Navigationbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return <section className="flex h-screen " >
    <Sidebar/>

    <main className="w-full" >

      <Navigationbar />

      <div> {children} </div>

    </main>
    
  </section>
  
}
