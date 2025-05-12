// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
import Pricing from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import UserProfileDetail from "./pages/UserProfileDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserDetail from "./pages/AdminUserDetail";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ContactUs from "./pages/ContactUs";

// Helper component to check regular user auth for certain routes
const UserProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    ); // Centered spinner
  }
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

// Layout component to conditionally render Navbar/Footer
const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div
      className={`min-h-screen flex flex-col ${!isAdminRoute ? "pt-20" : ""}`}
    >
      {!isAdminRoute && <Navbar />}
      <div className="flex-grow">
        <Outlet /> {/* Child routes will render here */}
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

// Main App Component
function App() {
  // Removed API test useEffect as it's likely not needed ongoing
  // useEffect(() => {
  //   const testApi = async () => {
  //     console.log("Testing API connection...");
  //     const results = await runApiTests();
  //     console.log("API test results:", results);
  //   };
  //   testApi();
  // }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route element={<Layout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* User Protected Routes */}
            <Route element={<UserProtectedRoute />}>
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/profile/:userId" element={<UserProfileDetail />} />
              {/* Add other user-only routes here */}
            </Route>
          </Route>

          {/* Admin Routes (No default Layout, Navbar/Footer handled within) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users/:userId" element={<AdminUserDetail />} />
            {/* Add other admin-only routes here */}
          </Route>

          {/* Catch-all or Not Found Route (Optional) */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
