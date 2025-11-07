import Notice from "../models/Notice.js";

// 📌 Add Notice
 const addNotice = async (req, res) => {
  try {
    const { title, link } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!link?.trim()) {
      return res.status(400).json({ error: "Link is required" });
    }

    const notice = new Notice({ title, link });
    const savedNotice = await notice.save();

    return res.status(201).json({
      message: "Notice added successfully",
      notice: savedNotice,
    });
  } catch (error) {
    console.error("Error adding Notice:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Update Notice
 const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link } = req.body;

    const notice = await Notice.findById(id);
    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    if (title) notice.title = title;
    if (link) notice.link = link;

    const updatedNotice = await notice.save();

    return res.status(200).json({
      message: "Notice updated successfully",
      notice: updatedNotice,
    });
  } catch (error) {
    console.error("Error updating Notice:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Get All Notices
 const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }); // latest first
    return res.status(200).json({ notices });
  } catch (error) {
    console.error("Error fetching Notices:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Delete Notice
 const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNotice = await Notice.findByIdAndDelete(id);
    if (!deletedNotice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    return res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error("Error deleting Notice:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { addNotice, updateNotice, getNotices, deleteNotice };
