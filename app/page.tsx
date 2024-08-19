'use client'
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/navbar";
import { Card } from "@/components/ui/card";
import ConnectWalletButton from "@/components/ui/connectWalletButton";

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col">
      <Navbar />
      <section className="w-full px-6 xl:px-0 md:w-[1000px] xl:w-[1300px] m-auto mt-4">
        <div className="w-full relative">
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
        </div>
        <div>
        </div>
        <div className="mt-10">
          <h1 className="text-4xl text-white font-semibold mt-4 mb-2">
            Go to the app
          </h1>
          <div className="flex items-center gap-4">
            <ConnectWalletButton />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 mt-4 border border-white rounded-3xl p-4">
            <div className="flex gap-2">
              <h3 className="bg-custom-lime w-max text-black text-3xl font-semibold px-2 py-1">
                Meme
              </h3>
              <span className="bg-custom-lime text-sm h-7 rounded-3xl w-7 flex justify-center items-center text-black font-semibold">
                0.1
              </span>
            </div>
            <div className="mt-3 text-justify">
              Meme coins are designed like any other cryptocurrency, like Bitcoin or Ethereum. The difference is their existence tends to be centered around a viral moment or funny idea, and their value depends largely on how much momentum that concept can generate.
            </div>
          </div>
          <div className="flex-1 mt-4 border border-white rounded-3xl p-4">
            <div className="flex gap-2">
              <h3 className="bg-custom-pink w-max text-black text-3xl font-semibold px-2 py-1">
                Token Launcher
              </h3>
              <span className="bg-custom-pink text-sm h-7 rounded-3xl w-7 flex justify-center items-center text-black font-semibold">
                0.2
              </span>
            </div>
            <div className="mt-3 text-justify">
              Token Launcher helps you launch Ethereum ERC20 Tokens on EVM-compatible blockchains, automatically list your token on major defi exchanges with a real trading price, airdrop to millions of addresses and create farming programs to incentive liquidity.
            </div>
          </div>
          <div className="flex-1 mt-4 border border-white rounded-3xl p-4">
            <div className="flex gap-2">
              <h3 className="bg-title pink w-max text-black text-3xl font-semibold px-2 py-1">
                PROJECT
              </h3>
              <span className="bg-title text-sm h-7 rounded-3xl w-7 flex justify-center items-center text-black font-semibold">
                0.3
              </span>
            </div>
            <div className="mt-3 text-justify">
              The{' '}
              <a
                href="https://github.com/rsksmart/meme-token-launch"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                project
              </a>{' '}
              is open source, and contributions are welcome. Feel free to reach
              out to Rootstock through its different channels for any inquiries
              or support.
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
