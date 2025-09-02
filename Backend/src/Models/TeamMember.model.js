import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

mongoose.pluralize(null);


const TeamMemberSchema = new mongoose.Schema({

    active : {
        type : Boolean,
        default : true,
    },

    fullName: {
        type: String,
        required: [true,"Full Name is required"],
        minlength: [4, "Last Name is required to be at least 2 character."],
        trim: true,
        index : true,
    },
    email: {
        unique: true,
        type: String,
        trim: true,
        required: [true,"Email is required"],
        index : true,
    },
    userType: {
        required: true,
        type: String,
        enum: [
            "Admin",
            "Accountant",
            "Inventory Clerk",
            "Inventory Manager",
            "Sales Manager",
            "Sales Person",
        ],
    },
    contractType: {
        type : String,
        enum : ["Fixed","CommisionBased"],
    },
    commisionRate : {
        type : Number,
        default : 0
    },
    corporateTax : {
        type : Number,
    },
    userImage : {
        type : String,
    },

    createdBy: {

        id :  { 
         type: mongoose.Schema.Types.ObjectId,
          ref: 'TeamMember', 
        },
        name : {
            type : String,
            required : false
        }
    },
    updatedBy: {

        id :  { 
         type: mongoose.Schema.Types.ObjectId,
          ref: 'TeamMember', 
        },
        name : {
            type : String,
            required : false
        }
    },
    password: {         
        type: String,
      //  required: [true, "Password is required"],
      //  minlength: [6, "Password must be at least 6 characters"]
    },
    refreshToken :{
        type : String,
        default : null
    }



}, {timestamps : true});


TeamMemberSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

TeamMemberSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};


TeamMemberSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
            userType: this.userType,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1d'
        }
    )
}

TeamMemberSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '3d' }
    )
}

export const TeamMember = mongoose.model("TeamMember",TeamMemberSchema)