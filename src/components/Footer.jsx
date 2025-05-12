import React from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaChevronRight,
  FaCopyright,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaQuestion,
  FaUsers,
  FaStar,
} from "react-icons/fa";

// Import logo if available
// import Logo from "../assets/logo.png";

const Footer = () => {
  // Colors matching the Pricing page theme
  const themeColors = {
    primary: "#800020", // Burgundy
    primaryDark: "#600018",
    primaryLight: "#9A2540",
    secondary: "#DAA520", // Gold
    textDark: "#1F2937",
    textMedium: "#4B5563",
    textLight: "#F9FAFB",
    bgLight: "#FFF8F8",
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Top decorative border */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary}, ${themeColors.primary})`,
        }}
      ></div>

      {/* Main Footer Content */}
      <div
        className="pt-12 pb-6"
        style={{
          background: `linear-gradient(135deg, ${themeColors.bgLight} 0%, #FFF9FA 100%)`,
        }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          {/* Main Footer Grid - Now with 4 columns for more links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Us Column */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                {/* If you have a logo: */}
                {/* <img src={Logo} alt="SLNVK Matrimony" className="h-10 mr-3" /> */}

                {/* Branded heading with icon */}
                <div className="flex items-center">
                  <FaHeart
                    className="mr-2 text-2xl"
                    style={{ color: themeColors.primary }}
                  />
                  <h2
                    className="text-xl font-bold"
                    style={{ color: themeColors.primaryDark }}
                  >
                    SLNVK{" "}
                    <span style={{ color: themeColors.secondary }}>
                      Matrimony
                    </span>
                  </h2>
                </div>
              </div>

              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: themeColors.textMedium }}
              >
                Trusted matrimonial service helping you find your perfect life
                partner with traditional values and personalized guidance.
              </p>

              {/* Social Media - Simple Version */}
              <div className="flex space-x-3 mb-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{
                    background: themeColors.primary,
                  }}
                >
                  <FaFacebook
                    size={14}
                    style={{ color: themeColors.textLight }}
                  />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{
                    background: themeColors.primary,
                  }}
                >
                  <FaInstagram
                    size={14}
                    style={{ color: themeColors.textLight }}
                  />
                </a>
                <a
                  href="https://wa.me/917710870992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{
                    background: themeColors.primary,
                  }}
                >
                  <FaWhatsapp
                    size={14}
                    style={{ color: themeColors.textLight }}
                  />
                </a>
              </div>
            </div>

            {/* Contact Info Column */}
            <div className="md:col-span-1">
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: themeColors.primaryDark }}
              >
                Contact Us
              </h4>

              <div className="space-y-3">
                <a
                  href="tel:+917710870992"
                  className="flex items-center group hover:opacity-80 transition-opacity"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: `${themeColors.primary}15` }}
                  >
                    <FaPhoneAlt
                      size={12}
                      style={{ color: themeColors.primary }}
                    />
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: themeColors.textMedium }}
                  >
                    +91 77108 70992
                  </span>
                </a>

                <a
                  href="mailto:info@slnvk.com"
                  className="flex items-center group hover:opacity-80 transition-opacity"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: `${themeColors.primary}15` }}
                  >
                    <FaEnvelope
                      size={12}
                      style={{ color: themeColors.primary }}
                    />
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: themeColors.textMedium }}
                  >
                    info@slnvk.com
                  </span>
                </a>

                <div className="flex items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: `${themeColors.primary}15` }}
                  >
                    <FaMapMarkerAlt
                      size={12}
                      style={{ color: themeColors.primary }}
                    />
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: themeColors.textMedium }}
                  >
                    Currey Road, Mumbai near Station
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-1">
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: themeColors.primaryDark }}
              >
                Quick Links
              </h4>

              <div className="grid grid-cols-1 gap-y-2">
                {[
                  {
                    name: "Home",
                    path: "/",
                    icon: <FaChevronRight size={9} />,
                  },
                  {
                    name: "About Us",
                    path: "/about",
                    icon: <FaChevronRight size={9} />,
                  },
                  {
                    name: "Contact Us",
                    path: "/contact-us",
                    icon: <FaChevronRight size={9} />,
                  },
                  {
                    name: "Visit Office",
                    path: "/contact-us#office-details",
                    icon: <FaChevronRight size={9} />,
                  },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center group hover:translate-x-1 transition-transform duration-300"
                  >
                    <span
                      className="mr-2"
                      style={{ color: themeColors.primary }}
                    >
                      {item.icon}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: themeColors.textMedium }}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources Column (New) */}
            <div className="md:col-span-1">
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: themeColors.primaryDark }}
              >
                Resources
              </h4>

              <div className="grid grid-cols-1 gap-y-2">
                {[
                  {
                    name: "FAQ",
                    path: "/#faq",
                    icon: <FaQuestion size={10} />,
                  },
                  {
                    name: "Testimonials",
                    path: "/#testimonials",
                    icon: <FaStar size={10} />,
                  },
                  {
                    name: "Success Stories",
                    path: "/#stories",
                    icon: <FaHeart size={10} />,
                  },
                  {
                    name: "Our Community",
                    path: "/#community",
                    icon: <FaUsers size={10} />,
                  },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center group hover:translate-x-1 transition-transform duration-300"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center mr-2 transition-colors group-hover:bg-opacity-80"
                      style={{ backgroundColor: `${themeColors.secondary}15` }}
                    >
                      <span style={{ color: themeColors.secondary }}>
                        {item.icon}
                      </span>
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: themeColors.textMedium }}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright - Simplified */}
          <div
            className="mt-10 pt-5 border-t text-center"
            style={{ borderColor: `${themeColors.primary}15` }}
          >
            <div className="flex items-center justify-center">
              <FaCopyright
                size={12}
                className="mr-2"
                style={{ color: `${themeColors.primary}80` }}
              />
              <p
                className="text-sm"
                style={{ color: `${themeColors.primary}90` }}
              >
                {currentYear} SLNVK Matrimony. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
