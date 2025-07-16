"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ListTokens from "@/components/listTokens";

export default function TokenLaunch() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <Navbar />
      <section className="flex-grow w-full px-6 xl:px-0 md:w-[1000px] xl:w-[1300px] m-auto mt-4">
        <div className="mt-10 w-full flex flex-col justify-center gap-4">
          <div className="flex items-end justify-between flex-row gap-6">
            <h1 className="text-2xl font-bold">Your tokens</h1>
          </div>
          <div className="mt-8">
            <ListTokens />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
