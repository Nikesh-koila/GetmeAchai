import mongoose from "mongoose";
const { Schema,model } =mongoose;

const UserSchema=Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    coverpic:{type:String,default:""},
    razorpayid:{type:String,default:""},
    profilepic:{type:String,default:""},
    razorpaysecret:{type:String,default:""},
    createAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})

export default mongoose.models.User || model("User",UserSchema);

