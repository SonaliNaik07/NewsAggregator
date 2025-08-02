// src/ProtectedRoute.tsx
/*import React from 'react';
import { Navigate } from 'react-router-dom';
//import { useAuthState } from 'react-firebase-hooks/auth';
//import { auth } from './firebaseConfig'; // adjust if needed


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  //const [user, loading] = useAuthState(auth); // after firebase used
  const isLoggedIn = true; // set to false to test redirect

  if (loading) return <p>Checking credentials...</p>;
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
*/
// src/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = true; // flip to false to simulate redirect

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
