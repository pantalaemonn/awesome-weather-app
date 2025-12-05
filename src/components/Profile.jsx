export default function UserProfile({ bookmarks, removeBookmark, onBack }) {
  return (
    <>
      <div className="content fade-in">
        <div className="page-title">
          <h1>user profile</h1>
        </div>
        <div className="user-profile">
          <div className="pl-6 pt-4">
            <h2>Hey, User339.</h2>
            <p>
              All the locations you bookmark will be stored here for easy access
              later!
            </p>
            <div className="bookmarks">
              <h3>Saved Locations</h3>
              <ul>
                {bookmarks.map((loc, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>{loc}</span>
                    <button
                      onClick={() => removeBookmark(loc)}
                      className="bg-gray-600 text-gray-200 hover:text-gray-400 px-2 py-1 rounded-md pl-4 pr-4 pointer cursor-pointer"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={onBack}
              className="mt-4 px-4 py-2 bg-emerald-500 text-white"
            >
              Back to Weather
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
