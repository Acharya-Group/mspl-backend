import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// 1️⃣ Create a Category without images
const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) return res.status(400).json({ error: "Category is required" });

    const existing = await Gallery.findOne({ category: category.toLowerCase() });
    if (existing) return res.status(400).json({ error: "Category already exists" });

    const gallery = new Gallery({ category: category.toLowerCase() });
    const savedGallery = await gallery.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: savedGallery
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2️⃣ Add Images to Existing Category
const addImagesToCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    const gallery = await Gallery.findOne({ category: category.toLowerCase() });
    if (!gallery) return res.status(404).json({ error: "Category not found" });

    const uploadedImages = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, { folder: "achariya-gallery" });
      fs.unlinkSync(file.path);
      uploadedImages.push({ url: result.secure_url, publicId: result.public_id });
    }

    gallery.images.push(...uploadedImages);
    const savedGallery = await gallery.save();

    res.status(200).json({
      success: true,
      message: "Images added successfully",
      data: savedGallery
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3️⃣ Get All Categories
const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.status(200).json({ success: true, message: "All categories fetched", data: galleries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4️⃣ Get Single Category
const getSingleGallery = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const gallery = await Gallery.findById(categoryId);
    if (!gallery) return res.status(404).json({ success: false, message: "Gallery not found" });

    res.status(200).json({ success: true, message: "Gallery fetched successfully", data: gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5️⃣ Update a Specific Image
const updateImage = async (req, res) => {
  try {
    const { categoryId, imageId } = req.params;
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const gallery = await Gallery.findById(categoryId);
    if (!gallery) return res.status(404).json({ error: "Category not found" });

    const image = gallery.images.id(imageId) || gallery.images.find(img => img.publicId === imageId);
    if (!image) return res.status(404).json({ error: "Image not found" });

    await cloudinary.uploader.destroy(image.publicId);
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "achariya-gallery" });
    fs.unlinkSync(req.file.path);

    image.url = result.secure_url;
    image.publicId = result.public_id;

    await gallery.save();
    res.status(200).json({ success: true, message: "Image updated successfully", data: gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6️⃣ Delete a Specific Image
const deleteImage = async (req, res) => {
  try {
    const { categoryId, imageId } = req.params;
    const gallery = await Gallery.findById(categoryId);
    if (!gallery) return res.status(404).json({ error: "Category not found" });

    const image = gallery.images.id(imageId) || gallery.images.find(img => img.publicId === imageId);
    if (!image) return res.status(404).json({ error: "Image not found" });

    await cloudinary.uploader.destroy(image.publicId);
    image.deleteOne();

    await gallery.save();
    res.status(200).json({ success: true, message: "Image deleted successfully", data: gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7️⃣ Delete Entire Category
const deleteGallery = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const gallery = await Gallery.findById(categoryId);
    if (!gallery) return res.status(404).json({ error: "Category not found" });

    for (const img of gallery.images) {
      await cloudinary.uploader.destroy(img.publicId);
    }

    await Gallery.findByIdAndDelete(categoryId);
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createCategory,
  addImagesToCategory,
  getGalleries,
  getSingleGallery,
  updateImage,
  deleteImage,
  deleteGallery
};