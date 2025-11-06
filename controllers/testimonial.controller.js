import Testimonial from "../models/Testimonial.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// 1️⃣ Add a new testimonial
const addTestimonial = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!req.file) return res.status(400).json({ error: "Image is required" });
        if (!name) return res.status(400).json({ error: "Name is required" });
        if (!description) return res.status(400).json({ error: "Description is required" });

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "mspl-testimonial" });
        fs.unlinkSync(req.file.path);

        const testimonial = new Testimonial({
            name,
            description,
            Image: result.secure_url
        });

        const savedTestimonial = await testimonial.save();
        res.status(201).json({ message: "Testimonial added successfully", testimonial: savedTestimonial });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2️⃣ Update an existing testimonial by ID
const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const testimonial = await Testimonial.findById(id);
        if (!testimonial) return res.status(404).json({ error: "Testimonial not found" });

        // Update image if a new file is uploaded
        if (req.file) {
            // Delete old image from Cloudinary
            const publicId = testimonial.Image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`achariya-testimonial/${publicId}`);

            const result = await cloudinary.uploader.upload(req.file.path, { folder: "mspl-testimonial" });
            fs.unlinkSync(req.file.path);

            testimonial.Image = result.secure_url;
        }

        // Update name and description if provided
        if (name) testimonial.name = name;
        if (description) testimonial.description = description;

        const savedTestimonial = await testimonial.save();
        res.status(200).json({ message: "Testimonial updated successfully", testimonial: savedTestimonial });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3️⃣ Get all testimonials
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json({ message: "All testimonials fetched successfully", testimonials });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4️⃣ Get single testimonial by ID
const getSingleTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonial.findById(id);
        if (!testimonial) return res.status(404).json({ error: "Testimonial not found" });

        res.status(200).json({ message: "Testimonial fetched successfully", testimonial });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4️⃣ Delete a testimonial by ID
const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonial.findById(id);
        if (!testimonial) return res.status(404).json({ error: "Testimonial not found" });

        // Delete image from Cloudinary
        const publicId = testimonial.Image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`achariya-testimonial/${publicId}`);

        await Testimonial.findByIdAndDelete(id);
        res.status(200).json({ message: "Testimonial deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addTestimonial,getSingleTestimonial, updateTestimonial, getTestimonials, deleteTestimonial };
