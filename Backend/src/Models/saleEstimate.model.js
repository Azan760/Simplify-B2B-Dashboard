import mongoose from "mongoose"
import { Counter } from "./Counter.model.js";

mongoose.pluralize(null);

const clientDetails = new mongoose.Schema({
    clientId : {
        type : mongoose.Types.ObjectId,
        ref : "NewClient",
        required : true
    },
    clientName: {
        type: String,
        required: [true, "Client name is required"],
    },
    contactPerson : {
        type : String,
    },
    shipToAddress : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
    },
    addressType : {
        type : String,
        enum : [
            "Bill To Address", 
            "Ship To Address"
        ]
    }


});

const product = new mongoose.Schema({
    sku : {
       type : String,
    },
    name : {
        type : String
    },
    category : {
      type : String,
      enum : ["General Sales", "Goodwill","Insurance Claims","Stock","Rent Income","Sales of Assets",
        "Royalties Recived", "Plant and Machinery","Office Equipment","Motor Vehicles",
        "Bank Charges","Capital Expenditure","Commissions Received","Credit Charges (Late Payments)",
        "Discounts Allowed","Distribution and Carriage","Flat Rate VAT Sales Adjustment",
        "Furniture and Fixtures","General Export Sales","Goodwill Amortisation","Intangible Asset Amortisation",
        "Miscellaneous Income",
      ]

    },
    quantity : {
        type : Number
    },
    unitPrice : {
        type : Number
    },
    vatPercent : {
        type : Number,
        
    },
    vatAmount : {
        type : Number,
    },
    grossTotal : {
        type : String,

    }
})


const invoiceDetails = new mongoose.Schema({
    date : {
        type : Date,
    },
    dueDate : {
        type : Date,
    },
    purchaseReference : {
        type : String,
    },
    currency: {
        type: String,
        required: [true, "Currency is required"],
    },
    exchangeRate : {
        type : Number,
        required : true,
    },
    vatType : {
        required : true,
        type : String,
        enum : [
            "Standard VAT", "Margin VAT", "Reverse Charge","EC Sales","Zero Rate VAT",
        ]
    },
    assigneTo : {
        type : String,
    }
});

const invoiceNotesDetail = new mongoose.Schema({

    
    SINumber: { type: String, unique: true },

    additionalNotes : {
        type: String,
    },
    paymentTerm : {
        type : String,
    },

    totalQuantity : {
        type : Number
    },
    dispatched : {
        type : Number,
    },
    subAmount : {
        type : String,
    },
    totalAmount : {
        type : String,
    }
})


const saleEstimate = new mongoose.Schema({

    clientDetails : clientDetails,

    invoiceDetails : invoiceDetails,

    product : [product],

    invoiceNotesDetail : invoiceNotesDetail,

    
},{timestamps: true});


saleEstimate.pre('save', async function (next) {
    if (this.isNew) {
        const currentYear = new Date().getFullYear();

        let counter = await Counter.findOne({ name: 'saleEstimate', year: currentYear });

        if (!counter) {
            counter = await Counter.create({
                name: 'saleEstimate',
                year: currentYear,
                seq: 1
            });
            
        } else {
            counter.seq++;
            await counter.save();
        }


        this.SINumber = `SE-${currentYear}-${counter.seq}`;
    }

    next();
});


export const SaleEstimate = mongoose.model("SaleEstimate",saleEstimate)