import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

import { SaleEstimate } from "../Models/saleEstimate.model.js";


export const NewSaleEstimate = asyncHandler(async (req, res) => {

    const {
        clientName,
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

        if ([clientName,currency, vatType].map((item) => item.trim()).includes('')) {
            console.log("client name", clientName, "currency", currency, "vat type", vatType);
            return res.status(400).json(new ApiError(400, "Please fill all the required fields"));
        }

        
        const client = await NewClient.findOne({ "details.clientName": clientName }).select("_id");
        
        if (!client) {
            return res.status(404).json(new ApiError(404, "Client not found"));
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
          

        const clientDetails = {
            clientId: client._id,
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

        const newSaleEstimate = await SaleEstimate.create({
            clientDetails,
            invoiceDetails,
            product : mergedProducts,
            invoiceNotesDetail,
            createdBy
        });

        if (!newSaleEstimate) {
            return res.status(400).json(new ApiError(400, "Failed to create invoice"));
        }

        return res.status(201).json(new ApiResponse(201, newSaleEstimate, "Invoice created successfully"));



    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to create invoice", error.message));
    }

})

export const GetSaleEstimate = asyncHandler(async (req, res) => {
    try {
        const saleEstimate = await SaleEstimate.find().select("-__v");

        if (!saleEstimate) {
            return res.status(404).json(new ApiError(404, "No sale estimate found"));
        }

        return res.status(200).json(new ApiResponse(200, saleEstimate, "Sale estimate fetched successfully"));
        
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to fetch sale estimate", error.message));
    }
})
