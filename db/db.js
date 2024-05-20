import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const db = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {});
        console.log('MongoDB connected...');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export const rcdb = async (com) => {
    return mongoose.connection.db.command(com).then((result) => {
        return result.cursor.firstBatch;
    }, (err) => {
        console.error(err);
        return false;
    })

}



export default connectDB;