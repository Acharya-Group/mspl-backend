import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model("EventModel", eventSchema);

export default EventModel;
