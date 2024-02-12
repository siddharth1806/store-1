import mongoose from "mongoose";
import { momentTimeStampPlugin } from "../plugin/plugin";
const schema = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        purchaseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        quantity: {
            type: Number,
            required: true, 
        },
        status: {
            type: String,
            enum: ['Placed', 'Cancelled']
        },
        createdAt: {
            type: Number,
        },
        updatedAt: {
            type: Number,
        }
    }
);
schema.plugin(momentTimeStampPlugin, {});

const Order = mongoose.model('Order', schema);

export default Order;