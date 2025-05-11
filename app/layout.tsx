import "./globals.css";
import { ThemeProvider } from "@/components/navbar/navbarcom/darkmode/theme-provider";
import Navbar from "@/components/navbar/Navbar";
import { quicksand } from "@/utils/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quicksand.className} bg-white dark:bg-[#0c0c0c]`}>
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
