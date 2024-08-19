'use client'

import ConnectedWallet from "@/components/connectedWallet";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/navbar";
import ConnectWalletButton from "@/components/ui/connectWalletButton";
import { useAuth } from "@/app/context/AuthContext";
import DeployToken from "@/components/deployToken";

export default function TokenLaunch() {
  const { isLoggedIn } = useAuth();

  return (
    <main className="h-full w-full flex flex-col">
      <Navbar />
      <section className="w-full px-6 xl:px-0 md:w-[1000px] xl:w-[1300px] m-auto mt-4">
        <div className="flex justify-between flex-row">
          <h1 className="md:text-6xl xl:text-[78px] relative z-10 font-bold text-black flex flex-col gap-2.5">
            <span className="max-w-max px-1.5 bg-white">Meme Token Launch</span>
            <span className="flex gap-2">
              <span className="bg-custom-green px-1.5 w-max xl:text-5xl">
                Memes
              </span>
              <span className="bg-title px-1.5 w-max xl:text-5xl">
                on Rootstock
              </span>
            </span>
          </h1>
          {isLoggedIn ?
            (
              <div className="flex items-center gap-4">
                <ConnectedWallet />
              </div>
            ) :
            (
              <div className="flex items-center gap-4">
                <ConnectWalletButton />
              </div>
            )
          }
        </div>
        <div className="m-8" >
          <DeployToken />
        </div>
      </section>
      <Footer />
    </main>
  );
}
