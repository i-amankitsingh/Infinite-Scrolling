import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/test`);
        console.log("MongoDB connected!! Host:- ", connectionInstance.connection.host);
    } catch (error) {
        console.log("MongoDB Error:- ", error);
    }
}

export default connectDB;