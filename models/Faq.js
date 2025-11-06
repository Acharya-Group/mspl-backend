import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    heading:{type:String,required:true},
    description:{type:String,required:true}
},{ timestamps: true })

const Faq = mongoose.model('Faq',faqSchema)

export default Faq;