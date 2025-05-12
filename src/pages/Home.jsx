import React, { useState, useRef } from "react"; // Added useRef
import { useNavigate } from "react-router-dom";
import {
  Award,
  Building,
  Clock,
  FileSearch,
  ShieldCheck,
  BrainCircuit,
  LockKeyhole,
  UserPlus,
  Users,
  MessageCircleHeart,
  HeartHandshake,
  Check,
  Star,
  Heart,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion"; // Added scroll hooks
import AnimatedCounter from "../components/AnimatedCounter";
import coupleimg from "../assets/cutecouple.png";

const Home = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const howItWorksRef = useRef(null); // Ref for the section container

  // Define animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <div className="bg-gray-100">
      {" "}
      {/* Overall page background */}
      {/* Enhanced Hero Section with Gradient Overlay */}
      <motion.section
        className="relative min-h-[90vh] md:min-h-[90vh] bg-cover flex items-center"
        style={{
          backgroundImage: "url(/hero.webp)",
          backgroundPosition: "center 30%",
        }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Improved Overlay with Less Darkness */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-0"></div>

        {/* Hero Content - Added for Better Engagement */}
        <div className="container mx-auto px-4 relative z-10 mt-16 md:mt-0">
          <motion.div
            className="max-w-xl text-white ml-0 md:ml-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              variants={fadeInUp}
            >
              Find Your <span className="text-[#DAA520]">Perfect Match</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl opacity-90 mb-8"
              variants={fadeInUp}
            >
              Join Shree Laxmi Narayan Vivah Kendra and discover meaningful
              connections based on trust, compatibility, and shared values.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <button
                onClick={() => navigate("/signup")}
                className="bg-[#800020] hover:bg-[#600018] text-white px-8 py-3 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-xl mr-4"
              >
                Get Started
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("journey")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-transparent border-2 border-white hover:border-[#DAA520] text-white hover:text-[#DAA520] px-6 py-2.5 rounded-md font-semibold transition-all duration-300"
              >
                How It Works
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      {/* Unique Manufacturing-Inspired Excellence Section - With Industrial Design */}
      <section className="py-10 bg-[#FAFAFA] relative overflow-hidden">
        {/* Industrial background pattern */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none' stroke='%23000' stroke-width='0.25'/%3E%3Cpath d='M0 50h100M50 0v100' stroke='%23000' stroke-width='0.25'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Modern Industrial Header */}
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-[2px] bg-[#800020]"></div>
              <div className="px-3 py-1 border border-[#800020] rounded-sm">
                <span className="text-[#800020] font-bold text-xs tracking-wider uppercase">
                  Our Standards
                </span>
              </div>
              <div className="w-10 h-[2px] bg-[#800020]"></div>
            </div>

            <h2 className="text-3xl font-bold mb-3 leading-tight">
              Crafting <span className="text-[#800020]">Perfect Matches</span>{" "}
              with Precision
            </h2>
          </div>

          {/* Unique Industrial Layout - Horizontal Timeline Design */}
          <div className="max-w-5xl mx-auto relative">
            {/* Themed layered design with no cards */}
            <div className="flex flex-col space-y-6">
              {/* Title bar with sectional indicators */}
              <div className="grid grid-cols-4 gap-px bg-gray-200 rounded-md overflow-hidden shadow-inner">
                {[
                  { title: "Tradition", color: "#800020" },
                  { title: "Expertise", color: "#800020" },
                  { title: "Network", color: "#800020" },
                  { title: "Success", color: "#800020" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="py-3 px-2 font-medium text-center text-white text-sm relative overflow-hidden"
                    style={{
                      background: item.color,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                    }}
                  >
                    {item.title}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DAA520]"></div>
                  </div>
                ))}
              </div>

              {/* Main content in industrial themed table format */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-gray-200 overflow-hidden rounded-lg shadow-md">
                {/* Tradition & Heritage */}
                <div className="bg-white p-5 flex flex-col h-full relative group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#800020] to-[#DAA520]"></div>

                  {/* Icon with golden accent ring */}
                  <div className="mb-4 mx-auto relative">
                    <div className="w-16 h-16 rounded-full bg-[#FBF7F4] border-2 border-[#800020]/20 flex items-center justify-center">
                      <div className="absolute inset-[3px] rounded-full border border-[#DAA520]/30"></div>
                      <Building className="w-7 h-7 text-[#800020]" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-[#DAA520]/10 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content with heritage-themed typography */}
                  <h3 className="font-serif text-center text-lg font-semibold text-[#800020] mb-2">
                    Tradition & Heritage
                  </h3>
                  <p className="text-center text-sm text-gray-700 mb-auto">
                    75+ years of expertise, balancing cultural values with
                    modern approaches for genuine compatibility.
                  </p>

                  {/* Bottom indicator with brand colors */}
                  <div className="mt-4 text-center">
                    <div className="inline-block">
                      <div className="flex items-center">
                        <span className="h-px w-5 bg-[#DAA520]"></span>
                        <span className="mx-2 text-[#800020] text-xs font-medium px-1.5 py-0.5 border border-[#DAA520]/30 rounded">
                          Established tradition
                        </span>
                        <span className="h-px w-5 bg-[#DAA520]"></span>
                      </div>
                      <div className="h-[2px] w-full mt-2 bg-gradient-to-r from-transparent via-[#800020]/20 to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Personalized Attention */}
                <div className="bg-white p-5 flex flex-col h-full relative group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#800020] to-[#DAA520]"></div>

                  {/* Icon with golden accent ring */}
                  <div className="mb-4 mx-auto relative">
                    <div className="w-16 h-16 rounded-full bg-[#FBF7F4] border-2 border-[#800020]/20 flex items-center justify-center">
                      <div className="absolute inset-[3px] rounded-full border border-[#DAA520]/30"></div>
                      <Heart className="w-7 h-7 text-[#800020]" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-[#DAA520]/10 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content with heritage-themed typography */}
                  <h3 className="font-serif text-center text-lg font-semibold text-[#800020] mb-2">
                    Personalized Attention
                  </h3>
                  <p className="text-center text-sm text-gray-700 mb-auto">
                    Dedicated support from experts who understand your unique
                    aspirations and relationship goals.
                  </p>

                  {/* Bottom indicator with brand colors */}
                  <div className="mt-4 text-center">
                    <div className="inline-block">
                      <div className="flex items-center">
                        <span className="h-px w-5 bg-[#DAA520]"></span>
                        <span className="mx-2 text-[#800020] text-xs font-medium px-1.5 py-0.5 border border-[#DAA520]/30 rounded">
                          Human expertise
                        </span>
                        <span className="h-px w-5 bg-[#DAA520]"></span>
                      </div>
                      <div className="h-[2px] w-full mt-2 bg-gradient-to-r from-transparent via-[#800020]/20 to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Extensive Network */}
                <div className="bg-white p-5 flex flex-col h-full relative group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#800020] to-[#DAA520]"></div>

                  {/* Icon with golden accent ring */}
                  <div className="mb-4 mx-auto relative">
                    <div className="w-16 h-16 rounded-full bg-[#FBF7F4] border-2 border-[#800020]/20 flex items-center justify-center">
                      <div className="absolute inset-[3px] rounded-full border border-[#DAA520]/30"></div>
                      <Users className="w-7 h-7 text-[#800020]" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-[#DAA520]/10 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content with heritage-themed typography */}
                  <h3 className="font-serif text-center text-lg font-semibold text-[#800020] mb-2">
                    Extensive Network
                  </h3>
                  <p className="text-center text-sm text-gray-700 mb-auto">
                    Curated community spanning regions, professions, and various
                    backgrounds for quality matches.
                  </p>

                  {/* Bottom indicator with brand colors */}
                  <div className="mt-4 text-center">
                    <div className="inline-block">
                      <div className="flex items-center">
                        <span className="h-px w-5 bg-[#DAA520]"></span>
                        <span className="mx-2 text-[#800020] text-xs font-medium px-1.5 py-0.5 border border-[#DAA520]/30 rounded">
                          Quality connections
                        </span>
                        <span className="h-px w-5 bg-[#DAA520]"></span>
                      </div>
                      <div className="h-[2px] w-full mt-2 bg-gradient-to-r from-transparent via-[#800020]/20 to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Success Record */}
                <div className="bg-white p-5 flex flex-col h-full relative group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#800020] to-[#DAA520]"></div>

                  {/* Icon with golden accent ring */}
                  <div className="mb-4 mx-auto relative">
                    <div className="w-16 h-16 rounded-full bg-[#FBF7F4] border-2 border-[#800020]/20 flex items-center justify-center">
                      <div className="absolute inset-[3px] rounded-full border border-[#DAA520]/30"></div>
                      <Award className="w-7 h-7 text-[#800020]" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-[#DAA520]/10 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content with heritage-themed typography */}
                  <h3 className="font-serif text-center text-lg font-semibold text-[#800020] mb-2">
                    Success Record
                  </h3>
                  <p className="text-center text-sm text-gray-700 mb-auto">
                    Over 10,000 successful marriages with a 98% satisfaction
                    rate through our proven methodology.
                  </p>

                  {/* Bottom indicator with brand colors */}
                  <div className="mt-4 text-center">
                    <div className="inline-block">
                      <div className="flex items-center">
                        <span className="h-px w-5 bg-[#DAA520]"></span>
                        <span className="mx-2 text-[#800020] text-xs font-medium px-1.5 py-0.5 border border-[#DAA520]/30 rounded">
                          Proven results
                        </span>
                        <span className="h-px w-5 bg-[#DAA520]"></span>
                      </div>
                      <div className="h-[2px] w-full mt-2 bg-gradient-to-r from-transparent via-[#800020]/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional: Bottom decorative element */}
              <div className="hidden md:flex justify-center">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#800020] to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section - Updated BG and Font */}
      <motion.section
        className="py-16 bg-gradient-to-b from-pink-50 to-burgundy-100" // Distinct Gradient BG
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        id="stories"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-burgundy-900">
            Our Success in Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-pink-600">
                <AnimatedCounter to={500} />+
              </p>
              <p className="text-xl text-gray-600 mt-2">Verified Profiles</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">
                <AnimatedCounter to={200} />+
              </p>
              <p className="text-xl text-gray-600 mt-2">Success Stories</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">
                <AnimatedCounter to={200} />+
              </p>
              <p className="text-xl text-gray-600 mt-2">Happy Users</p>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Reviews Section - Adapted from reference */}
      <section className="py-16 bg-white" id="testimonials">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-burgundy-900">
            Our Happy Customers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & John",
                years: 2,
                story:
                  "We found our perfect match on Shree Laxmi Narayan Vivah Kendra. The matchmaking was spot on!",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Bwn0drwDYqKW4lh2GqZpXOp3Mr6xK8.png", // Updated image URL
              },
              {
                name: "Priya & Rahul",
                years: 1,
                story:
                  "The privacy controls gave us the confidence to be ourselves. We're getting married next month!",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M4cEzdZjjqzkgwTqZDDz3QU8QkOqRC.png", // Updated image URL
              },
              {
                name: "Michael & Emily",
                years: 3,
                story:
                  "The video profiles feature helped us get to know each other before our first date. It was love at first sight!",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LMR9bPNTkCU4DL63OmG5GMMaqbbZxA.png", // Updated image URL
              },
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center mb-4">
                  <div className="relative w-24 h-24 mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-lg">{review.name}</h4>
                    <p className="text-gray-600 text-sm">
                      Together for {review.years} year
                      {review.years > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <svg
                    className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 h-8 w-8 text-gray-200"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-600 mt-4 italic relative z-10 pl-6">
                    {review.story}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section - Designer Timeline with Visual Flair - FIXED LAYOUT */}
      <section
        id="journey"
        className="py-16 md:py-24 relative overflow-hidden"
        style={{ backgroundColor: "#F9F6F0" }}
      >
        {/* Abstract background elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-1/3 h-1/3 opacity-10"
            style={{
              background: `radial-gradient(circle at top right, #DAA520, transparent 70%)`,
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-5"
            style={{
              background: `radial-gradient(circle at bottom left, #800020, transparent 70%)`,
            }}
          ></div>

          {/* Designer touch: abstract decorative elements */}
          <svg
            className="absolute -bottom-16 -right-16 w-64 h-64 opacity-5 text-primary"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#800020"
              d="M46.5,-71.3C59.9,-62.3,70.3,-49.4,74.4,-35.1C78.6,-20.7,76.5,-4.9,73.8,11.2C71.1,27.4,67.7,43.9,58.3,55.9C48.8,67.9,33.2,75.4,16.9,77.2C0.6,78.9,-16.4,74.9,-30.9,67.1C-45.4,59.3,-57.5,47.6,-66.6,33.2C-75.8,18.8,-82,1.7,-79.6,-14.5C-77.1,-30.6,-66.1,-45.7,-52.4,-54.9C-38.7,-64.1,-22.4,-67.3,-6.4,-68.6C9.7,-70,23.2,-69.5,36.2,-68.7C49.3,-68,62.3,-67,69.4,-58.8Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <span className="h-px w-6 bg-[#DAA520]"></span>
              <span className="mx-3 text-[#DAA520] font-semibold">
                YOUR JOURNEY
              </span>
              <span className="h-px w-6 bg-[#DAA520]"></span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold font-serif mb-6"
              style={{ color: "#800020" }}
            >
              Start Your Journey with Shree Laxmi Narayan Vivah Kendra
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#4B5563" }}
            >
              Follow this easy process to find your perfect match and begin your
              happily ever after
            </p>
          </motion.div>

          {/* FIXED Timeline Design */}
          <div className="max-w-6xl mx-auto relative">
            {/* Central connecting element - desktop only */}
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2"
              style={{
                background: `linear-gradient(180deg, 
                #800020, 
                #DAA520,
                #800020)`,
                zIndex: 1,
              }}
            ></div>

            {/* Timeline Events */}
            <div className="relative">
              {[
                {
                  title: "Create Your Profile",
                  description:
                    "Sign up and build a detailed profile highlighting your personality, values, and what you're looking for in a life partner.",
                  icon: <UserPlus size={24} />,
                  year: "Step 1",
                  color: "#9C2C54",
                  lightColor: "#FDE8EF",
                },
                {
                  title: "Discover Compatible Matches",
                  description:
                    "Use our smart filters to find people who share your values and match your preferences — all verified for your safety.",
                  icon: <Users size={24} />,
                  year: "Step 2",
                  color: "#C87137",
                  lightColor: "#FFF1E6",
                },
                {
                  title: "Connect Through Our Team",
                  description:
                    "Our experts help facilitate proper introductions between you and your potential matches and their families.",
                  icon: <MessageCircleHeart size={24} />,
                  year: "Step 3",
                  color: "#0F766E",
                  lightColor: "#E0F2F1",
                },
                {
                  title: "Begin Your Forever",
                  description:
                    "With our guidance and support, start your journey towards a beautiful, lifelong relationship.",
                  icon: <HeartHandshake size={24} />,
                  year: "Step 4",
                  color: "#7D4ACF",
                  lightColor: "#F3EAFF",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  className="mb-24 md:mb-32 last:mb-0 relative"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { duration: 0.4, delay: index * 0.1 },
                    },
                  }}
                >
                  {/* Step circle directly on the line */}
                  <div className="flex justify-center mb-14 md:mb-0 relative">
                    <div
                      className="w-20 h-20 rounded-full bg-white flex items-center justify-center relative shadow-lg z-10"
                      style={{
                        border: `3px solid ${step.color}`,
                      }}
                    >
                      {/* Inner circle with border effect */}
                      <div
                        className="absolute inset-2 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${step.color}15, ${step.color}05)`,
                        }}
                      ></div>

                      {/* Icon */}
                      <span
                        className="relative z-10"
                        style={{
                          color: step.color,
                        }}
                      >
                        {step.icon}
                      </span>

                      {/* Step Number Badge */}
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap z-20"
                        style={{
                          backgroundColor: step.lightColor,
                          color: step.color,
                          border: `1px solid ${step.color}40`,
                          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                        }}
                      >
                        {step.year}
                      </div>
                    </div>
                  </div>

                  {/* Content Card positioned with more space */}
                  <div
                    className={`flex justify-center mt-5 md:mt-0 md:absolute md:top-0 ${
                      index % 2 === 0
                        ? "md:left-auto md:right-[54%]"
                        : "md:left-[54%] md:right-auto"
                    } md:w-[40%]`}
                  >
                    <motion.div
                      initial={{
                        x: index % 2 === 0 ? 30 : -30,
                        opacity: 0,
                      }}
                      whileInView={{
                        x: 0,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: 0.2,
                      }}
                      className="w-full"
                    >
                      <div
                        className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 border-b-4 relative overflow-hidden group"
                        style={{
                          borderColor: step.color,
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        {/* Corner accent */}
                        <div
                          className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10 rotate-45 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                          style={{
                            background: step.color,
                          }}
                        ></div>

                        <h3
                          className="text-xl md:text-2xl font-bold mb-3 group-hover:translate-x-0.5 transition-transform duration-300"
                          style={{
                            color: step.color,
                          }}
                        >
                          {step.title}
                        </h3>

                        <p
                          className="text-base leading-relaxed"
                          style={{ color: "#4B5563" }}
                        >
                          {step.description}
                        </p>

                        {/* Indicator line with more personality */}
                        <div
                          className="h-0.5 mt-5 transition-all duration-300 group-hover:w-3/4 rounded-full"
                          style={{
                            width: "40px",
                            background: `linear-gradient(to right, ${step.color}, ${step.color}50)`,
                          }}
                        ></div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Designer touch: decorative element at the bottom */}
            <div className="flex justify-center mt-10">
              <div
                className="w-8 h-8 rounded-full relative"
                style={{
                  background: `linear-gradient(135deg, #800020, #DAA520)`,
                  opacity: 0.8,
                }}
              >
                <div className="absolute inset-1.5 rounded-full bg-white"></div>
                <div
                  className="absolute inset-3 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, #DAA520, #800020)`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Redesigned CTA Section - Psychological Triggers for Conversion */}
      <section className="py-10 md:py-16 relative overflow-hidden">
        {/* Improved gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(212,63,141,0.9) 0%, rgba(128,0,32,0.95) 100%)`,
          }}
        ></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Sacred geometry pattern overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiLz48Y2lyY2xlIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIGN4PSI1MCIgY3k9IjUwIiByPSIzMCIvPjxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgY3g9IjUwIiBjeT0iNTAiIHI9IjIwIi8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTTUwLDEwIEw1MCw5MCBNMTAsNTAgTDkwLDUwIE0yMi45MiwyMi45MiBMNzcuMDgsNzcuMDggTTIyLjkyLDc3LjA4IEw3Ny4wOCwyMi45MiIvPjwvc3ZnPg==')",
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col-reverse md:flex-row items-center max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Couple Image - Emotional Trigger */}
            <div className="w-full md:w-2/5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-white opacity-40 rounded-tl-lg"></div>
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-white opacity-40 rounded-br-lg"></div>

                  {/* Image with glow effect */}
                  <div className="relative rounded-lg overflow-hidden p-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm">
                    <img
                      src={coupleimg}
                      alt="Happy Couple"
                      className="w-full max-w-xs mx-auto md:max-w-full object-contain rounded-lg"
                      style={{
                        filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.3))",
                      }}
                    />
                    <div className="absolute -inset-0.5 bg-white/20 blur-md rounded-lg -z-10"></div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Content - Conversion Focus */}
            <div className="w-full md:w-3/5 mb-10 md:mb-0 md:pl-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white"
              >
                <div className="inline-flex items-center mb-3">
                  <span className="h-px w-5 bg-white opacity-60"></span>
                  <span className="mx-2 text-white text-sm font-medium tracking-wider">
                    YOUR DESTINY
                  </span>
                  <span className="h-px w-5 bg-white opacity-60"></span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
                  Begin Your Sacred{" "}
                  <span className="text-[#FFD700]">Love Story</span> Today
                </h2>

                <p className="text-white/90 mb-8 text-lg max-w-lg">
                  Join thousands of happy couples who found their perfect match
                  with
                  <span className="font-medium">
                    {" "}
                    Shree Laxmi Narayan Vivah Kendra
                  </span>
                  . Your journey to a meaningful relationship starts here.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    className="bg-white text-[#800020] hover:bg-[#F8F8F8] font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    onClick={() => navigate("/signup")}
                  >
                    <span className="mr-2">Begin Your Journey</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    className="bg-transparent text-white border border-white hover:bg-white/10 font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                    onClick={() => navigate("/contact-us#contact-options")}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mr-2"
                    >
                      <path
                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Talk to an Expert
                  </button>
                </div>

                <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-[#FFD700] mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 12L11 14L15 10M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-medium text-white">
                    100% Secure & Confidential Process
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* FAQ Section - Industrial Level Design */}
      <section className="py-12 bg-white" id="faq">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#800020] mb-3 leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto font-medium">
                Everything you need to know about our matrimonial services
              </p>
            </div>

            {/* Industrial Design FAQ Component */}
            <IndustrialFaqAccordion />

            <div className="mt-6 text-center flex flex-col items-center">
              <p className="text-[#800020] mb-3 font-medium">
                Still have questions? We're here to help
              </p>
              <button
                className="bg-white hover:bg-[#FFF8F8] text-[#800020] border border-[#800020] font-medium py-2.5 px-5 rounded-lg inline-flex items-center transition-all duration-300 hover:shadow-md"
                onClick={() => navigate("/contact-us#contact-form")}
              >
                Contact Our Support Team
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Replace the FAQAccordion component with this industrial design
const IndustrialFaqAccordion = () => {
  const faqs = [
    {
      question: "How does Shree Laxmi Narayan Vivah Kendra verify profiles?",
      answer:
        "We implement a rigorous verification process including document checks, personal interviews, and background verification to ensure all profiles are genuine and trustworthy.",
      icon: "shield",
    },
    {
      question:
        "What makes Shree Laxmi Narayan Vivah Kendra different from other services?",
      answer:
        "We combine traditional matchmaking values with modern technology, offering personalized assistance alongside our platform. Our approach focuses on compatibility beyond surface-level preferences.",
      icon: "star",
    },
    {
      question: "How long does it take to find a match?",
      answer:
        "Most members find potential matches within 3-6 months, though some connections happen sooner. Our focus on quality over quantity helps create meaningful matches.",
      icon: "clock",
    },
    {
      question:
        "Is my personal information secure with Shree Laxmi Narayan Vivah Kendra?",
      answer:
        "Absolutely. We employ bank-level encryption to protect your data and never share your contact information without permission. You control your privacy settings at all times.",
      icon: "lock",
    },
    {
      question: "Can I visit your office in Mumbai for a consultation?",
      answer:
        "Yes, we welcome in-person consultations at our office near Currey Road Station. Please call +91 77108 70992 to schedule an appointment with our relationship counselors.",
      icon: "map",
    },
  ];

  // Initial state with first FAQ open
  const [openFaqs, setOpenFaqs] = useState(
    Array(faqs.length)
      .fill(false)
      .map((_, i) => i === 0)
  );

  // Toggle function for opening/closing FAQs
  const toggleFaq = (index) => {
    setOpenFaqs(openFaqs.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
  };

  // Icons mapping
  const getIcon = (iconName) => {
    switch (iconName) {
      case "shield":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        );
      case "star":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      case "clock":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      case "lock":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        );
      case "map":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-5">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="border border-gray-200 rounded-xl overflow-hidden"
        >
          <div
            className={`
              flex items-center justify-between cursor-pointer p-4
              ${
                openFaqs[index]
                  ? "bg-gradient-to-r from-[#800020] to-[#9C2054] text-white"
                  : "bg-white text-gray-800"
              }
            `}
            onClick={() => toggleFaq(index)}
          >
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0">{getIcon(faq.icon)}</span>
              <h3 className="font-medium">{faq.question}</h3>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 transition-transform duration-300 ${
                openFaqs[index] ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {openFaqs[index] && <div className="p-4">{faq.answer}</div>}
        </motion.div>
      ))}
    </div>
  );
};

export default Home;
