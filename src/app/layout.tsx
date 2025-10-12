import type { Metadata } from "next";
import { Nunito, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NavBar from "./components/NavBar";
import { auth } from "../../auth";
import BackgroundEffects2 from "./components/BackgroundEffects";
import Footer from "./components/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moodies",
  description: "Track your daily mood and reflect on moods over time",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${lora.variable} antialiased h-screen`}
      >
        <ThemeProvider defaultTheme="light">
          <BackgroundEffects2 />
          <NavBar session={session} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
