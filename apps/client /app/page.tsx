'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col relative">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="w-full relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[78px] relative z-10 font-bold text-black flex flex-col gap-3 sm:gap-4 md:gap-6">
              <span className="inline-block max-w-max px-3 sm:px-4 py-1 bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Meme Token Launch
              </span>
              <span className="flex gap-2 sm:gap-3 flex-wrap items-center justify-center sm:justify-start">
                <span className="bg-custom-green px-3 sm:px-4 py-1 w-max text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold rounded-sm shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  Memes
                </span>
                <span className="bg-title px-3 sm:px-4 py-1 w-max text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold rounded-sm shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  on Rootstock
                </span>
              </span>
            </h1>
            
            {/* Subtle description */}
            <p className="mt-6 lg:hidden sm:mt-8 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center sm:text-left leading-relaxed">
              Launch your own meme tokens with ease on the Rootstock network. Fast, secure, and ready for the next viral sensation.
            </p>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Card 1 */}
            <div className="group border border-white/20 hover:border-white/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col bg-black/20 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
              <div className="flex gap-3 items-center mb-4 sm:mb-6">
                <h3 className="bg-custom-lime text-black text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold px-3 py-2 rounded-lg shadow-md">
                  Meme
                </h3>
                <span className="bg-custom-lime text-black text-xs sm:text-sm h-7 w-7 sm:h-8 sm:w-8 rounded-full flex justify-center items-center font-semibold shadow-md">
                  0.1
                </span>
              </div>
              <div className="text-gray-200 leading-relaxed flex-1 text-sm sm:text-base">
                With the rise of meme coins, it&apos;s now easier than ever to launch your own meme token on Rootstock.
              </div>
            </div>

            {/* Card 2 */}
            <div className="group border border-white/20 hover:border-white/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col bg-black/20 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
              <div className="flex gap-3 items-center mb-4 sm:mb-6">
                <h3 className="bg-custom-pink text-black text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold px-3 py-2 rounded-lg shadow-md">
                  Token Launcher
                </h3>
                <span className="bg-custom-pink text-black text-xs sm:text-sm h-7 w-7 sm:h-8 sm:w-8 rounded-full flex justify-center items-center font-semibold shadow-md">
                  0.2
                </span>
              </div>
              <div className="text-gray-200 leading-relaxed flex-1 text-sm sm:text-base">
                Token Launcher helps you launch ERC20 and ERC721 Tokens on Rootstock with simplicity and security.
              </div>
            </div>

            {/* Card 3 */}
            <div className="group border border-white/20 hover:border-white/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col bg-black/20 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl md:col-span-2 lg:col-span-1">
              <div className="flex gap-3 items-center mb-4 sm:mb-6">
                <h3 className="bg-title text-black text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold px-3 py-2 rounded-lg shadow-md">
                  Project
                </h3>
                <span className="bg-title text-black text-xs sm:text-sm h-7 w-7 sm:h-8 sm:w-8 rounded-full flex justify-center items-center font-semibold shadow-md">
                  0.3
                </span>
              </div>
              <div className="text-gray-200 leading-relaxed flex-1 text-sm sm:text-base">
                The{' '}
                <a
                  href="https://github.com/rsksmart/meme-token-launch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-400 underline decoration-2 underline-offset-2 font-semibold transition-all duration-300 hover:decoration-orange-400"
                >
                  project
                </a>{' '}
                is open source, and contributions are welcome. Feel free to reach
                out to Rootstock through its different channels for any inquiries
                or support.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}