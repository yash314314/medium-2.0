import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface AvatarappProps {
  author: string;
  publish: string;
}

export function Avatarapp({ author, publish }: AvatarappProps) {
  return (
    <div className="flex mt-1 mb-2 hover:text-purple-400 hover:animate-pulse">
      <div className="h-9 w-9 bg-purple-400 rounded-full flex justify-center items-center text-yellow-50">
        {author[0]}
      </div>
      <div className="flex justify-center items-center font-semibold ml-3 mr-3">
        {author}
      </div>
      <div className="font-normal flex justify-center items-center text-zinc-400">
        {publish}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
      />
    </svg>
  );
}

function PencilAltIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
}

export function AppBar() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-br from-indigo-600 to-pink-500 text-white shadow-md  ">
      <Link to={'/'}>
        <div className="flex items-center cursor-pointer hover:text-purple-300 hover:animate-pulse">
          <span className="text-2xl font-bold">Medium</span>
        </div>
      </Link>

      {/* Center section - Search bar */}
      <div className="flex items-center w-1/3 bg-gray-100 rounded-full px-4 py-2 hover:text-purple-300 hover:animate-pulse">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none ml-2 text-gray-700 w-full"
        />
      </div>

      <div className="flex justify-center items-center space-x-4  ">
        <Link to={'/publish'}>
          <button className="flex items-center text-gray-50 hover:text-purple-300 hover:animate-pulse">
            <PencilAltIcon />
            Write
          </button>
        </Link>
        <div className='cursor-pointer'>
          <button
            className='flex items-center text-gray-50 hover:text-purple-300 hover:animate-pulse'
            onClick={() => {
              navigate("/blog/my");
            }}
          >
            My Blogs
            <BellIcon  />
          </button>
        </div>
        <Avatarapp author={"You"} publish= '' />
      </div>
    </div>
  );
}

export default AppBar;
