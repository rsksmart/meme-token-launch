import type { Metadata } from "next";

import "@/app/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThirdwebProvider } from "thirdweb/react";

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
        <ThirdwebProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}

