// src/components/NavBar.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  User,
  Menu as MenuIcon,
  X,
  LogIn,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";

const NavBar = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const userIdx = localStorage.getItem("userIdx");

  const navLinks = (() => {
    const common = [
      { name: "Home", path: "/", icon: <Home size={18} /> },
      { name: "Profile", path: "/profile", icon: <User size={18} /> },
    ];
    if (userRole === "patient") {
      return [...common, { name: "My Requests", path: "/requests", icon: <Users size={18}/> }];
    }
    if (userRole === "donor") {
      return [
        ...common,
        { name: "Available Requests", path: "/requests", icon: <Users size={18}/> },
        { name: "Donation History", path: "/history", icon: <Users size={18}/> },
      ];
    }
    if (userRole === "bloodbank") {
      return [
        ...common,
        { name: "Requests", path: "/requests", icon: <Users size={18}/> },
        { name: "Stock", path: "/stock", icon: <Users size={18}/> },
      ];
    }
    return common;
  })();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container  mx-auto px-4 sm:px-6 md:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <div className="h-10 w-10 rounded-full flex items-center justify-center mr-2 bg-gradient-to-br from-blood-red-100 to-blood-red-200">
                {/* SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#b91c1c"
                  strokeWidth={1.5}
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v0c0 3.866-3.582 7-8 7 0 6 8 11 8 11s8-5 8-11c-4.418 0-8-3.134-8-7z"
                    fill="#b91c1c"
                  />
                </svg>
              </div>
            </Link>
            <span className="text-blood-red-800 font-semibold text-xl">
              BloodLink
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-blood-red-100 text-blood-red-800"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blood-red-700"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Auth buttons */}
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">Welcome, {userIdx}</span>
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    navigate("/auth/login");
                  }}
                  className="flex items-center gap-1"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="flex items-center gap-1 text-blood-red-700 hover:bg-blood-red-50"
                  onClick={() => navigate("/auth/login")}
                >
                  <LogIn size={16} />
                  Login
                </Button>
                <Button
                  variant="default"
                  className="flex items-center gap-1 bg-blood-red-100 text-blood-red-800 hover:bg-blood-red-200"
                  onClick={() => navigate("/auth/register")}
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen((o) => !o)}
              className="p-2 rounded-lg hover:bg-blood-red-50 focus:outline-none"
            >
              {isOpen ? <X size={24} color="#b91c1c" /> : <MenuIcon size={24} color="#b91c1c" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-sm">
          <div className="pt-3 pb-5 px-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-blood-red-100 text-blood-red-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {isAuthenticated ? (
              <Button
                variant="outline"
                className="w-full flex items-center gap-1"
                onClick={() => {
                  logout();
                  navigate("/auth/login");
                }}
              >
                <LogOut size={16} />
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-1 text-blood-red-700 hover:bg-blood-red-50"
                  onClick={() => navigate("/auth/login")}
                >
                  <LogIn size={16} />
                  Login
                </Button>
                <Button
                  variant="default"
                  className="w-full flex items-center gap-1 bg-blood-red-100 text-blood-red-800 hover:bg-blood-red-200"
                  onClick={() => navigate("/auth/register")}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
