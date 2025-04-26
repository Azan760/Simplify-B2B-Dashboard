

import { number } from "zod";
import { caretDown } from "../../../Components/Icons";


// {
//     "src": "logo192.png",
//     "type": "image/png",
//     "sizes": "192x192"
//   },
//   {
//     "src": "logo512.png",
//     "type": "image/png",
//     "sizes": "512x512"
//   }

export const ProductIcon = [
    {
        label: "Active",
        inputClass: 'toggle-btn',
        inputName : "active",
    },
    {
        label: "Buy",
        inputClass: "w-4 h-4",
        inputName : "buy",

    }, {
        label: "Sell",
        inputClass: "w-4 h-4",
        inputName : "sell",

    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
         className="bi bi-calendar" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
        </svg>,
        classname: "rounded py-2 px-3.5  bg-textColor2 text-white font-semibold",
        classname2: "hidden",

    }
];

export const ProductDetail = [

    {
        label: "*",
        span: "Sku",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-link absolute left-2  top-2.5 text-searchIcon" viewBox="0 0 16 16" >
            <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
            <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        </svg>,
        required: " Sku is required.",
        placeholder: "Sku",
        types: 'text',
        inputName: "sku",
        message: "Sku is required to be at least 4 character.",
        size: 4,
        upperCase: "uppercase",
        require : true,
        paddingLeft : 'pl-8',

    },
    {
        label: "*",
        span: "Product/Service Name",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-bookmark text-searchIcon absolute left-2 top-2.5 " viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
        </svg>,
        required: "Product/Service Name is required",
        placeholder: "Product/Service Name",
        types: 'text',
        inputName: "productServiceName",
        message: "Product/Service Name is required to be at least 4 character.",
        size: 4,
        require : true,
        paddingLeft : 'pl-8',


    }, {
        span: "Type",
        icon: <svg style={{ left: '93%', top: '13.5px' }} xmlns="http://www.w3.org/2000/svg"
         width="11" height="11"
            fill="currentColor" className="bi bi-caret-down-fill text-browns absolute
              " viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>,
        placeholder: 'Inventory',
        types: 'text',
        inputName: "type",
        require : false,
       selectOption  : [
            "Inventory",
             "Service"
        ],
        isSelect : true,


    }, {
        span: "Brand",
        placeholder: 'Brand',
        types: 'text',
        inputName: "brand",
        require : false,
        
    },
    {
        span: "Category",
        placeholder: 'Category',
        types: 'text',
        inputName: "category",
        require : false,
    }, {
        span: "Sub Category",
        placeholder: 'Sub Category',
        types: 'text',
        inputName: "subCategory",
        require : false,     


    }, {
        span: "Color",
        placeholder: 'Color',
        types: 'text',
        inputName: "color",
        require : false,


    }, {
        span: "Purchase Cost",
        icon: <svg style={{ top: '15px', left: '10px' }} xmlns="http://www.w3.org/2000/svg" width="12" height="12"
            fill="currentColor" className="bi bi-grid text-browns absolute" viewBox="0 0 16 16">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
        </svg>,
        icon2: <svg style={{ left: '93%', top: '13.5px' }} xmlns="http://www.w3.org/2000/svg" width="12" height="12"
            fill="currentColor" className="bi bi-caret-down-fill text-white absolute   " viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>,
        placeholder: 'Purchase Cost',
        types: 'number',
        // classname : 'flex',
        inputName: "purchaseCost",
        require : false,
        paddingLeft : 'pl-8',
        selection : true,




    }, {
        span: "Sales Price ",
        icon: <svg style={{ top: '15px', left: '10px' }} xmlns="http://www.w3.org/2000/svg" width="12" height="12"
            fill="currentColor" className="bi bi-grid text-browns absolute" viewBox="0 0 16 16">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
        </svg>,
        icon2: <svg style={{ left: '93%', top: '13.5px' }}xmlns="http://www.w3.org/2000/svg" width="12" height="12"
            fill="currentColor" className="bi bi-caret-down-fill text-white absolute   " viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>,
        placeholder: 'Sales Price',
        types: 'number',
        // classname : 'flex',
        inputName: "salePrice",
        require : false,
        paddingLeft : 'pl-8',
        selection : true,



    }, {
        span: "Profit (%)",
        icon: <svg style={{ left: '10px', top: '14px' }} xmlns="http://www.w3.org/2000/svg" width="12" height="12"
            fill="currentColor" className="bi bi-file-earmark-check  text-browns absolute   " viewBox="0 0 16 16">
            <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
        </svg>,
        placeholder: 'Profit (%)',
        types: 'number',
        inputName: "profit",
        require : false,
        paddingLeft : 'pl-8',




    }, {
        span: "VAT (%) ",
        icon: <svg style={{ left: '10px', top: '14px' }} xmlns="http://www.w3.org/2000/svg" width="12" height="12"
            fill="currentColor" className="bi bi-file-earmark-check  text-browns absolute   " viewBox="0 0 16 16">
            <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
        </svg>,
        placeholder: 'Deafult VAT Rule',
        types: 'number',
        inputName: "vatRate",
        require : false,
        paddingLeft : 'pl-8',



    }

];




export const saleTable = [ 

    {

        title : "Sale Person Assignment",
        bodyTitle: "Add Person",
        description: "Assign Sales Person with this Product.",
        buttonLabel : "Let's Add Person",

        heading: [

            "Name",
            "Purchase Cost (GBP)",
            "Sales Price (GBP)",
            "Profit %",
            "Action",
        ],

        inputs : [

            {
                name : "user",
                placeholder : "Select User to Asssign",
                icon : {caretDown},
                type : 'text',
                inputName : 'assignedUser',
                isSelect : true,
                required : 'Assigne Person is required.',
                selectOption : [],
                icon: <svg style={{ left: '93%', top: '13.5px' }} xmlns="http://www.w3.org/2000/svg" width="11" height="11"
                fill="currentColor" className="bi bi-caret-down-fill text-browns absolute   " viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>,

            },{
                name : "purchase",
                placeholder : "Purchase Price",
                type : "number",
                inputName : 'purchasePrice',
                number : true,
            },{
                name : "sale",
                placeholder : "Sale Price",
                type : 'number',
                inputName : 'salePrice',
                number : true,


            },{
                name : "profit",
                placeholder : "Profit",
                readonly : false,
                type:"number",
                inputName : 'profit',
                number : true,
                
            }

        ]

    },

]


export const productTableHeader = [

        
        "Name",
        "Sku",
        "Created By",
        "Created On",
        "Assigned To",
        "Type",
        // "Stock",
        // "Avg Price",
        "Active",
        "Brand",
        "Category",
        "Sub Category",
        "Purchase Cost",
        "Sale Price",
        "Action",

    ];



