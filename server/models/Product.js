import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    Image:Number,
    category:String,
    stock:Number
});

export default mongoose.model('Product',productSchema);