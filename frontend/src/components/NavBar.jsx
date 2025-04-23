
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, User, Menu as MenuIcon, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = (() => {
    const commonLinks = [
      { name: 'Home', path: '/', icon: <Home size={18}/> },
      { name: 'Profile', path: '/profile', icon: <User size={18}/> },
    ];

    switch(userRole) {
      case 'patient':
        return [
          ...commonLinks,
          { name: 'My Requests', path: '/requests', icon: <Users size={18}/> },
        ];
      case 'donor':
        return [
          ...commonLinks,
          { name: 'Available Requests', path: '/requests', icon: <Users size={18} /> },
          { name: 'Donation History', path: '/history', icon: <Users size={18} /> },
        ];
      case 'bloodbank':
        return [
          ...commonLinks,
          { name: 'Requests', path: '/requests', icon: <Users size={18} /> },
          { name: 'Stock', path: '/stock', icon: <Users size={18} /> },
        ];
      default:
        return commonLinks;
    }
  })();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          {/* Brand/Logo */}
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full flex items-center justify-center mr-2 bg-gradient-to-br from-blood-red-100 to-blood-red-200 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#b91c1c"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v0c0 3.866-3.582 7-8 7 0 6 8 11 8 11s8-5 8-11c-4.418 0-8-3.134-8-7z" fill="#b91c1c"/>
              </svg>
            </div>
            <span className="text-blood-red-800 font-semibold text-xl tracking-tight">BloodLink</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${location.pathname === link.path
                    ? 'bg-blood-red-100 text-blood-red-800'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blood-red-700'}
                `}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Authentication Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="text-blood-red-700 hover:bg-blood-red-50 border-blood-red-100"
                onClick={() => window.location.href = '/auth/login'}
                as={Link}
                to="/auth/login"
              >
                <LogIn size={16} className="mr-2" />
                Login
              </Button>
              <Button 
                variant="default" 
                className="bg-blood-red-100 text-blood-red-800 hover:bg-blood-red-200"
                onClick={() => window.location.href = '/auth/register'}
                as={Link}
                to="/auth/register"
              >
                Register
              </Button>
            </div>

            {/* User Avatar */}
            {userRole && (
              <div className="ml-4 flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full border-2 border-blood-red-100 shadow-sm object-cover"
                  draggable={false}
                />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-blood-red-50 focus:outline-none focus:ring-2 focus:ring-blood-red-200"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X size={28} color="#b91c1c"/> : <MenuIcon size={28} color="#b91c1c"/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${isOpen ? 'block animate-fade-in' : 'hidden'} md:hidden bg-white shadow-sm`}>
        <div className="pt-3 pb-5 px-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-2 py-3 rounded-lg text-base font-medium w-full transition-colors
                ${location.pathname === link.path
                  ? 'bg-blood-red-100 text-blood-red-800'
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
          
          {/* Mobile Authentication Buttons */}
          <div className="flex flex-col gap-2 mt-4">
            <Button 
              variant="outline" 
              className="text-blood-red-700 hover:bg-blood-red-50 border-blood-red-100 w-full"
              onClick={() => window.location.href = '/auth/login'}
              as={Link}
              to="/auth/login"
            >
              <LogIn size={16} className="mr-2" />
              Login
            </Button>
            <Button 
              variant="default" 
              className="bg-blood-red-100 text-blood-red-800 hover:bg-blood-red-200 w-full"
              onClick={() => window.location.href = '/auth/register'}
              as={Link}
              to="/auth/register"
            >
              Register
            </Button>
          </div>

          {/* Mobile User Avatar */}
          {userRole && (
            <div className="flex items-center gap-3 mt-4 pl-2">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="User Avatar"
                className="h-9 w-9 rounded-full border-2 border-blood-red-100 shadow object-cover"
                draggable={false}
              />
              <span className="font-semibold text-blood-red-800">Welcome</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
