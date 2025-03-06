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
        minLength: [6, "Phone number must be at least 6 characters."],
    },
    assigneUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember",
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
    clientName: {
        type: String,
        trim: true,
        required: [true, "Client name is required."],
        minLength: [2, "Client name must be at least 2 characters."],
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
        unique: true,
        trim: true,
    },
    phoneNo: {
        type: String,
        trim: true,
        unique: true,
        minLength: [6, "Phone number must be at least 6 characters."],
    },
    defaultTerm: {
        type: Number,
        required: [true, "Default term is required."],
    },
    vatNumber: {
        type: String,
        minLength: [2, "VAT number must be at least 2 characters."],
    },
    vatRate: {
        type: Number,
    },
    eoriNo: {
        type: String,
        minLength: [2, "EORI number must be at least 2 characters."],
    },
    deafultCategory: {
        type: String,
    },
});

const newClientSchema = new mongoose.Schema({
    details: detailsSchema,
    locations: {
        billToAddress: addressSchema,
        shipToAddress: addressSchema,
    },
    contactPersons: [contactPersonSchema], 
},{timestamps : true});

export const NewClient = mongoose.model("NewClient", newClientSchema);
