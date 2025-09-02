import mongoose from "mongoose";
import { Counter } from "./Counter.model.js";
mongoose.pluralize(null);


const contactPersonSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: [true, "Full name is required."],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required."],
        unique: true,
    },
    phoneNo: {
        type: String,
        trim: true,

    },
    salePerson: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TeamMember",
        },
        name: {
            type: String,
            required: false,
        }
    },
    active: {
        type: Boolean
    },
    defaultContact : {
        type: Boolean,
      //  default: true,
    },
});

const addressSchema = new mongoose.Schema({
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    zipCode: {
        type: String,
    },
});

const detailsSchema = new mongoose.Schema({
    active: {
        type: Boolean,
    },
    overdue : {
        type : Boolean,
        default : true,
    },
    supplierName: {
        type: String,
        trim: true,
        required: [true, "Supplier name is required."],
        minLength: [2, "Supplier name must be at least 2 characters."],
    },
    registration: {
        type: String,
    },
    currency: {
        type: String,
        required: [true, "Currency is required."],
    },
    email: {
        type: String,
        trim: true,
    },
    phoneNo: {
        type: String,
        trim: true,

    },
    defaultTerm: {
        type: Number,
        required: [true, "Default term is required."],
    },
    vatNumber: {
        type: String,

    },
    vatRate: {
        type: Number,
    },
    eoriNo: {
        type: String,

    },
    defaultCategory: {
        type: String,
    },
});

const newSupplierSchema = new mongoose.Schema({
    SUPNumber: { type: String, unique: true },
    Status: {
        type: String,
        // required : true,
    },

    details: detailsSchema,
    locations: {
        billToAddress: addressSchema,
        shipToAddress: addressSchema,
    },
    contactPersons: [contactPersonSchema],
    createdBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TeamMember",
        },
        name: {
            type: String,
            required: false,
        }

    },
    updatedBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TeamMember",
        },
        name: {
            type: String,
            required: false,
        }

    },

}, { timestamps: true });


newSupplierSchema.pre('save', async function (next) {
    if (this.isNew) {
        const currentYear = new Date().getFullYear();

        let counter = await Counter.findOne({ name: 'newSupplierSchema', year: currentYear });

        if (!counter) {
            counter = await Counter.create({
                name: 'newSupplierSchema',
                year: currentYear,
                seq: 1
            });

        } else {
            counter.seq++;
            await counter.save();
        }


        this.CLINumber = `SUP-${currentYear}-${counter.seq}`;
    }

    next();
});

export const NewSupplier = mongoose.model("Supplier", newSupplierSchema);
