import type { Metadata } from "next";

import Sidebar from "@/components/sidebar/Sidebar";
import Navigationbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";


export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return <section className="flex h-screen " >
    <Sidebar/>

    <main className="w-full overflow-y-auto flex flex-col min-h-screen" >

      <Navigationbar />

      <div className="p-5 flex-grow" > {children} </div>

      <Footer />

    </main>
    
  </section>
  
}
