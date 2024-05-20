import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
        },
        statusActive: {
            type: Boolean,
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;