import mongoose from "mongoose";
const url = process.env.DB_URL;
export const connectDB = async () => {
  await mongoose
    .connect(
      url,
    )
    .then(() => console.log("DB Connected"));
};


