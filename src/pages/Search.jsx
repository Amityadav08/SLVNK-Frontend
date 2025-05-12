import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth, API_URL } from "../context/AuthContext";

// Define Theme Colors (Consistent with other pages)
const themeColors = {
  primary: "#800020", // Burgundy
  primaryDark: "#600018",
  primaryLight: "#9A2540",
  secondary: "#DAA520", // Gold
  secondaryLight: "#FFD700",
  secondaryDark: "#B8860B",
  textDark: "#1F2937",
  textMedium: "#4B5563",
  textLight: "#F9FAFB",
  bgWhite: "#FFFFFF",
  bgGray: "#F9FAFB",
  bgAccent: "#FFF8E1",
};

// --- Icons ---
const LocationPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-3.5 w-3.5 inline mr-1 text-gray-400 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline mr-1.5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
// Add other icons if used

// --- API Setup ---
const BACKEND_URL = API_URL.replace("/api", "");
const api = axios.create({ baseURL: API_URL });
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Reusable Helper Functions ---
const formatAge = (age) => {
  if (!age) return null;
  return `${age} ${age === 1 ? "yr" : "yrs"}`;
};

// --- UI Components ---

// Enhanced User Card Component
const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const imageUrl = user.profilePicture
    ? `${BACKEND_URL}${user.profilePicture}`
    : null;
  const placeholderImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name?.charAt(0) || "U"
  )}&background=f9f0f0&color=800020&size=128&bold=true`; // Updated placeholder with theme colors

  const handleViewProfile = () => {
    navigate(`/profile/${user._id}`);
  };

  // Format age
  const formattedAge = formatAge(user.age);

  // Extract key details for display
  const keyDetails = [];
  if (user.religion) keyDetails.push(user.religion);
  if (user.educationLevel) keyDetails.push(user.educationLevel);
  if (user.maritalStatus) keyDetails.push(user.maritalStatus);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer relative group"
      onClick={handleViewProfile}
      whileHover={{ y: -5 }}
    >
      {/* Premium badge if applicable */}
      {user.isPremium && (
        <div
          className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm"
          style={{
            backgroundColor: themeColors.secondary,
            color: themeColors.primaryDark,
          }}
        >
          Premium
      </div>
      )}

      {/* Image with gradient overlay */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
            <img
              src={imageUrl || placeholderImage}
          alt={`${user.name || "User"}'s profile picture`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />

        {/* Gradient overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Name and age overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3
            className="text-lg font-semibold leading-tight truncate"
            title={user.name}
          >
            {user.name || "Unnamed User"}
            {formattedAge && (
              <span className="ml-2 text-white/90">{formattedAge}</span>
            )}
          </h3>

          {user.location && (
            <div className="flex items-center text-xs text-white/80 mt-1">
              <LocationPinIcon />
              <span className="truncate" title={user.location}>
                {user.location}
              </span>
            </div>
          )}
          </div>
        </div>

      {/* Content section */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Key details pills */}
        {keyDetails.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {keyDetails.map((detail, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  backgroundColor: `${themeColors.primary}10`,
                  color: themeColors.primary,
                }}
              >
                {detail}
              </span>
            ))}
          </div>
        )}

        {/* Occupation */}
          {user.occupation && (
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <BriefcaseIcon />
            <span className="truncate" title={user.occupation}>
              {user.occupation}
            </span>
          </div>
        )}

        {/* Bio excerpt if available */}
        {user.bio && (
          <p className="text-xs text-gray-600 line-clamp-2 mb-3 italic">
            "{user.bio.substring(0, 100)}
            {user.bio.length > 100 ? "..." : ""}"
            </p>
          )}

        {/* View profile button */}
        <div className="mt-auto pt-2 border-t border-gray-100">
          <button
            className="w-full py-1.5 text-sm font-medium rounded transition-colors"
            style={{
              color: themeColors.primary,
              backgroundColor: `${themeColors.primary}08`,
            }}
          >
            View Full Profile
        </button>
        </div>
      </div>
    </motion.div>
  );
};

// Filters Component (Enhanced with accordion sections, better UX)
const Filters = ({ filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    personal: true,
    background: false, // Collapsed by default
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleAgeChange = (e) => {
    const { name, value } = e.target;
    const ageValue = value === "" ? "" : parseInt(value, 10);
    if (isNaN(ageValue) && value !== "") return;
    onFilterChange({ ...filters, [name]: ageValue });
  };

  // Function to clear all filters
  const clearFilters = () => {
    onFilterChange({}); // Pass empty object to reset
  };

  // Count active filters
  const activeFilterCount = Object.keys(filters).filter(
    (key) =>
      filters[key] !== "" && filters[key] !== null && filters[key] !== undefined
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 lg:h-auto overflow-hidden">
      {/* Header with counts and clear button */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
        <div>
          <h3
            className="text-lg font-semibold"
            style={{ color: themeColors.primaryDark }}
          >
            Filters
      </h3>
          {activeFilterCount > 0 && (
            <span className="text-xs text-gray-500">
              {activeFilterCount} active filter
              {activeFilterCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <button
          onClick={clearFilters}
          className="text-xs font-medium py-1 px-2 rounded-md transition-colors"
          style={{
            color:
              activeFilterCount > 0
                ? themeColors.primary
                : "rgb(156, 163, 175)",
            backgroundColor:
              activeFilterCount > 0
                ? `${themeColors.primary}10`
                : "transparent",
            cursor: activeFilterCount > 0 ? "pointer" : "default",
          }}
          disabled={activeFilterCount === 0}
        >
          Clear All
        </button>
      </div>

      <div className="p-4 space-y-1">
        {/* Basic Section - Always visible */}
        <div className="pb-3">
          <button
            onClick={() => toggleSection("basic")}
            className="flex justify-between w-full items-center text-left text-sm font-medium mb-2 text-gray-700 hover:text-gray-900"
          >
            <span>Basic Information</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${
                expandedSections.basic ? "transform rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {expandedSections.basic && (
            <div
              className="space-y-4 pt-1 pb-2 pl-2 border-l-2"
              style={{ borderColor: `${themeColors.primary}30` }}
            >
        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
                  Looking for
          </label>
          <select
            id="gender"
            name="gender"
            value={filters.gender || ""}
            onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020] text-sm shadow-sm"
          >
                  <option value="">Any Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Age Range */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Age Range
            </label>
                <div className="flex items-center space-x-2">
            <input
              type="number"
              name="minAge"
              min="18"
                    max="99"
              value={filters.minAge || ""}
              onChange={handleAgeChange}
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020] text-sm shadow-sm"
                  />
                  <span className="text-gray-400">-</span>
            <input
              type="number"
              name="maxAge"
              min="18"
                    max="99"
              value={filters.maxAge || ""}
              onChange={handleAgeChange}
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020] text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location || ""}
            onChange={handleInputChange}
            placeholder="e.g., City, State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020] text-sm shadow-sm"
          />
              </div>
            </div>
          )}
        </div>

        {/* Personal Background Section */}
        <div className="border-t border-gray-100 pt-3 pb-3">
          <button
            onClick={() => toggleSection("background")}
            className="flex justify-between w-full items-center text-left text-sm font-medium mb-2 text-gray-700 hover:text-gray-900"
          >
            <span>Background</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${
                expandedSections.background ? "transform rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {expandedSections.background && (
            <div
              className="space-y-4 pt-1 pb-2 pl-2 border-l-2"
              style={{ borderColor: `${themeColors.primary}30` }}
            >
        {/* Religion */}
        <div>
          <label
            htmlFor="religion"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Religion
          </label>
                <select
            id="religion"
            name="religion"
            value={filters.religion || ""}
            onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020] text-sm shadow-sm"
                >
                  <option value="">Any Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Jain">Jain</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Education Level */}
              <div>
                <label
                  htmlFor="educationLevel"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Education Level
                </label>
                <select
                  id="educationLevel"
                  name="educationLevel"
                  value={filters.educationLevel || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020] text-sm shadow-sm"
                >
                  <option value="">Any Education</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's Degree</option>
                  <option value="Master's">Master's Degree</option>
                  <option value="Doctorate">Doctorate</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Occupation Field */}
              <div>
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={filters.occupation || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., Engineer, Doctor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020] text-sm shadow-sm"
          />
        </div>
      </div>
          )}
        </div>

        {/* Personal Preferences Section */}
        <div className="border-t border-gray-100 pt-3 pb-3">
          <button
            onClick={() => toggleSection("personal")}
            className="flex justify-between w-full items-center text-left text-sm font-medium mb-2 text-gray-700 hover:text-gray-900"
          >
            <span>Preferences</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${
                expandedSections.personal ? "transform rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {expandedSections.personal && (
            <div
              className="space-y-4 pt-1 pb-2 pl-2 border-l-2"
              style={{ borderColor: `${themeColors.primary}30` }}
            >
              {/* Marital Status */}
              <div>
                <label
                  htmlFor="maritalStatus"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Marital Status
                </label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  value={filters.maritalStatus || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020] text-sm shadow-sm"
                >
                  <option value="">Any</option>
                  <option value="Never Married">Never Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              {/* Lifestyle */}
              <div>
                <label
                  htmlFor="lifestyle"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Lifestyle
                </label>
                <select
                  id="lifestyle"
                  name="lifestyle"
                  value={filters.lifestyle || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020] text-sm shadow-sm"
                >
                  <option value="">Any</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-vegetarian">Non-vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick tips to help users */}
      <div className="mt-auto border-t border-gray-100 p-4 bg-gray-50">
        <p className="text-xs text-gray-500 italic">
          Tip: Apply multiple filters to find your ideal match. Clear all
          filters to see everyone.
        </p>
      </div>
    </div>
  );
};

// Enhanced Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Calculate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPageButtons = 5; // Maximum number of page buttons to show

    if (totalPages <= maxPageButtons) {
      // Show all pages if total pages is less than maxPageButtons
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first and last page
      pages.push(1);

      // Calculate middle pages
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Add last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="mt-10 flex justify-center items-center">
      <nav className="flex items-center space-x-1 select-none">
        {/* Previous button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
          className="p-2 rounded-md transition-colors flex items-center justify-center"
          style={{
            color:
              currentPage === 1 ? "rgb(156, 163, 175)" : themeColors.primary,
            backgroundColor: currentPage === 1 ? "transparent" : "white",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            border:
              currentPage === 1
                ? "1px solid rgb(229, 231, 235)"
                : `1px solid ${themeColors.primary}30`,
          }}
          aria-label="Previous Page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
      </button>

        {/* Page buttons */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..." || page === currentPage}
            className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors text-sm ${
              typeof page === "number" && page !== currentPage
                ? "hover:bg-gray-100"
                : ""
            }`}
            style={{
              backgroundColor:
                page === currentPage ? themeColors.primary : "transparent",
              color:
                page === currentPage
                  ? "white"
                  : typeof page === "number"
                  ? themeColors.textDark
                  : "rgb(156, 163, 175)",
              cursor:
                page === "..." || page === currentPage ? "default" : "pointer",
              fontWeight: typeof page === "number" ? "medium" : "normal",
            }}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
          className="p-2 rounded-md transition-colors flex items-center justify-center"
          style={{
            color:
              currentPage === totalPages
                ? "rgb(156, 163, 175)"
                : themeColors.primary,
            backgroundColor:
              currentPage === totalPages ? "transparent" : "white",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            border:
              currentPage === totalPages
                ? "1px solid rgb(229, 231, 235)"
                : `1px solid ${themeColors.primary}30`,
          }}
          aria-label="Next Page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
      </button>
      </nav>
    </div>
  );
};

// MobileToolbar component for small screens
const MobileToolbar = ({
  onFilterClick,
  onSortChange,
  sortOption,
  resultsCount,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg lg:hidden z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onFilterClick}
            className="flex items-center text-sm font-medium py-1.5 px-3 rounded-full"
            style={{
              backgroundColor: `${themeColors.primary}10`,
              color: themeColors.primary,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>

          <div className="text-sm">
            <label className="text-gray-600 mr-2">Sort:</label>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-gray-100 text-gray-800 py-1 px-2 rounded-md border-none text-sm"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name A-Z</option>
              <option value="age">Age</option>
              <option value="relevance">Relevance</option>
            </select>
          </div>
        </div>

        <span className="text-sm font-medium text-gray-700">
          {resultsCount} Result{resultsCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
};

// --- Main Search Page Component ---
const Search = () => {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Combined loading state
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  });

  // Add state for sorting and mobile filter visibility
  const [sortOption, setSortOption] = useState("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // --- Refined Fetching Logic ---
  const fetchUsers = useCallback(
    async (currentFilters, currentPage, currentLimit) => {
      console.log(
        `Fetching users: Page ${currentPage}, Limit ${currentLimit}, Filters:`,
        currentFilters
      );
      setLoading(true);
      setError(null);
      try {
        const params = {
          ...currentFilters,
          page: currentPage,
          limit: currentLimit,
        };
        Object.keys(params).forEach((key) => {
          if (
            params[key] === "" ||
            params[key] === null ||
            params[key] === undefined
          ) {
            delete params[key];
          }
        });

        const response = await api.get("/profiles/search", { params });
        console.log("Raw search response data:", response.data);
        if (response.data && response.data.success) {
          setUsers(response.data.results || []);
          setPagination({
            page: response.data.page || 1,
            limit: response.data.limit || currentLimit,
            total: response.data.total || 0,
            totalPages: response.data.totalPages || 1,
          });
          console.log("Users set in state:", response.data.results);
        } else {
          throw new Error(response.data?.message || "Failed to fetch users");
        }
      } catch (err) {
          console.error("Search Page: Error fetching users:", err);
          setError(
          err.response?.data?.message || err.message || "An error occurred."
          );
        setUsers([]); // Clear users on error
      } finally {
        setLoading(false);
      }
    },
    []
  ); // No dependencies needed here as params are passed directly

  // --- Debounce Logic for Filters ---
  const isInitialMount = useRef(true);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    // Skip debounce on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Debounce filter changes
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      setPagination((prev) => ({ ...prev, page: 1 })); // Reset page
      fetchUsers(filters, 1, pagination.limit); // Fetch page 1 with new filters
    }, 500); // 500ms debounce

    // Cleanup timer
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [filters, pagination.limit, fetchUsers]); // Rerun only when filters or limit change

  // --- Initial Fetch & Page Change Fetch ---
  useEffect(() => {
    // Fetch on initial load (after auth check) OR when page changes
    if (!isAuthLoading && isAuthenticated()) {
      fetchUsers(filters, pagination.page, pagination.limit);
      if (pagination.page > 1) {
        // Only scroll if changing page, not initial load
      window.scrollTo(0, 0);
    }
    }
  }, [pagination.page, isAuthLoading, isAuthenticated, fetchUsers]); // Trigger on page change or auth state resolution

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    // The useEffect watching 'filters' will handle debouncing and fetching page 1
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    // The useEffect watching 'pagination.page' will handle fetching the new page
  }, []);

  // Handle sort change
  const handleSortChange = useCallback(
    (option) => {
      setSortOption(option);
      // Implement sorting logic here
      // This would typically be handled server-side
      // For client-side sorting example:
      if (users.length > 0) {
        const sortedUsers = [...users];
        switch (option) {
          case "newest":
            // Assuming _id or createdAt could be used for sorting by newest
            sortedUsers.sort((a, b) =>
              (b._id || b.createdAt || 0) > (a._id || a.createdAt || 0) ? 1 : -1
            );
            break;
          case "oldest":
            sortedUsers.sort((a, b) =>
              (a._id || a.createdAt || 0) > (b._id || b.createdAt || 0) ? 1 : -1
            );
            break;
          case "name":
            sortedUsers.sort((a, b) =>
              (a.name || "").localeCompare(b.name || "")
            );
            break;
          case "age":
            sortedUsers.sort((a, b) => (a.age || 0) - (b.age || 0));
            break;
          default:
            // Default or relevance would use the server's order
            break;
        }
        setUsers(sortedUsers);
      }
    },
    [users]
  );

  // --- Render Logic ---

  // 1. Initial Auth Loading State
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#800020]"></div>
      </div>
    );
  }

  // 2. Not Authenticated State (Redirect handled by UserProtectedRoute)
  // No need for explicit check here if UserProtectedRoute works correctly
  // If UserProtectedRoute fails, the API calls might fail or return nothing.

  // 3. Authenticated: Render the Search Page Layout
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 pb-16 lg:pb-8">
      <div className="container mx-auto max-w-7xl">
        {/* Enhanced Search Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ color: themeColors.primaryDark }}
              >
                Find Your Perfect Match
              </h1>
              <p className="text-gray-600 max-w-2xl">
                Explore compatible profiles curated based on your preferences.
                Our matching system helps you connect with like-minded
                individuals.
              </p>
            </div>

            {/* Stats Section */}
            {!loading && !error && users.length > 0 && (
              <div className="mt-4 md:mt-0 bg-white p-3 shadow-sm rounded-lg border border-gray-100 flex items-center space-x-6">
                <div className="text-center px-3">
                  <p className="text-sm text-gray-500">Results</p>
                  <p
                    className="text-xl font-semibold"
                    style={{ color: themeColors.primary }}
                  >
                    {pagination.total}
                  </p>
                </div>
                <div className="h-10 w-px bg-gray-200"></div>
                <div className="text-center px-3">
                  <p className="text-sm text-gray-500">Page</p>
                  <p
                    className="text-xl font-semibold"
                    style={{ color: themeColors.primary }}
                  >
                    {pagination.page} / {pagination.totalPages}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Optional subtitle tag or guide text */}
          {!loading && !error && users.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(filters)
                .filter(
                  ([key, value]) =>
                    value !== "" && value !== null && value !== undefined
                )
                .map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#800020] bg-opacity-10 text-[#800020]"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </span>
                ))}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* --- Left Sidebar (Filters) - Conditionally visible on mobile --- */}
          <aside
            className={`${
              showMobileFilters
                ? "fixed inset-0 z-40 bg-black bg-opacity-50 lg:bg-transparent lg:static lg:block"
                : "hidden lg:block"
            } w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] mb-6 lg:mb-0 overflow-auto`}
          >
            <div
              className={`${
                showMobileFilters ? "h-full max-h-full overflow-auto" : ""
              } lg:h-auto`}
            >
              {/* Mobile close button */}
              {showMobileFilters && (
                <div className="flex justify-between items-center p-4 bg-white lg:hidden sticky top-0 z-10 border-b">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: themeColors.primaryDark }}
                  >
                    Search Filters
                  </h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-1 rounded-full bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}

        <Filters filters={filters} onFilterChange={handleFilterChange} />

              {/* Apply button only visible on mobile */}
              {showMobileFilters && (
                <div className="p-4 bg-white border-t sticky bottom-0 lg:hidden">
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full py-2.5 rounded-lg text-white font-medium"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    Apply Filters
                  </button>
          </div>
              )}
            </div>
          </aside>

          {/* --- Right Content Area (Results) --- */}
          <main className="flex-grow min-w-0">
            {/* Sort and filter bar - Desktop only */}
            {!loading && !error && users.length > 0 && (
              <div className="hidden lg:flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {(pagination.page - 1) * pagination.limit + 1}-
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total} profiles
                </div>

                <div className="flex items-center">
                  <label className="text-sm text-gray-600 mr-2">Sort by:</label>
                  <select
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="bg-white text-gray-800 py-1.5 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020]"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="name">Name A-Z</option>
                    <option value="age">Age</option>
                    <option value="relevance">Relevance</option>
                  </select>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col justify-center items-center py-16 min-h-[60vh]">
                <div
                  className="animate-spin rounded-full h-12 w-12 mb-4"
                  style={{
                    borderWidth: "3px",
                    borderStyle: "solid",
                    borderColor: `${themeColors.primary}30`,
                    borderTopColor: themeColors.primary,
                  }}
                ></div>
                <p className="text-gray-500 animate-pulse">
                  Finding matches for you...
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center shadow-sm min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-16 h-16 mb-4 text-red-500 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">
                  We encountered a problem
                </h3>
                <p className="text-red-600 mb-4">{error}</p>
            <button
                  onClick={() =>
                    fetchUsers(filters, pagination.page, pagination.limit)
                  }
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors font-medium text-sm"
                >
                  Try Again
            </button>
          </div>
            )}

            {/* No Results State - Enhanced */}
            {!loading && !error && users.length === 0 && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-8 text-center shadow-sm min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-20 h-20 mb-4 text-blue-500 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  No matches found
                </h3>
                <p className="text-blue-600 mb-6 max-w-md">
                  We couldn't find any profiles matching your current filters.
                  Try broadening your search criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Results Grid - Enhanced */}
            {!loading && !error && users.length > 0 && (
          <>
            <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.07 } },
                    hidden: {},
                  }}
                >
                  {users.map((user) => (
                    <UserCard key={user._id} user={user} />
              ))}
            </motion.div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
                )}

                {/* Results summary */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Showing {(pagination.page - 1) * pagination.limit + 1}-
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}{" "}
                    of {pagination.total} profiles
                  </p>
          </div>
              </>
        )}
          </main>
      </div>
      </div>

      {/* Mobile toolbar */}
      {!loading && !error && users.length > 0 && (
        <MobileToolbar
          onFilterClick={() => setShowMobileFilters(true)}
          onSortChange={handleSortChange}
          sortOption={sortOption}
          resultsCount={pagination.total}
        />
      )}
    </div>
  );
};

export default Search;
