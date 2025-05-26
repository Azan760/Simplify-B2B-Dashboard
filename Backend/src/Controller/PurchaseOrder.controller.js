import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Product } from "../Models/product.model.js";
import {NewSupplier} from "../Models/Supplier.model.js"
import { PurchaseOrder } from "../Models/Order.model.js"

export const NewPurchaseOrder = asyncHandler(async (req, res) => {

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

        if ([supplierName, currency, vatType].map((item) => item.trim()).includes('')) {
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

        const newPurchaseInvoice = await PurchaseOrder.create({
            supplierDetails,
            invoiceDetails,
            product: mergedProducts,
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

export const GetPurchaseOrder = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;

        const data = await PurchaseOrder.find()
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber).sort({ createdAt: -1 }).select(' -__v -updatedAt');

        res.status(200).json(new ApiResponse({
            message: "Data Fetch Successfully!",
            data: data
        }));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to fetch purchase orders", error.message));
    }
})



export const detailView = asyncHandler(async (req, res) => {

    const { id } = req.params;

    try {
        if (!id) {
            throw new ApiError(400, ' ID is required!');
        }
        const purchaseOrder = await PurchaseOrder.findById(id).select(' -__v ');

        if (!purchaseOrder) {
            throw new ApiError(404, 'PurchaseOrder not found!');
        }

        return res.status(200).json(new ApiResponse(
            {
                data: purchaseOrder,
                message: 'purchaseOrder fetched successfully!'
            }
        ));

    } catch (error) {
        throw new ApiError(500, error.message);
    }
});
