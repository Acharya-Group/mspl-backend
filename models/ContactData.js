import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{type:String},
    number:{type:String},
    email:{type:String},
    message:{type:String},
     status: {
      type: String,
      enum: ["pending", "resolve"], 
      default: "pending"
    },
},{ timestamps: true })

const ContactData = mongoose.model("ContactData",contactSchema)

export default ContactData;
