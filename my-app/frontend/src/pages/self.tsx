import { motion } from "framer-motion"; // For animations
import AppBar from "../components/Appbar"; // Navigation bar
 // Custom hook to fetch user data (assumed)

export function UserProfile() {
   // Fetch user data using a custom hook
 const loading = false
    // Animation variants
    const pageVariants = {
        hidden: { opacity: 0, x: "-100vw" },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: "100vw" },
    };
   const user;
    if (loading) {
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-indigo-400 to-pink-400"
            >
                <p className="text-white text-lg">Loading your profile...</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="min-h-screen bg-gradient-to-br from-indigo-400 to-pink-400 text-white"
        >
            <AppBar />
            <div className="flex flex-col items-center py-12">
                {/* User Avatar */}
                <div className="rounded-full w-32 h-32 bg-white overflow-hidden shadow-lg mb-6">
                    <img
                        src={user?.avatar || "https://via.placeholder.com/150"} // Placeholder image
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* User Information */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl w-11/12 max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-2">{user?.name || "Anonymous"}</h1>
                    <p className="text-sm mb-4">{user?.email || "No email available"}</p>

                    {/* Additional User Info */}
                    <div className="text-left text-sm space-y-3">
                        <p><strong>Join Date:</strong> {user?.joinDate || "Unknown"}</p>
                        <p><strong>Blogs Written:</strong> {user?.blogsCount || 0}</p>
                        <p><strong>Bio:</strong> {user?.bio || "No bio provided"}</p>
                    </div>
                </div>

                {/* Edit Profile Button */}
                <button
                    onClick={() => alert("Edit profile clicked!")} // Replace with your logic
                    className="mt-6 px-6 py-2 bg-yellow-400 text-indigo-900 rounded-lg shadow-md hover:bg-yellow-500"
                >
                    Edit Profile
                </button>
            </div>
        </motion.div>
    );
}
