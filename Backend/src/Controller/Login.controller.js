import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { TeamMember } from "../Models/TeamMember.model.js";


const generateAccessTokenandRefreshToken = async (userID) => {

    try {

        const user = await TeamMember.findById(userID);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export const Login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    console.log(email, password);

    try {

        if (!email || !password) {
            return res.status(400).json(new ApiError(400, "Email and Password are required"));
        }

        const user = await TeamMember.findOne({ email: email });

        console.log(user);

        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));

        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);

        console.log(isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json(new ApiResponse(400,"Invalid Password"));
        }

        const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(user._id);

        const loginUserData = await TeamMember.findById(user._id).select("-password -refreshToken");
        console.log(loginUserData);

        const options = {
            httpOnly: true,
            secure: false,
        }

        res.status(200).
            cookie("accessToken", accessToken, options).
            cookie("refreshToken", refreshToken, options).
            json(new ApiResponse(200, { accessToken, loginUserData }));


    }
    catch (error) {
        return res.status(500).json(new ApiError(500, error.message));

    }


});


export const Logout = asyncHandler(async (req, res) => {


    try {

        await TeamMember.findByIdAndUpdate(req.user._id, { $set: { refreshToken: null } }, { new: true });

        const options = {
            httpOnly: true,
            secure: false,
        }

        res.clearCookie("accessToken", options);
        res.clearCookie("refreshToken", options);

        return res.status(200).json(new ApiResponse(200, "Logged Out Successfully"));

    }
    catch (error) {
        return res.status(500).json(new ApiError(500, error.message));

    }

});