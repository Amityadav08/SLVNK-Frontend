import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { API_URL } from "../context/AuthContext";
import {
  Users,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Lock,
  User,
  MapPin,
  Briefcase,
  Heart,
  School,
  Languages,
  Home as HomeIcon,
  DollarSign,
  Camera,
  LogOut,
  Activity,
  TrendingUp,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Filter,
  Trash2,
  AlertCircle,
} from "lucide-react";

// --- Create stable Admin API instance outside component ---
// Note: This assumes NO specific admin token is needed due to insecure setup.
// In a real app, this instance would need an admin-specific token/interceptor.
const adminApi = axios.create({ baseURL: API_URL });
adminApi.interceptors.request.use(
  (config) => {
    // Add the demo admin header
    config.headers["X-Admin-Request"] = "true";

    // If an admin token mechanism existed, it would be added here.
    // const adminToken = localStorage.getItem('adminAuthToken');
    // if (adminToken) config.headers['Authorization'] = `Bearer ${adminToken}`;

    // Set Content-Type if not present (needed for JSON vs FormData)
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// --------------------------------------------------------

// --- Reusable Admin Components (Enhanced UI) ---
const StatCard = ({ title, value, icon, color, trend = null }) => (
  <div
    className={`bg-white p-5 rounded-xl shadow-md border-l-4 ${color} hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between`}
  >
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
        {title}
      </p>
      <div className={`text-3xl ${color.replace("border", "text")}`}>
        {icon}
      </div>
    </div>
    <p className="text-3xl font-semibold text-gray-800 mb-1">{value}</p>
    {/* Optional Trend Indicator Placeholder */}
    {trend && (
      <p
        className={`text-xs ${
          trend.startsWith("+") ? "text-green-600" : "text-red-600"
        }`}
      >
        {trend}
      </p>
    )}
  </div>
);

const getProfileImageUrl = (profilePicture) => {
  if (!profilePicture) return null;
  const baseUrl = API_URL.replace(/\/api$/, "");
  const cleanPath = profilePicture.startsWith("/")
    ? profilePicture.slice(1)
    : profilePicture;
  // Basic check for common local dev patterns, adjust if needed
  if (cleanPath.startsWith("uploads/")) {
    return `${baseUrl}/${cleanPath}`;
  }
  // Assume it might be an absolute URL already if it doesn't match the pattern
  if (profilePicture.startsWith("http")) {
    return profilePicture;
  }
  // Default case if structure changes - might need refinement
  return `${baseUrl}/${cleanPath}`;
};

const RecentUserList = ({ users = [], onDeleteUser }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <Users className="h-5 w-5 mr-2 text-indigo-600" />
      Recently Joined Users
    </h3>
    {users.length === 0 ? (
      <p className="text-gray-500 text-sm">No recent users found.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-xl shadow-lg p-5 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div className="relative mb-3">
              {user.profilePicture ? (
                <img
                  src={getProfileImageUrl(user.profilePicture)}
                  alt={user.name}
                  className="h-20 w-20 rounded-full object-cover border-4 border-indigo-200 shadow-md group-hover:border-indigo-400 transition-all duration-200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "User"
                    )}&background=E0E7FF&color=3730A3&size=80`;
                  }}
                />
              ) : (
                <div className="h-20 w-20 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 text-3xl font-bold border-4 border-indigo-200">
                  {user.name ? user.name[0].toUpperCase() : <User size={32} />}
                </div>
              )}
              {user.isVerified && (
                <span
                  className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1 border-2 border-white shadow text-xs"
                  title="Verified"
                >
                  <UserCheck size={16} />
                </span>
              )}
            </div>
            <div className="text-center w-full">
              <p className="text-base font-semibold text-gray-900 mb-1 truncate">
                {user.name}
              </p>
              <div className="flex flex-col items-center space-y-1 text-xs text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3 mr-1" /> {user.email}
                </div>
                {user.mobileNumber && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3 mr-1" /> {user.mobileNumber}
                  </div>
                )}
                {user.gender && (
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3 mr-1" /> {user.gender}
                  </div>
                )}
                {user.city && user.state && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 mr-1" /> {user.city},{" "}
                    {user.state}
                  </div>
                )}
                {user.dateOfBirth && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 mr-1" />{" "}
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </div>
                )}
                {user.religion && (
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 mr-1" /> {user.religion}
                  </div>
                )}
                {user.occupation && (
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3 mr-1" /> {user.occupation}
                  </div>
                )}
                {user.maritalStatus && (
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 mr-1" /> {user.maritalStatus}
                  </div>
                )}
                {user.educationLevel && (
                  <div className="flex items-center gap-1">
                    <School className="h-3 w-3 mr-1" /> {user.educationLevel}
                  </div>
                )}
                {user.motherTongue && (
                  <div className="flex items-center gap-1">
                    <Languages className="h-3 w-3 mr-1" /> {user.motherTongue}
                  </div>
                )}
                {user.annualIncome && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 mr-1" /> {user.annualIncome}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => onDeleteUser(user._id)}
              className="absolute top-2 right-2 text-xs bg-red-50 text-red-600 hover:bg-red-100 p-1.5 rounded-full hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
              title="Delete user"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

// --- Add User Form Component (Enhanced UI) ---
const AddUserForm = ({ onUserAdded }) => {
  const initialFormState = {
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: null,
    dateOfBirth: "",
    city: "",
    state: "",
    country: "India",
    maritalStatus: null,
    religion: "",
    motherTongue: "",
    educationLevel: "",
    occupation: "",
    annualIncome: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (typeof formError === "object" && formError?.[e.target.name]) {
      setFormError((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData({ ...formData, [actionMeta.name]: selectedOption });
    if (typeof formError === "object" && formError?.[actionMeta.name]) {
      setFormError((prev) => ({ ...prev, [actionMeta.name]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormError((prev) =>
        typeof prev === "object" ? { ...prev, profileImage: undefined } : null
      );
    } else {
      setProfileImageFile(null);
      setImagePreview(null);
      if (file)
        setFormError((prev) => ({
          ...(typeof prev === "object" ? prev : {}),
          profileImage: "Invalid image file (PNG, JPG).",
        }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(true);
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid Email is required";
    if (!formData.password || formData.password.length < 6)
      errors.password = "Password (min 6 chars) is required";
    if (
      !formData.mobileNumber.trim() ||
      !/^[6-9]\d{9}$/.test(formData.mobileNumber)
    )
      errors.mobileNumber = "Valid Indian Mobile Number is required"; // Example validation
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      setIsSubmitting(false);
      return;
    }
    let addedUser = null;
    let uploadSuccess = false;
    let uploadMessage = "";
    try {
      const processedFormData = {
        ...formData,
        gender: formData.gender?.value,
        maritalStatus: formData.maritalStatus?.value,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
      };
      const addUserResponse = await adminApi.post(
        "/admin/users",
        processedFormData
      );
      if (addUserResponse.data && addUserResponse.status === 201)
        addedUser = addUserResponse.data.user;
      else
        throw new Error(addUserResponse.data?.message || "Failed to add user");
      if (addedUser && profileImageFile) {
        const imageFormData = new FormData();
        imageFormData.append("profileImage", profileImageFile);
        imageFormData.append("userId", addedUser._id);
        try {
          const uploadResponse = await adminApi.post(
            "/profiles/me/upload-picture",
            imageFormData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          if (uploadResponse.data && uploadResponse.data.success) {
            uploadSuccess = true;
            uploadMessage = "User & picture added!";
          } else {
            uploadSuccess = false;
            uploadMessage = `User added, picture upload failed: ${
              uploadResponse.data?.message || "Unknown"
            }`;
          }
        } catch (uploadErr) {
          uploadSuccess = false;
          uploadMessage = `User added, picture upload failed: ${
            uploadErr.response?.data?.message || uploadErr.message
          }`;
        }
      }
      if (addedUser) {
        setFormSuccess(
          profileImageFile ? uploadMessage : "User added successfully!"
        );
        setFormData(initialFormState);
        setProfileImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        onUserAdded(addedUser);
      }
    } catch (err) {
      console.error("Admin Add User Error:", err);
      const apiErrorMessage =
        err.response?.data?.message || err.message || "Failed to add user.";
      const apiErrors = err.response?.data?.errors;
      setFormError(apiErrors || apiErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Options for react-select
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];
  const maritalStatusOptions = [
    { value: "Never Married", label: "Never Married" },
    /*...*/ { value: "Annulled", label: "Annulled" },
  ];
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused
        ? "#6366f1"
        : typeof formError === "object" && formError?.[state.selectProps.name]
        ? "#ef4444"
        : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #6366f1" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#6366f1" : "#9ca3af",
      },
      minHeight: "38px",
      height: "38px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "38px",
      padding: "0 6px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "38px",
    }),
  };

  // Helper to render input field with error handling
  const renderInput = (
    name,
    label,
    type = "text",
    required = false,
    icon = null,
    placeholder = "",
    props = {}
  ) => (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-medium text-gray-600 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder || label}
          className={`w-full py-2 px-3 ${
            icon ? "pl-10" : ""
          } border rounded-md text-sm shadow-sm transition duration-150 ease-in-out 
            ${
              typeof formError === "object" && formError?.[name]
                ? "border-red-400 ring-1 ring-red-400 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            }
            ${props.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
          required={required}
          {...props}
        />
      </div>
      {typeof formError === "object" && formError?.[name] && (
        <p className="text-xs text-red-500 mt-1">{formError[name]}</p>
      )}
    </div>
  );

  // Helper to render select field
  const renderSelect = (
    name,
    label,
    options,
    required = false,
    placeholder = "",
    isClearable = false
  ) => (
    <div>
      <label
        htmlFor={`${name}-select`}
        className="block text-xs font-medium text-gray-600 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        inputId={`${name}-select`}
        name={name}
        options={options}
        value={formData[name]}
        onChange={handleSelectChange}
        styles={selectStyles} // Reusing existing styles for now
        placeholder={placeholder || `Select ${label}`}
        className="text-sm"
        isClearable={isClearable}
      />
      {typeof formError === "object" && formError?.[name] && (
        <p className="text-xs text-red-500 mt-1">{formError[name]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Form Error Message */}
      {typeof formError === "string" && (
        <div className="p-3 text-sm bg-red-50 text-red-700 rounded-md border border-red-200 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{formError}</span>
        </div>
      )}
      {formSuccess && (
        <div className="p-3 text-sm bg-green-50 text-green-700 rounded-md border border-green-200">
          {formSuccess}
        </div>
      )}

      {/* Profile Photo Upload */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <div
          onClick={() => fileInputRef.current.click()}
          className={`w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed hover:border-indigo-400 transition-colors duration-200
                  ${
                    typeof formError === "object" && formError?.profileImage
                      ? "border-red-400"
                      : "border-gray-300"
                  }`}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="h-8 w-8 text-gray-400" />
          )}
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
        >
          {imagePreview ? "Change Photo" : "Upload Photo"}
        </button>
        {typeof formError === "object" && formError?.profileImage && (
          <p className="text-xs text-red-500 mt-0">{formError.profileImage}</p>
        )}
      </div>

      {/* Form Sections */}
      <div className="space-y-5">
        {/* Basic Information */}
        <fieldset className="border border-gray-200 p-4 rounded-md">
          <legend className="text-xs font-medium text-indigo-600 px-1">
            Basic Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {renderInput(
              "name",
              "Full Name",
              "text",
              true,
              <User className="h-4 w-4 text-gray-400" />
            )}
            {renderInput(
              "email",
              "Email",
              "email",
              true,
              <Mail className="h-4 w-4 text-gray-400" />
            )}
            {renderInput(
              "password",
              "Password",
              "password",
              true,
              <Lock className="h-4 w-4 text-gray-400" />,
              "Min 6 characters"
            )}
            {renderInput(
              "mobileNumber",
              "Mobile Number",
              "tel",
              true,
              <Phone className="h-4 w-4 text-gray-400" />
            )}
            {renderSelect("gender", "Gender", genderOptions, true)}
            {renderInput("dateOfBirth", "Date of Birth", "date", true)}
          </div>
        </fieldset>

        {/* Location Information */}
        <fieldset className="border border-gray-200 p-4 rounded-md">
          <legend className="text-xs font-medium text-indigo-600 px-1">
            Location
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {renderInput(
              "city",
              "City",
              "text",
              true,
              <MapPin className="h-4 w-4 text-gray-400" />
            )}
            {renderInput("state", "State", "text", true)}
            {renderInput("country", "Country", "text", false, null, "", {
              defaultValue: "India",
            })}
          </div>
        </fieldset>

        {/* Additional Information */}
        <fieldset className="border border-gray-200 p-4 rounded-md">
          <legend className="text-xs font-medium text-indigo-600 px-1">
            Additional Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {renderSelect(
              "maritalStatus",
              "Marital Status",
              maritalStatusOptions,
              false,
              "Select Status",
              true
            )}
            {renderInput(
              "religion",
              "Religion",
              "text",
              false,
              <Heart className="h-4 w-4 text-gray-400" />
            )}
            {renderInput(
              "motherTongue",
              "Mother Tongue",
              "text",
              false,
              <Languages className="h-4 w-4 text-gray-400" />
            )}
            {renderInput(
              "educationLevel",
              "Highest Education",
              "text",
              false,
              <School className="h-4 w-4 text-gray-400" />
            )}
            {renderInput(
              "occupation",
              "Occupation",
              "text",
              false,
              <Briefcase className="h-4 w-4 text-gray-400" />
            )}
            {renderInput(
              "annualIncome",
              "Annual Income (e.g., 5 LPA)",
              "text",
              false,
              <DollarSign className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </fieldset>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <svg className="animate-spin h-5 w-5 text-white" /* ... */>
            {" "}
            {/* ... spinner paths ... */}
          </svg>
        ) : (
          <>
            <UserPlus className="h-5 w-5 mr-2" /> Add User
          </>
        )}
      </button>
    </form>
  );
};

// --- User List Component (Enhanced UI) ---
const UserManagementSection = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(9);
  const [filterType, setFilterType] = useState("recent");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [actionError, setActionError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = useCallback(
    async (page = 1, filter = "recent") => {
      setLoadingUsers(true);
      setErrorUsers(null);
      setActionError(null);
      try {
        const response = await adminApi.get(`/admin/users`, {
          params: { page, limit, filter },
        });
        if (response.data) {
          setUsers(response.data.users || []);
          setTotalUsers(response.data.totalUsers || 0);
          setCurrentPage(response.data.currentPage || 1);
          setTotalPages(response.data.totalPages || 1);
          setLimit(response.data.limit || 9);
          setFilterType(response.data.filter || "recent");
        } else {
          throw new Error("Invalid users response");
        }
      } catch (err) {
        console.error(`Error fetching ${filter} users:`, err);
        setErrorUsers(
          err.response?.data?.message || err.message || "Failed to load users."
        );
      } finally {
        setLoadingUsers(false);
      }
    },
    [limit]
  );
  useEffect(() => {
    fetchUsers(currentPage, filterType);
  }, [fetchUsers, currentPage, filterType]);
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure?")) return;
    setActionError(null);
    try {
      const response = await adminApi.delete(`/admin/users/${userId}`);
      if (response.data && response.status === 200) {
        // Refresh current page after deletion
        fetchUsers(currentPage, filterType);
      } else {
        throw new Error(response.data?.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Admin: Error deleting user:", err);
      setActionError(
        err.response?.data?.message || err.message || "Could not delete user."
      );
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleFilterChange = (newFilter) => {
    if (newFilter !== filterType) {
      setCurrentPage(1);
      setFilterType(newFilter);
    }
  };

  // Enhanced Filter Tabs
  const FilterTabs = () => (
    <div className="mb-5 flex justify-center sm:justify-start space-x-2 bg-gray-100 p-1 rounded-lg">
      {["recent", "week", "month"].map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterChange(filter)}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 
                      ${
                        filterType === filter
                          ? "bg-white text-indigo-700 shadow-sm"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                      }
                  `}
        >
          {filter === "week" || filter === "month"
            ? `This ${filter}`
            : "Recent"}
        </button>
      ))}
    </div>
  );

  // Enhanced Pagination Controls
  const PaginationControls = () => (
    <div className="mt-8 flex justify-center items-center space-x-3">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center justify-center h-9 w-9 rounded-full bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-sm font-medium text-gray-700">
        Page{" "}
        <span className="font-semibold text-indigo-600">{currentPage}</span> /{" "}
        {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center justify-center h-9 w-9 rounded-full bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );

  // Enhanced User Card with Click Navigation
  const UserCard = ({ user, onDelete }) => (
    <div
      className="relative bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col items-center group transition-all duration-200 hover:shadow-lg cursor-pointer"
      onClick={() => navigate(`/admin/users/${user._id}`)}
    >
      {/* Profile Image Section */}
      <div className="relative mb-4">
        {user.profilePicture ? (
          <img
            src={getProfileImageUrl(user.profilePicture)}
            alt={user.name}
            className="h-20 w-20 rounded-full object-cover border-2 border-gray-200 shadow group-hover:border-indigo-300 transition-colors duration-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name || "U"
              )}&background=E0E7FF&color=3730A3&size=80`;
            }}
          />
        ) : (
          <div className="h-20 w-20 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-700 text-3xl font-semibold border-2 border-gray-200 group-hover:border-indigo-300 transition-colors duration-200">
            {user.name ? user.name[0].toUpperCase() : <User size={30} />}
          </div>
        )}
        {user.isVerified && (
          <span
            className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-green-500 text-white rounded-full p-0.5 border border-white shadow-sm"
            title="Verified"
          >
            <UserCheck size={12} />
          </span>
        )}
      </div>
      {/* User Info Section */}
      <div className="text-center w-full mb-3">
        <p
          className="text-base font-semibold text-gray-800 mb-1 truncate"
          title={user.name}
        >
          {user.name}
        </p>
        <p
          className="text-xs text-indigo-600 font-medium truncate"
          title={user.email}
        >
          {user.email}
        </p>
        {user.mobileNumber && (
          <p className="text-xs text-gray-500 mt-0.5">{user.mobileNumber}</p>
        )}
      </div>
      {/* Footer/Meta Info Section */}
      <div className="w-full border-t border-gray-100 pt-3 mt-auto space-y-1 text-center">
        <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <Calendar size={12} /> Joined:{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
      {/* Delete Button (Appears on Hover) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(user._id);
        }}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-100 p-1 rounded-full focus:outline-none focus:ring-1 focus:ring-red-300 transition-all duration-200 z-10"
        title="Delete user"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-1 flex items-center">
        <Users className="h-5 w-5 mr-2 text-indigo-600" />
        User Management
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Viewing {users.length} of {totalUsers} total users.
      </p>

      <FilterTabs />

      {actionError && (
        <div className="my-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          Error: {actionError}
        </div>
      )}

      {loadingUsers ? (
        <div className="text-center py-16">
          <div className="animate-spin inline-block w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
          <p className="text-sm text-gray-500 mt-3">Loading Users...</p>
        </div>
      ) : errorUsers ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-md text-center">
          <p>Error loading users: {errorUsers}</p>
        </div>
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-10">
          No users found matching this filter.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
          {totalPages > 1 && <PaginationControls />}
        </>
      )}
    </div>
  );
};

// --- Main Admin Dashboard Component (Enhanced Layout) ---
const AdminDashboard = () => {
  const [totalUsersStat, setTotalUsersStat] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState(null);
  const navigate = useNavigate();

  const fetchTotalStats = useCallback(async () => {
    setLoadingStats(true);
    setErrorStats(null);
    try {
      const response = await adminApi.get("/admin/stats");
      if (response.data) {
        setTotalUsersStat(response.data.totalUsers || 0);
      } else {
        throw new Error("Invalid stats response");
      }
    } catch (err) {
      console.error("Error fetching total stats:", err);
      setErrorStats(
        err.response?.data?.message || err.message || "Failed to load stats."
      );
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchTotalStats();
  }, [fetchTotalStats]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin/login");
  };

  const handleUserAdded = () => {
    fetchTotalStats();
  };

  const staticStats = {
    activeUsers: Math.round(totalUsersStat * 0.9),
    verifiedUsers: Math.round(totalUsersStat * 0.75),
    newThisMonth: Math.round(totalUsersStat * 0.15),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Admin Header - slightly enhanced */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/logo.jpeg" alt="Logo" className="h-9 w-auto rounded" />
            <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-1.5 transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 mr-1.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Activity className="h-6 w-6 mr-2 text-indigo-500" />
            Dashboard Overview
          </h2>
          {loadingStats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl shadow-md border-l-4 border-gray-200 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : errorStats ? (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              <p>Error loading stats: {errorStats}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard
                title="Total Users"
                value={totalUsersStat}
                icon={<Users />}
                color="border-indigo-500"
                trend={`+${Math.round(totalUsersStat * 0.05)} today`}
              />
              <StatCard
                title="Active Users"
                value={staticStats.activeUsers}
                icon={<UserCheck />}
                color="border-green-500"
              />
              <StatCard
                title="Verified Users"
                value={staticStats.verifiedUsers}
                icon={<UserCheck />}
                color="border-blue-500"
              />
              <StatCard
                title="New this month"
                value={staticStats.newThisMonth}
                icon={<TrendingUp />}
                color="border-yellow-500"
              />
            </div>
          )}
        </section>

        {/* User Management & Add User Section */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* User List (takes more space on large screens) */}
          <div className="xl:col-span-2">
            <UserManagementSection />
          </div>

          {/* Add User Form */}
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
            <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center border-b pb-3">
              <UserPlus className="h-5 w-5 mr-2 text-indigo-600" />
              Create New User Profile
            </h3>
            <AddUserForm onUserAdded={handleUserAdded} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
