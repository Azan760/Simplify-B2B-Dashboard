import { useState, useRef } from "react";

export const userDetail = [

    {
        inputName: "firstName",
        label: "*",
        span: "First Name",
        required: "First Name is required.",
        placeholder: "First Name",
        message: "First Name is required to be at least 2 character.",
        size: 2,
        require: true,
        types: "text",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" className="bi bi-person absolute left-2 top-2.5 text-searchIcon" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>,
        paddingLeft: "pl-8",
    }, {
        inputName: "lastName",
        label: "*",
        span: "Last Name",
        required: "Last Name is required.",
        placeholder: "Last Name",
        message: "Last Name is required to be at least 2 character.",
        size: 2,
        require: true,
        types: "text",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" className="bi bi-person absolute left-2 top-2.5 text-searchIcon" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>,
        paddingLeft: "pl-8",

    }, {

        span: "Email",
        placeholder: "Email",
        label: "*",
        types: 'email',
        inputName: "email",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-envelope absolute text-searchIcon top-2.5 left-2" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
        </svg>,
        paddingLeft: "pl-8",
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        size: 4,
        message2: "Email is not valid",
        required: "Email is required",
        require: true,
    },
    {

        inputName: "userType",
        label: "*",
        span: "User Type",
        required: "User Type is required.",
        placeholder: "Type",
        require: true,
        types: "text",
        icon: <svg xmlns="http://www.w3.org/2000/svg"
            width="11" height="11"
            fill="currentColor" className=" right-2.5 transform -translate-y-1/2  top-1/2 bi bi-caret-down-fill
            text-browns absolute   " viewBox="0 0 16 16">  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>,
        isSelect: true,

        selectOption: ["Admin",
            "Accountant",
            "Inventory Clerk",
            "Inventory Manager",
            "Sales Manager",
            "Sales Person"],
              styles: "h-40"



    }
];

export const dynamic_User_Field = [

    {

        inputName: "contractType",
        label: "*",
        span: "Contract Type",
        required: "Contract Type is required.",
        placeholder: "Contract Type",
        require: true,
        types: "text",
        icon: <svg xmlns="http://www.w3.org/2000/svg"
            width="11" height="11"
            fill="currentColor" className=" right-2.5 transform -translate-y-1/2  top-1/2 bi bi-caret-down-fill
            text-browns absolute   " viewBox="0 0 16 16">  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>,
        isSelect: true,

        selectOption: [
            "CommisionBased",
            "Fixed",
          ]


},    {

    inputName: "commisionRate",
    label: "*",
    span: "Commision Rate",
    required: "Commision Rate is required.",
    placeholder: "0%",
    require: true,
    types: "number",
    
 },
 {
    inputName: "corporateTax",
    span: "Corporate Tax (%)",
    placeholder: "0",
    types: "number",
    
 },
];



export const useFile = (setValue) => {

    const [imagePreview, setImagePreview] = useState(null);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue("userImage", file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = useRef(null);

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const resetFileInput = () => {
        setImagePreview(null); // Clear the image preview
        setValue("userImage", null); // Reset file value in React Hook Form
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input field
        }
    };



    return [onFileChange, fileInputRef, resetFileInput, triggerFileInput, imagePreview];



};

export const teamTableHeader = [
    "Full Name",
    "Email",
    "User Type",
    "Commissiones",
    "Created On",
    "Created By",
    "Active",
    "Action"

];

