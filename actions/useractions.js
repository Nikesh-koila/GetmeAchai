"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/dbConnect"
import User from "@/models/User"
import { getSession } from "next-auth/react"

 export const initiate =async(amount,to_user,paymentform)=>{
    await connectDb();
    let u=await User.findOne({"username":to_user})
    var instance = new Razorpay({
        key_id:u.razorpayid,
        key_secret:u.razorpaysecret,
      });
      var options = {
        amount: Number.parseInt(amount),  
        currency: "INR",
        receipt: "order_rcptid_11",
       
    
      };
      const order =await new Promise((resolve,reject)=>{
       
        instance.orders.create(options, async function(err, order) {
            if (err) {
                console.error("Error creating Razorpay order:", err);
               reject(order)
              }
              else{
                await Payment.create({
                    orderId:order.id,
                    amount:order.amount/100,
                    to_user:to_user,
                    name:paymentform.name,
                    message:paymentform.message
                 })
                 resolve(order)
              }
              
            });
       
      })
    
        
       
        return order;
    
}

export const fetchPayments=async(username)=>{
  await connectDb();

  let payments= await Payment.find({"to_user":username,"done":true},{"name":1,"amount":1,"message":1,_id:0}).sort({amount: -1}).lean()
  return payments;
}

export const fetchUser=async (username)=>{
  await connectDb();
let u=await User.findOne({"username":username})
let user=u.toObject({flattenObjectIds:true})

return user;
}

{/* update user */}
export const updateUSer=async(data,oldUsername)=>{
  await connectDb();
 let ndata=Object.fromEntries(data);
 const usernamePattern = /^[a-zA-Z0-9]*$/;
 if (!usernamePattern.test(ndata.username))
  return {error:'Username cannot contain spaces or special characters.'};

 if(oldUsername!==ndata.username)
{
  let u =await User.findOne({"username":ndata.username})
  if(u)
    return {error:"USer Already exists"};
  await User.updateOne({"username":oldUsername},ndata)
  await Payment.updateMany({"to_user":oldUsername},{"to_user":ndata.username})
}
else{
  await User.updateOne({"username":oldUsername},ndata)
}
return {message:'Profile updated successfully'}
}