import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUserFriends,
  FaArrowRight,
  FaHeart,
  FaUsers,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaUserCheck,
  FaComments,
  FaUserPlus,
  FaMagic,
  FaArrowDown,
  FaCheckCircle,
} from "react-icons/fa";
// Importing couple SVG
import coupleSvg from "../assets/couplesvg.png";

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

// Updated Benefits reflecting the service model
const benefits = [
  {
    title: "Verified Profiles",
    description:
      "Ensuring authenticity and safety with manually checked profiles.",
    icon: (
      <FaUserCheck
        className="w-12 h-12"
        style={{ color: themeColors.primary }}
      />
    ),
  },
  {
    title: "AI-Powered Matchmaking",
    description: "Smart compatibility matching based on preferences.",
    icon: (
      <FaHeart className="w-12 h-12" style={{ color: themeColors.primary }} />
    ),
  },
  {
    title: "Personalized Assistance",
    description: "Professional introductions upon mutual interest.",
    icon: (
      <FaUsers className="w-12 h-12" style={{ color: themeColors.primary }} />
    ),
  },
];

// Updated reviews with images
const reviews = [
  {
    name: "Priya & Rahul",
    testimonial:
      "Ujwal Bandhan helped us find our perfect match. The AI matchmaking was spot on!",
    duration: "Together for 2 years",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    imgPartner: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Anita & Vikram",
    testimonial:
      "The video call feature made it so easy to connect before meeting in person.",
    duration: "Together for 1.5 years",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    imgPartner: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Neha & Arjun",
    testimonial:
      "We felt safe knowing all profiles were verified. Found our soulmate here!",
    duration: "Together for 3 years",
    img: "https://randomuser.me/api/portraits/women/33.jpg",
    imgPartner: "https://randomuser.me/api/portraits/men/34.jpg",
  },
];

// Contact options data
const contactOptions = [
  {
    title: "Relationship Guidance",
    description: "Get personalized help in finding your ideal match",
    icon: <FaHeart />,
    whatsapp: "+919123456789",
    buttonText: "Chat with Relationship Expert",
    color: themeColors.primary,
  },
  {
    title: "Profile Assistance",
    description: "Need help with setting up or improving your profile?",
    icon: <FaUserFriends />,
    whatsapp: "+919123456789",
    buttonText: "Get Profile Help",
    color: "#2563EB", // Blue
  },
  {
    title: "General Support",
    description: "Questions about our service or technical assistance",
    icon: <FaPhoneAlt />,
    whatsapp: "+919123456789",
    buttonText: "Contact Support",
    color: "#047857", // Green
  },
];

// Office contact details
const officeDetails = {
  address: "Near Currey Road Station, Mumbai, Maharashtra 400013",
  phone: "+91 7710870992",
  email: "info@slnvk.com",
  hours: "Mon-Sat: 10:00 AM - 7:00 PM",
};

const ContactUs = () => {
  // Animation variants
  const animationVariants = useMemo(() => {
    return {
      fadeInUp: {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      },
      staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
      },
      fadeInLeft: {
        hidden: { opacity: 0, x: 30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.7, ease: "easeOut" },
        },
      },
      fadeInRight: {
        hidden: { opacity: 0, x: -30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.7, ease: "easeOut" },
        },
      },
    };
  }, []);

  const { fadeInUp, staggerContainer, fadeInLeft, fadeInRight } =
    animationVariants;

  // State for testimonial carousel
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  // Handle testimonial navigation
  const handleReviewChange = useCallback((direction) => {
    setIsAutoSliding(false);
    setCurrentReview((prev) => {
      if (direction === "prev") {
        return prev === 0 ? reviews.length - 1 : prev - 1;
      } else {
        return (prev + 1) % reviews.length;
      }
    });
    // Restart auto-slide after manual interaction
    const timer = setTimeout(() => setIsAutoSliding(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoSliding) {
      interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 10000); // 10 seconds for better reading time
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoSliding, reviews.length]);

  return (
    <motion.div
      className="min-h-screen"
      style={{ backgroundColor: themeColors.bgWhite }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[65vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: themeColors.bgWhite }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Enhanced Background Gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-white via-[#fff8f8] to-[#fffaf0]"></div>

        {/* Content Container with Increased Padding */}
        <div className="container mx-auto px-10 md:px-16 lg:px-20 z-10 relative py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left lg:pl-8"
            variants={fadeInRight}
          >
            <div
              className="inline-block mb-4 px-4 py-1 rounded-full bg-opacity-20"
              style={{ backgroundColor: `${themeColors.secondary}30` }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: themeColors.primaryDark }}
              >
                Find Your Perfect Match
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              style={{ color: themeColors.primaryDark }}
            >
              Your Journey to{" "}
              <span style={{ color: themeColors.primary }}>Partnership</span>{" "}
              Starts Here
            </h1>

            <p
              className="text-lg sm:text-xl mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ color: themeColors.textMedium }}
            >
              Connect with our personalized matchmaking services at Shree Laxmi
              Narayan Vivah Kendra for dedicated support in finding your perfect
              life partner.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.a
                href="#contact-options"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 5px 15px rgba(128, 0, 32, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: themeColors.primary,
                  color: themeColors.textLight,
                }}
                className="px-8 py-3.5 rounded-lg font-semibold shadow-md text-lg transition-all flex items-center"
              >
                Get Personalized Help
                <FaArrowDown className="ml-2 text-sm" />
              </motion.a>

              <motion.a
                href="#why-choose-us"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: themeColors.bgWhite,
                  color: themeColors.primaryDark,
                  borderColor: themeColors.primary,
                  boxShadow: "0 0 0 1px rgba(128, 0, 32, 0.2)",
                }}
                className="px-8 py-3.5 rounded-lg font-semibold text-lg transition-all flex items-center hover:bg-gray-50"
              >
                Why Choose Us
                <FaMagic
                  className="ml-2 text-sm"
                  style={{ color: themeColors.secondary }}
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Content - Couple SVG */}
          <motion.div
            className="lg:w-1/2 flex justify-center items-center"
            variants={fadeInLeft}
          >
            <motion.img
              src={coupleSvg}
              alt="Couple illustration"
              className="w-full max-w-md h-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <section
        id="why-choose-us"
        className="py-10 md:py-16"
        style={{
          background: `linear-gradient(135deg, ${themeColors.bgGray} 0%, #f5f5f7 100%)`,
        }}
      >
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-3"
              style={{
                backgroundColor: `${themeColors.secondary}20`,
                color: themeColors.primaryDark,
              }}
            >
              Our Advantages
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: themeColors.primaryDark }}
            >
              Why Choose{" "}
              <span style={{ color: themeColors.primary }}>
                Shree Laxmi Narayan Vivah Kendra
              </span>
            </h2>
            <p className="text-lg" style={{ color: themeColors.textMedium }}>
              We blend tradition with innovation to provide a trusted platform
              for finding your perfect life partner
            </p>
          </motion.div>

          {/* Modern Interactive Benefits Cards with Gradients */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.15 },
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="w-56 h-56 rounded-2xl overflow-hidden relative mb-6 shadow-lg group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    y: -10,
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${themeColors.bgWhite} 0%, ${themeColors.bgGray} 100%)`,
                  }}
                >
                  {/* Decorative Element */}
                  <div
                    className="absolute top-0 left-0 w-full h-1 transform origin-left"
                    style={{
                      background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
                      transition: "all 0.3s ease",
                    }}
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="mb-4 p-4 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${themeColors.primary}20, ${themeColors.secondary}10)`,
                      }}
                    >
                      {benefit.icon}
                    </motion.div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: themeColors.primaryDark }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: themeColors.textMedium }}
                    >
                      {benefit.description}
                    </p>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(45deg, ${themeColors.primary}, ${themeColors.secondary})`,
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options Section with Map Integration */}
      <section id="contact-options" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: themeColors.primaryDark }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Personalized Assistance
          </motion.h2>
          <motion.p
            className="text-center text-lg mb-12 md:mb-16 max-w-2xl mx-auto"
            style={{ color: themeColors.textMedium }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Connect with our experts directly via WhatsApp for customized
            guidance tailored to your needs
          </motion.p>

          <div className="max-w-6xl mx-auto rounded-xl shadow-xl overflow-hidden bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Contact Option - Left Side */}
              <motion.div
                className="p-10 md:p-12 flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-10">
                  <h3
                    className="text-2xl font-bold mb-5"
                    style={{ color: themeColors.primaryDark }}
                  >
                    Relationship Guidance
                  </h3>
                  <p className="text-gray-700 mb-8">
                    Our expert matchmakers are ready to help you find your ideal
                    match. With personalized guidance and tailored
                    recommendations, your journey to finding a life partner
                    becomes easier and more meaningful.
                  </p>

                  <div className="space-y-5 mb-8">
                    <div className="flex items-center">
                      <FaPhoneAlt
                        className="text-lg mr-4"
                        style={{ color: themeColors.primary }}
                      />
                      <p className="text-gray-700">{officeDetails.phone}</p>
                    </div>

                    <div className="flex items-center">
                      <FaEnvelope
                        className="text-lg mr-4"
                        style={{ color: themeColors.primary }}
                      />
                      <p className="text-gray-700">{officeDetails.email}</p>
                    </div>

                    <div className="flex items-center">
                      <FaClock
                        className="text-lg mr-4"
                        style={{ color: themeColors.primary }}
                      />
                      <p className="text-gray-700">{officeDetails.hours}</p>
                    </div>
                  </div>

                  <motion.a
                    href={`https://wa.me/${contactOptions[0].whatsapp.replace(
                      /[^0-9]/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 text-center text-white flex items-center justify-center"
                    style={{
                      background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.primaryLight})`,
                      boxShadow: `0 4px 14px rgba(128, 0, 32, 0.3)`,
                    }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: `0 6px 20px rgba(128, 0, 32, 0.4)`,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaWhatsapp className="mr-3 text-xl" />
                    Chat with Relationship Expert
                  </motion.a>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h4
                    className="text-xl font-semibold mb-4"
                    style={{ color: themeColors.primaryDark }}
                  >
                    Our Office
                  </h4>
                  <div className="flex items-start mb-6">
                    <FaMapMarkerAlt
                      className="text-xl mt-1 mr-4"
                      style={{ color: themeColors.primary }}
                    />
                    <p className="text-gray-700">{officeDetails.address}</p>
                  </div>
                </div>
              </motion.div>

              {/* Map - Right Side */}
              <motion.div
                className="h-full min-h-[400px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <iframe
                  title="Office Location"
                  className="w-full h-full border-0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6139525610814!2d72.8308791741872!3d18.994229954010382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cfe7e73b6e89%3A0x81cf389d7eb818e4!2sCurrey%20Road%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1682847867074!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, ${themeColors.bgGray} 0%, #f5f5f7 100%)`,
        }}
      >
        <div className="container mx-auto px-6 md:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: themeColors.primaryDark }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Success Stories
          </motion.h2>

          <motion.p
            className="text-center text-lg mb-16 max-w-2xl mx-auto"
            style={{ color: themeColors.textMedium }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Read about couples who found their perfect match with our services
          </motion.p>

          <div className="max-w-4xl mx-auto relative">
            {/* Professional testimonial card container */}
            <div className="relative h-[320px] sm:h-[260px] mb-8">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, position: "absolute" }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 absolute w-full overflow-hidden"
                  style={{
                    background: "linear-gradient(to right, #fff, #fcfcfc)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Images and banner section */}
                    <div className="sm:w-2/5 bg-gradient-to-br from-[#f8f0f0] to-[#f0f8ff] p-6 flex flex-col items-center justify-center">
                      <div className="flex -space-x-2 mb-4">
                        <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden shadow-md z-10">
                          <img
                            src={reviews[currentReview].img}
                            alt={reviews[currentReview].name.split("&")[0]}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden shadow-md">
                          <img
                            src={reviews[currentReview].imgPartner}
                            alt={reviews[currentReview].name.split("&")[1]}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-center text-gray-800 mb-1">
                        {reviews[currentReview].name}
                      </h4>
                      <p className="text-sm text-gray-500 text-center">
                        {reviews[currentReview].duration}
                      </p>
                      <div className="flex mt-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial text section */}
                    <div className="sm:w-3/5 p-8 flex items-center">
                      <div>
                        <div className="text-5xl text-gray-200 font-serif mb-2">
                          "
                        </div>
                        <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                          {reviews[currentReview].testimonial}
                        </p>
                        <div
                          className="h-1 w-16 rounded"
                          style={{
                            background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.primaryLight})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center sm:justify-between items-center mt-4">
              <motion.button
                onClick={() => handleReviewChange("prev")}
                className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous testimonial"
                disabled={reviews.length <= 1}
                style={{ color: themeColors.primary }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex space-x-3 items-center">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300`}
                    style={{
                      backgroundColor:
                        currentReview === index
                          ? themeColors.primary
                          : "#D1D5DB",
                      transform:
                        currentReview === index ? "scale(1.3)" : "scale(1)",
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={() => handleReviewChange("next")}
                className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next testimonial"
                disabled={reviews.length <= 1}
                style={{ color: themeColors.primary }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact-form"
        className="py-12 md:py-16 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${themeColors.bgAccent} 0%, #fff8e9 100%)`,
        }}
      >
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(${themeColors.primary}30 1px, transparent 1px)`,
            backgroundSize: "20px 20px"
          }}></div>
        </div>

        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: themeColors.primaryDark }}
            >
              Get in <span style={{ color: themeColors.primary }}>Touch</span>
            </h2>
            <p className="text-lg" style={{ color: themeColors.textMedium }}>
              Reach out to us through any of these convenient options
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Hexagon contact cards */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {/* Phone Contact - Clickable */}
                <motion.a
                  href="tel:+917710870992"
                  className="p-6 hover:bg-gray-50 transition-all duration-300 flex flex-col items-center text-center relative group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ backgroundColor: "#f9f4f5" }}
                >
                  {/* Top accent bar */}
                  <div 
                    className="absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: themeColors.primary }}
                  ></div>
                  
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${themeColors.primary}20, ${themeColors.primary}10)`,
                      boxShadow: `0 4px 10px ${themeColors.primary}15`,
                    }}
                  >
                    <FaPhoneAlt
                      className="w-5 h-5"
                      style={{ color: themeColors.primary }}
                    />
                  </div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: themeColors.primaryDark }}
                  >
                    Call Us
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">Our team is ready to assist you</p>
                  <p
                    className="text-lg font-bold"
                    style={{ color: themeColors.primary }}
                  >
                    +91 7710870992
                  </p>
                </motion.a>

                {/* Email Contact - Clickable */}
                <motion.a
                  href="mailto:info@slnvk.com"
                  className="p-6 hover:bg-gray-50 transition-all duration-300 flex flex-col items-center text-center relative group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ backgroundColor: "#f9f4f5" }}
                >
                  {/* Top accent bar */}
                  <div 
                    className="absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: themeColors.primary }}
                  ></div>
                  
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${themeColors.primary}20, ${themeColors.primary}10)`,
                      boxShadow: `0 4px 10px ${themeColors.primary}15`,
                    }}
                  >
                    <FaEnvelope
                      className="w-5 h-5"
                      style={{ color: themeColors.primary }}
                    />
                  </div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: themeColors.primaryDark }}
                  >
                    Email Us
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">Send us your questions anytime</p>
                  <p
                    className="text-lg font-bold"
                    style={{ color: themeColors.primary }}
                  >
                    info@slnvk.com
                  </p>
                </motion.a>

                {/* WhatsApp Contact - Clickable */}
                <motion.a
                  href="https://wa.me/917710870992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 hover:bg-gray-50 transition-all duration-300 flex flex-col items-center text-center relative group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ backgroundColor: "#f9f4f5" }}
                >
                  {/* Top accent bar */}
                  <div 
                    className="absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: themeColors.primary }}
                  ></div>
                  
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${themeColors.primary}20, ${themeColors.primary}10)`,
                      boxShadow: `0 4px 10px ${themeColors.primary}15`,
                    }}
                  >
                    <FaWhatsapp
                      className="w-5 h-5"
                      style={{ color: themeColors.primary }}
                    />
                  </div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: themeColors.primaryDark }}
                  >
                    WhatsApp Us
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">Chat with us instantly</p>
                  <p
                    className="text-lg font-bold"
                    style={{ color: themeColors.primary }}
                  >
                    +91 7710870992
                  </p>
                </motion.a>
              </div>
              
              {/* Office Hours - Bottom Banner */}
              <div className="bg-gray-50 p-4 flex items-center justify-center border-t border-gray-200">
                <FaClock
                  className="w-4 h-4 mr-2"
                  style={{ color: themeColors.primary }}
                />
                <p className="text-sm font-medium" style={{ color: themeColors.primaryDark }}>
                  Office Hours: <span className="font-normal text-gray-600">{officeDetails.hours}</span>
                </p>
              </div>
            </div>
            
            {/* Visual flourish element */}
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div 
                  className="w-12 h-1 rounded-full" 
                  style={{ backgroundColor: themeColors.primary }}
                ></div>
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: themeColors.primary }}
                ></div>
                <div 
                  className="w-12 h-1 rounded-full" 
                  style={{ backgroundColor: themeColors.primary }}
                ></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactUs;
