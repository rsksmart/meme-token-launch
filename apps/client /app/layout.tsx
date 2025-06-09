import type { Metadata } from "next";
import "@/app/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: '(Meme) Token Launch',
  description: '(Meme) Token Launch | Rootstock',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThirdwebProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
          {/* @ts-ignore */}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#059669',
                },
              },
              error: {
                style: {
                  background: '#DC2626',
                },
              },
            }}
          />
        </ThirdwebProvider>
      </body>
    </html>
  );
}

