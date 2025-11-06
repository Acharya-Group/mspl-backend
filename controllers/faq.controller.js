import Faq from "../models/Faq.js"; 

 const addFaq = async (req, res) => {
  try {
    const { heading, description } = req.body;

    if (!heading?.trim()) {
      return res.status(400).json({ error: "Heading is required" });
    }

    if (!description?.trim()) {
      return res.status(400).json({ error: "Description is required" });
    }

    const faq = new Faq({ heading, description });
    const savedFaq = await faq.save();

    return res.status(201).json({
      message: "FAQ added successfully",
      faq: savedFaq,
    });
  } catch (error) {
    console.error("Error adding FAQ:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

 const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description } = req.body;

    const faq = await Faq.findById(id);
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    if (heading) faq.heading = heading;
    if (description) faq.description = description;

    const updatedFaq = await faq.save();

    return res.status(200).json({
      message: "FAQ updated successfully",
      faq: updatedFaq,
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

 const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 }); 
    return res.status(200).json({ faqs });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

 const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFaq = await Faq.findByIdAndDelete(id);
    if (!deletedFaq) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    return res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { addFaq, updateFaq, getFaqs, deleteFaq };