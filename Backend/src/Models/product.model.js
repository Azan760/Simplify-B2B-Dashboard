import mongoose from "mongoose";

const SalesPersonAssignmentSchema = new mongoose.Schema({
    assignedUser: {
        id: {

            type: mongoose.Schema.Types.ObjectId,
            ref: 'TeamMember',
            required: false,
        },
        name: {
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

    details: {
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
        active: {
            type: Boolean,
            default: true,
        },
        buy : {
            type:Boolean,
            default: true,
        },
        sell : {
            type:Boolean,
            default: true,
        }
    },
    salesPersonAssignment: {
        type: [SalesPersonAssignmentSchema],
    },
    createdBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TeamMember',
            required: false,
        },
        name: {
            type: String,
            required: false,
        }
    },
    updatedBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TeamMember',
            required: false,
        },
        name: {
            type: String,
            required: false,
        }
    }
}, {
    timestamps: true
});

export const Product = mongoose.model('Product', ProductSchema);
