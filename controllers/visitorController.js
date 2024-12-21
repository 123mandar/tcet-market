import visitorModel from "../models/visitorModel.js";

// Initialize visitor count
export const initializeVisitorCountController = async (req, res) => {
  try {
    const visitor = await visitorModel.findOne();
    if (!visitor) {
      const newVisitor = new visitorModel({ count: 0 });
      await newVisitor.save();
    }
    res.status(200).json({ message: "Visitor count initialized" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Increment visitor count
export const incrementVisitorCountController = async (req, res) => {
  try {
    const visitor = await visitorModel.findOne();
    if (visitor) {
      visitor.count += 1;
      await visitor.save();
      res.status(200).json({ count: visitor.count });
    } else {
      res.status(404).json({ message: "Visitor count not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get current visitor count
export const getVisitorCountController = async (req, res) => {
  try {
    const visitor = await visitorModel.findOne();
    if (visitor) {
      res.status(200).json({ count: visitor.count });
    } else {
      res.status(404).json({ message: "Visitor count not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
