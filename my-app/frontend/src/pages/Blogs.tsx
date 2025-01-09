import { motion } from "framer-motion"; // Import motion from framer-motion
import AppBar from "../components/Appbar";
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";
import { Looks } from "../components/Looks";

export function Blogs() {
    const { blogs, loading } = useBlogs();

    // Define slide-in animation variants
    const pageVariants = {
        hidden: { opacity: 0, x: "-100vw" }, // Start off-screen to the left
        visible: { opacity: 1, x: 0 }, // Slide in and become visible
        exit: { opacity: 0, x: "100vw" }, // Exit off-screen to the right
    };

    if (loading) {
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 1, ease: "easeInOut" }} // Smooth transition
                className="flex flex-col justify-center items-center h-screen w-screen"
                style={{
                    background: "linear-gradient(to bottom right, #818cf8, #f472b6)", // Fix the background gradient
                }}
            >
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </motion.div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 1, ease: "easeInOut" }} // Smooth transition
            className="border shadow-xl h-screen"
            style={{
                background: "linear-gradient(to bottom right, #818cf8, #f472b6)", // Apply background gradient
            }}
        >
            <AppBar />
            {blogs && blogs.length > 0 ? (
                blogs.map((b) => (
                    <Looks
                        key={b.id}
                        id={b.id}
                        title={b.title || "null"}
                        publishdate={b.timestamp}
                        author={b.author?.name || "Anonymous"} // Ensure author name is handled
                        content={b.content || JSON.parse("null")}
                    />
                ))
            ) : (
                <div className="m-3 text-white">No blogs found</div> // Handle the case where blogs might be empty
            )}
        </motion.div>
    );
}
