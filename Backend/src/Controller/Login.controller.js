import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { TeamMember } from "../Models/TeamMember.model.js";


export const Login = asyncHandler(async (req, res) => {

     const {email,password} = req.body;
    try {

        if( !email && !password ) {
            return res.status(400).json(new ApiError(400, "Email and Password are required"));
        }

        const user = await TeamMember.findOne({ email: email });

         if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));

         }

        if (user.password !== password) {
            return res.status(400).json(new ApiError(400, "Incorrect Password"));

        }
    }
    catch (error) {

    }


});
