import mongoose from "mongoose"
mongoose.pluralize(null);

const supplierDetails = new mongoose.Schema({
    clientId : {
        type : mongoose.Types.ObjectId,
        ref : "NewSupplier",
        required : true
    },
    supplierName: {
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


const purchaseInvoice = new mongoose.Schema({

    supplierDetails : supplierDetails,

    invoiceDetails : invoiceDetails,

    product : [product],

    invoiceNotesDetail : invoiceNotesDetail,

    
},{timestamps : true});


export const PurchaseInvoice = mongoose.model("PurchaseInvoice",purchaseInvoice)