import { DiscordIcon, GithubIcon, TwitterIcon } from '@/components/icons'

export default function Footer(): JSX.Element {
  return (
    <footer className="w-full border-t border-gray-800/30 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Brand Section */}
          <div className="flex-shrink-0">
            <p className="text-white text-base sm:text-lg">
              Built by <span className="text-xl font-bold bg-gradient-to-r from-custom-green to-custom-lime bg-clip-text text-transparent">RootstockLabs</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Copyright © 2024 Rootstock Labs. All rights reserved.
            </p>
          </div>

          {/* Center Links */}
          <nav className="flex flex-wrap gap-6 text-sm">
            <a
              href="https://rootstock.io/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-gray-300 hover:text-custom-green transition-colors duration-300 hover:underline underline-offset-2"
            >
              About Rootstock Labs
            </a>
            <a
              href="https://rootstock.io/contact/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-gray-300 hover:text-custom-pink transition-colors duration-300 hover:underline underline-offset-2"
            >
              Help
            </a>
            <a
              href="https://dev.rootstock.io/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-gray-300 hover:text-title transition-colors duration-300 hover:underline underline-offset-2"
            >
              Documentation
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex gap-4 flex-shrink-0">
            <a
              href="https://twitter.com/rootstock_io"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 bg-gray-800/40 hover:bg-blue-500/20 rounded-lg border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 group"
              aria-label="Follow us on Twitter"
            >
              <TwitterIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
            
            <a
              href="https://github.com/rsksmart"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 bg-gray-800/40 hover:bg-gray-600/20 rounded-lg border border-gray-700/50 hover:border-gray-300/50 transition-all duration-300 group"
              aria-label="View our GitHub repositories"
            >
              <GithubIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
            </a>
            
            <a
              href="https://discord.com/invite/rootstock"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 bg-gray-800/40 hover:bg-indigo-500/20 rounded-lg border border-gray-700/50 hover:border-indigo-400/50 transition-all duration-300 group"
              aria-label="Join our Discord community"
            >
              <DiscordIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}