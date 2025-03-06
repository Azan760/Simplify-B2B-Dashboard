import mongoose from "mongoose";

const SalesPersonAssignmentSchema = new mongoose.Schema({
    assignedUser: {
        id : {

            type: mongoose.Schema.Types.ObjectId,
            ref: 'TeamMember', 
            required: false,
        },
        name : {
            type: String,
            required: false,
        }
    },
    purchasePrice: {
        type: Number,
    },
    salePrice: {
        type: Number,
    
    },
    profit: {
        type: Number, 
    }
});

const ProductSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true,
        uppercase: true,
        minlength: 4
    },
    productServiceName: {
        type: String,
        required: true,
        minlength: 4
    },
    type: {
        type: String,
        enum: ['Inventory', 'Service'],
    },
    brand: {
        type: String, 
        
    },
    category: {
        type: String, 
        
    },
    subCategory: {
        type: String, 
    },
    color: {
        type: String, 
    },
    purchaseCost: {
        type: Number,
    },
    salePrice: {
        type: Number,
    },
    profit: {
        type: Number,
    },
    vatRate: {
        type: Number,
    },
    description: {
        type: String,
    },
    salesPersonAssignment: {
        type: [SalesPersonAssignmentSchema], 
    }
}, {
    timestamps: true
});

export const Product = mongoose.model('Product', ProductSchema);
