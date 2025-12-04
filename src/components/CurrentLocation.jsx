export default function CurrentLocation({ day, weekday }) {
  return (
    <div className="grid">
      <div className="text-2xl p-4 border-1 border-gray-400 rounded-lg shadow-sm fade-in">
        <h2 className="text-gray-400">{weekday}</h2>
      </div>
    </div>
  );
}
