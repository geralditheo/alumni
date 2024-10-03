import type { Metadata } from "next";
import Sidebar from "@/components/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return <section className="flex h-screen " >
    <Sidebar/>
    <main>
      <div></div>
      <div> {children} </div>
    </main>
  </section>
  
}
