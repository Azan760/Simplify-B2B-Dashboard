import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { TeamMember } from "../Models/TeamMember.model.js";
import { NewSupplier } from "../Models/Supplier.model.js";


export const SalesPerson = asyncHandler(async (req, res) => {

    try {

        const salesPerson = await TeamMember.find({ userType: "Sales Person" }).select("fullName -_id");

        if (salesPerson === 0 ) {

            return res.status(404).json(new ApiError(404, "No sales person found"));
        }

        return res.status(200).json(new ApiResponse(200, salesPerson, "Sales person fetched successfully"));

    }
    catch (error) {

        return res.status(500).json(new ApiError(500, "Failed to fetch sales person", error.message));

    }

});
export const Supplier = asyncHandler(async (req, res) => {

    console.log(req.body);

    const {
        createdBy,
        contactPerson = [], 
        defaultTerm,
        active,
        overdue,
        supplierName,
        registraion,
        currency,
        supplierEmail,
        phone,
        vatNumber,
        vatRate,
        eoriNo,
        purchaseCategory,
        billAddress1,
        billAddress2,
        billCity,
        billState,
        billCountry,
        billZipCode,
        shipAddress1,
        shipAddress2,
        shipCity,
        shipState,
        shipCountry,
        shipZipCode
    } = req.body;

    try {
        if (!supplierName || !currency || !defaultTerm) {

            return res.status(400).json(new ApiError(400, "Missing required fields (Client Name, Currency, or Default Term)"));
        }

        if(!createdBy) {
            return res.status(400).json(new ApiError(400, "Created By is required!"));
        } 
        
          const userRole = await TeamMember.findById(createdBy.id).select("userType");
                let Status = "";
        
                if (userRole && userRole.userType === "Admin") {
                    console.log("User is Admin");
                    Status = "Approved";
                } else {
                    console.log("User is not Admin");
                    Status = "Pending";
                }
        
        

        const details = {
            supplierName,
            registration: registraion,
            currency,
            email: supplierEmail,
            phoneNo: phone,
            defaultTerm,
            vatNumber,
            vatRate,
            eoriNo,
            defaultCategory: purchaseCategory,
            active,
            overdueRemainder : overdue,

        };

        const billToAddress = {
            address1: billAddress1,
            address2: billAddress2,
            city: billCity,
            state: billState,
            country: billCountry,
            zipCode: billZipCode
        };

        const shipToAddress = {
            address1: shipAddress1,
            address2: shipAddress2,
            city: shipCity,
            state: shipState,
            country: shipCountry,
            zipCode: shipZipCode
        };

        let updatedSalesPersonAssignment = Array.isArray(contactPerson) ? [...contactPerson] : [];

        if (updatedSalesPersonAssignment.length > 0) {
            for (const i of updatedSalesPersonAssignment) {
                if (!i.salePerson) {
                    return res.status(400).json(new ApiError(400, "Missing required fields (assignedUser)"));
                } else {
                    const assignUser = await TeamMember.findOne({ fullName: i.salePerson });

                    if (!assignUser) {
                        return res.status(400).json(new ApiError(400, "Assigned user not found"));
                    }

                    i.salePerson = {
                        id: assignUser._id,
                        name: assignUser.fullName
                    };
                }
            }
        }

        const newSupplier = await NewSupplier.create({
            Status,
            details,
            contactPersons: updatedSalesPersonAssignment,
            locations: {
                billToAddress,
                shipToAddress
            },
            createdBy,

        });
        console.log(newSupplier);

        const checkSupplier = await NewSupplier.findById(newSupplier._id).select(" -__v");

        return res.status(201).json(new ApiResponse(201, checkSupplier, "New client created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to create new client", error.message));
    }
});


export const SupplierList = asyncHandler(async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;

        const data = await NewSupplier.find()
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber).sort({ createdAt: -1 }).select(' -__v -updatedAt  -locations');

        res.status(200).json(new ApiResponse({
            message: "Data Fetch Successfully!",
            data: data
        }));

    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to fetch Supplier list", error.message));
    }

});



export const detailView = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            throw new ApiError(400, 'Supplier ID is required!');
        }
        const Supplier = await NewSupplier.findById(id).select(' -__v ');

        if (!Supplier) {
            throw new ApiError(404, 'Supplier not found!');
        }

        return res.status(200).json(new ApiResponse(
            {
                data: Supplier,
                message: 'Supplier fetched successfully!'
            }
        ));

    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

// export const editView = asyncHandler(async (req, res) => {

//     const { id } = req.params;
//     const {
//         contactPerson = [],
//         defaultTerm,
//         active,
//         overdue,
//         supplierName,
//         registraion,
//         currency,
//         supplierEmail,
//         phone,
//         vatNumber,
//         vatRate,
//         eoriNo,
//         saleCategory,
//         billAddress1,
//         billAddress2,
//         billCity,
//         billState,
//         billCountry,
//         billZipCode,
//         shipAddress1,
//         shipAddress2,
//         shipCity,
//         shipState,
//         shipCountry,
//         shipZipCode,
//         updatedBy

//     } = req.body;

//     try {

//         if (!updatedBy) {
//             throw new ApiError(400, 'Created By is required!');
//         }

//         const details = {
//             supplierName,
//             registration: registraion,
//             currency,
//             email: supplierEmail,
//             phoneNo: phone,
//             defaultTerm,
//             vatNumber,
//             vatRate,
//             eoriNo,
//             active,
//             overdue,
//             defaultCategory: saleCategory
//         };

//         const billToAddress = {
//             address1: billAddress1,
//             address2: billAddress2,
//             city: billCity,
//             state: billState,
//             country: billCountry,
//             zipCode: billZipCode
//         };

//         const shipToAddress = {
//             address1: shipAddress1,
//             address2: shipAddress2,
//             city: shipCity,
//             state: shipState,
//             country: shipCountry,
//             zipCode: shipZipCode
//         };

//         const updatedUser = await NewSupplier.findByIdAndUpdate(
//             id,
//             {
//                 details,
//                 contactPersons: contactPerson,
//                 locations: {
//                     billToAddress,
//                     shipToAddress
//                 },
//                 updatedBy,
//             },
//             { new: true }
//         );

//         if (!updatedUser) {
//             throw new ApiError(404, 'Supplier not found!');
//         }

//         return res.status(200).json(
//             new ApiResponse({
//                 data: updatedUser,
//                 message: 'Supplier updated successfully!'
//             })
//         );
//     } catch (error) {
//         res.status(500).json(
//             new ApiResponse({
//                 data: null,
//                 message: error.message
//             })
//         );
//     }
// });


export const editView = asyncHandler(async (req, res) => {
        const { id } = req.params;


    const {
        contactPerson = [], 
        defaultTerm,
        active,
        overdue,
        supplierName,
        registraion,
        currency,
        supplierEmail,
        phone,
        vatNumber,
        vatRate,
        eoriNo,
        purchaseCategory,
        billAddress1,
        billAddress2,
        billCity,
        billState,
        billCountry,
        billZipCode,
        shipAddress1,
        shipAddress2,
        shipCity,
        shipState,
        shipCountry,
        shipZipCode,
        updatedBy
    } = req.body;

    try {
        if (!supplierName || !currency || !defaultTerm) {
            return res.status(400).json(new ApiError(400, "Missing required fields (Supplier Name, Currency, or Default Term)"));
        }

        if (!updatedBy) {
            throw new ApiError(400, 'Updated By is required!');
        }

    
        const details = {
            supplierName,
            registration: registraion,
            currency,
            email: supplierEmail,
            phoneNo: phone,
            defaultTerm,
            vatNumber,
            vatRate,
            eoriNo,
            active,
            overdue,
            defaultCategory: purchaseCategory
        };

        const billToAddress = {
            address1: billAddress1,
            address2: billAddress2,
            city: billCity,
            state: billState,
            country: billCountry,
            zipCode: billZipCode
        };

        const shipToAddress = {
            address1: shipAddress1,
            address2: shipAddress2,
            city: shipCity,
            state: shipState,
            country: shipCountry,
            zipCode: shipZipCode
        };

        let updatedSalesPersonAssignment = Array.isArray(contactPerson) ? [...contactPerson] : [];

        if (updatedSalesPersonAssignment.length > 0) {
            for (const i of updatedSalesPersonAssignment) {
                if (!i.salePerson) {
                    return res.status(400).json(new ApiError(400, "Missing required fields (assignedUser)"));
                } else {
                    const assignUser = await TeamMember.findOne({ fullName: i.salePerson });

                    if (!assignUser) {
                        return res.status(400).json(new ApiError(400, "Assigned user not found"));
                    }

                    i.salePerson = {
                        id: assignUser._id,
                        name: assignUser.fullName
                    };
                }
            }
        }

        const newClient = await NewSupplier.findByIdAndUpdate(id,{
            
            details,
            contactPersons: updatedSalesPersonAssignment,
            locations: {
                billToAddress,
                shipToAddress
            },
            updatedBy,
        });

        const checkClient = await NewSupplier.findById(newClient._id).select(" -__v");

        return res.status(201).json(new ApiResponse(201, checkClient, "New supplier created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to create new supplier", error.message));
    }
});


