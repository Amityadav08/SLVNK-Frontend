import React, { useState, useEffect, useCallback, Suspense } from "react";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";

// Data from CustomerReviews component - UPDATED with website name
const reviewsData = [
  [
    {
      names: "Priya & Rohan",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
      duration: "Together for 8 months",
      quote:
        "Found my perfect match faster than I ever expected! The platform is intuitive.",
    },
    {
      names: "Sameer & Aisha",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png",
      duration: "Engaged after 6 months",
      quote:
        "The verification process gave us confidence. So happy we found each other here!",
    },
    {
      names: "Karan & Simran",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
      duration: "Together for 1 year",
      quote:
        "We connected instantly over shared values. Thank you, Shree Laxmi Narayan Vivah Kendra!",
    },
    {
      names: "Deepak & Anjali",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png",
      duration: "Together for 9 months",
      quote:
        "Finally, a modern platform that respects traditions. Highly recommended.",
    },
  ],
  // Add more unique review batches if desired, following the pattern
  [
    {
      names: "Neha & Vikram",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
      duration: "Together for 10 months",
      quote:
        "The search filters are excellent and helped narrow down compatible profiles.",
    },
    {
      names: "Aditya & Meera",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png",
      duration: "Planning our wedding!",
      quote:
        "We appreciated the focus on genuine connections and detailed profiles.",
    },
    {
      names: "Sunil & Kavita",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n2WtXQXVJJBNVmsDH9uG21PB2S9oRo.png",
      duration: "Together for 7 months",
      quote:
        "Easy to use and found someone wonderful. What more could you ask for?",
    },
    {
      names: "Rahul & Pooja", // Changed duplicate name
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlXue6uHjb38woHRZzf9PAk5rZL1YR.png",
      duration: "Together for 11 months",
      quote:
        "The customer support was helpful during our initial setup. Great service!",
    },
  ],
];

// Journey steps data - Refined with SVG icon codes
const journeySteps = [
  {
    year: "Month 1-3",
    title: "Idea & Foundation",
    description:
      "The concept for our platform was born from a desire to modernize matchmaking while honoring traditions.",
    outcome: "Mission established",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7 text-white"
      >
        <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.75 6.75 0 01-.937-.171.75.75 0 11.374-1.453 5.25 5.25 0 002.626 0 .75.75 0 11.374 1.452 6.75 6.75 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
        <path
          fillRule="evenodd"
          d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z"
          clipRule="evenodd"
        />
      </svg>
    ),
    position: "bottom",
  },
  {
    year: "Month 4-6",
    title: "Platform Build & Launch",
    description:
      "Our team built a secure, intuitive platform and officially launched to welcome our first members.",
    outcome: "Platform launched",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7 text-white"
      >
        <path
          fillRule="evenodd"
          d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
    position: "top",
  },
  {
    year: "Month 7-9",
    title: "First Members & Growth",
    description:
      "Word spread as we welcomed our initial community, gathering feedback to enhance the experience.",
    outcome: "100+ active users",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7 text-white"
      >
        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
      </svg>
    ),
    position: "bottom",
  },
  {
    year: "Month 10-12",
    title: "Celebrating Successes",
    description:
      "We celebrated the first couples who connected through our platform, validating our mission.",
    outcome: "10+ successful matches",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7 text-white"
      >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    ),
    position: "top",
  },
];

// Data from AboutTeam component
const teamData = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LBp9DnGp2C0A92HworIRXNW3kpsqWS.png",
    description:
      "Rajesh Kumar is the visionary behind Shree Laxmi Narayan Vivah Kendra. With over 15 years of experience, he has redefined matchmaking through technology and innovation.",
    specialization: "Driving innovation and operational excellence",
    quote:
      "I founded Shree Laxmi Narayan Vivah Kendra with a simple belief: finding your life partner should be a journey of joy, not stress. Our platform brings together time-honored traditions and modern technology to help you write your own love story.",
  },
];

// Simplified Theme Colors (Updated to match Pricing page)
const themeColors = {
  primary: "#800020", // Burgundy
  primaryDark: "#600018",
  primaryLight: "#9A2540", // Added a light variant from Pricing
  secondary: "#DAA520", // Gold
  secondaryLight: "#FFD700", // Lighter Gold for highlights
  secondaryDark: "#B8860B", // Added dark variant from Pricing
  textDark: "#1F2937", // Dark Gray (Tailwind gray-800)
  textMedium: "#4B5563", // Medium Gray (Tailwind gray-600)
  textLight: "#F9FAFB", // Off-white (Tailwind gray-50)
  bgWhite: "#FFFFFF",
  bgGray: "#F9FAFB", // Very light gray (Tailwind gray-50)
  bgAccent: "#FFF8E1", // New warm accent background from Pricing
};

const AboutPage = () => {
  const [currentBatch, setCurrentBatch] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Make batch navigation functions memoized with useCallback
  const nextBatch = useCallback(() => {
    setCurrentBatch((prev) => (prev + 1) % reviewsData.length);
  }, []);

  const prevBatch = useCallback(() => {
    setCurrentBatch(
      (prev) => (prev - 1 + reviewsData.length) % reviewsData.length
    );
  }, []);

  // Auto-rotate testimonials with error handling
  useEffect(() => {
    try {
      let timer = setInterval(() => {
        setCurrentBatch((prev) => (prev + 1) % reviewsData.length);
      }, 5000);
      return () => clearInterval(timer);
    } catch (error) {
      console.error("Error in testimonial rotation:", error);
      setHasError(true);
    }
  }, []);

  // Animation Variants - Optimized for performance
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 }, // Reduced distance for smoother animation
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly faster for better responsiveness
        delayChildren: 0.1,
      },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 }, // Reduced distance for smoother animation
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Error fallback to prevent component crash
  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgWhite">
        <div className="text-center p-8 max-w-md rounded-lg shadow-lg bg-white">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: themeColors.primaryDark }}
          >
            Something went wrong
          </h2>
          <p className="mb-6 text-textMedium">
            We're sorry, but there was an error loading this page. Please try
            refreshing.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: themeColors.secondary,
              color: themeColors.primaryDark,
            }}
            className="px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-bgWhite font-sans text-textDark overflow-x-hidden">
      {/* --- Hero Section - Text Positioned at Bottom --- */}
      <motion.section
        className="h-screen relative flex items-end overflow-hidden pb-16 md:pb-24" /* Changed to items-end with bottom padding */
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Background Image with No Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/bg.webp"
            alt="Elegant background representing connection"
            className="object-cover w-full h-full"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            loading="eager"
          />
          {/* Text shadow backdrop for better readability without overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Hero Content - Positioned at Bottom */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="w-full max-w-xl lg:max-w-2xl text-left ml-0 md:ml-4 lg:ml-8 xl:ml-12">
            <motion.div
              className="w-24 h-1 mb-6 hidden md:block"
              style={{ backgroundColor: themeColors.secondary }}
              variants={fadeInLeft}
            />

            <motion.h3
              className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 font-serif tracking-wide"
              style={{
                color: themeColors.secondaryLight,
                textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              }}
              variants={fadeInUp}
            >
              Begin Your Forever Here.
            </motion.h3>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl opacity-95 leading-relaxed mb-10 max-w-lg"
              style={{
                color: themeColors.textLight,
                textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
              }}
              variants={fadeInUp}
            >
              Welcome to Shree Laxmi Narayan Vivah Kendra – where meaningful
              connections are nurtured through a blend of timeless values and
              modern innovation.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              <a
                href="#journey"
                style={{
                  backgroundColor: themeColors.secondary,
                  color: themeColors.primaryDark,
                }}
                className="hover:opacity-90 font-semibold py-3 px-10 rounded-md text-lg transition-all duration-300 inline-flex items-center group shadow-md hover:shadow-lg"
                aria-label="Learn about our story and journey"
              >
                Our Story
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <a
                href="#vision"
                style={{
                  backgroundColor: "transparent",
                  color: themeColors.textLight,
                  borderColor: themeColors.secondary,
                }}
                className="border-2 hover:bg-secondary/10 font-semibold py-3 px-10 rounded-md text-lg transition-all duration-300 inline-flex items-center group"
                aria-label="Discover our vision and values"
              >
                Our Vision
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Lazy load the rest of the content for better performance */}
      <Suspense
        fallback={
          <div className="flex justify-center py-16">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        }
      >
        {/* --- Founder Section --- */}
        <section
          className="py-16 md:py-24"
          style={{ backgroundColor: themeColors.bgGray }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              {/* Founder Image - Enhanced with depth effect */}
              <motion.div
                className="lg:w-1/3 flex-shrink-0"
                variants={fadeInUp}
              >
                <div className="relative mx-auto lg:mx-0 w-60 h-60 md:w-72 md:h-72">
                  <div
                    className="absolute -inset-1.5 rounded-lg opacity-20 filter blur-md"
                    style={{ backgroundColor: themeColors.secondary }}
                  ></div>
                  <div
                    className="aspect-square w-full relative overflow-hidden rounded-lg shadow-xl border-4"
                    style={{ borderColor: themeColors.secondary }}
                  >
                    <img
                      src={teamData[0].image}
                      alt={teamData[0].name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div
                    className="absolute -bottom-3 -right-3 text-white py-1.5 px-5 rounded-md shadow-lg text-sm"
                    style={{ backgroundColor: themeColors.primaryDark }}
                  >
                    {teamData[0].role}
                  </div>
                </div>
              </motion.div>
              {/* Founder Details - Enhanced with quote highlight */}
              <motion.div
                className="lg:w-2/3 text-center lg:text-left"
                variants={fadeInUp}
              >
                <h2
                  className="text-3xl md:text-4xl font-bold font-serif mb-3"
                  style={{ color: themeColors.primaryDark }}
                >
                  {teamData[0].name}
                </h2>
                <div className="relative mb-8">
                  <div
                    className="absolute -left-4 top-0 h-full w-1 rounded-full"
                    style={{ backgroundColor: themeColors.secondary }}
                  ></div>
                  <p
                    className="text-xl md:text-2xl mb-5 italic px-4 py-2 rounded-md"
                    style={{
                      color: themeColors.primary,
                      backgroundColor: "rgba(218,165,32,0.05)",
                    }}
                  >
                    "{teamData[0].quote}"
                  </p>
                </div>
                <p
                  className="text-base md:text-lg leading-relaxed mb-6"
                  style={{ color: themeColors.textMedium }}
                >
                  {teamData[0].description}
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {[
                    "Visionary Leader",
                    teamData[0].specialization,
                    "Relationship Expert",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                      style={{
                        backgroundColor: themeColors.bgWhite,
                        color: themeColors.primary,
                        borderColor: themeColors.primaryLight,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- Vision Section - Enhanced Sleek Design --- */}
        <section
          id="vision"
          className="pt-8 md:pt-10 pb-16 md:pb-24 overflow-hidden relative"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute right-0 top-12 w-64 h-64 rounded-full opacity-10"
              style={{
                background: `radial-gradient(circle, ${themeColors.secondary}, transparent 70%)`,
              }}
            ></div>
            <div
              className="absolute left-0 bottom-12 w-48 h-48 rounded-full opacity-10"
              style={{
                background: `radial-gradient(circle, ${themeColors.primary}, transparent 70%)`,
              }}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h2
                className="text-4xl md:text-5xl font-bold font-serif mb-6"
                style={{ color: themeColors.primaryDark }}
              >
                Our Vision & Values
              </h2>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                style={{ color: themeColors.textMedium }}
              >
                These guiding principles shape every connection we help create,
                ensuring a meaningful and authentic matrimonial journey.
              </p>
            </motion.div>

            {/* 3 Values with Clean Design */}
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="grid md:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {[
                  {
                    title: "Respect Tradition",
                    description:
                      "Honoring cultural values while embracing modern matchmaking needs.",
                    icon: "🕉️",
                    color: themeColors.primary,
                  },
                  {
                    title: "Innovate with Purpose",
                    description:
                      "Using technology thoughtfully to create genuine, compatible connections.",
                    icon: "💡",
                    color: themeColors.secondary,
                  },
                  {
                    title: "Build Trust",
                    description:
                      "Ensuring a safe, secure, and verified environment for all our members.",
                    icon: "🛡️",
                    color: themeColors.primaryLight,
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: index * 0.15 },
                      },
                    }}
                    className="bg-white rounded-xl p-8 shadow-lg relative overflow-hidden hover:shadow-xl transition-all duration-300"
                    style={{ borderTop: `3px solid ${feature.color}` }}
                  >
                    {/* Background accent */}
                    <div
                      className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 rounded-full opacity-10"
                      style={{ background: feature.color }}
                    ></div>

                    {/* Icon Container */}
                    <div className="relative mb-6 inline-flex justify-center">
                      <div
                        className="flex items-center justify-center w-16 h-16 rounded-full shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${feature.color}, ${feature.color}90)`,
                        }}
                      >
                        <span className="text-3xl text-white">
                          {feature.icon}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: feature.color }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: themeColors.textMedium }}
                    >
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Our Journey - Refined Timeline with Better Icons --- */}
        <section
          id="journey"
          className="pt-0 pb-12 md:pb-16 relative overflow-hidden"
          style={{ backgroundColor: themeColors.bgGray }}
        >
          {/* Simplified background element */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${themeColors.primary.substring(
                1
              )}' fill-opacity='0.8'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <motion.div
                className="w-16 h-1 mx-auto mb-3"
                style={{
                  background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
                }}
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              />

              <h2
                className="text-4xl md:text-5xl font-bold font-serif mb-2"
                style={{ color: themeColors.primaryDark }}
              >
                Our First Year
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: themeColors.textMedium }}
              >
                From concept to successful matches - our journey of innovation
              </p>
            </motion.div>

            {/* Optimized Process Visualization */}
            <div className="max-w-6xl mx-auto">
              {/* Compact Step Connection Process */}
              <div className="relative py-4">
                {/* Journey Steps - Perfect Zigzag */}
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6 md:gap-0 relative">
                  {journeySteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className={`w-full md:w-1/4 flex flex-col items-center relative ${
                        step.position === "bottom" ? "md:mb-32" : "md:mt-32"
                      } group`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                    >
                      {/* Subtle connecting element */}
                      {index < journeySteps.length - 1 && (
                        <div
                          className="hidden md:block absolute top-8 h-px w-full right-0"
                          style={{
                            background: `linear-gradient(to right, ${themeColors.primary}30, transparent)`,
                            transform: `translateY(${
                              step.position === "bottom" ? "-50px" : "50px"
                            })`,
                            opacity: 0.4,
                          }}
                        />
                      )}

                      {/* Circle with Fixed Hover */}
                      <div
                        className="z-10 mb-3 cursor-pointer relative transition-transform duration-300 hover:scale-105"
                        style={{ transformOrigin: "center" }}
                      >
                        {/* Outer glow */}
                        <div
                          className="absolute -inset-2 rounded-full opacity-20 blur-sm"
                          style={{
                            background: `radial-gradient(circle, ${
                              index % 2 === 0
                                ? themeColors.primary
                                : themeColors.secondary
                            }, transparent 70%)`,
                          }}
                        />

                        {/* Enhanced core circle with gradient ring */}
                        <div className="relative">
                          {/* Gradient ring */}
                          <div
                            className="absolute inset-0 rounded-full p-0.5 bg-gradient-to-br"
                            style={{
                              background: `linear-gradient(135deg, ${themeColors.secondary}80, ${themeColors.primary}30)`,
                              filter: "blur(0.5px)",
                            }}
                          />

                          {/* Core circle */}
                          <div
                            className="relative w-16 h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center shadow-md z-10 transition-all duration-300 hover:shadow-lg overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${
                                themeColors.primary
                              }, ${
                                index % 2 === 0
                                  ? themeColors.primaryDark
                                  : themeColors.secondary
                              })`,
                            }}
                          >
                            {/* Background pattern for added depth */}
                            <div
                              className="absolute inset-0 opacity-20"
                              style={{
                                backgroundImage:
                                  "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 60%)",
                              }}
                            />

                            {/* SVG Icon */}
                            <div className="relative z-10">{step.icon}</div>
                          </div>
                        </div>
                      </div>

                      {/* Phase Label - Enhanced typography */}
                      <div className="text-center mb-2">
                        <h3
                          className="text-lg font-semibold mb-1 tracking-wide"
                          style={{
                            color:
                              index % 2 === 0
                                ? themeColors.primary
                                : themeColors.secondary,
                            textShadow: "0px 0px 0.5px rgba(0,0,0,0.1)",
                          }}
                        >
                          {step.title.split("&")[0]}
                          {step.title.includes("&") && (
                            <>
                              <span className="text-gray-400 mx-1">&</span>
                              <span>{step.title.split("&")[1]}</span>
                            </>
                          )}
                        </h3>

                        <span
                          className="inline-block px-3 py-0.5 text-xs rounded-full font-mono tracking-wide"
                          style={{
                            backgroundColor: `${
                              index % 2 === 0
                                ? themeColors.primary
                                : themeColors.secondary
                            }15`,
                            color:
                              index % 2 === 0
                                ? themeColors.primary
                                : themeColors.secondary,
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          }}
                        >
                          {step.year}
                        </span>
                      </div>

                      {/* Description Text - Enhanced typography */}
                      <div className="text-center mt-1">
                        <div className="h-16 md:h-20 overflow-hidden mb-1">
                          <p
                            className="text-sm px-3 leading-relaxed"
                            style={{
                              color: themeColors.textMedium,
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {step.description}
                          </p>
                        </div>

                        <div className="mt-1">
                          <span
                            className="text-xs font-medium px-2 py-0.5 inline-block"
                            style={{
                              color:
                                index % 2 === 0
                                  ? themeColors.primary
                                  : themeColors.secondary,
                              backgroundColor: `${
                                index % 2 === 0
                                  ? themeColors.primary
                                  : themeColors.secondary
                              }10`,
                              borderBottom: `1px solid ${
                                index % 2 === 0
                                  ? themeColors.primary
                                  : themeColors.secondary
                              }30`,
                            }}
                          >
                            {step.outcome}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Simplified Future Indicator */}
                <motion.div
                  className="mt-5 flex justify-center items-center gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary opacity-40"></div>
                  <span
                    className="text-sm italic"
                    style={{ color: themeColors.primary }}
                  >
                    Journey continues
                  </span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary opacity-40"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* --- What Our Users Say - Enhanced Color Scheme --- */}
        <section className="pt-8 md:pt-10 pb-16 md:pb-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h2
                className="text-4xl md:text-5xl font-bold font-serif mb-6"
                style={{ color: themeColors.primaryDark }}
              >
                Stories of Success
              </h2>
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: themeColors.textMedium }}
              >
                Hear from couples who found their happily ever after with us.
              </p>
            </motion.div>

            <div className="relative max-w-6xl mx-auto">
              {/* Carousel Controls - Enhanced */}
              <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 w-full px-0 md:px- -mt-4">
                <button
                  onClick={prevBatch}
                  style={{
                    backgroundColor: themeColors.primaryLight,
                    color: themeColors.textLight,
                  }}
                  className="hover:opacity-90 w-10 h-10 rounded-full flex items-center justify-center focus:outline-none shadow-md -ml-5 md:-ml-10 z-10 transition-all duration-300"
                  aria-label="Previous testimonials"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextBatch}
                  style={{
                    backgroundColor: themeColors.primaryLight,
                    color: themeColors.textLight,
                  }}
                  className="hover:opacity-90 w-10 h-10 rounded-full flex items-center justify-center focus:outline-none shadow-md -mr-5 md:-mr-10 z-10 transition-all duration-300"
                  aria-label="Next testimonials"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Testimonial Slides - Enhanced Color Scheme */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBatch}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {reviewsData[currentBatch].map((review, index) => (
                    <motion.div
                      key={index}
                      className="rounded-xl overflow-hidden bg-gradient-to-b from-white to-gray-50 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group"
                      whileHover={{ y: -5 }}
                    >
                      {/* Top color bar */}
                      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primaryLight to-secondary"></div>

                      <div className="p-6 flex flex-col h-full">
                        <div className="mb-4 flex-shrink-0 relative">
                          <img
                            src={review.image}
                            alt={review.names}
                            className="w-20 h-20 object-cover rounded-full mx-auto shadow-md transition-transform duration-300 group-hover:scale-105"
                            style={{
                              borderColor: themeColors.secondary,
                              borderWidth: "2px",
                              borderStyle: "solid",
                            }}
                          />
                        </div>
                        <div className="text-center flex-grow flex flex-col">
                          <h4
                            className="text-lg font-semibold mb-1"
                            style={{ color: themeColors.primaryDark }}
                          >
                            {review.names}
                          </h4>
                          <p
                            className="text-xs font-medium mb-3"
                            style={{ color: themeColors.secondary }}
                          >
                            {review.duration}
                          </p>
                          <blockquote className="text-base italic flex-grow flex items-center justify-center relative">
                            <span className="leading-relaxed text-textMedium">
                              "{review.quote}"
                            </span>
                          </blockquote>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pagination Indicators - Enhanced */}
              <div className="flex justify-center mt-8 space-x-2">
                {reviewsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBatch(index)}
                    className="transition-all duration-300"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          currentBatch === index
                            ? themeColors.primary
                            : `${themeColors.primaryLight}30`,
                        width: currentBatch === index ? "1.5rem" : "0.5rem",
                      }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </div>
  );
};

export default AboutPage;
