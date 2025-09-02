import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { TeamMember } from "../Models/TeamMember.model.js";
import { NewClient } from "../Models/Client.model.js";


export const SalesPerson = asyncHandler(async (req, res) => {

    try {

        const salesPerson = await TeamMember.find({ userType: "Sales Person" }).select("fullName -_id");

        if (salesPerson === 0) {
            return res.status(404).json(new ApiError(404, "No sales person found"));
        }

        return res.status(200).json(new ApiResponse(200, salesPerson, "Sales person fetched successfully"));

    }
    catch (error) {

        return res.status(500).json(new ApiError(500, "Failed to fetch sales person", error.message));

    }

});

export const Client = asyncHandler(async (req, res) => {

    const {
        contactPerson = [],
        defaultTerm,
        active,
        overdue,
        clientName,
        registraion,
        currency,
        clientEmail,
        phone,
        vatNumber,
        vatRate,
        eoriNo,
        saleCategory,
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
        createdBy
    } = req.body;

    try {
        if (!clientName || !currency || !defaultTerm) {
            return res.status(400).json(new ApiError(400, "Missing required fields (Client Name, Currency, or Default Term)"));
        }

        if (!createdBy) {
            throw new ApiError(400, 'Created By is required!');
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
            clientName,
            registration: registraion,
            currency,
            email: clientEmail,
            phoneNo: phone,
            defaultTerm,
            vatNumber,
            vatRate,
            eoriNo,
            active,
            overdue,
            deafultCategory: saleCategory
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

        const newClient = await NewClient.create({
            Status,
            details,
            contactPersons: updatedSalesPersonAssignment,
            locations: {
                billToAddress,
                shipToAddress
            },
            createdBy,
        });

        const checkClient = await NewClient.findById(newClient._id).select(" -__v");

        return res.status(201).json(new ApiResponse(201, checkClient, "New client created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to create new client", error.message));
    }
});


export const ClientList = asyncHandler(async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;

        const data = await NewClient.find()
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber).sort({ createdAt: -1 }).select(' -__v -updatedAt');

        res.status(200).json(new ApiResponse({
            message: "Data Fetch Successfully!",
            data: data
        }));

    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to fetch client list", error.message));
    }

});



export const detailView = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {

            throw new ApiError(400, 'Client ID is required!');
        }
        const client = await NewClient.findById(id).select(' -__v ');

        if (!client) {
            throw new ApiError(404, 'Client not found!');
        }

        return res.status(200).json(new ApiResponse(
            {
                data: client,
                message: 'Client fetched successfully!'
            }
        ));

    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export const editView = asyncHandler(async (req, res) => {
        const { id } = req.params;


    const {
        contactPerson = [],
        defaultTerm,
        active,
        overdue,
        clientName,
        registraion,
        currency,
        clientEmail,
        phone,
        vatNumber,
        vatRate,
        eoriNo,
        saleCategory,
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
        if (!clientName || !currency || !defaultTerm) {
            return res.status(400).json(new ApiError(400, "Missing required fields (Client Name, Currency, or Default Term)"));
        }

        if (!updatedBy) {
            throw new ApiError(400, 'Updated By is required!');
        }

    
        const details = {
            clientName,
            registration: registraion,
            currency,
            email: clientEmail,
            phoneNo: phone,
            defaultTerm,
            vatNumber,
            vatRate,
            eoriNo,
            active,
            overdue,
            deafultCategory: saleCategory
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

        const newClient = await NewClient.findByIdAndUpdate(id,{
            
            details,
            contactPersons: updatedSalesPersonAssignment,
            locations: {
                billToAddress,
                shipToAddress
            },
            updatedBy,
        });

        const checkClient = await NewClient.findById(newClient._id).select(" -__v");

        return res.status(201).json(new ApiResponse(201, checkClient, "New client created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Failed to create new client", error.message));
    }
});

