import React from "react";
import Paymentpage from "@/components/Paymentpage";
import connectDb from "@/db/dbConnect";
import User from "@/models/User";
const Username = async ({ params }) => {
  const a=await params
  const username = a.username;
 
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
