import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StrangerThingsLogo } from './StrangerThingsLogo';
import { useAuth } from '../context/AuthContext';
import alkemyLogo from '../../assets/alkemy_logo_no_bg.png';

interface HeaderProps {
  onFlip: (flipped: boolean) => void;
}

export function Header({ onFlip }: HeaderProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => {
    const newState = !isFlipped;
    setIsFlipped(newState);
    onFlip(newState);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a] border-b-2 border-red-600/50 shadow-[0_4px_20px_rgba(220,38,38,0.2)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
            {/* Logo - Left - Larger size */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className="relative">
                  <img 
                    src={alkemyLogo} 
                    alt="Alkemy Logo" 
                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain opacity-90 hover:opacity-100 transition-opacity" 
                  />
                </div>
              </Link>
            </div>

            {/* Mobile Navigation - Always visible on small screens */}
            <div className="flex items-center space-x-2 lg:hidden">
              {/* User Status - Mobile */}
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-1">
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="text-xs bg-red-600 px-2 py-1 rounded text-white hover:bg-red-700 transition-colors"
                    >
                      ADMIN
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-xs text-gray-400 hover:text-red-400 transition-colors px-2 py-1"
                  >
                    LOGOUT
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="text-xs bg-red-600 px-2 py-1 rounded text-white hover:bg-red-700 transition-colors"
                >
                  LOGIN
                </Link>
              )}

              {/* Upside Down Switch - Mobile - Exact Alkemy Version */}
              <div className="flex items-center">
                <span className="text-xs text-red-500/80 tracking-widest font-bold uppercase hidden sm:block mr-2">UPSIDE DOWN</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isFlipped}
                    onChange={handleToggle}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 rounded-lg hover:bg-red-900/30 transition-colors"
                style={{ minHeight: '40px', minWidth: '40px' }}
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-5 relative flex flex-col justify-center">
                  <span className={`absolute h-0.5 w-full bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`} />
                  <span className={`absolute h-0.5 w-full bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`} />
                  <span className={`absolute h-0.5 w-full bg-white transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`} />
                </div>
              </button>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {['HOME', 'EVENTS', 'SCHEDULE', 'PAST EVENTS', 'SPONSORS', 'ABOUT US'].map((item) => {
                let path = '/';
                if (item === 'HOME') path = '/';
                else if (item === 'ABOUT US') path = '/about';
                else path = `/${item.toLowerCase().replace(' ', '-')}`;

                const isActive = location.pathname === path;

                return (
                  <Link
                    key={item}
                    to={path}
                    className={`relative transition-all duration-300 tracking-wider text-sm xl:text-base font-bold group ${
                      isActive ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
                    }`}
                    style={{
                      letterSpacing: '0.05em',
                      textShadow: isActive
                        ? '0 0 15px rgba(220, 38, 38, 0.6), 0 0 5px rgba(220, 38, 38, 0.4)'
                        : '0 0 5px rgba(255, 0, 0, 0)',
                    }}
                  >
                    {item}
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>
                );
              })}
            </nav>

            {/* Right Side - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* User Status - Desktop */}
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm text-red-400 font-bold truncate max-w-[100px]">{user.full_name}</div>
                    <div className="text-xs text-gray-400">{user.role.toUpperCase()}</div>
                  </div>
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="text-sm bg-red-600 px-3 py-1.5 rounded text-white hover:bg-red-700 transition-colors"
                    >
                      ADMIN
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors px-3 py-1.5"
                  >
                    LOGOUT
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="text-sm bg-red-600 px-3 py-1.5 rounded text-white hover:bg-red-700 transition-colors"
                >
                  LOGIN
                </Link>
              )}

              {/* Flip Toggle - Desktop - Exact Alkemy Version */}
              <div className="flex items-center">
                <span className="text-sm text-red-500/80 tracking-widest font-bold uppercase mr-2">UPSIDE DOWN</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isFlipped}
                    onChange={handleToggle}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={handleMobileMenuToggle}
        />
      )}

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-[#0a0e1a] border-l-2 border-red-600/50 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-red-900/30">
            <h2 className="text-red-500 font-bold text-lg">Menu</h2>
            <button
              onClick={handleMobileMenuToggle}
              className="p-2 rounded-lg hover:bg-red-900/30 transition-colors"
              style={{ minHeight: '44px', minWidth: '44px' }}
              aria-label="Close mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {['HOME', 'EVENTS', 'SCHEDULE', 'PAST EVENTS', 'SPONSORS', 'ABOUT US'].map((item) => {
                let path = '/';
                if (item === 'HOME') path = '/';
                else if (item === 'ABOUT US') path = '/about';
                else path = `/${item.toLowerCase().replace(' ', '-')}`;

                const isActive = location.pathname === path;

                return (
                  <Link
                    key={item}
                    to={path}
                    onClick={handleNavLinkClick}
                    className={`block py-3 px-4 rounded-lg transition-all duration-300 tracking-wider font-medium text-sm ${
                      isActive
                        ? 'text-red-500 bg-red-900/30 border-l-4 border-red-500'
                        : 'text-gray-300 hover:text-red-500 hover:bg-red-900/20'
                    }`}
                    style={{ minHeight: '48px' }}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Mobile User Status */}
          <div className="border-t border-red-900/30 p-4">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-red-400 font-bold">{user.full_name}</div>
                  <div className="text-xs text-gray-400">{user.role.toUpperCase()}</div>
                </div>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    onClick={handleNavLinkClick}
                    className="block w-full bg-red-600 px-4 py-3 rounded-lg text-white hover:bg-red-700 transition-colors text-center font-medium"
                    style={{ minHeight: '48px' }}
                  >
                    ADMIN DASHBOARD
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full bg-gray-700 px-4 py-3 rounded-lg text-white hover:bg-gray-600 transition-colors text-center font-medium"
                  style={{ minHeight: '48px' }}
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                onClick={handleNavLinkClick}
                className="block w-full bg-red-600 px-4 py-3 rounded-lg text-white hover:bg-red-700 transition-colors text-center font-medium"
                style={{ minHeight: '48px' }}
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Add CSS for the exact Alkemy switch
const switchStyles = `
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #333;
    transition: .4s;
    border-radius: 34px;
    border: 1px solid #555;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #f56d6d;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
`;

// Inject styles into the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = switchStyles;
  document.head.appendChild(styleSheet);
}
