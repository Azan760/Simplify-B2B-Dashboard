import mongoose from "mongoose";
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
    active : {
        type : Boolean
    },
    deafultContact : {
        type : Boolean,
    }
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
    active : {
        type : Boolean,
    },
    overdueRemainder : {
        type : Boolean
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

    details: detailsSchema,
    locations: {
        billToAddress: addressSchema,
        shipToAddress: addressSchema,
    },
    contactPersons: [contactPersonSchema], 
    createdBy: {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TeamMember",
        },
        name: {
            type: String,
            required: false,
        }

    },
    updatedBy: {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TeamMember",
        },
        name: {
            type: String,
            required: false,
        }

    },

},{timestamps : true});

export const NewSupplier = mongoose.model("Supplier", newSupplierSchema);
