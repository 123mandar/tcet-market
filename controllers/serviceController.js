import fs from "fs";
import slugify from "slugify";
import serviceModel from "../models/serviceModel.js";

// Create Service
export const createServiceController = async (req, res) => {
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

    const service = new serviceModel({
      ...req.fields,
      slug: slugify(name),
      sellerId,
    });

    if (photo) {
      service.photo.data = fs.readFileSync(photo.path);
      service.photo.contentType = photo.type;
    }

    await service.save();
    res.status(201).send({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in creating service",
      error: error.message,
    });
  }
};

// Get All Services
export const getServiceController = async (req, res) => {
  try {
    const services = await serviceModel
      .find({})
      .populate("sellerId", "name email phone")
      .select("-photo")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      count: services.length,
      message: "Fetched all services",
      services,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching services",
      error: error.message,
    });
  }
};

// Get Single Service
export const getSingleServiceController = async (req, res) => {
  try {
    const service = await serviceModel
      .findOne({
        slug: req.params.slug,
      })
      .select("-photo")
      .populate("sellerId", "name");

    res.status(200).send({
      success: true,
      message: "Fetched single service",
      service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching single service",
      error: error.message,
    });
  }
};

// Get Service Photo
export const servicePhotoController = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.sid).select("photo");
    if (service.photo.data) {
      res.set("Content-Type", service.photo.contentType);
      return res.status(200).send(service.photo.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching service photo",
      error: error.message,
    });
  }
};

// Delete Service
export const deleteServiceController = async (req, res) => {
  try {
    await serviceModel.findByIdAndDelete(req.params.sid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error deleting service",
      error: error.message,
    });
  }
};

// Get User Services
export const getUserServicesController = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const services = await serviceModel
      .find({ sellerId: sellerId })
      .populate("category");

    if (services.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No services found for this seller",
      });
    }

    // Convert photo to Base64
    const servicesWithPhoto = services.map((service) => {
      const photoData = service.photo?.data
        ? service.photo.data.toString("base64")
        : null;
      return {
        ...service.toObject(),
        photo: photoData
          ? `data:${service.photo.contentType};base64,${photoData}`
          : null,
      };
    });

    // Send response with the key 'services'
    res.status(200).send({
      success: true,
      message: "Fetched seller's services successfully",
      services: servicesWithPhoto, // Corrected key to 'services'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching services",
      error: error.message,
    });
  }
};
