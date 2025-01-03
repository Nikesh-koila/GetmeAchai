import { NextResponse } from "next/server"
import connectDb from "@/db/dbConnect"
import Payment from "@/models/Payment"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils"
import { fetchUser } from "@/actions/useractions"
import User from "@/models/User"
export const POST=async(req)=>{
    let body= await req.formData()
    body=Object.fromEntries(body)
    
  await connectDb()
  let p= await Payment.findOne({'orderId':body.razorpay_order_id})
  
  if(!p)
    return NextResponse.json({success: false, message:"Order Id not found"})

let u=await User.findOne({"username":p.to_user})
 let flag= validatePaymentVerification({"order_id": p.orderId, "payment_id": body.razorpay_payment_id }, body.razorpay_signature,u.razorpaysecret);
  

  if(flag){
    const updatedPayment=await Payment.findOneAndUpdate({'orderId':body.razorpay_order_id},{'done':true},{new:true})
    
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
  }
  else
  return NextResponse.error("Payment Verification Failed")
}