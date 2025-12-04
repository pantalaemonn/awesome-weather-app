import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import DayCard from "@/components/DayCard";
import WeatherCard from "@/components/WeatherCard";
import SearchBar from "@/components/Search";

import { Archivo } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";

const majorMono = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Awesome Weather App",
  description: "Created by Cass, Jonah and Melissa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WeatherCard />
        {children}
      </body>
    </html>
  );
}
