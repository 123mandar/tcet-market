// Create Product Controller
import fs from "fs";
import slugify from "slugify";
import productModel from "../models/productModel.js";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Photo should be less than 1MB" });
    }

    // Extract sellerId from the logged-in user's information
    const sellerId = req.user._id;

    // Create new product
    const createProduct = new productModel({
      ...req.fields,
      slug: slugify(name),
      sellerId, // Assign sellerId
    });

    // Handle product photo upload if present
    if (photo) {
      createProduct.photo.data = fs.readFileSync(photo.path);
      createProduct.photo.contentType = photo.type;
    }

    await createProduct.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      createProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

// Get All Products Controller
export const getProductController = async (req, res) => {
  try {
    const getProduct = await productModel
      .find({})
      .populate("category") // Populating category
      .populate("sellerId", "name") // Populate seller's name dynamically using sellerId
      .select("-photo") // Exclude photo from response
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    res.status(200).send({
      success: true,
      counTotal: getProduct.length,
      message: "Got product details",
      getProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

// Get Single Product Controller
export const getSingleProductController = async (req, res) => {
  try {
    const singleProduct = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo") // Exclude photo from response
      .populate("category") // Populate category
      .populate("sellerId", "name"); // Populate seller's name using sellerId

    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// Get Product Photo Controller
export const productPhotoController = async (req, res) => {
  try {
    const photoProduct = await productModel
      .findById(req.params.pid)
      .select("photo");

    if (photoProduct.photo.data) {
      res.set("Content-type", photoProduct.photo.contentType);
      return res.status(200).send(photoProduct.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product photo",
      error,
    });
  }
};

// Delete Product Controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

// Update Product Controller
export const updateProductController = async (req, res) => {
  try {
    const fields = req.fields || {};
    const files = req.files || {};

    const { name, description, price, category, quantity, shipping } = fields;
    const { photo } = files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case quantity == null: // Allow 0 as valid quantity
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Photo should be less than 1MB" });
    }

    // Update product
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        name,
        description,
        price,
        category,
        quantity,
        shipping,
        slug: slugify(name),
      },
      { new: true }
    );

    // Handle product photo upload if present
    if (photo) {
      updatedProduct.photo.data = fs.readFileSync(photo.path);
      updatedProduct.photo.contentType = photo.type;
    }

    await updatedProduct.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });
  }
};

export const getUserProductsController = async (req, res) => {
  try {
    const sellerId = req.user._id; // Get the logged-in seller's ID
    const products = await productModel
      .find({ sellerId: sellerId })
      .populate("category"); // Ensure category is populated

    if (products.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "No products found for this seller" });
    }
    // Convert photo to Base64
    const productsWithPhoto = products.map((product) => {
      const photoData = product.photo?.data
        ? product.photo.data.toString("base64")
        : null;
      return {
        ...product.toObject(),
        photo: photoData
          ? `data:${product.photo.contentType};base64,${photoData}`
          : null,
      };
    });
    res.status(200).send({
      success: true,
      message: "Fetched seller's products successfully",
      product: productsWithPhoto, // Send the photo in Base64
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};
