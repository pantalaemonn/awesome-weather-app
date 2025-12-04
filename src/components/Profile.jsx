export default function UserProfile({ onBack }) {
  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <p>This is the user profile component.</p>
      <button
        onClick={onBack}
        className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md"
      >
        Back to Weather
      </button>
    </div>
  );
}
