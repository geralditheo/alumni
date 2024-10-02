import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return <section className="h-screen flex items-center justify-center " >{children}</section>
  
}
