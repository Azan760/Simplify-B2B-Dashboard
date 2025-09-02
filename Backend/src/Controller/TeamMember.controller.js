import { TeamMember } from "../Models/TeamMember.model.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import nodemailer from 'nodemailer';
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js"

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD

    }
});

const createTeamMember = asyncHandler(async (req, res) => {
    const { active, email, firstName, lastName, userType,createdBy,contractType,corporateTax,commisionRate} = req.body;


    const userImage = req.file;

    try {

        if ([email, firstName, lastName, userType].map((item) => item.trim()).includes('')) {
            throw new ApiError(400, 'All fields are required!');
        }

        const existingUser = await TeamMember.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, 'User already exists!');
        }
        if(!createdBy){
            throw new ApiError(400, 'Created By is required!');
        }

        const fullName =    `${firstName} ${lastName}`;
       

        const user = new TeamMember({
            active,
            email,
            fullName,
            userType,
            userImage: userImage?.path,
            createdBy,
            contractType,
            commisionRate,
            corporateTax
        });

        await user.save();

        const checkUser = await TeamMember.findOne({ email });

        if (!checkUser) {

            throw new ApiError(500, 'User not found!');

        }

        var mailOptions = {
            from: 'bc220407079maz@vu.edu.pk',
            to: checkUser.email,
            subject: `Welcome ${checkUser.firstName} ${checkUser.lastName}`,

            html: `
                
             <div>
               
               <div>
                     <h1 style="font-size : 20px;" > Hi ${checkUser.firstName} ${checkUser.lastName}! </h1>
               </div>

                <div style="margin-top: 20px;">  
                     <p style="font-size : 18px;"> ${createdBy?.name} has added you to their team on simplify. </p>
                       <p> Please click on the following link to Choose a Password and get started. </p> 
                </div>

                <a
                 style="text-decoration : none; color: white; font-size : 18px; margin-top: 20px; padding: 10px 20px; background-color: #007bff; border-radius: 5px;"
                href="http://localhost:3000/new-password/${checkUser._id}">      
                  Click here to set your password
                </a>

             </div>
            
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {

            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })

        return res.status(201).json(new ApiResponse(
            {
                data: checkUser,
                message: 'User created successfully!'
            }


        ));

    } catch (error) {
        throw new ApiError(500, error.message);
    }


});

 const createPassword = asyncHandler(async (req, res) => {

    const { password,confirmPassword } = req.body;
    const { id } = req.params;
    console.log(password, ' ', confirmPassword, ' ', id);
    try {
        if (!password && !confirmPassword) {
            throw new ApiError(400, 'Password is required!');
        }
        if(password !== confirmPassword){
            throw new ApiError(400, 'Passwords do not match!');
        }

        if(!id){
            throw new ApiError(400, 'User ID is required!');
        }

        const user = await TeamMember.findById(id);
        if (!user) {
            throw new ApiError(404, 'User not found!');
        }

        user.password = password;
        await user.save();

        return res.status(200).json(new ApiResponse(
            {
                data: user,
                message: 'Password created successfully!'
            }
        ));

    } catch (error) {
        throw new ApiError(500, error.message);
    }
});


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

     
});

export const detailView = asyncHandler(async(req,res) => {
    const { id } = req.params;

    try {
        if(!id){
            throw new ApiError(400, 'User ID is required!');
        }
        const user = await TeamMember.findById(id).select('-refreshToken -password -__v ');
        if (!user) {
            throw new ApiError(404, 'User not found!');
        }

        return res.status(200).json(new ApiResponse(
            {
                data: user,
                message: 'User fetched successfully!'
            }
        ));

    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export const editView = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const {
      active,
      email,
      firstName,
      lastName,
      userType,
      contractType,
      corporateTax,
      commisionRate,
      updatedBy
    } = req.body;

    console.log(req.body);
  
    const userImage = req?.file;
    console.log(userImage?.path);
  
    try {

      if ([email, firstName, lastName, userType].map((item) => item.trim()).includes('')) {
         return res.status(400).json(
          new ApiResponse({
            data: null,
            message: 'All fields are required!'
          }))};

          if(!updatedBy){
            return res.status(400).json(
                new ApiResponse({
                  data: null,
                  message: 'Updated By is required!'
                }))}
  
      const fullName = `${firstName} ${lastName}`;
      console.log(fullName);
  
      const updatedUser = await TeamMember.findByIdAndUpdate(
        id,
        {
          active,
          email,
          fullName,
          userType,
          userImage: userImage?.path,
          contractType,
          commisionRate,
          corporateTax,
           updatedBy
        },
        { new: true } 
      );

      console.log(updatedUser);
  
      if (!updatedUser) {
        throw new ApiError(404, 'User not found!');
      }
  
      return res.status(200).json(
        new ApiResponse({
          data: updatedUser,
          message: 'User updated successfully!'
        })
      );
    } catch (error) {
      res.status(500).json(
        new ApiResponse({
          data: null,
          message: error.message
        })
      );
    }
  });
  

export { createTeamMember, createPassword };



