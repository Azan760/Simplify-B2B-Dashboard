import {asyncHandler} from  "./AsyncHandler.js"
import {ApiResponse} from "./ApiResponse.js";
import {ApiError} from "./ApiError.js";
import { NewClient } from "../Models/Client.model.js";

export const getClients = asyncHandler(async (req, res) => {
    const { search } = req.query;

    try {
        if (!search) {
            return res.status(400).json(new ApiError(400, "No Query Found!"));
        }

        const clients = await NewClient.find({
            "details.clientName": { $regex: search.trim(), $options: "i" }
        }).select("-__v -_id -createdAt -updatedAt");



        if (clients.length === 0) {
            return res.status(404).json(new ApiError(404, "No client found"));
        }

        return res.status(200).json(new ApiResponse(200, clients, "Clients fetched successfully"));

    } catch (error) {

        return res.status(500).json(new ApiError(500, "Failed to fetch clients", error.message));

    }
});
