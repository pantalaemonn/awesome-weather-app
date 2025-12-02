export default function DayCard({
  day,
  weekday,
  maxTemp,
  minTemp,
  rain,
  windSpeed,
  snowfall,
}) {
  return (
    <div className="grid">
      <div className="w-[900px] text-2xl p-4 border-1 border-gray-400 rounded-lg shadow-sm fade-in">
        <h2 className="text-4xl font-semibold mb-2 text-gray-400">{weekday}</h2>
        <p className="text-gray-400">Date: {day}</p>
        <p className="text-gray-400">Max Temp: {maxTemp}°C</p>
        <p className="text-gray-400">Min Temp: {minTemp}°C</p>
        <p className="text-gray-400">Rain: {rain} mm</p>
        <p className="text-gray-400">Wind: {windSpeed} mph</p>
        <p className="text-gray-400">Snowfall: {snowfall} cm</p>
      </div>
    </div>
  );
}
