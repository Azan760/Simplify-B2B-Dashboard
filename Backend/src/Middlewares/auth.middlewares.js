import jwt from 'jsonwebtoken';
import {TeamMember} from '../Models/TeamMember.model.js';
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";


export const verifyToken = asyncHandler(async (req, res, next) => {
    try {
        
        const accessToken = req.cookies.accessToken;
         console.log(accessToken);

        if (!accessToken) {
            return res.status(401).json(new ApiError(401, "Access Token is required"));
        }

       const decodedToken =  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken);

            const user = await TeamMember.findById(decodedToken._id).select("-password -refreshToken");
            console.log(user);
            if (!user) {
                return res.status(404).json(new ApiError(404, "User not found"));

            }
            req.user = user;
            next();
        }
    catch (error) {
        throw new Error(error.message);
    }
});




