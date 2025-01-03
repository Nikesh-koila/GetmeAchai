"use client";
import { React, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { LoginContext } from "@/context/Context";

const Navbar = () => {
  const { data: session } = useSession();
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const [showDown, setShowDown] = useState(false);


  return (
    <nav className="bg-gray-900 text-white flex justify-between px-2 sm:px-6 pt-2 pb-4 sm:py-0 sm:h-16  items-center">
      <div className="logo font-bold text-2xl sm:text-3xl  flex justify-center items-center">
        <img className="invert-[.23]" src="tea.gif" alt="chai Animation" width={44} />
        <span className="mt-3 sm:mt-0">Get me a Chai!</span>
      </div>
      {!session && (
        <div>
          <Link href={isLogin ? "/" : "/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-3 sm:mt-0"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Back" : "Login"}
            </button>
          </Link>
        </div>
      )}
      {session && (
       
        <div
          
        >
          <img
            type="button"
            className="w-10 h-10 rounded-full cursor-pointer relative border border-white"
            src={session.user.profilepic}
            alt="USer profile"
            onError={(e) => e.target.src = '/profile.png'} 
            onClick={() => {
              setShowDown(!showDown);
            }}
            onBlur={() => {setTimeout(()=>{setShowDown(!showDown)},300)
              
            }}
            tabIndex="0"
          />

          <div
            id="userDropdown"
            className={`absolute  right-10 z-10 ${
              showDown ? "" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600  py-4`}
            
          >
            <div className="flex   items-center  px-5 ">
              <img
                type="button"
                className="w-10 h-10 rounded-full cursor-pointer relative"
                src={session.user.profilepic}
                alt="USer profile"
                onError={(e) => e.target.src = '/profile.png'} 
              />
              
              <div className="px-2  text-sm text-gray-900 dark:text-white">
                {session.user.username}
              </div>
            </div>

            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton"
            >
              <li>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={`/${session.user.username}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Your Page
                </Link>
              </li>
            </ul>
            <div className="py-1">
              <button
                onClick={() => signOut()}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
