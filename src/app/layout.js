import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import DayCard from "@/components/DayCard";
import WeatherCard from "@/components/WeatherCard";
import SearchBar from "@/components/Search";

export const metadata = {
  title: "Awesome Weather App",
  description: "Created by Cass, Jonah and Melissa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <WeatherCard />
        {children}
      </body>
    </html>
  );
}
