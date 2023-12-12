import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/mernDB')
    console.log('DB connected successfully')
  } catch (error) {
    console.log('An error occurred in connect to DB-->', error)
  }
  
}