import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { SaleInvoice } from "../Models/saleInvoice.model.js";
import {SaleEstimate} from "../Models/saleEstimate.model.js";
import {PurchaseInvoice} from "../Models/purchaseInvoice.model.js"

export const GetAllSaleInvoice = asyncHandler(async (req, res) => {

    try {
        const saleInvoices = await SaleInvoice.aggregate([
            {
                $sort: { createdAt: -1 } 
            },
            {
                $limit: 5 
            },
            {
                $project: {
                    SINumber: 1,
                    "clientDetails.clientName": 1,
                    "invoiceDetails.date": 1,
                    totalAmount: {
                        $sum: {
                            $map: {
                                input: "$product",
                                as: "prod",
                                in: { $toDouble: "$$prod.grossTotal" }
                            }
                        }
                    }
                }
            }
        ]);


        if (!saleInvoices) {
            return res.status(404).json(new ApiError(404, "No invoices found"));
        }

        return res.status(200).json(new ApiResponse(200, saleInvoices, "Invoices fetched successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to fetch invoices", error.message));
    }


})



export const GetAllSaleEstimates = asyncHandler(async (req, res) => {

    try {
        const saleInvoices = await SaleEstimate.aggregate([
            {
                $sort: { createdAt: -1 } 
            },
            {
                $limit: 5 
            },
            {
                $project: {
                    SINumber: 1,
                    "clientDetails.clientName": 1,
                    "invoiceDetails.date": 1,
                    totalAmount: {
                        $sum: {
                            $map: {
                                input: "$product",
                                as: "prod",
                                in: { $toDouble: "$$prod.grossTotal" }
                            }
                        }
                    }
                }
            }
        ]);


        if (!saleInvoices) {
            return res.status(404).json(new ApiError(404, "No Estimates found"));
        }

        return res.status(200).json(new ApiResponse(200, saleInvoices, "Estimates fetched successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to fetch Estimates", error.message));
    }


})



export const GetAllPurchaseInvoice = asyncHandler(async (req, res) => {

    try {
        const saleInvoices = await PurchaseInvoice.aggregate([
            {
                $sort: { createdAt: -1 } 
            },
            {
                $limit: 5 
            },
            {
                $project: {
                    SINumber: 1,
                    "supplierDetails.supplierName": 1,
                    "invoiceDetails.date": 1,
                    totalAmount: {
                        $sum: {
                            $map: {
                                input: "$product",
                                as: "prod",
                                in: { $toDouble: "$$prod.grossTotal" }
                            }
                        }
                    }
                }
            }
        ]);


        if (!saleInvoices) {
            return res.status(404).json(new ApiError(404, "No Estimates found"));
        }

        return res.status(200).json(new ApiResponse(200, saleInvoices, "Estimates fetched successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to fetch Estimates", error.message));
    }


})