import mongoose  from "mongoose";

const connectTOMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/note_app");
        console.log("Connected To Database")
    } catch(error){
        console.log("Error connecting to Database", error.message)
    }
}

export default connectTOMongoDB;