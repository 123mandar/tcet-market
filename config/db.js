import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    console.log(`Connecting to MongoDB...`.bgYellow.white);
    const connecting = await mongoose.connect(process.env.MONGO_URL, {});
    console.log(
      `Connection successful with MongoDB at ${connecting.connection.host}`
        .bgGreen.white
    );
  } catch (error) {
    console.error(`Error in connecting: ${error.message}`.bgRed.white);
  }
};

export default connectDB;
