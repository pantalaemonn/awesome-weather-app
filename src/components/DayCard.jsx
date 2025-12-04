import { weatherCodeToIcon } from "@/utils/weatherIcons";

export default function DayCard({
  currentTemp,
  maxTemp,
  minTemp,
  windSpeed,
  weatherCode,
  weatherDescription,
}) {
  const iconChar = weatherCodeToIcon[weatherCode] || "B"; // fallback icon
  return (
    <div className="parent">
      <div className="div1">
        <span
          className="weathericon icon text-4xl text-emerald-500"
          data-icon={iconChar}
        ></span>
        <p className="archivo-header pr-4">
          {currentTemp}
          <span>°c</span>
        </p>
      </div>
      <div className="div2">
        <p className="text-gray-400">
          Min: {minTemp}°c / Max: {maxTemp}°c
        </p>
      </div>
      <div className="div3">
        <p className="text-gray-400">Wind: {windSpeed} mph</p>
      </div>
      <div className="div4">
        <p className="text-gray-400">{weatherDescription}</p>
      </div>
    </div>
  );
}
