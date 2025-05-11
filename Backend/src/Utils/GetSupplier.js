import {asyncHandler} from "./AsyncHandler.js";
import {ApiResponse} from "./ApiResponse.js";
import {ApiError} from "./ApiError.js";
import { NewSupplier } from "../Models/Supplier.model.js";


export const getSupplier = asyncHandler(async (req, res) => {
    const { search } = req.query;

    try {
        if (!search) {
            return res.status(400).json(new ApiError(400, "No Query Found!"));
        }

        const supplier = await NewSupplier.find({
            "details.supplierName": { $regex: search.trim(), $options: "i" }
        }).select("-__v -_id -createdAt -updatedAt");



        if (supplier.length === 0) {
            return res.status(404).json(new ApiError(404, "No supplier found"));
        }

        return res.status(200).json(new ApiResponse(200, supplier, "supplier fetched successfully"));

    } catch (error) {

        return res.status(500).json(new ApiError(500, "Failed to fetch supplier", error.message));

    }
});