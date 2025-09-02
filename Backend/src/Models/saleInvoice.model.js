import mongoose from "mongoose"
import { Counter } from "./Counter.model.js";
mongoose.pluralize(null);

const clientDetails = new mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: "NewClient",
        required: true
    },
    clientName: {
        type: String,
        required: [true, "Client name is required"],
    },
    contactPerson: {
        type: String,
    },
    shipToAddress: {
        type: String,
    },
    email: {
        type: String,

    },
    addressType: {
        type: String,
        enum: [
            "Bill To Address",
            "Ship To Address"
        ]
    }


});

const product = new mongoose.Schema({
    productID: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    sku: {
        type: String,
        required: [true, "Product SKU is required"],
    },
    productServiceName: {
        type: String,
        required: [true, "Product name is required"],
    },
    category: {
        type: String,
        enum: ["General Sales", "Goodwill", "Insurance Claims", "Stock", "Rent Income", "Sales of Assets",
            "Royalties Recived", "Plant and Machinery", "Office Equipment", "Motor Vehicles",
            "Bank Charges", "Capital Expenditure", "Commissions Received", "Credit Charges (Late Payments)",
            "Discounts Allowed", "Distribution and Carriage", "Flat Rate VAT Sales Adjustment",
            "Furniture and Fixtures", "General Export Sales", "Goodwill Amortisation", "Intangible Asset Amortisation",
            "Miscellaneous Income",
        ]

    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
    },
    unitPrice: {
        type: Number,
        required: [true, "Product unit price is required"],
    },
    vatRate : {
        type: Number,
    },
    vatAmount: {
        type: mongoose.Schema.Types.Decimal128,
    },
    grossTotal: {
        type: mongoose.Schema.Types.Decimal128,

        required: [true, "Product gross total is required"],

    }
})


const invoiceDetails = new mongoose.Schema({
    date: {
        type: Date,
    },
    dueDate: {
        type: Date,
    },
    purchaseReference: {
        type: String,
    },
    currency: {
        type: String,
        required: [true, "Currency is required"],
    },
    exchangeRate: {
        type: Number,
        required: true,
    },
    vatType: {
        required: true,
        type: String,
        enum: [
            "Standard VAT", "Margin VAT", "Reverse Charge", "EC Sales", "Zero Rate VAT",
        ]
    },
    assigneTo: {
        id : {
            type: mongoose.Types.ObjectId,
            ref: "TeamMember",
        },

        name : {
            type : String,
         
        }
    }
});

const invoiceNotesDetail = new mongoose.Schema({

    additionalNotes: {
        type: String,
    },
    paymentTerm: {
        type: String,
    },
})


const saleInvoice = new mongoose.Schema({

    SINumber: { type: String, unique: true },

    clientDetails: clientDetails,

    invoiceDetails: invoiceDetails,

    product: [product],

    invoiceNotesDetail: invoiceNotesDetail,
    createdBy: {
        id: {
            type: mongoose.Types.ObjectId,
            ref: "TeamMember",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    } , 
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

saleInvoice.pre('save', async function (next) {
    if (this.isNew) {
        const currentYear = new Date().getFullYear();

        let counter = await Counter.findOne({ name: 'saleInvoice', year: currentYear });

        if (!counter) {
            counter = await Counter.create({
                name: 'saleInvoice',
                year: currentYear,
                seq: 1
            });
            
        } else {
            counter.seq++;
            await counter.save();
        }


        this.SINumber = `SI-${currentYear}-${counter.seq}`;
    }

    next();
});


export const SaleInvoice = mongoose.model("SaleInvoice", saleInvoice)