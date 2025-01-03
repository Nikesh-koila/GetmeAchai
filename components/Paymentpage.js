"use client";
import React, { useState, useEffect } from "react";
import { fetchPayments, initiate, fetchUser } from "@/actions/useractions";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Script from "next/script";
import { useSearchParams, useRouter } from "next/navigation";
const Paymentpage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [payments, setPayments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const searchParams = useSearchParams()
  const router=useRouter()

  useEffect(() => {
   
    if(searchParams.get('paymentdone')=="true"){
         toast.success('Thank you for Your Donation', {
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
              router.push(`/${username}`)    
    }
   
    getData();
  }, []);

  const handlechange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchUser(username);
    setCurrentUser(u);

    let dbPayments = await fetchPayments(username);
    setPayments(dbPayments);
  };

  

  const pay = async (amount) => {
    //get order ID
    const { name, message } = paymentform;
    

    let a = await initiate(amount, username, paymentform);

    let orderId = a.id;

    var options = {
      key_id: currentUser.razorpayid,
      amount: amount,
      currency: "INR",
      name: "Get me A Chai",
      description: "This website is a crowdfunding paltform for creators",
      image: "tea.gif",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name,
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        display: "popup",
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  };
 
  return (
     {currentUser.username ?(
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="coverpic w-full flex justify-center relative ">
        <img
          className="object-cover w-full h-[250px] md:h-[400px] lg:h-[400px]"
          src={currentUser.coverpic ? currentUser.coverpic : "/bg.jpg"}
        />

        <div className="profilepic absolute -bottom-14 ">
          <img
            src={
              currentUser.profilepic ? currentUser.profilepic : "/profile.png"
            }
            alt="profile pic"
            className="rounded-lg border border-white w-24 h-24 sm:w-32 sm:h-32 "
          />
        </div>
      </div>
      <div className="info flex flex-col items-center justify-center mt-16 mb-10">
        <h2 className="text-3xl font-bold">{username}</h2>
        <p className="font-light">Lets help {username} get a chai!</p>
        <div className="text-slate-400 font-medium">
          {payments.length} Payments .  ₹{payments.reduce((a,b)=>{
            return a+b.amount
          },0)} raised
        </div>
      </div>
      <div className="payment flex flex-col md:flex-row gap-3 w-full items-center md:items-stretch  justify-center mb-5 px-5">
        <div className="supporters bg-slate-800 w-[100%] md:w-1/2 lg:w-2/5  p-8 rounded-md">
          <h3 className="text-2xl font-bold mb-5">Top Supporters</h3>
          <ul className="text-lg max-h-[400px] hover:overflow-y-auto overflow-y-hidden cursor-pointer">
            {payments.length == 0 && <li>No payments yet 😔</li>}
            {payments.map((p, i) => {
              return (
                <li key={i} className="flex my-2 items-center gap-2">
                  <img width={33} src="/avatar.gif" alt="avatar gif" />
                  <span>
                    {p.name} <span className="font-bold">₹{p.amount}</span> with
                    a message "{p.message}"
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="makepayment bg-slate-800  w-[100%]  md:w-1/2 lg:w-2/5  p-8 rounded-md  ">
       { !currentUser.razorpayid || !currentUser.razorpaysecret ?(
         <h3 className="text-2xl font-bold mb-8"> {username} has not set their payment account</h3>
       ):(
        <>
          <h3 className="text-2xl font-bold mb-8">Make a Payment</h3>
          <div className="flex flex-col gap-3 items-center">
            <input
              type="text"
              className="h-12 bg-slate-700 rounded-lg outline-none focus:outline-slate-600 border-none p-3  w-full "
              placeholder="Enter name"
              onChange={handlechange}
              value={paymentform.name}
              name="name"
            />
            <input
              type="text"
              className="h-12 bg-slate-700 rounded-lg outline-none focus:outline-slate-600 border-none p-3  w-full "
              placeholder="Enter message"
              onChange={handlechange}
              value={paymentform.message}
              name="message"
            />
            <input
              type="text"
              className="h-12 bg-slate-700 rounded-lg outline-none focus:outline-slate-600 border-none p-3  w-full "
              placeholder="Enter amount"
              onChange={handlechange}
              value={paymentform.amount}
              name="amount"
            />
            <button
              type="button"
              className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-14 py-2.5 text-center me-2 mt-2 disabled:from-gray-200 disabled:to-gray-200 disabled:opacity-30 disabled:text-gray-400 " disabled={paymentform.name?.length<3 || paymentform.message.length<5 || paymentform.amount?.length<2}
              onClick={() => {
                pay(paymentform.amount * 100);
              }}
            >
              Pay
            </button>
          </div>
          <div className="flex gap-3 mt-8">
            <button
              className="bg-slate-700 p-2 rounded-md focus:ring-2  focus:ring-slate-600 disabled:opacity-40 "disabled={paymentform.name?.length<3 || paymentform.message.length<5 }
              onClick={() => pay(1000)}
            >
              Pay ₹10
            </button>
            <button
              className="bg-slate-700 p-2 rounded-md focus:ring-2  focus:ring-slate-600 disabled:opacity-40"disabled={paymentform.name?.length<3 || paymentform.message.length<5 }
              onClick={() => {
                pay(2000);
              }}
            >
              Pay ₹20
            </button>
            <button
              className="bg-slate-700 p-2 rounded-md focus:ring-2  focus:ring-slate-600 disabled:opacity-40"disabled={paymentform.name?.length<3 || paymentform.message.length<5 }
              onClick={() => {
                pay(3000);
              }}
            >
              Pay ₹30
            </button>
          </div>
          </>
       )
}
        </div>
      </div>
    </>
):(
<div class="flex items-center justify-center h-screen">
  <p class="text-center">Not found</p> 
  </div>
)}
  );
};

export default Paymentpage;

