import AppBar from "../components/Appbar";
import { useBlog3 } from "../hooks";
import { Spinner } from "../components/Spinner";
import { EditLooks } from "../components/Editable";
export function My(){
const {  loading , myblogs } = useBlog3();
if (loading) return <Spinner />;

    return <div className="bg-gradient-to-br from-indigo-400 to-pink-400 h-screen">

    <AppBar/>
    <div className="mt-5 font-bold text-4xl flex justify-center items-center">My blogs</div>
  <div className="max-w-6xl mx-auto py-10 px-4">
  <div className="flex flex-col lg:flex-row justify-between">
    <div className="lg:w-2/3"> {myblogs.length === 0 ? (
            <div>No blogs found</div>
          ) : (
            // Render your blogs here, for example:
            myblogs.map((blog) => (
              <div>
               
                <EditLooks id={blog.id} content={blog.content}
                author={blog.author.name}
                publishdate={blog.timestamp}
                title={blog.title}
                ></EditLooks>
              </div>
            ))
          )}
    </div>
    <div className="lg:w-1/3 lg:pl-10 mt-8 lg:mt-0">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <p className="font-bold text-lg">Author</p>
 <div  > <div className="bg-slate-700 text-white h-9 w-9 rounded-full flex justify-center items-center mt-4">
Y
</div>  </div>
        <p className="mt-4 text-2xl font-bold ">{"You"}</p>
        <p className="text-gray-500 mt-2">
          No funny quotes here , coz i know about you , you are the author
        </p>
      </div>
    </div>
  </div>
</div>
</div>
}