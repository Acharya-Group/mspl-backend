import mongoose from "mongoose";

const NewsAndEventSchema = new mongoose.Schema({
    title:{type:String,required:true},
},{ timestamps: true })

const NewsAndEvent = mongoose.model('NewsAndEvent',NewsAndEventSchema)

export default NewsAndEvent;