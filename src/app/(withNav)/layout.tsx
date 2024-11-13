import Navbar from "@/components/Navbar";

export default function WithNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
      {children}
      <Navbar/>
    </>
  );
}