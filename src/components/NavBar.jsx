import Link from "next/link";

export default function Navbar() {
  return (
    <div className="nav-container">
      <div className="nav-content">
        <nav className="bg-black text-white py-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">Awesome Weather App</div>
            <div className="space-x-6">
              <Link href="../app/pages" className="hover:text-gray-200">
                About
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
