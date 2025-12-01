export default function DayCard({ day,  maxTemp, minTemp, rain, showers, windSpeed, gusts, snowfall }) {
    return (
        <div className="p-4 grid justify-center">
            <div className="w-[800px] text-2xl p-4 border-1 border-gray-300 rounded-lg shadow-sm">
                <h2 className="text-4xl font-semibold mb-2 text-gray-600">Today</h2>
                <p className="">Date: {day}</p>
                <p className="">Max Temp: {maxTemp}°C</p>
                <p className="">Min Temp: {minTemp}°C</p>
                <p className="">Rain: {rain} mm</p>
                <p className="">Showers: {showers} mm</p>
            </div>
        </div>
    )
}