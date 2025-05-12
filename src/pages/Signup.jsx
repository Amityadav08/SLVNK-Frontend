import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Select from "react-select"; // Using react-select for better dropdowns

// --- Theme Colors (Consistent with other pages) ---
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
  bgAccent: "#FFF8E1", // Light yellow accent
  error: "#DC2626", // Red for errors
};

// --- Icons ---
const PhoneIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const CameraIcon = () => (
  <svg
    className="h-16 w-16 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// --- Toast Notification Component ---
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded-md shadow-lg text-white text-sm z-50 flex items-center justify-between min-w-[250px] max-w-md ${
        type === "error"
          ? "bg-red-600"
          : type === "success"
          ? "bg-green-600"
          : "bg-blue-600"
      }`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-light leading-none"
      >
        &times;
      </button>
    </div>
  );
};

// --- Reusable Input Component ---
const InputField = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = true,
  icon,
  maxLength,
  disabled = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative rounded-md shadow-sm">
      {icon && icon}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 sm:text-sm ${
          icon ? "pl-10" : ""
        } ${
          error
            ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 text-gray-900 focus:border-[#800020] focus:ring-[#800020]"
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </div>
    {error && (
      <p className="mt-1 text-xs text-red-600" id={`${id}-error`}>
        {error}
      </p>
    )}
  </div>
);

// --- Reusable Select Component (using react-select) ---
const SelectField = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  error,
  placeholder,
  required = true,
  isMulti = false,
}) => {
  // Custom styles for react-select to match theme
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: error
        ? themeColors.error
        : state.isFocused
        ? themeColors.primary
        : "#D1D5DB", // gray-300
      boxShadow: state.isFocused ? `0 0 0 1px ${themeColors.primary}` : null,
      "&:hover": {
        borderColor: error
          ? themeColors.error
          : state.isFocused
          ? themeColors.primary
          : "#9CA3AF", // gray-400
      },
      minHeight: "38px", // Match input height
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
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? themeColors.primary
        : state.isFocused
        ? themeColors.bgAccent
        : null,
      color: state.isSelected
        ? themeColors.textLight
        : state.isFocused
        ? themeColors.primaryDark
        : themeColors.textDark,
      "&:active": {
        backgroundColor: themeColors.primaryDark,
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: themeColors.bgAccent,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: themeColors.primaryDark,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: themeColors.primaryDark,
      ":hover": {
        backgroundColor: themeColors.primary,
        color: "white",
      },
    }),
  };

  // Convert simple string array options to { value: string, label: string }
  const formattedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  // Find the selected option object(s) based on the value prop
  const selectedValue = isMulti
    ? formattedOptions.filter((opt) => value?.includes(opt.value))
    : formattedOptions.find((opt) => opt.value === value);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        inputId={id}
        name={name}
        options={formattedOptions}
        value={selectedValue}
        onChange={(selectedOption) => {
          const newValue = isMulti
            ? selectedOption
              ? selectedOption.map((opt) => opt.value)
              : []
            : selectedOption
            ? selectedOption.value
            : "";
          // Simulate event object for standard handleChange
          onChange({ target: { name, value: newValue } });
        }}
        placeholder={placeholder || "Select..."}
        isMulti={isMulti}
        styles={customStyles}
        classNamePrefix="react-select"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

// --- Stepper Component ---
const Stepper = ({ currentStep }) => {
  const steps = [
    "Personal Details",
    "Account Setup",
    "Profile Information",
    "Photo & Verification",
  ];

  return (
    <div className="w-full px-4 sm:px-0 mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-[#800020] border-[#800020] text-white"
                      : isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="font-semibold">{stepNumber}</span>
                  )}
                </div>
                <p
                  className={`mt-2 text-xs text-center font-medium ${
                    isActive || isCompleted ? "text-[#800020]" : "text-gray-500"
                  }`}
                >
                  {step}
                </p>
              </div>
              {stepNumber < steps.length && (
                <div
                  className={`flex-auto border-t-2 transition-colors duration-500 mx-2 ${
                    isCompleted ? "border-green-500" : "border-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// --- Constants for Select Options ---
const GENDER_OPTIONS = ["Male", "Female", "Other"];
const MARITAL_STATUS_OPTIONS = [
  "Never Married",
  "Divorced",
  "Widowed",
  "Awaiting Divorce",
  "Annulled",
];
const PHYSICAL_STATUS_OPTIONS = ["Normal", "Physically Challenged"];
const BODY_TYPE_OPTIONS = ["Slim", "Average", "Athletic", "Heavy"];
const COMPLEXION_OPTIONS = [
  "Very Fair",
  "Fair",
  "Wheatish",
  "Wheatish Brown",
  "Dark",
];
const PROFILE_CREATED_BY_OPTIONS = [
  "Self",
  "Parent",
  "Sibling",
  "Friend",
  "Other",
];
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]; // Example list, might need refinement
const RELIGION_OPTIONS = [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Jain",
  "Buddhist",
  "Parsi",
  "Jewish",
  "Other",
  "No Religion",
];
const MANGLIK_OPTIONS = ["Yes", "No", "Don't Know"];
const EDUCATION_LEVEL_OPTIONS = [
  "Doctorate",
  "Master's Degree",
  "Bachelor's Degree",
  "Diploma",
  "Higher Secondary (12th)",
  "Secondary (10th)",
  "Less than 10th",
];
const FAMILY_TYPE_OPTIONS = ["Joint", "Nuclear"];
const FAMILY_VALUES_OPTIONS = ["Traditional", "Moderate", "Liberal"];
const DIET_OPTIONS = [
  "Vegetarian",
  "Non-Vegetarian",
  "Eggetarian",
  "Jain",
  "Vegan",
];
const SMOKING_HABITS_OPTIONS = ["Non-smoker", "Occasional Smoker", "Smoker"];
const DRINKING_HABITS_OPTIONS = [
  "Non-drinker",
  "Occasional Drinker",
  "Drinker",
];

// --- Main Signup Component ---
const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    profileCreatedBy: "Self",
    name: "",
    gender: "",
    dateOfBirth: "",
    mobileNumber: "",
    city: "",
    state: "",
    country: "India",
    // Step 2: Account Setup
    email: "",
    password: "",
    confirmPassword: "",
    // Step 3: Profile Information (Expanded)
    maritalStatus: "",
    heightCm: "",
    weightKg: "",
    physicalStatus: "Normal",
    bodyType: "Average",
    complexion: "",
    motherTongue: "",
    religion: "",
    caste: "",
    subCaste: "",
    gothra: "",
    manglik: "Don't Know",
    educationLevel: "",
    educationField: "",
    occupation: "",
    annualIncome: "",
    fatherStatus: "",
    motherStatus: "",
    numberOfSiblings: 0,
    siblingsMarried: 0,
    familyType: "",
    familyValues: "",
    diet: "",
    smokingHabits: "Non-smoker",
    drinkingHabits: "Non-drinker",
    bio: "",
    // Step 4: Photo & Verification (File handled separately)
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { register, isLoading, isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/search");
    }
  }, [isAuthenticated, navigate]);

  const showToast = (message, type = "info") => {
    setToast({ message, type, id: Date.now() }); // Add unique ID
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB size limit
        setErrors((prev) => ({
          ...prev,
          profileImage: "Image size should not exceed 5MB.",
        }));
        setProfileImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
      } else {
        setProfileImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
        if (errors.profileImage) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.profileImage;
            return newErrors;
          });
        }
      }
    } else if (file) {
      // If a file is selected but it's not an image
      setErrors((prev) => ({
        ...prev,
        profileImage: "Please select a valid image file (e.g., JPG, PNG).",
      }));
      setProfileImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
    } else {
      // No file selected
      setProfileImageFile(null);
      setImagePreview(null);
    }
  };

  // --- Validation Logic ---
  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    const validateField = (field, message) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = message;
        isValid = false;
      }
    };

    const validateEmail = () => {
      if (!formData.email) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
        isValid = false;
      }
    };

    const validatePassword = () => {
      if (!formData.password) {
        newErrors.password = "Password is required";
        isValid = false;
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        isValid = false;
      }
    };

    const validateConfirmPassword = () => {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    };

    const validateMobile = () => {
      if (!formData.mobileNumber) {
        newErrors.mobileNumber = "Mobile number is required";
        isValid = false;
      }
      // Add more specific regex if needed, e.g., /^[6-9]\d{9}$/ for India
    };

    const validateDate = (field, message) => {
      if (!formData[field]) {
        newErrors[field] = message;
        isValid = false;
      } else {
        const date = new Date(formData[field]);
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
          age--;
        }
        if (age < 18) {
          // Example: Minimum age 18
          newErrors[field] = "You must be at least 18 years old";
          isValid = false;
        }
        if (date > today) {
          newErrors[field] = "Date of birth cannot be in the future";
          isValid = false;
        }
      }
    };

    switch (step) {
      case 1: // Personal Details
        validateField("name", "Full Name is required");
        validateField("gender", "Gender is required");
        validateDate("dateOfBirth", "Date of Birth is required");
        validateMobile("mobileNumber");
        validateField("city", "City is required");
        validateField("state", "State is required");
        validateField("country", "Country is required");
        validateField("profileCreatedBy", "Profile creator is required");
        break;
      case 2: // Account Setup
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        break;
      case 3: // Profile Information (Validate key fields, others might be optional)
        validateField("maritalStatus", "Marital status is required");
        validateField("motherTongue", "Mother tongue is required");
        validateField("religion", "Religion is required");
        validateField("caste", "Caste is required");
        validateField("educationLevel", "Education level is required");
        validateField("occupation", "Occupation is required");
        if (formData.bio && formData.bio.length > 500) {
          newErrors.bio = "Bio cannot exceed 500 characters";
          isValid = false;
        }
        // Add validation for other Step 3 fields if they become mandatory
        break;
      case 4: // Photo & Verification
        // We might make the photo required here
        // if (!profileImageFile) {
        //     newErrors.profileImage = "Profile picture is required to complete registration.";
        //     isValid = false;
        // }
        // Add verification logic validation if any (e.g., OTP)
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  // --- Navigation Logic ---
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo(0, 0); // Scroll to top on step change
      } else {
        // If on the last step, trigger final submission
        handleSubmit();
      }
    } else {
      showToast("Please fill in all required fields correctly.", "error");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0); // Scroll to top on step change
      setErrors({}); // Clear errors when going back
    }
  };

  // --- Submission Logic ---
  const handleSubmit = async () => {
    // Final validation check
    if (
      !validateStep(1) ||
      !validateStep(2) ||
      !validateStep(3) /*|| !validateStep(4)*/
    ) {
      showToast(
        "Some information is missing or invalid. Please review all steps.",
        "error"
      );
      return;
    }

    // --- Create FormData ---
    const registrationFormData = new FormData();

    // Append all fields from the state
    Object.keys(formData).forEach((key) => {
      // Don't append confirmPassword
      if (key !== "confirmPassword") {
        // Handle potential null/undefined values, send empty string if needed
        registrationFormData.append(key, formData[key] ?? "");
      }
    });

    // Append profile image file if it exists
    if (profileImageFile) {
      registrationFormData.append("profileImage", profileImageFile);
    }
    // -----------------------

    try {
      showToast("Registering your profile...", "info");
      // Send the FormData using the updated register function
      const registrationResult = await register(registrationFormData);

      if (registrationResult.success && registrationResult.token) {
        // Backend handles saving image path now
        showToast("Registration successful!", "success");

        // Delay navigation slightly
        setTimeout(() => {
          navigate("/search");
        }, 1500);
      } else {
        // Handle registration failure
        showToast(
          registrationResult.message ||
            "Registration failed. Please check your details.",
          "error"
        );
        // Set errors from backend if available
        if (registrationResult.errors) {
          const backendErrors = registrationResult.errors; // Use errors directly if formatted by handleValidationError
          setErrors((prev) => ({ ...prev, ...backendErrors }));

          // Try to navigate to the step with the first error
          const firstErrorField = Object.keys(backendErrors)[0];
          if (firstErrorField) {
            if (
              ["email", "password", "confirmPassword", "profileImage"].includes(
                firstErrorField
              )
            )
              setCurrentStep(firstErrorField === "profileImage" ? 4 : 2);
            else if (
              [
                "name",
                "gender",
                "dateOfBirth",
                "mobileNumber",
                "city",
                "state",
                "country",
                "profileCreatedBy",
              ].includes(firstErrorField)
            )
              setCurrentStep(1);
            else setCurrentStep(3); // Default to step 3 for other profile fields
          }
        }
      }
    } catch (error) {
      console.error("Signup handleSubmit error:", error);
      showToast(
        "An unexpected server error occurred. Please try again later.",
        "error"
      );
    }
  };

  // --- Render Logic ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-[#FFF8E1] to-white flex flex-col items-center justify-start pt-10 pb-12 px-4 sm:px-6 lg:px-8">
      {toast && (
        <Toast
          key={toast.id} // Use key for animation triggering
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="w-full max-w-4xl text-center mb-8">
        <h2
          className="text-3xl font-bold"
          style={{ color: themeColors.primaryDark }}
        >
          Create Your Account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Join our community and find your perfect match from the Maharashtrian
          community
        </p>
      </div>

      {/* Stepper */}
      <div className="w-full max-w-2xl mb-8">
        <Stepper currentStep={currentStep} />
      </div>

      {/* Form Container */}
      <div className="w-full max-w-2xl">
        <div
          key={currentStep} // Keep key for potential future animation library
          className="bg-white py-8 px-6 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200"
        >
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* ----- Step 1: Personal Details ----- */}
            {currentStep === 1 && (
              <>
                <h3
                  className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2"
                  style={{ borderColor: themeColors.primary + "40" }}
                >
                  Personal Details
                </h3>
                <SelectField
                  id="profileCreatedBy"
                  name="profileCreatedBy"
                  label="Profile Created By"
                  options={PROFILE_CREATED_BY_OPTIONS}
                  value={formData.profileCreatedBy}
                  onChange={handleInputChange}
                  error={errors.profileCreatedBy}
                  required
                />
                <InputField
                  id="name"
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  placeholder="Enter your full name"
                  icon={<UserIcon />}
                  required
                />
                <SelectField
                  id="gender"
                  name="gender"
                  label="Gender"
                  options={GENDER_OPTIONS}
                  value={formData.gender}
                  onChange={handleInputChange}
                  error={errors.gender}
                  placeholder="Select your gender"
                  required
                />
                <InputField
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  error={errors.dateOfBirth}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <InputField
                      id="mobileNumber"
                      name="mobileNumber"
                      label="Mobile Number"
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      error={errors.mobileNumber}
                      placeholder="Enter your mobile number"
                      icon={<PhoneIcon />}
                      required
                      maxLength={15}
                    />
                    {/* Consider adding country code dropdown later */}
                  </div>
                  <InputField
                    id="city"
                    name="city"
                    label="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={errors.city}
                    placeholder="Enter your city"
                    icon={<LocationIcon />}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField
                    id="state"
                    name="state"
                    label="State"
                    options={INDIAN_STATES} // Use predefined list
                    value={formData.state}
                    onChange={handleInputChange}
                    error={errors.state}
                    placeholder="Select your state"
                    required
                  />
                  <InputField
                    id="country"
                    name="country"
                    label="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    error={errors.country}
                    placeholder="Enter your country"
                    disabled // Defaulting to India for now
                    required
                  />
                </div>
              </>
            )}

            {/* ----- Step 2: Account Setup ----- */}
            {currentStep === 2 && (
              <>
                <h3
                  className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2"
                  style={{ borderColor: themeColors.primary + "40" }}
                >
                  Account Setup
                </h3>
                <InputField
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  placeholder="you@example.com"
                  icon={<EmailIcon />}
                  required
                />
                <InputField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  placeholder="Must be at least 6 characters"
                  icon={<LockIcon />}
                  required
                />
                <InputField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  placeholder="Re-enter your password"
                  icon={<LockIcon />}
                  required
                />
              </>
            )}

            {/* ----- Step 3: Profile Information ----- */}
            {currentStep === 3 && (
              <>
                <h3
                  className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2"
                  style={{ borderColor: themeColors.primary + "40" }}
                >
                  Profile Information
                </h3>
                {/* Basic Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField
                    id="maritalStatus"
                    name="maritalStatus"
                    label="Marital Status"
                    options={MARITAL_STATUS_OPTIONS}
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    error={errors.maritalStatus}
                    required
                  />
                  <InputField
                    id="motherTongue"
                    name="motherTongue"
                    label="Mother Tongue"
                    value={formData.motherTongue}
                    onChange={handleInputChange}
                    error={errors.motherTongue}
                    placeholder="e.g., Marathi, Hindi"
                    required
                  />
                </div>
                {/* Physical Attributes Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField
                    id="heightCm"
                    name="heightCm"
                    label="Height (cm)"
                    type="number"
                    min="120"
                    max="240"
                    value={formData.heightCm}
                    onChange={handleInputChange}
                    error={errors.heightCm}
                    placeholder="e.g., 170"
                    required={false} // Making optional for now
                  />
                  <SelectField
                    id="bodyType"
                    name="bodyType"
                    label="Body Type"
                    options={BODY_TYPE_OPTIONS}
                    value={formData.bodyType}
                    onChange={handleInputChange}
                    error={errors.bodyType}
                    required={false}
                  />
                  <SelectField
                    id="complexion"
                    name="complexion"
                    label="Complexion"
                    options={COMPLEXION_OPTIONS}
                    value={formData.complexion}
                    onChange={handleInputChange}
                    error={errors.complexion}
                    required={false}
                  />
                </div>
                {/* Religious Background Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SelectField
                    id="religion"
                    name="religion"
                    label="Religion"
                    options={RELIGION_OPTIONS}
                    value={formData.religion}
                    onChange={handleInputChange}
                    error={errors.religion}
                    required
                  />
                  <InputField
                    id="caste"
                    name="caste"
                    label="Caste"
                    value={formData.caste}
                    onChange={handleInputChange}
                    error={errors.caste}
                    placeholder="Enter your caste"
                    required
                  />
                  <SelectField
                    id="manglik"
                    name="manglik"
                    label="Manglik"
                    options={MANGLIK_OPTIONS}
                    value={formData.manglik}
                    onChange={handleInputChange}
                    error={errors.manglik}
                    required={false}
                  />
                </div>
                {/* Education & Career Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SelectField
                    id="educationLevel"
                    name="educationLevel"
                    label="Highest Education"
                    options={EDUCATION_LEVEL_OPTIONS}
                    value={formData.educationLevel}
                    onChange={handleInputChange}
                    error={errors.educationLevel}
                    required
                  />
                  <InputField
                    id="occupation"
                    name="occupation"
                    label="Occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    error={errors.occupation}
                    placeholder="e.g., Software Engineer"
                    required
                  />
                  <InputField
                    id="annualIncome"
                    name="annualIncome"
                    label="Annual Income (Optional)"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                    error={errors.annualIncome}
                    placeholder="e.g., 10-15 LPA, 50k USD"
                    required={false}
                  />
                </div>
                {/* Family Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField
                    id="familyType"
                    name="familyType"
                    label="Family Type"
                    options={FAMILY_TYPE_OPTIONS}
                    value={formData.familyType}
                    onChange={handleInputChange}
                    error={errors.familyType}
                    required={false}
                  />
                  <SelectField
                    id="familyValues"
                    name="familyValues"
                    label="Family Values"
                    options={FAMILY_VALUES_OPTIONS}
                    value={formData.familyValues}
                    onChange={handleInputChange}
                    error={errors.familyValues}
                    required={false}
                  />
                </div>
                {/* Lifestyle Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SelectField
                    id="diet"
                    name="diet"
                    label="Dietary Habits"
                    options={DIET_OPTIONS}
                    value={formData.diet}
                    onChange={handleInputChange}
                    error={errors.diet}
                    required={false}
                  />
                  <SelectField
                    id="smokingHabits"
                    name="smokingHabits"
                    label="Smoking Habits"
                    options={SMOKING_HABITS_OPTIONS}
                    value={formData.smokingHabits}
                    onChange={handleInputChange}
                    error={errors.smokingHabits}
                    required={false}
                  />
                  <SelectField
                    id="drinkingHabits"
                    name="drinkingHabits"
                    label="Drinking Habits"
                    options={DRINKING_HABITS_OPTIONS}
                    value={formData.drinkingHabits}
                    onChange={handleInputChange}
                    error={errors.drinkingHabits}
                    required={false}
                  />
                </div>
                {/* About Me */}
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    About Yourself (Optional)
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleInputChange}
                    maxLength="500"
                    placeholder="Write a few words about yourself, your interests, and what you're looking for..."
                    className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 sm:text-sm ${
                      errors.bio
                        ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 text-gray-900 focus:border-[#800020] focus:ring-[#800020]"
                    }`}
                  />
                  {errors.bio && (
                    <p className="mt-1 text-xs text-red-600">{errors.bio}</p>
                  )}
                </div>
              </>
            )}

            {/* ----- Step 4: Photo & Verification ----- */}
            {currentStep === 4 && (
              <>
                <h3
                  className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2"
                  style={{ borderColor: themeColors.primary + "40" }}
                >
                  Photo & Verification
                </h3>
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Profile Picture (Optional but Recommended)
                  </label>
                  <div
                    className="relative h-36 w-36 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-center cursor-pointer hover:border-[#800020] hover:bg-red-50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-500 px-2">
                        <CameraIcon />
                        <span className="text-xs mt-1 block">
                          Click to upload
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                    id="profileImage"
                    name="profileImage"
                  />
                  {errors.profileImage && (
                    <p className="text-xs text-red-600">
                      {errors.profileImage}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Max 5MB. JPG, PNG, WEBP supported.
                  </p>
                </div>

                {/* Verification Section Placeholder */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-medium text-gray-700 mb-3">
                    Verification (Optional)
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Verify your profile to increase trust. We may ask for mobile
                    OTP or ID verification later.
                  </p>
                  {/* Add verification options here (e.g., Send OTP button) */}
                  <button
                    type="button"
                    disabled // Disabled for now
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-gray-100 cursor-not-allowed"
                  >
                    Verify Mobile (Coming Soon)
                  </button>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-100">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A2540]"
                >
                  Back
                </button>
              )}
              {currentStep <= 4 && ( // Always show Next/Submit button except maybe on final success
                <button
                  type="button" // Changed type to button to prevent default form submission
                  onClick={handleNext}
                  disabled={isLoading}
                  className={`inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#600018] ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#800020] hover:bg-[#600018]"
                  } ${currentStep === 1 ? "ml-auto" : ""}`} // Push to right if no back button
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : currentStep === 4 ? (
                    "Submit Registration"
                  ) : (
                    "Next"
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Already have an account link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium hover:underline"
                style={{ color: themeColors.primary }}
              >
                Login here
              </Link>
            </p>
          </div>

          {/* Need Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center bg-gray-50 -mx-6 sm:-mx-10 -mb-8 py-6 rounded-b-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Need Help?
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              If you have any questions or need assistance with registration,
              please contact us.
            </p>
            <div className="flex justify-center items-center space-x-4 text-xs">
              {/* Replace with actual links/numbers */}
              <a
                href="tel:+910000000000"
                className="inline-flex items-center text-gray-600 hover:text-[#800020]"
              >
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.153a1 1 0 01-.986-.836l-.74-4.435a1 1 0 01.54-1.06l1.548-.773a11.037 11.037 0 00-6.105-6.105l-.774 1.548a1 1 0 01-1.06.54l-4.435-.74A1 1 0 013 4.847V3z"></path>
                </svg>
                Call Support
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="mailto:support@example.com"
                className="inline-flex items-center text-gray-600 hover:text-[#800020]"
              >
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                Email Us
              </a>
              <span className="text-gray-300">|</span>
              <Link
                to="/faq"
                className="inline-flex items-center text-gray-600 hover:text-[#800020]"
              >
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
