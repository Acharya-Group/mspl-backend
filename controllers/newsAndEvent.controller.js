import NewsAndEvent from "../models/NewsAndEvent.js";

// 📌 Add News & Event
export const addNewsAndEvent = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const news = new NewsAndEvent({ title });
    const savedNews = await news.save();

    return res.status(201).json({
      message: "News & Event item added successfully",
      news: savedNews,
    });
  } catch (error) {
    console.error("Error adding News & Event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Update News & Event
export const updateNewsAndEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const news = await NewsAndEvent.findById(id);
    if (!news) {
      return res.status(404).json({ error: "News & Event item not found" });
    }

    if (title) news.title = title;

    const updatedNews = await news.save();

    return res.status(200).json({
      message: "News & Event item updated successfully",
      news: updatedNews,
    });
  } catch (error) {
    console.error("Error updating News & Event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Get All News & Event
export const getNewsAndEvent = async (req, res) => {
  try {
    const newsList = await NewsAndEvent.find().sort({ createdAt: -1 });
    return res.status(200).json({ news: newsList });
  } catch (error) {
    console.error("Error fetching News & Event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Delete News & Event
export const deleteNewsAndEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNews = await NewsAndEvent.findByIdAndDelete(id);
    if (!deletedNews) {
      return res.status(404).json({ error: "News & Event item not found" });
    }

    return res.status(200).json({ message: "News & Event item deleted successfully" });
  } catch (error) {
    console.error("Error deleting News & Event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
