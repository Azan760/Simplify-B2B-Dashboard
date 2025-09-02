import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { SaleInvoice } from "../Models/saleInvoice.model.js";
import { SaleEstimate } from "../Models/saleEstimate.model.js";
import { PurchaseInvoice } from "../Models/purchaseInvoice.model.js"
import { NewClient } from "../Models/Client.model.js";
import { TeamMember } from "../Models/TeamMember.model.js";
import {NewSupplier} from "../Models/Supplier.model.js";

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

export const AllClients = asyncHandler(async (req, res) => {
    try {

        const data = await NewClient.find()
            .limit(10)
            .sort({ createdAt: -1 })
            .select('_id details.clientName');

        return res.status(200).json(new ApiResponse(200, data, "Clients fetched successfully"));

    }
    catch (error) {

        res.status(500).json(new ApiError(500, "Failed to fetch clients", error.message));

    }


})


export const AllTeams = asyncHandler(async (req, res) => {
    try {

        const data = await TeamMember.find()
            .limit(10)
            .sort({ createdAt: -1 })
            .select('_id fullName');

        return res.status(200).json(new ApiResponse(200, data, "Team Member fetched successfully"));

    }
    catch (error) {

        res.status(500).json(new ApiError(500, "Failed to fetch Team Member", error.message));

    }


})


export const AllSupplier = asyncHandler(async (req, res) => {
    try {

        const data = await NewSupplier.find()
            .limit(10)
            .sort({ createdAt: -1 })
            .select('_id details.supplierName');

        return res.status(200).json(new ApiResponse(200, data, "Supplier fetched successfully"));

    }
    catch (error) {

        res.status(500).json(new ApiError(500, "Failed to fetch Supplier", error.message));

    }


})