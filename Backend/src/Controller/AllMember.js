import { TeamMember } from "../Models/TeamMember.model.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js"

export const allMember = asyncHandler(async(req,res) => {

     try {

          const { page = 1, limit = 10 } = req.query; 
           const pageNumber = parseInt(page, 10) || 1;
           const limitNumber = parseInt(limit, 10) || 10;
    
           const data = await TeamMember.find()
          .skip((pageNumber - 1) * limitNumber) 
           .limit(limitNumber).sort({createdAt : -1}).select('-refreshToken -password -__v -updatedAt'); 
  

           
              res.status(200).json(new ApiResponse({ 
                  message : "Data Fetch Successfully!", 
                  data : data
           }));
       
   

     }catch(error) {
          throw new ApiError(500, error.message);
     }

     
})