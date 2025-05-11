import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { PurchaseInvoice } from "../Models/purchaseInvoice.model.js";



export const NewPurchaseInvoice = asyncHandler(async (req, res) => {

    const {
        supplierName,
        contactPerson,
        email,
        addressType,
        date,
        dueDate,
        purchaseRefernce,
        currency,
        exchangeRate,
        vatType,
        Product: Products,
        shipToAddress,
        notes,
        paymentTerms,
        createdBy,

    } = req.body;

    try {

        if ([supplierName,currency, vatType].map((item) => item.trim()).includes('')) {
            console.log("client name", clientName, "currency", currency, "vat type", vatType);
            return res.status(400).json(new ApiError(400, "Please fill all the required fields"));
        }

        
        const supplier = await NewSupplier.findOne({ "details.supplierName": supplierName }).select("_id");
        
        if (!supplier) {
            return res.status(404).json(new ApiError(404, "supplier not found"));
        }
        
        if (Products.length === 0) {
            return res.status(400).json(new ApiError(400, "Please add at least one product"));
        }

        if (
            Products.some((item) =>
                item.productServiceName.trim() === '' ||
                item.sku.trim() === '' 
            )
        ) {
            return res.status(400).json(new ApiError(400, "Please fill all the required fields in product"));
        }

        const productNames = Products.map(item => item.productServiceName);
        
        const products = await Product.find({ "details.productServiceName": { $in: productNames } }).select("_id");

        if (products.length !== Products.length) {
            return res.status(400).json(new ApiError(400, "Some products not found in database"));
        }

        const mergedProducts = Products.map((item, index) => ({
            ...item,
            productID: products[index]._id
          }));
          
          console.log(mergedProducts, "merged products");
          

        const supplierDetails = {
            supplierId: supplier._id,
            clientName,
            contactPerson,
            email,
            addressType,
            shipToAddress
        };
        const invoiceDetails = {
            date,
            dueDate,
            purchaseRefernce,
            currency,
            exchangeRate,
            vatType,

        }

        const invoiceNotesDetail = {
            additionalNotes: notes,
            paymentTerm: paymentTerms,
        }

        const newPurchaseInvoice = await PurchaseInvoice.create({
            supplierDetails,
            invoiceDetails,
            product : mergedProducts,
            invoiceNotesDetail,
            createdBy
        });

        if (!newPurchaseInvoice) {
            return res.status(400).json(new ApiError(400, "Failed to create invoice"));
        }

        return res.status(201).json(new ApiResponse(201, newPurchaseInvoice, "Invoice created successfully"));



    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to create invoice", error.message));
    }

})
export const GetPurchaseInvoice = asyncHandler(async (req, res) => {
    try {
        const purchaseInvoice = await PurchaseInvoice.find().select("-__v");

        if (!purchaseInvoice) {
            return res.status(404).json(new ApiError(404, "No purchase invoice found"));
        }

        return res.status(200).json(new ApiResponse(200, purchaseInvoice, "Purchase invoice fetched successfully"));
        
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to fetch purchase invoice", error.message));
    }
})