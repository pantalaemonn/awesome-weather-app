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
    <div className="fade-in">
      <div className="parent">
        <div className="div1">
          <span
            className="weathericon icon text-4xl text-emerald-500 stagger-item-left" style={{ "--stagger-index": 1}}
            data-icon={iconChar}
          ></span>
          <p className="archivo-header pr-4 stagger-item-left" style={{ "--stagger-index": 1}}>
            {currentTemp}
            <span>°c</span>
          </p>
        </div>
        <div className="div2">
          <p className={`stagger-item-right text-gray-400`} style={{ "--stagger-index": 3}}>
            Min: {minTemp}°c / Max: {maxTemp}°c
          </p>
        </div>
        <div className="div3">
          <p className={`stagger-item-right text-gray-400`} style={{ "--stagger-index": 4}}>Wind: {windSpeed} mph</p>
        </div>
        <div className="div4">
          <p className={`stagger-item-right text-gray-400`} style={{ "--stagger-index": 5}}>{weatherDescription}</p>
        </div>
      </div>
    </div>
  );
}
