// import React, { useState } from 'react';
// import { Heart, Moon, Sun, Menu, UserCircle, LogOut, User,LayoutDashboard } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleDarkMode } from '../redux/slices/themeSlice';
// import { logout } from '../redux/slices/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Header = ({ onAuthClick }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { darkMode } = useSelector((state) => state.theme);
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const [showMenu, setShowMenu] = useState(false);

//   const handleLogout = () => {
//     dispatch(logout());
//     setShowMenu(false);
//   };

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 shadow-lg transition-all duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3 animate-slideIn">
//             <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400 animate-pulse" />
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//               VolunteerConnect
//             </h1>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => dispatch(toggleDarkMode())}
//               className="p-3 rounded-full transition-all duration-300 transform hover:scale-110 bg-gray-800 text-yellow-400 dark:bg-yellow-400 dark:text-gray-900"
//             >
//               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </button>

//             {isAuthenticated ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowMenu(!showMenu)}
//                   className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
//                 >
//                   <UserCircle className="w-5 h-5" />
//                   <span className="hidden sm:inline">{user?.name}</span>
//                   <Menu className="w-4 h-4" />
//                 </button>

//                 {showMenu && (
//                   <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-2 bg-white dark:bg-gray-700 animate-fadeIn">
//                     <button
//                       onClick={() => {
//                         navigate('/dashboard');
//                         setShowMenu(false);
//                       }}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-900 dark:text-white"
//                     >
//                       <LayoutDashboard className="w-4 h-4" />
//                       Dashboard
//                     </button>
//                     <button
//                       onClick={() => {
//                         navigate('/profile');
//                         setShowMenu(false);
//                       }}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-900 dark:text-white"
//                     >
//                       <User className="w-4 h-4" />
//                       Profile
//                     </button>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-red-600 dark:text-red-400"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={onAuthClick}
//                 className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all duration-300 transform hover:scale-105"
//               >
//                 Login / Sign Up
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
// import React, { useState } from 'react';
// import { Heart, Moon, Sun, Menu, UserCircle, LogOut, User, LayoutDashboard, Search } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toggleDarkMode } from '../redux/slices/themeSlice';
// import { logout } from '../redux/slices/authSlice';

// const Header = ({ onAuthClick }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { darkMode } = useSelector((state) => state.theme);
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const [showMenu, setShowMenu] = useState(false);

//   const handleLogout = () => {
//     dispatch(logout());
//     setShowMenu(false);
//     navigate('/');
//   };

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Opportunities', path: '/opportunities' },
//   ];

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 shadow-lg transition-all duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div 
//             className="flex items-center space-x-3 animate-slideIn cursor-pointer"
//             onClick={() => navigate('/')}
//           >
//             <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400 animate-pulse" />
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//               VolunteerConnect
//             </h1>
//           </div>

//           {/* Navigation Links - Desktop */}
//           <nav className="hidden md:flex items-center gap-6">
//             {navLinks.map((link) => (
//               <button
//                 key={link.path}
//                 onClick={() => navigate(link.path)}
//                 className={`text-sm font-medium transition-all duration-300 ${
//                   location.pathname === link.path
//                     ? 'text-purple-600 dark:text-purple-400'
//                     : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
//                 }`}
//               >
//                 {link.name}
//               </button>
//             ))}
//           </nav>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-4">
//             {/* Dark Mode Toggle */}
//             <button
//               onClick={() => dispatch(toggleDarkMode())}
//               className="p-3 rounded-full transition-all duration-300 transform hover:scale-110 bg-gray-800 text-yellow-400 dark:bg-yellow-400 dark:text-gray-900"
//             >
//               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </button>

//             {/* User Menu or Login Button */}
//             {isAuthenticated ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowMenu(!showMenu)}
//                   className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
//                 >
//                   <UserCircle className="w-5 h-5" />
//                   <span className="hidden sm:inline">{user?.name}</span>
//                   <Menu className="w-4 h-4" />
//                 </button>

//                 {showMenu && (
//                   <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-2 bg-white dark:bg-gray-700 animate-fadeIn">
//                     <button 
//                       onClick={() => {
//                         navigate('/dashboard');
//                         setShowMenu(false);
//                       }}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-900 dark:text-white"
//                     >
//                       <LayoutDashboard className="w-4 h-4" />
//                       Dashboard
//                     </button>
//                     <button 
//                       onClick={() => {
//                         navigate('/profile');
//                         setShowMenu(false);
//                       }}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-900 dark:text-white"
//                     >
//                       <User className="w-4 h-4" />
//                       Profile
//                     </button>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-red-600 dark:text-red-400"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={onAuthClick}
//                 className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all duration-300 transform hover:scale-105"
//               >
//                 Login / Sign Up
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { Heart, Moon, Sun, Menu, UserCircle, LogOut, User, LayoutDashboard, Search, Plus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toggleDarkMode } from '../redux/slices/themeSlice';
import { logout } from '../redux/slices/authSlice';

const Header = ({ onAuthClick, onCreateClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useSelector((state) => state.theme);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowMenu(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Opportunities', path: '/opportunities' },
    { name: 'Organizations', path: '/organizations' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 animate-slideIn cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400 animate-pulse" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              VolunteerConnect
            </h1>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-sm font-medium transition-all duration-300 ${location.pathname === link.path
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Create Button (only for authenticated users) */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  console.log('Create button clicked in Header'); // Debug log
                  onCreateClick && onCreateClick(); // Make sure onCreateClick is called
                }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Create
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-3 rounded-full transition-all duration-300 transform hover:scale-110 bg-gray-800 text-yellow-400 dark:bg-yellow-400 dark:text-gray-900"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Menu or Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <UserCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">{user?.name}</span>
                  <Menu className="w-4 h-4" />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-2 bg-white dark:bg-gray-700 animate-fadeIn">
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-900 dark:text-white"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-gray-900 dark:text-white"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    {/* Mobile Create Button */}
                    <button
                      onClick={() => {
                        onCreateClick();
                        setShowMenu(false);
                      }}
                      className="sm:hidden w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-green-600 dark:text-green-400"
                    >
                      <Plus className="w-4 h-4" />
                      Create Opportunity
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 text-red-600 dark:text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all duration-300 transform hover:scale-105"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;