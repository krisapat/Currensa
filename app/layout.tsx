import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/navbar/navbarcom/darkmode/theme-provider";
import Navbar from "@/components/navbar/Navbar";
import { quicksand } from "@/utils/font";

export const metadata: Metadata = {
  title: "Finverse",
  description: "Finverse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quicksand.className} bg-[url('/img/bg/bg-light.png')] dark:bg-[url('/img/bg/bg-dark.png')] bg-no-repeat bg-center bg-cover bg-fixed`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
