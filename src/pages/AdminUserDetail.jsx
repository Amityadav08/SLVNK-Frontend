import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
import {
  ArrowLeft,
  User,
  Users,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Heart,
  School,
  Briefcase,
  DollarSign,
  Languages,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  ShieldCheck,
  Home as HomeIcon,
  Info,
  Building,
  UserCheck,
  BarChart,
} from "lucide-react";

// Reusable API instance
const adminApi = axios.create({ baseURL: API_URL });
adminApi.interceptors.request.use(
  (config) => {
    config.headers["X-Admin-Request"] = "true";
    return config;
  },
  (error) => Promise.reject(error)
);

const getProfileImageUrl = (profilePicture) => {
  if (!profilePicture) return null;
  const baseUrl = API_URL.replace(/\/api$/, "");
  const cleanPath = profilePicture.startsWith("/")
    ? profilePicture.slice(1)
    : profilePicture;
  if (cleanPath.startsWith("uploads")) {
    return `${baseUrl}/${cleanPath}`;
  }
  if (profilePicture.startsWith("http")) {
    return profilePicture;
  }
  return `${baseUrl}/${cleanPath}`;
};

// Enhanced Helper component for displaying detail items
const DetailItem = ({ icon, label, value, className = "" }) => {
  if (value === null || value === undefined || value === "") return null;
  const IconComponent = icon;
  return (
    <div className={`flex items-start text-sm ${className} py-2.5`}>
      <IconComponent className="w-4 h-4 mr-3 text-indigo-500 flex-shrink-0 mt-0.5" />
      <div className="flex flex-col sm:flex-row sm:items-center flex-1">
        <span className="text-gray-600 w-36 flex-shrink-0 font-medium mb-0.5 sm:mb-0">
          {label}
        </span>
        <span className="text-gray-800 font-medium break-words">{value}</span>
      </div>
    </div>
  );
};

// Section Header Component
const SectionHeader = ({ title, icon: IconComponent }) => (
  <div className="flex items-center text-md font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-3">
    <IconComponent className="w-5 h-5 mr-2 text-indigo-600" />
    {title}
  </div>
);

const AdminUserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminApi.get(`/admin/users/${userId}`);
      if (response.data && response.data.success) {
        setUser(response.data.user);
      } else {
        throw new Error(
          response.data?.message || "Failed to fetch user details"
        );
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Could not load user data."
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  // Enhanced function to render detail sections
  const renderDetailSection = (title, details, icon = Info) => {
    const validDetails = details.filter(
      (item) =>
        !(item.value === null || item.value === undefined || item.value === "")
    );
    if (validDetails.length === 0) return null;

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <SectionHeader title={title} icon={icon} />
        <div className="space-y-1.5">
          {validDetails.map((item, index) => (
            <DetailItem
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div
          className="max-w-4xl mx-auto bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
          <div className="mt-4">
            <Link
              to="/admin/dashboard"
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 text-center">
        <p className="text-gray-600">User not found.</p>
        <Link
          to="/admin/dashboard"
          className="mt-4 inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  const profileImageUrl = getProfileImageUrl(user.profilePicture);

  // Structure details for rendering sections
  const personalDetails = [
    { icon: User, label: "Gender", value: user.gender },
    {
      icon: Calendar,
      label: "Date of Birth",
      value: user.dateOfBirth
        ? new Date(user.dateOfBirth).toLocaleDateString()
        : null,
    },
    { icon: Heart, label: "Marital Status", value: user.maritalStatus },
    { icon: Languages, label: "Mother Tongue", value: user.motherTongue },
    {
      icon: HomeIcon,
      label: "Profile Creator",
      value: user.profileCreatedBy,
    },
    {
      icon: User,
      label: "Height",
      value: user.heightCm ? `${user.heightCm} cm` : null,
    },
    {
      icon: User,
      label: "Weight",
      value: user.weightKg ? `${user.weightKg} kg` : null,
    },
    { icon: User, label: "Body Type", value: user.bodyType },
    { icon: User, label: "Complexion", value: user.complexion },
    { icon: User, label: "Physical Status", value: user.physicalStatus },
  ];

  const contactLocationDetails = [
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Mobile", value: user.mobileNumber },
    { icon: MapPin, label: "City", value: user.city },
    { icon: MapPin, label: "State", value: user.state },
    { icon: MapPin, label: "Country", value: user.country },
  ];

  const religiousSocialDetails = [
    { icon: Heart, label: "Religion", value: user.religion },
    { icon: Users, label: "Caste", value: user.caste },
    { icon: Users, label: "Sub-Caste", value: user.subCaste },
    { icon: Users, label: "Gothra", value: user.gothra },
    { icon: Heart, label: "Manglik", value: user.manglik },
  ];

  const educationCareerDetails = [
    { icon: School, label: "Education", value: user.educationLevel },
    { icon: School, label: "Field", value: user.educationField },
    { icon: Briefcase, label: "Occupation", value: user.occupation },
    { icon: DollarSign, label: "Income", value: user.annualIncome },
  ];

  const familyDetails = [
    { icon: User, label: "Father Status", value: user.fatherStatus },
    { icon: User, label: "Mother Status", value: user.motherStatus },
    { icon: Users, label: "Siblings", value: user.numberOfSiblings },
    { icon: UserCheck, label: "Siblings Married", value: user.siblingsMarried },
    { icon: Building, label: "Family Type", value: user.familyType },
    { icon: BarChart, label: "Family Values", value: user.familyValues },
  ];

  const lifestyleDetails = [
    { icon: Heart, label: "Diet", value: user.diet },
    { icon: XCircle, label: "Smoking", value: user.smokingHabits },
    { icon: XCircle, label: "Drinking", value: user.drinkingHabits },
  ];

  const accountDetails = [
    {
      icon: Calendar,
      label: "Joined On",
      value: new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-5 md:p-8">
      {/* Header Area */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-wrap md:flex-nowrap items-center justify-between">
          <Link
            to="/admin/dashboard"
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-md"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 my-2 md:my-0">
            User Profile
          </h1>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
            ID: {userId}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <img
                  src={
                    profileImageUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "U"
                    )}&background=EEF2FF&color=4F46E5&size=128&bold=true`
                  }
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover mx-auto border-4 border-white shadow"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "U"
                    )}&background=EEF2FF&color=4F46E5&size=128&bold=true`;
                  }}
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {user.name}
              </h2>
              <a
                href={`mailto:${user.email}`}
                className="text-sm text-indigo-600 hover:underline font-medium block truncate"
              >
                {user.email}
              </a>
              {user.mobileNumber && (
                <p className="text-sm text-gray-500 mt-1">
                  {user.mobileNumber}
                </p>
              )}

              {/* Only show Verified status badge */}
              <div className="mt-6">
                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Verified
                    </span>
                    <div
                      className={`flex items-center ${
                        user.isVerified ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {user.isVerified ? (
                        <CheckCircle className="w-4 h-4 mr-1.5" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-1.5" />
                      )}
                      <span className="text-sm font-semibold">
                        {user.isVerified ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info Section */}
            {renderDetailSection(
              "Account Information",
              accountDetails,
              ShieldCheck
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div>
                {renderDetailSection(
                  "Contact Information",
                  contactLocationDetails,
                  MapPin
                )}
              </div>

              {/* Education & Career */}
              <div>
                {renderDetailSection(
                  "Education & Career",
                  educationCareerDetails,
                  Briefcase
                )}
              </div>
            </div>

            {/* Personal Details */}
            {renderDetailSection("Personal Details", personalDetails, User)}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Religious & Social */}
              <div>
                {renderDetailSection(
                  "Religious & Social",
                  religiousSocialDetails,
                  Heart
                )}
              </div>

              {/* Lifestyle */}
              <div>
                {renderDetailSection(
                  "Lifestyle & Habits",
                  lifestyleDetails,
                  Heart
                )}
              </div>
            </div>

            {/* Family Details */}
            {renderDetailSection("Family Background", familyDetails, Users)}

            {/* Bio if exists */}
            {user.bio && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <SectionHeader title="About" icon={Info} />
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {user.bio}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetail;
