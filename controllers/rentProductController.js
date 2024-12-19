import fs from "fs";
import slugify from "slugify";
import RentProduct from "../models/rentProductModel.js.js";

// Create Rent Product
export const createRentProductController = async (req, res) => {
  try {
    const { name, description, pricePerDay, category } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !pricePerDay:
        return res.status(400).send({ error: "Price per day is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    const sellerId = req.user._id; // Get seller ID from logged-in user

    const rentProduct = new RentProduct({
      ...req.fields,
      slug: slugify(name),
      sellerId,
    });

    if (photo) {
      rentProduct.photo.data = fs.readFileSync(photo.path);
      rentProduct.photo.contentType = photo.type;
    }

    await rentProduct.save();
    res.status(201).send({
      success: true,
      message: "Rent Product created successfully",
      rentProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in creating rent product",
      error: error.message,
    });
  }
};

// Get All Rent Products
export const getRentProductController = async (req, res) => {
  try {
    const rentProducts = await RentProduct.find({})
      .populate("sellerId", "name")
      .select("-photo")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      count: rentProducts.length,
      message: "Fetched all rent products",
      rentProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching rent products",
      error: error.message,
    });
  }
};

// Get Single Rent Product
export const getSingleRentProductController = async (req, res) => {
  try {
    const rentProduct = await RentProduct.findOne({
      slug: req.params.slug,
    })
      .select("-photo")
      .populate("sellerId", "name");

    res.status(200).send({
      success: true,
      message: "Fetched single rent product",
      rentProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching single rent product",
      error: error.message,
    });
  }
};

// Get Rent Product Photo
export const rentProductPhotoController = async (req, res) => {
  try {
    const rentProduct = await RentProduct.findById(req.params.pid).select(
      "photo"
    );
    if (rentProduct.photo.data) {
      res.set("Content-Type", rentProduct.photo.contentType);
      return res.status(200).send(rentProduct.photo.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching rent product photo",
      error: error.message,
    });
  }
};

// Delete Rent Product
export const deleteRentProductController = async (req, res) => {
  try {
    await RentProduct.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Rent Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error deleting rent product",
      error: error.message,
    });
  }
};

// Update Rent Product
export const updateRentProductController = async (req, res) => {
  try {
    const { name, description, pricePerDay, category } = req.fields;
    const { photo } = req.files;

    const updatedProduct = await RentProduct.findByIdAndUpdate(
      req.params.pid,
      {
        name,
        description,
        pricePerDay,
        category,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      updatedProduct.photo.data = fs.readFileSync(photo.path);
      updatedProduct.photo.contentType = photo.type;
    }

    await updatedProduct.save();
    res.status(200).send({
      success: true,
      message: "Rent Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error updating rent product",
      error: error.message,
    });
  }
};

// Get Rent Products for Seller
export const getUserRentProductsController = async (req, res) => {
  try {
    const sellerId = req.user._id; // Ensure `requireAuth` middleware sets `req.user`
    const rentProducts = await RentProduct.find({ sellerId });
    res.status(200).json({
      success: true,
      message: "Rent products fetched successfully",
      rentProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching rent products",
      error: error.message,
    });
  }
};
