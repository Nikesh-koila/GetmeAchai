import React from "react";
import { notFound } from "next/navigation"
import Paymentpage from "@/components/Paymentpage";
import connectDb from "@/db/dbConnect";
import User from "@/models/User";
const Username = async ({ params }) => {
  const a=await params
  const username = a.username;
 const u= await User.findOne({"username":username}).select("username")
  if(!u){
     return notFound();
  }
  return (
    <>
      <Paymentpage username={username} />
    </>
  );
};

export default Username;
export async function generateMetadata({ params }) {
  return {
    title: `${params.username}-Get me A Chai`,
  }
}
