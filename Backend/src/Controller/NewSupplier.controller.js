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

            details,
            contactPersons: updatedSalesPersonAssignment,
            locations: {
                billToAddress,
                shipToAddress
            }

        });
        console.log(newSupplier);

        const checkSupplier = await NewSupplier.findById(newSupplier._id).select(" -__v");

        return res.status(201).json(new ApiResponse(201, checkSupplier, "New client created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to create new client", error.message));
    }
});
