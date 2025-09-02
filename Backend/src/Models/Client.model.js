import mongoose from "mongoose";
import {Counter} from "../Models/Counter.model.js"
mongoose.pluralize(null);


const contactPersonSchema = new mongoose.Schema({
    active : {
        type : Boolean,
       // default : true,

    },
    defaultContact : {
        type: Boolean,
      //  default: true,
    },
    fullName: {
        type: String,
        trim: true,
        required: [true, "Full name is required."],
    },
    email: {
        type: String, 
        unique : true,
        trim : true,
        
    },
    phoneNo: {
        type: String,
        // minLength: [6, "Phone number must be at least 6 characters."],
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
        trim: true,
        unique : false,
    },
    phoneNo: {
        type: String,
        trim: true,
        unique : false,
    
    },
    defaultTerm: {
        type: Number,
        required: [true, "Default term is required."],
    },
    vatNumber: {
        type: String,
        // minLength: [2, "VAT number must be at least 2 characters."],
    },
    vatRate: {
        type: Number,
    },
    eoriNo: {
        type: String,
        // minLength: [2, "EORI number must be at least 2 characters."],
        unique : false,

    },
    deafultCategory: {
        type: String,
    },
    active :  {
        type: Boolean,
        default: true,
    },
    overdue : {
        type : Boolean,
        default : true,
    }
});

const newClientSchema = new mongoose.Schema({

    CLINumber :{ type: String, unique: true },
    Status : {
        type : String,
       // required : true,
    },
    details: detailsSchema,
    locations: {
        billToAddress: addressSchema,
        shipToAddress: addressSchema,
    },
    contactPersons: [contactPersonSchema],
     createdBy: {
    
            id :  { 
             type: mongoose.Schema.Types.ObjectId,
              ref: 'TeamMember', 
            },
            name : {
                type : String,
                
            }
        },
         updatedBy: {
                    id: {
                        type: mongoose.Types.ObjectId,
                        ref: "TeamMember",
                    },
                    name: {
                        type: String,
                    },
                }
}, { timestamps: true });


newClientSchema.pre('save', async function (next) {
    if (this.isNew) {
        const currentYear = new Date().getFullYear();

        let counter = await Counter.findOne({ name: 'newClientSchema', year: currentYear });

        if (!counter) {
            counter = await Counter.create({
                name: 'newClientSchema',
                year: currentYear,
                seq: 1
            });
            
        } else {
            counter.seq++;
            await counter.save();
        }


        this.CLINumber = `CLI-${currentYear}-${counter.seq}`;
    }

    next();
});

export const NewClient = mongoose.model("Client", newClientSchema);
