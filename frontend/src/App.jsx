import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import StudentDashboard from "./pages/students/dashboard";
import CompanyDashboard from "./pages/company/dashboard";
import CollegeDashboard from "./pages/college/dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // 'student', 'company', or 'college'

  // Protected Route component
  const ProtectedRoute = ({ children, allowedUserType }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (allowedUserType && userType !== allowedUserType) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const getDefaultRoute = () => {
    if (!isAuthenticated) return "/login";
    switch (userType) {
      case "student":
        return "/student";
      case "company":
        return "/company";
      case "college":
        return "/college";
      default:
        return "/login";
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <Login 
              setIsAuthenticated={setIsAuthenticated} 
              setUserType={setUserType} 
            />
          } 
        />
        <Route 
          path="/register" 
          element={
            <Register 
              setIsAuthenticated={setIsAuthenticated} 
              setUserType={setUserType} 
            />
          } 
        />

        {/* Protected Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedUserType="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company"
          element={
            <ProtectedRoute allowedUserType="company">
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college"
          element={
            <ProtectedRoute allowedUserType="college">
              <CollegeDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to={getDefaultRoute()} replace />}
        />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
