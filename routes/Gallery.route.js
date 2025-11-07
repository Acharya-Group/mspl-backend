import express from "express";
import multer from "multer";
import {
  createCategory,       
  addImagesToCategory,  
  updateImage,
  getGalleries,
  getSingleGallery,
  deleteImage,
  deleteGallery
} from "../controllers/gallery.controller.js";

const GalleryRoutes = express.Router();

// Multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Routes

// 1️⃣ Create category without images
GalleryRoutes.post("/create-category", createCategory);

// 2️⃣ Add images to an existing category
GalleryRoutes.post("/add-images", upload.array("images", 20), addImagesToCategory);

// 3️⃣ Update a specific image
GalleryRoutes.put("/:categoryId/image/:imageId", upload.single("image"), updateImage);

// 4️⃣ Get all categories
GalleryRoutes.get("/", getGalleries);

// 5️⃣ Get single category
GalleryRoutes.get("/:categoryId", getSingleGallery);

// 6️⃣ Delete a specific image
GalleryRoutes.delete("/:categoryId/image/:imageId", deleteImage);

// 7️⃣ Delete entire category
GalleryRoutes.delete("/:categoryId", deleteGallery);

export default GalleryRoutes;