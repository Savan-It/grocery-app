import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//config variables
const currency = "inr";
const deliveryCharge = 50;
const frontend_URL = 'https://mern-tomato-full-stack-food-delivery-0k15.onrender.com';

// Placing User Order for Frontend using stripe
const placeOrder = async (req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Placing User Order for Frontend using stripe
const placeOrderCod = async (req, res) => {

    try {
        // Only keep required address fields for now
        const address = {
            street: req.body.address.street,
            city: req.body.address.city,
            phone: req.body.address.phone
        };
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address,
            payment: true,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing Order for Admin panel
import productModel from "../models/foodModel.js";
const listOrders = async (req, res) => {
    try {
        let orders = await orderModel.find({});
        // Populate product details for each item
        orders = await Promise.all(orders.map(async (order) => {
            const itemsWithDetails = await Promise.all(order.items.map(async (item) => {
                const product = await productModel.findById(item.productId);
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    name: product?.name || "",
                    image: product?.image || "",
                    price: product?.price || 0,
                };
            }));
            return {
                ...order.toObject(),
                items: itemsWithDetails
            };
        }));
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        res.json({ success: false, message: "Not  Verified" })
    }

}

const deleteOrder = async (req, res) => {
    try {
        await orderModel.findByIdAndDelete(req.body.orderId);
        res.json({ success: true, message: "Order Deleted" })
    } catch (error) {
        res.json({ success: false, message: "Error deleting order" })
    }
}

export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder, placeOrderCod, deleteOrder }
