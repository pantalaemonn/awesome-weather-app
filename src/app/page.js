"use client";
import { useEffect, useState } from "react";
import DayCard from "@/components/DayCard";
import NavBar from "@/components/NavBar";
import DropDown from "@/components/DropDown";
import { getWeatherDescription } from "@/utils/weatherCodes";
import UserProfile from "@/components/Profile";
import VisitingAdvice from "@/components/VisitingAdvice";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(
    "Fernilee Reservoir Circular from Goyt Valley"
  );

  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [weekDay, setWeekDay] = useState("Today");

  const [activeView, setActiveView] = useState("weather");

  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(savedBookmarks);
  }, []);

  // Derived state: is current location bookmarked?
  const isBookmarked = bookmarks.includes(location);

  const handleBookmark = () => {
    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter((b) => b !== location);
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    } else {
      // Add bookmark
      const updatedBookmarks = [...bookmarks, location];
      setBookmarks(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    }
  };

  const removeBookmark = (loc) => {
    const updatedBookmarks = bookmarks.filter((b) => b !== loc);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  const loadBookmark = (loc) => {
    setLocation(loc);

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max&current=temperature_2m`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setCurrentDayIndex(0);
        setWeekDay("Today");
      });
  };

  const handleBackToWeather = () => {
    setActiveView("weather");
  };

  const profileView = () => {
    setActiveView("profile");
  };

  const adviceView = () => {
    setActiveView("advice");
  };

  const getWeekDayName = (dateString, index) => {
    if (index === 0) return "Today";
    if (index === 1) return "Tmrw";

    return new Date(dateString).toLocaleDateString("en-GB", {
      weekday: "short",
    });
  };

  const selectDay = (index) => {
    setCurrentDayIndex(index);
    const newWeekDay = getWeekDayName(weatherData.daily.time[index], index);
    setWeekDay(newWeekDay);
  };

  return (
    <div className="site-container">
      <div className="menu">
        <NavBar
          visitingAdvice={adviceView}
          onImageClick={handleBackToWeather}
        />
        <div className="search">
          <DropDown
            handleWeatherData={(data) => setWeatherData(data)}
            handleLocationChange={(data) => setLocation(data)}
            onImageClick={profileView}
          />
        </div>
      </div>

      <div className="content-container">
        {activeView === "weather" ? (
          <div className="content">
            <div className="location">
              <h2 className="text-xl text-gray-700 mb-4">{location}</h2>
              <h2 className="text-xl text-gray-700 mb-4">
                {weekDay === "Tmrw" ? "Tomorrow" : weekDay}
              </h2>
            </div>

            <DayCard
              key={
                weatherData
                  ? weatherData.daily.time[currentDayIndex]
                  : "initial"
              }
              currentTemp={
                weatherData
                  ? weatherData.daily.temperature_2m_max[currentDayIndex]
                  : ""
              }
              maxTemp={
                weatherData
                  ? weatherData.daily.temperature_2m_max[currentDayIndex]
                  : ""
              }
              minTemp={
                weatherData
                  ? weatherData.daily.temperature_2m_min[currentDayIndex]
                  : ""
              }
              windSpeed={
                weatherData
                  ? weatherData.daily.wind_speed_10m_max[currentDayIndex]
                  : ""
              }
              weatherDescription={getWeatherDescription(
                weatherData
                  ? weatherData.daily.weather_code[currentDayIndex]
                  : ""
              )}
              weatherCode={
                weatherData
                  ? weatherData.daily.weather_code[currentDayIndex]
                  : ""
              }
            />

            <div className="weekly-cards">
              {!weatherData ? (
                <p>Loading weather...</p>
              ) : (
                <div className="flex-item">
                  <ul className="text-gray-400">
                    {weatherData.daily.time.map((day, index) => (
                      <li
                        key={index}
                        onClick={() => selectDay(index)}
                        className={`cursor-grab p-2 rounded-md 
                          ${
                            currentDayIndex === index
                              ? "bg-emerald-500 bg-opacity-50 text-white"
                              : "bg-none text-gray-500 hover:bg-gray-500 hover:text-white"
                          }`}
                      >
                        <h3 className="weekly-cards">
                          {getWeekDayName(day, index)}
                        </h3>
                        {getWeekDayName(day, index) === "Today"
                          ? `Now: ${weatherData.current.temperature_2m}°C `
                          : null}
                        Max: {weatherData.daily.temperature_2m_max[index]}°C
                        <br />
                        Min: {weatherData.daily.temperature_2m_min[index]}°C
                        <br />
                        Wind: {weatherData.daily.wind_speed_10m_max[index]} mph
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {activeView === "profile" && (
              <UserProfile
                bookmarks={bookmarks}
                removeBookmark={removeBookmark}
                onBack={() => setActiveView("weather")}
              />
            )}

            {activeView === "advice" && (
              <VisitingAdvice onBack={() => setActiveView("weather")} />
            )}
          </>
        )}

        <div className="more-info gap-2 mt-4">
          <span
            onClick={handleBookmark}
            className={`px-3 py-1 rounded cursor-pointer 
              ${
                isBookmarked
                  ? "bg-gray-500 text-white hover:bg-gray-600"
                  : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
          >
            {isBookmarked ? "remove bookmark" : "bookmark location"}
          </span>

          <span className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-600">
            a history of location
          </span>

          <span
            className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-600"
            onClick={adviceView}
          >
            visiting advice
          </span>
        </div>
      </div>
    </div>
  );
}
