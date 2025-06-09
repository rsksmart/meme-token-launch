'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import DeployToken from "@/components/deployToken";


export default function TokenLaunch() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 w-full px-6 xl:px-0 md:w-[1000px] xl:w-[1300px] m-auto py-8">
        <div className="flex justify-between flex-row mb-8">
        </div>
        <div className="w-full">
          <DeployToken />
        </div>
      </section>
      <Footer />
    </main>
  );
}
