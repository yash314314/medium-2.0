import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Hero Section with Slide-Up Fade-Out Transition
export default function Homepage() {
  const [slideUp, setSlideUp] = useState(false); // Track slide-up state
  const navigate = useNavigate();

  const handleNavigation = () => {
    setSlideUp(true); // Trigger slide-up animation
    setTimeout(() => {
      navigate("/prompt"); // Navigate after animation completes
    }, 1500); // Match transition duration
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Animated Background */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: slideUp ? "-100vh" : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-pink-400"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: slideUp ? 0 : 1, y: slideUp ? "-100vh" : 0 }} // Fade out and slide up
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white"
      >
        <h1 className="text-5xl font-bold mb-6">
          Your Ideas, <span className="text-yellow-300">Your Stories</span>
        </h1>
        <p className="text-xl mb-8">
          Start sharing your voice with the world today.
        </p>

        <div className="flex space-x-8">
          {/* Explore Blogs Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-6 py-3 bg-yellow-500 rounded-lg text-black font-semibold flex items-center space-x-2"
            onClick={handleNavigation}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9 5a3 3 0 11-6 0 3 3 0 016 0zm-4 0a1 1 0 100 2 1 1 0 000-2zM2 9a2 2 0 012 2v6a2 2 0 002 2h10a2 2 0 002-2V11a2 2 0 012-2h-2.4c-.13 0-.26.05-.37.14L14.11 9.74c-.29-.23-.65-.39-1.04-.46-.59-.1-1.22.11-1.66.54-.43-.43-.97-.64-1.56-.65-.58-.01-1.12.22-1.56.64-.44-.43-.99-.64-1.58-.54-.39.07-.75.22-1.04.46l-2.2 1.4c-.11-.09-.24-.14-.37-.14H4a2 2 0 00-2 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>Explore Blogs</span>
          </motion.button>

          {/* Start Writing Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -10 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-6 py-3 bg-black border-2 border-white rounded-lg text-white font-semibold flex items-center space-x-2"
            onClick={handleNavigation}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M15 5a3 3 0 01-3 3H8a3 3 0 01-3-3 3 3 0 013-3h4a3 3 0 013 3zM8 6a2 2 0 002 2h4a2 2 0 002-2 2 2 0 00-2-2H8a2 2 0 00-2 2zm4-1a1 1 0 100 2 1 1 0 000-2zM4 8h12v10H4V8z"
                clipRule="evenodd"
              />
            </svg>
            <span>Start Writing</span>
          </motion.button>
        </div>

        <div className="mt-8 space-x-4">
          {/* Sign Up Button */}
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "#f7a15c",
              rotate: 5,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold"
            onClick={() => navigate("/signup")}>
            Sign Up
          </motion.button>

          {/* Sign In Button */}
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "#4B5563",
              rotate: -5,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold"
            onClick={() => navigate("/signin")}>
            Sign In
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
