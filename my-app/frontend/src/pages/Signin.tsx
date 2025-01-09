import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { set, z } from "zod"; // Import Zod
import { ErrorComponent } from "../components/error";

export function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // For displaying error messages
  const [loading , setLoading] = useState(false);

  // Zod schema for validation
  const signinSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  // Function to handle sign in
  async function shoot() {
    // Validate input fields

    const validationResult = signinSchema.safeParse({ email, password });

    if (!validationResult.success) {
      // Map errors to the corresponding fields
      const fieldErrors = validationResult.error.issues.reduce((acc, issue) => {
        acc[issue.path[0] as keyof typeof errors] = issue.message;
        return acc;
      }, {} as typeof errors);

      setErrors(fieldErrors); // Set validation errors in state
      return; // Stop execution if validation fails
    }

    try {
      setErrorMessage(null); // Reset error message before API call
      setLoading(true);

      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.jwt);
      navigate("/blogs");
    } catch (e: any) {
      if (e.response) {
        if (e.response.status === 403) {
          // Handle "User not found" error
          setErrorMessage("User not found. Please check your credentials.");
        } else {
          // Handle other backend errors
          setErrorMessage(e.response.data.message || "An unexpected error occurred.");
        }
      } else {
        // Handle network or unexpected errors
        setErrorMessage("Network error. Please try again later.");
      }
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: "100vh" }} // Slide-up intro
        animate={{ opacity: 1, y: 0 }} // Animate into view
        transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth transition
        className="flex justify-center items-center bg-gradient-to-br from-indigo-400 to-pink-400 h-screen text-white"
      >
        <div className="flex flex-col bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-8 w-4/5 max-w-md text-center">
          <Heading label={"Let's Login"} />
          <div className="flex justify-center space-x-2 mt-4">
            <Subheading label={"Don't have an account?"} />
            <Link to="/Signup" className="underline text-yellow-400 mt-2">
              Signup
            </Link>
          </div>

          {/* Email input with validation error display */}
          <div className="mt-6 w-full text-left">
            <Inputbox
              type={"text"}
              label={"Email"}
              placeholder={"Your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginTop: "8px",
              }} // Applied inline styles
            />
            {errors.email && <p className="text-red-100 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password input with validation error display */}
          <div className="mt-4 w-full text-left">
            <Inputbox
              type={"password"}
              label={"Password"}
              placeholder={"Your password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginTop: "8px",
              }} // Applied inline styles
            />
            {errors.password && <p className="text-red-100 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Display ErrorComponent for any error messages */}
          {errorMessage && <ErrorComponent message={errorMessage} onClose={()=>{setErrorMessage(false)}}/>}

          {/* Button to trigger the shoot function */}
           { loading ?  <div role="status" className="flex justify-center items-center">
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
            </div>:<Button
            label={"Sign In"}
            onClick={shoot}
          />}
           
        </div>
      </motion.div>
    </>
  );
}
