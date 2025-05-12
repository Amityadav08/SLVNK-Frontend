import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth, API_URL } from "../context/AuthContext";

// --- Reusable Icons (Import or define as needed) ---
const LocationPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline mr-1.5 text-gray-500 flex-shrink-0"
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
// Add other icons like BriefcaseIcon, EducationIcon, etc. as used below

const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline mr-1.5 text-gray-500 flex-shrink-0"
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

const EducationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline mr-1.5 text-gray-500 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
    />
  </svg>
);

const ReligionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline mr-1.5 text-gray-500 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12m-3-9l-3 3 3 3m6-6l3 3-3 3"
    />
  </svg>
);

const StatusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline mr-1.5 text-gray-500 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const LanguageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline mr-1.5 text-gray-500 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline mr-1.5 text-gray-500 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline mr-1.5 text-gray-500 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline mr-1.5 text-gray-500 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Background Pattern Component
const BackgroundPattern = () => (
  <div className="absolute inset-0 z-0 opacity-5">
    <svg width="100%" height="100%" className="absolute inset-0">
      <pattern
        id="pattern-circles"
        x="0"
        y="0"
        width="50"
        height="50"
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="currentColor"
          className="text-primary-600"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#pattern-circles)" />
    </svg>
  </div>
);

// --- Reusable Helper Components ---
const DetailItem = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start p-3 bg-gray-50 rounded-md border border-gray-200">
      <div className="flex-shrink-0 mt-0.5 text-primary-600">{icon}</div>
      <div className="ml-3">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </div>
        <div className="text-sm text-gray-800 mt-0.5">{value}</div>
      </div>
    </div>
  );
};

// --- WhatsApp Chatbot Component (Revised) ---
const WhatsAppChatbot = ({ profileName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const bubbleRef = useRef(null);

  useEffect(() => {
    // Auto-open after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const closeChatBubble = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const openChatBubble = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleReplyClick = (message) => {
    const phoneNumber = "917710870992";
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const helloMessage = `Hello! I saw a profile on SLNVK Matrimony${
    profileName ? ` (${profileName})` : ""
  } and I'd like to learn more.`;
  const interestedMessage = `Hi! I'm interested in the profile on SLNVK Matrimony${
    profileName ? ` for ${profileName}` : ""
  }. Could you please provide more details?`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl p-4 mb-4 w-72"
          ref={bubbleRef}
        >
          <button
            onClick={closeChatBubble}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Contact Us
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Choose a message to start the conversation:
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleReplyClick(helloMessage)}
                className="w-full bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors text-sm text-left"
              >
                {helloMessage}
              </button>
              <button
                onClick={() => handleReplyClick(interestedMessage)}
                className="w-full bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors text-sm text-left"
              >
                {interestedMessage}
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <button
        onClick={isOpen ? closeChatBubble : openChatBubble}
        className={`${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        } text-white p-4 rounded-full shadow-lg transition-colors`}
      >
        {isOpen ? <CloseIcon /> : <WhatsAppIcon />}
      </button>
    </div>
  );
};

const UserProfileDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  // Function to get base URL for images
  const BACKEND_URL = API_URL.replace("/api", "");

  // Get authenticated API instance
  const getAuthenticatedApi = () => {
    const token = localStorage.getItem("authToken");
    return axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      console.log("Fetching profile with ID:", userId);
      const api = getAuthenticatedApi();
      const response = await api.get(`/profiles/${userId}`);
      if (response.data.success) {
        console.log("Profile data received:", response.data.profile); // Log received data
        setProfile(response.data.profile);
      } else {
        setError("Failed to fetch profile");
      }
    } catch (err) {
      console.error(
        "Error fetching profile details:",
        err.response || err.message
      );
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError("Not authorized. Please log in again to view profiles.");
            break;
          case 404:
            setError(`Profile not found for ID: ${userId}`);
            break;
          default:
            setError(
              err.response.data?.message ||
                "An error occurred while fetching the profile"
            );
        }
      } else {
        setError(err.message || "An error occurred while fetching the profile");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-red-100 border border-red-300 text-red-800 rounded-lg p-6 text-center shadow-md">
            <h2 className="text-lg font-semibold mb-2">Error</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="text-sm font-medium text-primary-600 hover:underline"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  // Construct image URL correctly
  const profileImageUrl = profile.profilePicture
    ? `${BACKEND_URL}${profile.profilePicture}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profile.name?.charAt(0) || "U"
      )}&background=e0e7ff&color=4338ca&size=300&bold=true`; // Fallback avatar

  console.log("Constructed Image URL:", profileImageUrl); // Log the final image URL

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/search"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Search
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/80"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="md:col-span-1 bg-gradient-to-b from-primary-50 to-gray-50 p-6 md:p-8 flex flex-col items-center border-r border-gray-200">
              <motion.div
                className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg mb-6 border-4 border-white ring-1 ring-primary-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <img
                  src={profileImageUrl}
                  alt={`${profile.name}'s profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profile.name?.charAt(0) || "U"
                    )}&background=cccccc&color=ffffff&size=200&bold=true`;
                  }}
                />
              </motion.div>

              <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
                {profile.name}
              </h1>

              <div className="w-full bg-white/50 rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-primary-800 mb-3 border-b pb-2">
                  Contact Information
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center text-gray-700">
                    <PhoneIcon /> <span className="ml-2">+91 7710870992</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <EmailIcon /> <span className="ml-2">info@slnvk.com</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <ClockIcon /> <span className="ml-2">10 AM - 7 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailItem
                    label="Age"
                    value={`${profile.age} years old`}
                    icon={<StatusIcon />}
                  />
                  <DetailItem
                    label="Location"
                    value={`${profile.city}, ${profile.state}`}
                    icon={<LocationPinIcon />}
                  />
                  <DetailItem
                    label="Religion"
                    value={profile.religion}
                    icon={<ReligionIcon />}
                  />
                  <DetailItem
                    label="Marital Status"
                    value={profile.maritalStatus}
                    icon={<StatusIcon />}
                  />
                  <DetailItem
                    label="Mother Tongue"
                    value={
                      profile.motherTongue || profile.languages?.join(", ")
                    }
                    icon={<LanguageIcon />}
                  />
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Professional & Education
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailItem
                    label="Occupation"
                    value={profile.occupation}
                    icon={<BriefcaseIcon />}
                  />
                  <DetailItem
                    label="Education"
                    value={profile.education}
                    icon={<EducationIcon />}
                  />
                </div>
              </div>

              {profile.about && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    About
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-md border border-gray-200">
                    {profile.about}
                  </p>
                </div>
              )}

              {profile.preferences && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Partner Preferences
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-md border border-gray-200">
                    {profile.preferences}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {profile && <WhatsAppChatbot profileName={profile.name} />}
    </div>
  );
};

export default UserProfileDetail;
