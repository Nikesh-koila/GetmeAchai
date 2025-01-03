"use client";
import { React, useEffect,useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { LoginContext } from "@/context/Context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
      setIsLogin(false);
    }, [setIsLogin]);

 

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);
  return (
    <>
      <div className="flex justify-center items-center h-[350px] gap-4 flex-col text-white px-4 sm:px-0">
        <div className="text-4xl sm:text-5xl font-bold flex justify-center items-center">
         <span className="mt-3">Buy Me a Chai</span> 
          <span>
            <img className="invert-[.23] w-[66px] sm:w-[88px]" src="/tea.gif" alt="Chai Animation"  />
          </span>
        </div>
        <p className="text-sm sm:text-base"> A crowdfunding platform for creators to fund their projects. </p>
        <div className="py-4">
          <Link href={'/login'}>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-2 " onClick={() => setIsLogin(!isLogin)}
          >
            Start Here!
          </button>
          </Link>
          <Link href={'/about'}>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-2"
          >
            Read More
          </button>
          </Link>
        </div>
      </div>
      <div className="bg-white opacity-10 h-[2px]"></div>
      <div className="text-white container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center ">
          Your Fans can buy you a Chai
        </h2>
        <div className=" flex flex-col sm:flex-row gap-5 justify-around mt-16">
          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <img
              className="bg-slate-400 rounded-full p-2"
              src="/man.gif"
              alt="Man animation"
              width={88}
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">
              Your fans are available to support you
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center mt-6 ">
            <img
              className="bg-slate-400 rounded-full p-2"
              src="/coin.gif"
              alt="Coin animation"
              width={88}
            />
            <p className="font-bold text-center">Fans want to contribute</p>
            <p className="text-center">
              Your fans are willing to contribute financially
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center mt-6">
            <img
              className="bg-slate-400 rounded-full p-2"
              src="/group.gif"
              alt="Group animation"
              width={88}
            />
            <p className="font-bold text-center">Fans want to collaborate</p>
            <p className="text-center">
              Your fans are ready to collaborate with you
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white opacity-10 h-[2px]"></div>
      <div className="text-white container mx-auto py-16">
        <h1 className="text-5xl font-bold text-center ">About US</h1>
        <div className="flex flex-col sm:flex-row justify-center gap-10 lg:gap-16 mt-16 px-5 lg:px-20">
          <div className="bg-slate-600 rounded-xl flex justify-center">
            <img src="tea.gif" alt="Chai image" width={400} />
          </div>
          <p className="w-[100%] sm:w-[80%] lg:w-[30%] text-lg  sm:mt-20">
          Get Me a Chai is a crowdfunding platform designed for creators to fund their projects with the support of their fans. It&apos;s a space where your fans can directly contribute to your creative endeavors by buying you a chai. Unlock the potential of your fanbase and bring your projects to life.  <Link href={'/about'} className="underline">learn more</Link>
          </p>
        </div>
      </div>
    </>
  );
}
