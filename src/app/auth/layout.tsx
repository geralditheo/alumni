import type { Metadata } from "next";
import { Toaster } from 'sonner';


export const metadata: Metadata = {
  title: "Sign Alumni",
  description: "Page for sign Alumni."
};

export default function AuthLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <main className="h-screen flex items-center justify-center " >
      <Toaster position='top-right' duration={5000} closeButton   />
      {children}
    </main>
  )
  
}
