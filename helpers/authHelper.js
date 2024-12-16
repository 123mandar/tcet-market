import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Number of salt rounds for hashing
    const salt = await bcrypt.genSalt(saltRounds); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
    return hashedPassword; // Return the hashed password
  } catch (error) {
    console.log(error);
    throw new Error("Error hashing password"); // Throw error to handle it in the controller
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword); // Compare plain password with hashed password
};
