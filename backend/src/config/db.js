import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Optional: log the URI for debugging
        // console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure. 0 means success, 1 means failure.
    }
};

export default connectDB;