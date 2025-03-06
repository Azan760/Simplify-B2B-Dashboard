
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Product } from "../Models/product.model.js";
import { TeamMember } from "../Models/TeamMember.model.js";


export const SalesPerson = asyncHandler(async (req, res) => {

    try {

        const salesPerson = await TeamMember.find({ userType: "Sales Person" }).select("fullName -_id");

        if (!salesPerson) {
            return res.status(404).json(new ApiError(404, "No sales person found"));
        }

        return res.status(200).json(new ApiResponse(200, salesPerson, "Sales person fetched successfully"));

    }
    catch (error) {

        return res.status(500).json(new ApiError(500, "Failed to fetch sales person", error.message));

    }

});


// const assignSalesPerson = async () => {

//     const salesPersons = await TeamMember.find({ userType: "Sales Person" }).sort({ createdAt: 1 });

//     if (salesPersons.length === 0) return null;

//     const lastAssignedProduct = await Product.findOne({ "salesPersonAssignment.0": { $exists: true } }).sort({ createdAt: -1 });

//     if (!lastAssignedProduct || lastAssignedProduct.salesPersonAssignment.length === 0) {
//         return {
//             id: salesPersons[0]._id,
//             name: salesPersons[0].fullName
//         };
//     }

//     const lastAssignedSalesPerson = lastAssignedProduct.salesPersonAssignment.slice(-1)[0]; // Get last entry

//     const assignedID = lastAssignedSalesPerson._id.toString();

//     const lastIndex = salesPersons.findIndex(user => user._id.toString() === assignedID);

//     const nextIndex = (lastIndex + 1) % salesPersons.length;

//     return {
//         id: salesPersons[nextIndex]._id,
//         name: salesPersons[nextIndex].fullName
//     }


// }


const assignSalesPerson = async () => {
    const salesPersons = await TeamMember.find({ userType: "Sales Person" }).sort({ createdAt: 1 });

    if (salesPersons.length === 0) return null;

    const lastAssignedProduct = await Product.findOne({ "salesPersonAssignment.0": { $exists: true } })
        .sort({ createdAt: -1 }) 
        .select("salesPersonAssignment");

    if (!lastAssignedProduct || lastAssignedProduct.salesPersonAssignment.length === 0) {
        return {
            id: salesPersons[0]._id,
            name: salesPersons[0].fullName
        };
    }

    // Get last assigned sales person from last product
    const lastAssignedSalesPerson = lastAssignedProduct.salesPersonAssignment[lastAssignedProduct.salesPersonAssignment.length - 1];

    // Find index of last assigned sales person in salesPersons array
    const lastIndex = salesPersons.findIndex(user => user._id.toString() === lastAssignedSalesPerson.assignedUser.id.toString());

    // Get next sales person in sequence
    const nextIndex = (lastIndex + 1) % salesPersons.length;

    return {
        id: salesPersons[nextIndex]._id,
        name: salesPersons[nextIndex].fullName
    };
};



export const NewProduct = asyncHandler(async (req, res) => {

    console.log(req.body);


    const {
        type,
        buy,
        sell,
        active,
        sku,
        productServiceName,
        salesPersonAssignment,
        brand,
        category,
        subcategory,
        color,
        purchase,
        sales,
        profit,
        vatRate,
        description,
    } = req.body;

    try {

        if (!sku && !productServiceName) {

            return res.status(400).json(new ApiError(400, "Missing required fields (sku or productService)"));
        }



          let updatedSalesPersonAssignment = [...salesPersonAssignment];

          if (updatedSalesPersonAssignment.length === 0) {
            const assignedUser = await assignSalesPerson(); 
            console.log("Assigned Sales Person:", assignedUser);
        
            if (assignedUser) {
                updatedSalesPersonAssignment.push({ assignedUser });
            }
        
        
        } else {
        
            for (const i of updatedSalesPersonAssignment) {

                if (!i.assignedUser) {

                    return res.status(400).json(new ApiError(400, "Missing required fields (assignedUser)"));

                } else {

                    const assignUser = await TeamMember.findOne({ fullName: i.assignedUser });

                    if (!assignUser) {

                        return res.status(400).json(new ApiError(400, "Assigned user not found"));
                    }
                
                    i.assignedUser = {
                        id: assignUser._id,
                        name: assignUser.fullName
                    };
                }
            }
        }

        const newProduct = await Product.create({
            active,
            sku,
            productServiceName,
            salesPersonAssignment : updatedSalesPersonAssignment,
            brand,
            category,
            subcategory,
            color,
            purchase,
            sales,
            profit,
            description,
            buy,
            sell,
            type,
            vatRate,
        });

        const checkProduct = await Product.findById(newProduct._id).select("-__v ");
        console.log(checkProduct);



        return res.status(201).json(new ApiResponse(201, checkProduct, "Product created successfully"));
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json(new ApiError(500, "Failed to create product", error.message));
    }


});