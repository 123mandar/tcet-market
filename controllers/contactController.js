// controllers/contactController.js
import contacts from "../models/contactModel.js";

// Handler for submitting contact data
export const submitContactFormController = async (req, res) => {
  console.log("Received Contact Data:", req.body);
  const { firstName, email, phoneNumber, message } = req.body;

  // Validate incoming data
  if (!firstName || !email || !phoneNumber || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a new contact entry
    const newContact = new contacts({
      firstName,
      email,
      phone: phoneNumber,
      message,
    });
    await newContact.save(); // Save to the database
    res.status(201).json({ message: "Contact data saved successfully!" });
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: "Error saving data", error });
  }
};
