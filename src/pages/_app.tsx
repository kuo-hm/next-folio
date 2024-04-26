import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={`font-sans ${inter.variable} flex justify-center bg-primary`}
    >
      <div className=" min-h-screen w-full  max-w-[1000px] px-7 pt-24 text-white">
        <Component {...pageProps} />
      </div>
    </main>
  );
};

export default MyApp;
