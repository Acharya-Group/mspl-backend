import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// 1️⃣ Add a new blog
const addBlog = async (req, res) => {
    try {
        const { title, shortDescription, description } = req.body;
        if (!req.file) return res.status(400).json({ error: "Image is required" });
        if (!title) return res.status(400).json({ error: "Title is required" });
        if (!shortDescription) return res.status(400).json({ error: "Short description is required" });
        if (!description) return res.status(400).json({ error: "Description is required" });

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "mspl-blogs" });
        fs.unlinkSync(req.file.path);

        const blog = new Blog({
            image: result.secure_url,
            title,
            shortDescription,
            description,
        });

        const savedBlog = await blog.save();
        res.status(201).json({ message: "Blog added successfully", blog: savedBlog });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2️⃣ Update an existing blog by ID
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, shortDescription, description } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        // Update image if a new file is uploaded
        if (req.file) {
            const publicId = blog.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`achariya-mspl/${publicId}`);

            const result = await cloudinary.uploader.upload(req.file.path, { folder: "mspl-blogs" });
            fs.unlinkSync(req.file.path);

            blog.image = result.secure_url;
        }

        // Update other fields if provided
        if (title) blog.title = title;
        if (shortDescription) blog.shortDescription = shortDescription;
        if (description) blog.description = description;

        const savedBlog = await blog.save();
        res.status(200).json({ message: "Blog updated successfully", blog: savedBlog });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3️⃣ Get all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ message: "All blogs fetched successfully", blogs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4️⃣ Get single blog by ID
const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        res.status(200).json({ message: "Blog fetched successfully", blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5️⃣ Delete a blog by ID
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        // Delete image from Cloudinary
        const publicId = blog.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`achariya-mspl/${publicId}`);

        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addBlog, updateBlog, getBlogs, getSingleBlog, deleteBlog };
