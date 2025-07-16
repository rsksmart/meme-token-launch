'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";


export default function Home() {

  return (
    <main className="min-h-screen w-full flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 w-full px-6 xl:px-0 md:w-[1000px] xl:w-[1300px] m-auto">
        <div className="w-full relative py-12 md:py-20">
          <h1 className="text-4xl md:text-6xl xl:text-[78px] relative z-10 font-bold text-black flex flex-col gap-4 md:gap-6">
            <span className="max-w-max px-2 bg-white">Meme Token Launch</span>
            <span className="flex gap-3 flex-wrap">
              <span className="bg-custom-green px-2 w-max text-3xl md:text-4xl xl:text-5xl">
                Memes
              </span>
              <span className="bg-title px-2 w-max text-3xl md:text-4xl xl:text-5xl">
                on Rootstock
              </span>
            </span>
          </h1>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 py-12 md:py-16">
          <div className="border border-white rounded-3xl p-6 md:p-8 flex flex-col">
            <div className="flex gap-3 items-center mb-4">
              <h3 className="bg-custom-lime text-black text-2xl md:text-3xl font-semibold px-3 py-2 rounded">
                Meme
              </h3>
              <span className="bg-custom-lime text-sm h-8 w-8 rounded-full flex justify-center items-center text-black font-semibold">
                0.1
              </span>
            </div>
            <div className="text-gray-200 leading-relaxed flex-1">
            With the rise of meme coins, it&apos;s now easier than ever to launch your own meme token on Rootstock.
            </div>
          </div>

          <div className="border border-white rounded-3xl p-6 md:p-8 flex flex-col">
            <div className="flex gap-3 items-center mb-4">
              <h3 className="bg-custom-pink text-black text-2xl md:text-3xl font-semibold px-3 py-2 rounded">
                Token Launcher
              </h3>
              <span className="bg-custom-pink text-sm h-8 w-8 rounded-full flex justify-center items-center text-black font-semibold">
                0.2
              </span>
            </div>
            <div className="text-gray-200 leading-relaxed flex-1">
              Token Launcher helps you launch ERC20  and ERC721 Tokens on Rootstock.
            </div>
          </div>

          <div className="border border-white rounded-3xl p-6 md:p-8 flex flex-col">
            <div className="flex gap-3 items-center mb-4">
              <h3 className="bg-title text-black text-2xl md:text-3xl font-semibold px-3 py-2 rounded">
                Project
              </h3>
              <span className="bg-title text-sm h-8 w-8 rounded-full flex justify-center items-center text-black font-semibold">
                0.3
              </span>
            </div>
            <div className="text-gray-200 leading-relaxed flex-1">
              The{' '}
              <a
                href="https://github.com/rsksmart/meme-token-launch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 underline font-semibold transition-colors"
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
