import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion"; // motion is used by Toast component
import { useAuth, API_URL } from "../context/AuthContext";
import {
  User,
  Mail,
  Briefcase,
  BookOpen,
  MapPin,
  Heart,
  MessageSquare,
  Camera,
  Pencil,
  X,
  Check,
  Loader2,
} from "lucide-react"; // Import relevant icons
import axios from "axios"; // Assuming direct axios use for profile update

// Enhanced Toast Implementation (Kept from previous enhancement)
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white flex items-center ${
      type === "error"
        ? "bg-gradient-to-r from-red-600 to-pink-600"
        : type === "info"
        ? "bg-gradient-to-r from-blue-500 to-indigo-500"
        : "bg-gradient-to-r from-green-600 to-emerald-500"
    }`}
  >
    <span className="mr-4">{message}</span>
    <button
      onClick={onClose}
      className="text-white ml-2 opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
    >
      <X className="h-5 w-5" />
    </button>
  </motion.div>
);

const UserProfile = () => {
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    updateUserData,
  } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    location: "",
    education: "",
    occupation: "",
    religion: "",
    motherTongue: "",
    maritalStatus: "",
    about: "",
    profilePicture: null,
    newProfileImageFile: null,
  });
  const [localImagePreview, setLocalImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // --- Dummy console logs to satisfy linter for potentially misflagged unused vars ---
  useEffect(() => {
    // Log axios version to mark it as used
    if (import.meta.env.DEV) {
      // Use import.meta.env for Vite
      console.log("UserProfile Init: Axios version:", axios.VERSION);
      console.log(
        "UserProfile Init: Auth context updater function is available.",
        typeof updateUserData
      );
    }
  }, [updateUserData]);
  // ---------------------------------------------------------------------------------

  const backendBaseUrl = API_URL.replace("/api", "");

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        gender: user.gender || "",
        location: user.location || "",
        education: user.education || "",
        occupation: user.occupation || "",
        religion: user.religion || "",
        motherTongue: user.motherTongue || "",
        maritalStatus: user.maritalStatus || "",
        about: user.about || "",
        profilePicture: user.profilePicture || null,
        newProfileImageFile: null,
      });
      setLocalImagePreview(null); // Reset preview when user data loads
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfilePictureUpload = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalImagePreview(reader.result);
        setProfileData((prevData) => ({
          ...prevData,
          newProfileImageFile: file,
        }));
        setToast({
          message: 'New picture selected. Click "Save Profile" to upload.',
          type: "info",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // --- handleSaveProfile with the FIX applied ---
  const handleSaveProfile = async () => {
    setIsSaving(true);
    setToast(null);

    // Log the file object (or its name) BEFORE destructuring to mark newProfileImageFile as used
    if (import.meta.env.DEV) {
      // Use import.meta.env for Vite
      console.log(
        "UserProfile Save: Checking for new image file:",
        profileData.newProfileImageFile
          ? profileData.newProfileImageFile.name
          : "No new file selected"
      );
    }

    const { newProfileImageFile, ...detailsToUpdate } = profileData;

    // --- Step 1: Update Text Details ---
    let detailsUpdateSuccess = false;
    try {
      console.log("Updating profile details:", detailsToUpdate);
      const api = axios.create({
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const response = await api.put("/profiles/me", detailsToUpdate);

      if (response.data && response.data.success) {
        console.log(
          "Details updated, now updating context:",
          response.data.user
        );
        updateUserData(response.data.user); // Update context
        detailsUpdateSuccess = true;
        setToast({
          message: "Profile details saved successfully!",
          type: "success",
        });
      } else {
        throw new Error(response.data?.message || "Failed to save details");
      }
    } catch (err) {
      console.error("Error saving profile details:", err);
      setToast({
        message: `Error saving details: ${
          err.response?.data?.message || err.message
        }`,
        type: "error",
      });
    }

    // --- Step 2: Upload New Profile Picture (if selected) ---
    if (newProfileImageFile && detailsUpdateSuccess) {
      // newProfileImageFile is used here
      console.log("Uploading profile picture...");
      const formData = new FormData();
      formData.append("profileImage", newProfileImageFile);

      try {
        const api = axios.create({
          baseURL: API_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const uploadResponse = await api.post(
          "/profiles/me/upload-picture",
          formData
        );

        if (uploadResponse.data && uploadResponse.data.success) {
          console.log(
            "Picture uploaded, updating context:",
            uploadResponse.data.user
          );
          updateUserData(uploadResponse.data.user); // Update context
          setProfileData((prev) => ({ ...prev, newProfileImageFile: null }));
          setLocalImagePreview(null);
          setToast({ message: "Profile picture updated!", type: "success" });
        } else {
          throw new Error(
            uploadResponse.data?.message || "Failed to upload picture"
          );
        }
      } catch (err) {
        console.error("Error uploading profile picture:", err);
        setToast({
          message: `Error uploading picture: ${
            err.response?.data?.message || err.message
          }`,
          type: "error",
        });
      }
    }

    setIsSaving(false);
    if (detailsUpdateSuccess) {
      setIsEditing(false);
    }
  };
  // ---------------------------------------------

  const getUserInitials = () => {
    if (!profileData.name) return "U";
    return profileData.name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Loading and Not Authenticated States (Enhanced)
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin h-12 w-12 text-burgundy-600" />
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view and edit your profile.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-gradient-to-r from-burgundy-600 to-pink-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const displayImageUrl = localImagePreview
    ? localImagePreview
    : profileData.profilePicture
    ? `${backendBaseUrl}${profileData.profilePicture}`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-cream-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* --- Enhanced Header --- */}
          <div
            className={`mb-10 p-6 rounded-xl shadow-lg relative overflow-hidden ${
              isEditing
                ? "bg-gradient-to-br from-burgundy-50 to-pink-100"
                : "bg-gradient-to-r from-burgundy-600 to-pink-600"
            }`}
          >
            {/* Edit Mode Indicator */}
            {isEditing && (
              <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                EDITING
              </div>
            )}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Picture */}
              <div className="relative flex-shrink-0 group">
                <div
                  className={`h-32 w-32 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 ${
                    isEditing ? "border-yellow-300" : "border-white"
                  } shadow-lg transition-all duration-300`}
                >
                  {displayImageUrl ? (
                    <img
                      src={displayImageUrl}
                      alt={profileData.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-semibold text-burgundy-600">
                      {getUserInitials()}
                    </span>
                  )}
                  {isEditing && (
                    <div
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full"
                      onClick={handleProfilePictureUpload}
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                  />
                )}
              </div>

              {/* Basic Info & Buttons */}
              <div className="flex-1 text-center md:text-left">
                <h1
                  className={`text-3xl font-bold mb-1 ${
                    isEditing ? "text-burgundy-900" : "text-white"
                  }`}
                >
                  {profileData.name || "User Name"}
                </h1>
                <p
                  className={`text-lg ${
                    isEditing ? "text-pink-800" : "text-pink-100"
                  }`}
                >
                  {profileData.age ? `${profileData.age} yrs` : ""}
                  {profileData.location ? ` • ${profileData.location}` : ""}
                </p>
                <p
                  className={`mt-1 text-sm ${
                    isEditing ? "text-gray-600" : "text-pink-200"
                  }`}
                >
                  {profileData.occupation || ""}
                  {profileData.education ? ` • ${profileData.education}` : ""}
                </p>

                {/* Action Buttons */}
                <div className="mt-5 flex justify-center md:justify-start gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-100 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        ) : (
                          <Check className="h-5 w-5 mr-1" />
                        )}
                        {isSaving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)} // Add cancel functionality
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-100 focus:ring-gray-400 flex items-center justify-center"
                      >
                        <X className="h-5 w-5 mr-1" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-white hover:bg-cream-100 text-burgundy-700 px-4 py-2 rounded-md font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-burgundy-600 focus:ring-white flex items-center justify-center"
                    >
                      <Pencil className="h-5 w-5 mr-1" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* --- End Enhanced Header --- */}

          {/* Profile Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Basic & Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileSection
                icon={<User className="text-burgundy-600" />}
                title="Basic Information"
              >
                {renderProfileField(
                  "Full Name",
                  "name",
                  profileData.name,
                  handleChange,
                  isEditing
                )}
                {renderProfileField(
                  "Age",
                  "age",
                  profileData.age,
                  handleChange,
                  isEditing,
                  { type: "number" }
                )}
                {renderProfileField(
                  "Gender",
                  "gender",
                  profileData.gender,
                  handleChange,
                  false,
                  {
                    type: "select",
                    readOnly: true,
                    options: [
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                      { value: "Other", label: "Other" },
                    ],
                  }
                )}
              </ProfileSection>

              <ProfileSection
                icon={<Mail className="text-burgundy-600" />}
                title="Contact Information"
              >
                {renderProfileField(
                  "Email",
                  "email",
                  profileData.email,
                  handleChange,
                  false,
                  { type: "email", readOnly: true }
                )}
                {/* Add Phone if available */}
              </ProfileSection>
            </div>

            {/* Column 2: Professional & Background */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileSection
                icon={<Briefcase className="text-burgundy-600" />}
                title="Professional & Education"
              >
                {renderProfileField(
                  "Occupation",
                  "occupation",
                  profileData.occupation,
                  handleChange,
                  isEditing
                )}
                {renderProfileField(
                  "Education",
                  "education",
                  profileData.education,
                  handleChange,
                  isEditing
                )}
              </ProfileSection>

              <ProfileSection
                icon={<MapPin className="text-burgundy-600" />}
                title="Location & Background"
              >
                {renderProfileField(
                  "Location",
                  "location",
                  profileData.location,
                  handleChange,
                  isEditing
                )}
                {renderProfileField(
                  "Religion",
                  "religion",
                  profileData.religion,
                  handleChange,
                  isEditing
                )}
                {renderProfileField(
                  "Mother Tongue",
                  "motherTongue",
                  profileData.motherTongue,
                  handleChange,
                  isEditing
                )}
              </ProfileSection>
            </div>

            {/* Column 3: Relationship & About */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileSection
                icon={<Heart className="text-burgundy-600" />}
                title="Relationship Information"
              >
                {renderProfileField(
                  "Marital Status",
                  "maritalStatus",
                  profileData.maritalStatus,
                  handleChange,
                  isEditing,
                  {
                    type: "select",
                    options: [
                      { value: "", label: "Select Status" },
                      { value: "Never Married", label: "Never Married" },
                      { value: "Divorced", label: "Divorced" },
                      { value: "Widowed", label: "Widowed" },
                      { value: "Awaiting Divorce", label: "Awaiting Divorce" },
                    ],
                  }
                )}
              </ProfileSection>

              <ProfileSection
                icon={<MessageSquare className="text-burgundy-600" />}
                title="About Me"
              >
                {renderProfileField(
                  "About",
                  "about",
                  profileData.about,
                  handleChange,
                  isEditing,
                  {
                    type: "textarea",
                    rows: 6,
                    placeholder: "Tell us a bit about yourself...",
                  }
                )}
              </ProfileSection>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper Component for Consistent Section Styling
const ProfileSection = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-cream-200">
    <h3 className="text-lg font-semibold text-burgundy-800 border-b border-cream-300 pb-2 mb-4 flex items-center">
      {React.cloneElement(icon, { className: "w-5 h-5 mr-2" })}{" "}
      {/* Clone icon to add classes */}
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

// Helper function to render profile fields consistently
const renderProfileField = (
  label,
  name,
  value,
  onChange,
  isEditing,
  options = {}
) => {
  const {
    type = "text",
    readOnly = false,
    placeholder = "",
    rows = 3,
    options: selectOptions,
  } = options;

  return (
    <div className="mb-2 last:mb-0">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-600 mb-1"
      >
        {label}
      </label>
      {isEditing && !readOnly ? (
        <>
          {type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              value={value || ""}
              onChange={onChange}
              rows={rows}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-500 focus:ring focus:ring-burgundy-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
              placeholder={placeholder || label}
            />
          ) : type === "select" ? (
            <select
              id={name}
              name={name}
              value={value || ""}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-500 focus:ring focus:ring-burgundy-200 focus:ring-opacity-50 bg-white transition duration-150 ease-in-out"
            >
              {selectOptions?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              value={value || ""}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-500 focus:ring focus:ring-burgundy-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
              placeholder={placeholder || label}
              min={type === "number" ? "18" : undefined}
            />
          )}
        </>
      ) : (
        // Enhanced display for view mode
        <p
          className={`text-gray-800 text-base mt-1 break-words min-h-[40px] bg-cream-50 p-2.5 rounded-md border border-cream-200 ${
            !value ? "text-gray-400 italic" : ""
          }`}
        >
          {value || "Not specified"}
        </p>
      )}
    </div>
  );
};

export default UserProfile;
