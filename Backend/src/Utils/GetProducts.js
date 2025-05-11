import {asyncHandler} from "./AsyncHandler.js";
import {ApiResponse} from "./ApiResponse.js";
import {ApiError} from "./ApiError.js";
import { Product } from "../Models/product.model.js";

export const getProducts = asyncHandler(async (req, res) => {

    try {

        const product = await Product.find().select("-__v -_id -createdAt  -updatedAt -salesPersonAssignment -createdBy -updatedBy");

        if (product.length === 0) {
            return res.status(404).json(new ApiError(404, "No product found"));
        }

        return res.status(200).json(new ApiResponse(200, product, "product fetched successfully"));


    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to fetch products", error.message));
    }

});