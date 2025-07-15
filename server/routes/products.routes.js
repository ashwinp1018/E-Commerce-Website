import express from "express";
import Product from "../models/Product";

const router = express.Router();

router.get('/',async(res,req)=>{
    const product = await Product.find();
    res.json(product)
});

router.post('/',async(res,req)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
});

export default router