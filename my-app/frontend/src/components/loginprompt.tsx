import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoginPrompt() {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  function handleNavigation(path: string) {
    setFade(true); // Trigger fade-out animation
    setTimeout(() => {
      navigate(path); // Navigate after the animation completes
    }, 1500); // Match this to the animation duration
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: "100vh" }} // Slide-up intro
      animate={fade ? { opacity: 1, y: "-100vh" } : { opacity: 1, y: 0 }} // Slide-up outro
      transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth transition
      className="relative h-screen  bg-gradient-to-br from-indigo-400 to-pink-400 overflow-hidden text-white"
    >
      {/* Background Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 90%)",
          }}
        ></div>
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold"
        >
          To Start Writing, <br />
          <span className="text-yellow-300">You Must Be Logged In</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
          className="text-xl md:text-2xl font-light italic px-4"
        >
          "Every great story begins with a single step."
        </motion.p>

        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
        >
          {/* Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -3 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg"
            onClick={() => handleNavigation("/signin")}
          >
            Sign In
          </motion.button>

          {/* Sign Up Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-6 py-3 bg-black text-white border-2 border-white font-semibold rounded-lg shadow-lg"
            onClick={() => handleNavigation("/signup")}
          >
            Sign Up
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative SVG Background Elements */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff33"
            fillOpacity="0.5"
            d="M0,32L48,48C96,64,192,96,288,128C384,160,480,192,576,213.3C672,235,768,245,864,240C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
