import Link from "next/link";

export default function Navbar() {
  return (
    <div className="nav-content">
      <nav className="text-white py-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">
            <img src="/logo.png" alt="Awesome Weather App Logo" />
          </div>
          <div className="space-x-6"></div>
        </div>
      </nav>
    </div>
  );
}
