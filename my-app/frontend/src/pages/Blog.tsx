{/* blog tsx */}
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import AppBar from "../components/Appbar";
import funnyQuotes from "../components/Funny";
import { Looks } from "../components/Looks";
import { Spinner } from "../components/Spinner";
export function Blog() {
  const funny = funnyQuotes;
  const { id } = useParams();
  const ind = Math.floor(Math.random() * funny.length);
  const { loading, blog } = useBlog({ id });

  if (loading) {
    return <div><Spinner/></div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div className="bg-gradient-to-br from-indigo-400 to-pink-400 h-screen">
      {/* render part */}
      <AppBar />
      <div className="max-w-6xl mx-auto py-10 m-4 px-4 rounded-2xl border shadow-lg ">
        <div className="flex flex-col lg:flex-row justify-between">
          <Looks
          id={blog.id}
            author={blog.author.name}
            title={blog.title}
            content={(blog.content)}
            publishdate={blog.timestamp}
          />

          <div className="lg:w-1/3 lg:pl-10 mt-8 lg:mt-0">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="font-bold text-lg">Author</p>
              <div>
                <div className="bg-slate-700 text-white h-9 w-9 rounded-full flex justify-center items-center mt-4 ">
                  {blog.author.name[0]}
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold">
                {blog.author.name || "Anonymous"}
              </p>
              <p className="text-gray-700 mt-2">"{funny[ind]}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
