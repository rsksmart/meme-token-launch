import type { Metadata } from "next";

import "@/app/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";


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
      <body className="h-screen">
       
          <TooltipProvider>{children}</TooltipProvider>
      
      </body>
    </html>
  );
}

