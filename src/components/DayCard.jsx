export default function DayCard({
  day,
  weekday,
  maxTemp,
  minTemp,
  windSpeed,
  weatherDescription,
  currentTemp,
}) {
  return (
    <div className="parent">
      <div className="div1">
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
    </div>
  );
}
