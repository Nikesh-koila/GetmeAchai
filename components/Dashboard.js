"use client";
import { React, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateUSer } from "@/actions/useractions";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Dashboard = () => {
  const { data: session } = useSession();
  const [form, setForm] = useState({});

  const router = useRouter();
  

  useEffect(() => {
    if (!session) {
      router.push("/");
    } else {
      setForm(session.user);
     
    }
  }, [session, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    let a = await updateUSer(e, session.user.username);
   
    if (a.message) {
      toast.success(a.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      toast.error(a.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
   
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="flex flex-col items-center my-5 px-2 sm:px-0">
        <h2 className="text-3xl font-bold my-5 text-center">Welcome to your Dashboard</h2>
        <form
          className="flex flex-col gap-3 items-center w-[90%] sm:w-[70%] md:w-[55%] lg:w-2/5"
          action={handleSubmit}
        >
          <div className="w-full ">
            <label htmlFor="username" className="font-bold text-lg">
              User name
            </label>
            <input
              value={form.username ? form.username : ""}
              type="text"
              className="h-12 bg-slate-700 rounded-lg outline-none focus:outline-slate-600 border-none p-3 mt-2 w-full "
              placeholder="Enter your name"
              id="username"
              name="username"
              onChange={handleChange}
            />
          </div>

          <div className="w-full ">
            <label htmlFor="email" className="font-bold text-lg">
              Email
            </label>
            <input
              value={form.email ? form.email : ""}
              type="email"
              className="h-12 bg-slate-700 rounded-lg outline-none focus:outline-slate-600 border-none p-3 mt-2 w-full "
              placeholder="example@gmail.com"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="email" className="font-bold text-lg">
              Profile Image
            </label>
            <input
              value={form.profilepic ? form.profilepic : ""}
              type="text"
              className="h-12 bg-slate-700 rounded-lg outline-none focus:outline-slate-600 border-none p-3 mt-2 w-full "
              placeholder="Upload image link"
              id="profilepic"
              name="profilepic"
              onChange={handleChange}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="email" className="font-bold text-lg">
              Cover Image
            </label>
            <input
              value={form.coverpic ? form.coverpic : ""}
              type="text"
              className="h-12 bg-slate-700 rounded-lg outline-none focus:outline-slate-600 border-none p-3 mt-2 w-full "
              placeholder="Upload image link"
              id="coverpic"
              name="coverpic"
              onChange={handleChange}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="razorpayid" className="font-bold text-lg">
              Razorpay Id
            </label>
            <input
              value={form.razorpayid ? form.razorpayid : ""}
              type="text"
              className="h-12 bg-slate-700 rounded-lg outline-none focus:outline-slate-600 border-none p-3 mt-2 w-full "
              placeholder="Upload your Razorpay Id"
              name="razorpayid"
              id="razorpayid"
              onChange={handleChange}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="razorpayid" className="font-bold text-lg">
              Razorpay Secret
            </label>
            <input
              value={form.razorpaysecret ? form.razorpaysecret : ""}
              type="text"
              className="h-12 bg-slate-700 rounded-lg outline-none focus:outline-slate-600 border-none p-3 mt-2 w-full "
              placeholder="Upload your Razorpay Secret"
              name="razorpaysecret"
              id="razorpaysecret"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-14 py-2.5 text-center me-2 mt-2"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;

