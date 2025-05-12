import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the auth context
const AuthContext = createContext();

// Export API_URL for use in components
export const API_URL = "https://slvnk-backend.onrender.com/api"; // Ensure this matches your backend

// For debugging API calls
const DEBUG_API = true;

// Key for storing token in localStorage - DEFINED EARLY
const TOKEN_STORAGE_KEY = "authToken";

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  // Removed withCredentials, not typically needed with Bearer tokens
  // unless dealing with specific CORS cookie scenarios not apparent here.
  // withCredentials: true,
  headers: {
    // Default Content-Type removed here, will be set by interceptor
    // "Content-Type": "application/json",
  },
  timeout: 10000,
});

// --- Axios Request Interceptor ---
// Add a request interceptor to automatically add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // IMPORTANT: Do NOT set Content-Type if data is FormData
    // The browser needs to set it automatically with the correct boundary
    if (!(config.data instanceof FormData) && !config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// --------------------------------

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_STORAGE_KEY) // Uses correctly defined constant
  ); // Initialize token state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch user data when token changes or on initial load
  useEffect(() => {
    const fetchUserData = async () => {
      const currentToken = localStorage.getItem(TOKEN_STORAGE_KEY); // Uses correctly defined constant
      if (currentToken) {
        if (DEBUG_API)
          console.log("AuthContext: Token found, fetching user data...");
        setIsLoading(true);
        try {
          const response = await api.get("/profiles/me");
          if (response.data && response.data.success) {
            if (DEBUG_API)
              console.log(
                "AuthContext: User data fetched:",
                response.data.user
              );
            setUser(response.data.user);
          } else {
            if (DEBUG_API)
              console.warn(
                "AuthContext: Failed to fetch user data with token.",
                response.data
              );
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            setToken(null);
            setUser(null);
          }
        } catch (err) {
          console.error(
            "AuthContext: Error fetching user data:",
            err.response?.data || err.message
          );
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          setToken(null);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        if (DEBUG_API)
          console.log("AuthContext: No token found, user not logged in.");
        setUser(null);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // Function to set token in state and localStorage
  const saveToken = (newToken) => {
    if (newToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    setToken(newToken);
  };

  // Register user - Updated to handle FormData
  const register = async (formData) => {
    // Expecting FormData object
    setIsLoading(true);
    setError(null);
    try {
      if (DEBUG_API) {
        // Log FormData entries (requires iterating)
        console.log("Registering user with FormData:");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value instanceof File ? value.name : value}`);
        }
      }

      // Send FormData - Content-Type will be set automatically by browser/axios
      const response = await api.post("/auth/register", formData);

      if (DEBUG_API) console.log("Registration response:", response.data);

      if (response.data && response.data.success && response.data.token) {
        saveToken(response.data.token); // Save token, user data will be fetched by useEffect
        // We don't set user state directly here anymore, rely on token change effect
        return {
          success: true,
          token: response.data.token,
          user: response.data.user, // Send back user data for immediate use if needed
        };
      } else {
        const message = response.data?.message || "Registration failed";
        const errors = response.data?.errors; // Get structured errors
        setError(message);
        // Return structured errors for the form
        return { success: false, message, errors };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Registration failed due to network or server error";
      const errors = err.response?.data?.errors; // Get structured errors from response
      if (DEBUG_API)
        console.error("Registration error:", err.response?.data || err);
      setError(errorMessage);
      // Return structured errors for the form
      return { success: false, message: errorMessage, errors };
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      if (DEBUG_API) console.log("Logging in with email:", email);
      const response = await api.post("/auth/login", { email, password });
      if (DEBUG_API) console.log("Login response:", response.data);
      if (response.data && response.data.success && response.data.token) {
        saveToken(response.data.token);
        return { success: true, user: response.data.user };
      } else {
        const message = response.data?.message || "Login failed";
        setError(message);
        return { success: false, message };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed due to network or server error";
      if (DEBUG_API)
        console.error("Login error:", err.response?.data || err.message);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    if (DEBUG_API) console.log("Logging out user");
    saveToken(null);
    setUser(null);
  };

  // --- Upload Profile Picture Function ---
  const uploadProfilePicture = async (file) => {
    if (!file) return { success: false, message: "No file provided." };
    const formData = new FormData();
    formData.append("profileImage", file);
    setIsLoading(true);
    setError(null);
    try {
      if (DEBUG_API) console.log("Uploading profile picture...");
      const response = await api.post("/profiles/me/upload-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (DEBUG_API) console.log("Upload response:", response.data);
      if (response.data && response.data.success) {
        updateUserData(response.data.user);
        return {
          success: true,
          user: response.data.user,
          filePath: response.data.filePath,
        };
      } else {
        const message = response.data?.message || "Upload failed";
        setError(message);
        return { success: false, message };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Upload failed due to network or server error";
      if (DEBUG_API)
        console.error("Upload error:", err.response?.data || err.message);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  // ------------------------------------

  // --- Update Profile Details Function ---
  const updateProfileDetails = async (profileData) => {
    setIsLoading(true);
    setError(null);
    try {
      if (DEBUG_API)
        console.log("Updating profile details with data:", profileData);
      // Assuming the endpoint to update profile details is PUT /profiles/me
      const response = await api.put("/profiles/me", profileData);
      if (DEBUG_API) console.log("Profile update response:", response.data);

      if (response.data && response.data.success) {
        updateUserData(response.data.user); // Update local state on success
        return { success: true, user: response.data.user };
      } else {
        const message = response.data?.message || "Profile update failed";
        setError(message);
        return { success: false, message };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Profile update failed due to network or server error";
      if (DEBUG_API)
        console.error(
          "Profile update error:",
          err.response?.data || err.message
        );
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  // --------------------------------------

  // Update user data (locally in state, e.g., after profile edit FORM submit or API success)
  const updateUserData = (updatedFields) => {
    setUser((currentUser) => {
      if (!currentUser) return null;
      const updatedUser = { ...currentUser, ...updatedFields };
      if (DEBUG_API)
        console.log("AuthContext: Updating local user state:", updatedUser);
      return updatedUser;
    });
  };

  // Check if user is authenticated (user object exists)
  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        register,
        logout,
        updateUserData,
        isAuthenticated,
        uploadProfilePicture,
        updateProfileDetails, // <-- Add the new function here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
