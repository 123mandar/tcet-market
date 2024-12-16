import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// Create Category Controller
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    // Check if category name is provided
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    // Check if category already exists
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }

    // Create a new category object
    const newCategory = new categoryModel({
      name,
      slug: slugify(name),
    });

    // Save the new category to the database
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "New category created",
      newCategory,
    });
  } catch (error) {
    console.error("Error in createCategoryController:", error);
    res.status(500).send({
      success: false,
      error: error.message || error,
      message: "Error in category creation",
    });
  }
};

// Update Category Controller
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // Find and update category by ID
    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      updateCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// Get All Categories Controller
export const getCategoryController = async (req, res) => {
  try {
    // Fetch all categories
    const getCategory = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      getCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting categories",
      error,
    });
  }
};

// Get Single Category Controller
export const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    // Fetch category by slug
    const getSingleCategory = await categoryModel.findOne({ slug });
    res.status(200).send({
      success: true,
      message: "Category fetched successfully by name",
      getSingleCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single category",
      error,
    });
  }
};

// Delete Category Controller
export const delCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete category by ID
    const delCategory = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      delCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};
