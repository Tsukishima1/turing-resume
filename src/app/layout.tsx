import type { Metadata } from "next";
import Favicon from '../public/favicon.ico';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { FormProvider } from "@/context/FormProviderForTec";
import { FormProviderForPla } from "@/context/FormProviderForPla";

export const metadata: Metadata = {
  title: "图灵团队简历投递通道",
  description: "Welcome to Turing Team!",
  icons: [
    {
      rel: "icon",
      url: Favicon.src,
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-200/30">
        <FormProvider>
          <FormProviderForPla>
            {children}
            <Toaster />
          </FormProviderForPla>
        </FormProvider>
      </body>
    </html>
  );
}
