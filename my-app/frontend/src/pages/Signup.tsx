import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { z } from "zod";
import { motion } from "framer-motion"; // Importing framer-motion for animation
import { ErrorComponent } from "../components/error"; // Error Component Import

// Funny jokes array
const jokes = [
  "Why don't skeletons fight each other? They don’t have the guts!",
  "Parallel lines have so much in common. It’s a shame they’ll never meet.",
  "I told my wife she should embrace her mistakes. She gave me a hug.",
  "I would tell you a chemistry joke, but I know I wouldn’t get a reaction.",
  "Did you hear about the mathematician who’s afraid of negative numbers? He’ll stop at nothing to avoid them.",
];

export function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentJoke, setCurrentJoke] = useState(jokes[0]); // State for rotating jokes
  const [userExistsError, setUserExistsError] = useState(false); // State for "User already exists" error

  // Define error state with specific keys
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>(
    {}
  );

  // Zod schema for validation
  const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  // Function to handle sign up
  const handleSignup = async () => {
    const validationResult = signupSchema.safeParse({ username, email, password });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.issues.reduce((acc, issue) => {
        acc[issue.path[0] as keyof typeof errors] = issue.message;
        return acc;
      }, {} as typeof errors);

      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      setUserExistsError(false); // Reset the error state before making the request

      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        email,
        password,
      });

      const token = response.data.jwt;
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.status === 409) {
        // Handle "User already exists" error
        setUserExistsError(true);
        return;
      }

      if (error.response && error.response.data) {
        // Backend provided error details
        const backendErrors = error.response.data.errors || {};
        setErrors({
          username: backendErrors.username || null,
          email: backendErrors.email || null,
          password: backendErrors.password || null,
        });
      } else {
        // General or network error
        alert("Error while signing up, please try again later.");
      }
    }
  };

  // Rotate jokes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJoke((prev) => {
        const nextIndex = (jokes.indexOf(prev) + 1) % jokes.length;
        return jokes[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval); // Clean up interval
  }, []);

  // Animation variants for the whole page
  const pageVariants = {
    hidden: { opacity: 0, y: 50 }, // Start below viewport
    visible: { opacity: 1, y: 0 }, // Slide into view
    exit: { opacity: 0, y: 50 }, // Slide out on exit
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 1, ease: "easeOut" }}
      className="h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400"
    >
      <div className="flex h-full">
        {/* Signup Form Section */}
        <div className="flex flex-col bg-transparent w-full md:w-1/2 justify-center items-center text-white px-6 py-8">
          <Heading label={"Create an account"} />
          <div className="flex">
            <Subheading label={"Don't have an account ?"} />
            <Link to="/Signin" className="underline text-slate-100 pt-2">
              Login
            </Link>
          </div>

          <Inputbox
            label={"Username"}
            placeholder={"Your username"}
            value={username}
            type={"text"}
            onChange={(e) => setUsername(e.target.value)}
            style={{ color: "black" }} // Input text color set to black
          />
          {errors.username && <p className="text-red-100">{errors.username}</p>}

          <Inputbox
            label={"Email"}
            type={"email"}
            placeholder={"Your Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ color: "black" }} // Input text color set to black
          />
          {errors.email && <p className="text-red-100">{errors.email}</p>}

          <Inputbox
            type={"password"}
            label={"Password"}
            placeholder={"Your Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ color: "black" }} // Input text color set to black
          />
          {errors.password && <p className="text-red-100">{errors.password}</p>}

          {userExistsError && <ErrorComponent message="An account with this email already exists." onClose={()=>{
            setUserExistsError(false)
          }}/>}

          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="dark:text-gray-00 h-8 w-8 animate-spin fill-white text-pink-200"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <Button label={"Sign up"} onClick={handleSignup} />
          )}
        </div>

        {/* Quote Section */}
        <div className="hidden md:flex flex-col w-1/2 justify-center items-center bg-transparent">
          <div className="pl-9 ml-6 text-3xl font-bold text-white flex flex-col justify-center items-center">
            "The customer service that I received was exceptional, the support team went above and beyond to address my concerns."
          </div>
          <div className="mt-5 text-lg font-semibold text-white">Jules Winnfield</div>
          <div className="text-slate-100">CEO, Acme Corp</div>
        </div>
      </div>
    </motion.div>
  );
}
