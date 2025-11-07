import Event from "../models/Event.js";

// 📌 Add Event
 const addEvent = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const event = new Event({ title });
    const savedEvent = await event.save();

    return res.status(201).json({
      message: "Event added successfully",
      event: savedEvent,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Update Event
 const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (title) event.title = title;

    const updatedEvent = await event.save();

    return res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Get All Events
 const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }); // latest first
    return res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Delete Event
 const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { addEvent, updateEvent, getEvents, deleteEvent };
