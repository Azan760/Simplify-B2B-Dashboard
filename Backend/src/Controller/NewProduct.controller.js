
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Product } from "../Models/product.model.js";
import { TeamMember } from "../Models/TeamMember.model.js";


export const SalesPerson = asyncHandler(async (req, res) => {

    try {

        const salesPerson = await TeamMember.find({ userType: { $in: ["Sales Person", "Sales Manager"] } }).select("fullName -_id");

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

//     const lastAssignedProduct = await Product.findOne({ "salesPersonAssignment.0": { $exists: true } })
//         .sort({ createdAt: -1 })
//         .select("salesPersonAssignment");

//     if (!lastAssignedProduct || lastAssignedProduct.salesPersonAssignment.length === 0) {
//         return {
//             id: salesPersons[0]._id,
//             name: salesPersons[0].fullName
//         };
//     }

//     const lastAssignedSalesPerson = lastAssignedProduct.salesPersonAssignment[lastAssignedProduct.salesPersonAssignment.length - 1];

//     const lastIndex = salesPersons.findIndex(user => user._id.toString() === lastAssignedSalesPerson.assignedUser.id.toString());

//     const nextIndex = (lastIndex + 1) % salesPersons.length;

//     return {
//         id: salesPersons[nextIndex]._id,
//         name: salesPersons[nextIndex].fullName
//     };
// };



export const NewProduct = asyncHandler(async (req, res) => {

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
        subCategory,
        color,
        purchaseCost,
        salePrice,
        profit,
        vatRate,
        description,
        createdBy
    } = req.body;

    try {

        if (!sku && !productServiceName) {

            return res.status(400).json(new ApiError(400, "Missing required fields (sku or productService)"));
        }



        let updatedSalesPersonAssignment = [...salesPersonAssignment];

        if (updatedSalesPersonAssignment.length === 0) {
            // const assignedUser = await assignSalesPerson();
            // console.log("Assigned Sales Person:", assignedUser);

            // if (assignedUser) {
            //     updatedSalesPersonAssignment.push({ assignedUser });
            // }


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
            details: {
                sku,
                productServiceName,
                brand,
                category,
                subCategory,
                color,
                purchaseCost,
                type,
                salePrice,
                profit,
                vatRate,
                description,
                active,
                buy,
                sell
            },
            salesPersonAssignment: updatedSalesPersonAssignment,
            createdBy,

        });

        const checkProduct = await Product.findById(newProduct._id).select("-__v ");
        console.log(checkProduct);


        return res.status(201).json(new ApiResponse(201, checkProduct, "Product created successfully"));

    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json(new ApiError(500, "Failed to create product", error.message));
    }


});


export const allProducts = asyncHandler(async (req, res) => {

    try {

        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;

        const data = await Product.find()
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber).sort({ createdAt: -1 }).select('-__v  -updatedAt');

        const formattedData = data.map(item => {
            return {
                _id: item._id,
                details: item.details,
                createdBy: item.createdBy,
                createdAt: item.createdAt,
                salesPersonAssignment: item.salesPersonAssignment.map(assignment => assignment.assignedUser),
            };
        });



        res.status(200).json(new ApiResponse({
            message: "Data Fetch Successfully!",
            data: formattedData,
        }));



    } catch (error) {
        throw new ApiError(500, error.message);
    }


});


export const detailView = asyncHandler(async (req, res) => {

    const { id } = req.params;

    try {
        if (!id) {
            throw new ApiError(400, ' ID is required!');
        }
        const user = await Product.findById(id).select(' -__v ');
        if (!user) {
            throw new ApiError(404, 'Product not found!');
        }

        return res.status(200).json(new ApiResponse(
            {
                data: user,
                message: 'Product fetched successfully!'
            }
        ));

    } catch (error) {
        throw new ApiError(500, error.message);
    }
});


export const editView = asyncHandler(async (req, res) => {

    const { id } = req.params;
    console.log("ID", id);
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
        subCategory,
        color,
        purchaseCost,
        salePrice,
        profit,
        vatRate,
        description,
        createdBy,
        updatedBy
    } = req.body;
  console.log(req.body);

    try {

        if (!sku && !productServiceName) {

            return res.status(400).json(new ApiError(400, "Missing required fields (sku or productService)"));
        }



        let updatedSalesPersonAssignment = [...salesPersonAssignment];
        console.log("updatedSalesPersonAssignment", updatedSalesPersonAssignment);

        if (updatedSalesPersonAssignment.length === 0) {
            // const assignedUser = await assignSalesPerson();
            // console.log("Assigned Sales Person:", assignedUser);

            // if (assignedUser) {
            //     updatedSalesPersonAssignment.push({ assignedUser });
            // }


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

        console.log("enter");
        console.log("updatedSalesPersonAssignment", updatedSalesPersonAssignment);


    
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                details: {
                    sku,
                    productServiceName,
                    brand,
                    category,
                    subCategory,
                    color,
                    purchaseCost,
                    type,
                    salePrice,
                    profit,
                    vatRate,
                    description,
                    active,
                    buy,
                    sell
                },
                salesPersonAssignment: updatedSalesPersonAssignment,
                createdBy,
                updatedBy
            },
            { new: true }
        );

        console.log("Updated Product", updatedProduct);

        if (!updatedProduct) {
            throw new ApiError(404, 'Product not found!');
        }

        return res.status(200).json(
            new ApiResponse({
                data: updatedProduct,
                message: 'Product updated successfully!'
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











