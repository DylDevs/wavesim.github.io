import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from "next/font/local";

const geist = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist",
  weight: "100 900",
});

export const metadata: Metadata = {
    title: "Wave Simulator",
    description: "Simulator which shows concepts of waves",
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div className={` ${geist.variable}`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;