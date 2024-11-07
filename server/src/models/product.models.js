import mongoose, { Schema } from "mongoose"

const productSchema = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    rating: {
        type: {
            rate: {
                type: Number
            },
            count: {
                type: Number
            }
        }
    }
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema);