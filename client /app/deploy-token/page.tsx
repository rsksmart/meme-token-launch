'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import DeployToken from "@/components/deployToken";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";

export default function TokenLaunch() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 w-full px-6 xl:px-0 md:w-[1000px] xl:w-[1300px] m-auto py-8">
        <div className="flex justify-between flex-row mb-8">
          <h1 className="md:text-6xl xl:text-[78px] relative z-10 font-bold text-black flex flex-col gap-2.5">
            <span className="max-w-max px-1.5 bg-orange-500">Token Launch</span>
          </h1>
          <div>
            <ConnectButton client={client} />
          </div>
        </div>
        <div className="w-full">
          <DeployToken />
        </div>
      </section>
      <Footer />
    </main>
  );
}
