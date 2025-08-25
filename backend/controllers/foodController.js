import productModel from "../models/foodModel.js";
import fs from 'fs';

// List all products
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Add product
const addProduct = async (req, res) => {
    try {
        let image_filename = `${req.file.filename}`;
        const product = new productModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
            stock: req.body.stock || 0,
            expiryDate: req.body.expiryDate || null,
            unit: req.body.unit || "pcs",
        });
        await product.save();
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { id, name, category, price, stock, expiryDate, unit } = req.body;
        await productModel.findByIdAndUpdate(id, {
            name,
            category,
            price,
            stock,
            expiryDate,
            unit
        });
        res.json({ success: true, message: "Product Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating product" });
    }
};

// Delete product
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`, () => { });
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { listProduct, addProduct, removeProduct, updateProduct };