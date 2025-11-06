import Slider from "../models/Slider.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// 1️⃣ Add a new slider
const addSlider = async (req, res) => {
    try {
        const { link } = req.body;
        if (!req.file) return res.status(400).json({ error: "Image is required" });
        if (!link) return res.status(400).json({ error: "Link is required" });

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "mspl-slider" });
        fs.unlinkSync(req.file.path);

        const slider = new Slider({
            image: result.secure_url,
            link
        });

        const savedSlider = await slider.save();
        res.status(201).json({ message: "Slider added successfully", slider: savedSlider });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2️⃣ Update an existing slider by ID
const updateSlider = async (req, res) => {
    try {
        const { id } = req.params;
        const { link } = req.body;

        const slider = await Slider.findById(id);
        if (!slider) return res.status(404).json({ error: "Slider not found" });

        // Update image if a new file is uploaded
        if (req.file) {
            // Delete old image from Cloudinary
            const publicId = slider.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`achariya-slider/${publicId}`);

            const result = await cloudinary.uploader.upload(req.file.path, { folder: "mspl-slider" });
            fs.unlinkSync(req.file.path);

            slider.image = result.secure_url;
        }

        // Update link if provided
        if (link) slider.link = link;

        const savedSlider = await slider.save();
        res.status(200).json({ message: "Slider updated successfully", slider: savedSlider });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3️⃣ Get all sliders
const getSliders = async (req, res) => {
    try {
        const sliders = await Slider.find();
        res.status(200).json({ message: "All slider images fetched successfully", sliders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4️⃣ Delete a slider by ID
const deleteSlider = async (req, res) => {
    try {
        const { id } = req.params;
        const slider = await Slider.findById(id);
        if (!slider) return res.status(404).json({ error: "Slider not found" });

        // Delete image from Cloudinary
        const publicId = slider.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`achariya-slider/${publicId}`);

        await Slider.findByIdAndDelete(id);
        res.status(200).json({ message: "Slider deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addSlider, updateSlider, getSliders, deleteSlider };
