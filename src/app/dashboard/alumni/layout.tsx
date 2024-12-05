
export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return ( 
    <main className="container lg:px-32 mx-auto" >
        {children}    
    </main>
  );
}
