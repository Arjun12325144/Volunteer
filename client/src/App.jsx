// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Home from './pages/Home';
// import Opportunities from './pages/Opportunities';
// import Profile from './pages/Profile';
// import Dashboard from './pages/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   const { darkMode } = useSelector((state) => state.theme);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/opportunities" element={<Opportunities />} />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Opportunities from './pages/Opportunities';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Organizations from './pages/Organizations';

function App() {
  const { darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/organizations" element={<Organizations />} />
      </Routes>
    </Router>
  );
}

export default App;