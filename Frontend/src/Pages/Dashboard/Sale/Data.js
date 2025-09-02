



export const clientIcon = [

    {
        label: "Active",
        inputClass: 'toggle-btn',
        inputName: "active",


    },
    {
        label: "Overdue Remainder",
        inputClass: 'toggle-btn',
        inputName: "overdue",

    }, {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
        </svg>,
        classname: "rounded py-2 px-3.5  bg-textColor2 text-white font-semibold",
        classname2: "hidden",

    }

]


export const clientDetail = [

    {
        label: "*",
        span: "Name",
        required: " Client Name is required.",
        message: "Client Name is required.",
        placeholder: "Client Name",
        types: 'text',
        inputName: "clientName",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" className="bi bi-person absolute left-2 top-2.5 text-searchIcon" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>,
        require: true,
        paddingLeft: "pl-8"

    }, {
        span: "Reg#",
        placeholder: "Client Registration #",
        types: 'text',
        inputName: "registraion",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
            className="bi bi-link absolute left-2  top-2.5 text-searchIcon" viewBox="0 0 16 16" >
            <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
            <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
        </svg>,
        paddingLeft: "pl-8"


    }, {
        label: "*",
        span: "Currency",
        required: true,
        placeholder: "",
        types: 'text',
        inputName: "currency",
        icon: <svg style={{ left: '93%', top: '13.5px' }} xmlns="http://www.w3.org/2000/svg"
            width="11" height="11"
            fill="currentColor" className="bi bi-caret-down-fill text-browns absolute  " viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>,
        require: true,
        isSelect : true,
        selectOption : [
            "Pakistani Rupee | PKRs"
        ]

    }, {

        span: "Email",
        placeholder: "Email",
        types: 'email',
        inputName: "clientEmail",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-envelope absolute text-searchIcon top-2.5 left-2" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
        </svg>,
        paddingLeft: "pl-8",
        pattren: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        , size: 4,
        message2: "Email can only contain letters and digits",
        message: "Email is required to be at least 4 character.",

    }, {
        span: "Phone No.",
        placeholder: "Phone Number",
        message: "Phone No is required to be at least 6 character.",
        size: 6,
        types: 'tel',
        inputName: "phone",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" className="bi bi-telephone text-searchIcon absolute top-2.5 left-2" viewBox="0 0 16 16">
            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
        </svg>,
        paddingLeft: "pl-8"


    }, {

        span: "Default Term",
        label: "*",
        placeholder: "Deafult Term",
        types: 'number',
        inputName: "defaultTerm",
        require: true,
        required: "Default term is required.",
        number: true,
    }, {

        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-receipt absolute left-2 top-2.5 text-searchIcon" viewBox="0 0 16 16">
            <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z" />
            <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5" />
        </svg>,
        span: "VAT Number",
        placeholder: "5J6RE4H48BL023237",
        types: 'text',
        inputName: "vatNumber",
        require: false,
        size: 2,
        paddingLeft: "pl-8",
        message: "VAT Number is required to be at least 2 character.",


    },

    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-receipt absolute left-2 top-2.5 text-searchIcon" viewBox="0 0 16 16">
            <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z" />
            <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5" />
        </svg>,
        span: "VAT Rate %",
        placeholder: "0 %",
        types: 'number',
        inputName: "vatRate",
        max: 100,
        message: " VAT Rate can't be greater than 100",
        paddingLeft: "pl-8",
        number: true,


    },

    {
        span: "EORI No#.",
        placeholder: "GB 123 123 123 12345",
        type: "text",
        message: "EORI No# is required to be at least 2 character.",
        size: 2,
        paddingLeft: "pl-8",
        inputName: "eoriNo",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" className="bi bi-map absolute top-2.5 left-2 text-searchIcon" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z" />
        </svg>,


    }, {

        span: "Default Sale Category",
        inputName: "saleCategory",
        type: "text",
        icon: <svg style={{ left: '93%', top: '13.5px' }} xmlns="http://www.w3.org/2000/svg"
            width="11" height="11"
            fill="currentColor" className="bi bi-caret-down-fill text-browns absolute  " viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>,
        selectOption: ["General Sales", "Goodwill", "Insurance Claims", "Stock", "Rent Income", "Sales of Assets",
          "Royalties Recived", "Plant and Machinery", "Office Equipment", "Motor Vehicles",
          "Bank Charges", "Capital Expenditure", "Commissions Received", "Credit Charges (Late Payments)",
          "Discounts Allowed", "Distribution and Carriage", "Flat Rate VAT Sales Adjustment",
          "Furniture and Fixtures", "General Export Sales", "Goodwill Amortisation", "Intangible Asset Amortisation",
          "Miscellaneous Income",
        ],
        isSelect: true,
        styles: "h-40"

    }


];


export const location1 = [{

    title: "Bill to Address",


    address: [

        {
            span: "Address Line 1",
            placeholder: "Line 1 ",
            inputName: "billAddress1",
            types: "text",

        }, {

            span: "Address Line 2",
            placeholder: "Line 2",
            inputName: "billAddress2",
            types: "text",


        },
    ],

}, {

    title: "Ship to Address",
    address: [


        {
            span: "Address Line 1",
            placeholder: "Line 1 ",
            inputName: "shipAddress1",
            type: "text",

        }, {

            span: "Address Line 2",
            placeholder: "Line 2",
            inputName: "shipAddress2",
            type: "text",


        },
    ],

}
];

export const location2 = [

    {
        address: [
            {

                span: "City",
                placeholder: "City",
                inputName: "billCity",
                type: "text",
            }, {
                span: "State / Province",
                placeholder: "State",
                inputName: "billState",
                type: "text",
            }, {

                span: "Country",
                placeholder: "Country",
                icon: <svg style={{ left: '93%', top: '13.5px' }} xmlns="http://www.w3.org/2000/svg"
                    width="11" height="11"
                    fill="currentColor" className="bi bi-caret-down-fill text-browns absolute  " viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>,
                inputName: "billCountry",
                type: "text",
             isSelect: true,
                selectOption: [
                    "Pakistan",
                    "United States",
                    "United Kingdom",
                    "Canada",
                    "Australia",
                    "India",
                    "Germany",
                    "France",
                    "Italy",
                    "Spain"
                    ],
                    styles: "h-40"
            }, {
                span: "Postal / Zip Code",
                placeholder: "Zip Code ",
                inputName: "billZipCode",
                type: "text",
            }

        ]
    }, {

        address: [

            {

                span: "City",
                placeholder: "City",
                inputName: "shipCity",
                type: "text",
            }, {
                span: "State / Province",
                placeholder: "State",
                inputName: "shipState",
                type: "text",
            },

            {

                span: "Country",
                placeholder: "Country",
                icon: <svg style={{ left: '93%', top: '13.5px' }} xmlns="http://www.w3.org/2000/svg"
                    width="11" height="11"
                    fill="currentColor" className="bi bi-caret-down-fill text-browns absolute  " viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>,
                inputName: "shipCountry",
                type: "text",
                isSelect: true,
                selectOption: [
                    "Pakistan",
                    "United States",
                    "United Kingdom",
                    "Canada",
                    "Australia",
                    "India",
                    "Germany",
                    "France",
                    "Italy",
                    "Spain"
                ],
                styles: "h-40"
            }, {
                span: "Postal / Zip Code",
                placeholder: "Zip Code ",
                inputName: "shipZipCode",
                type: "text",
            }
        ]
    }
]

export const contactPerson = [

    {
        title: "Contact Person(s)",
        bodyTitle: "Add Person",
        description: "Assign Sales Person with this Product.",
        buttonLabel: "Let's Add Person",


        heading: [

            "Full Name",
            "Email",
            "Phone",
            "Assignes",
            "Active",
            "Default Contact",
            "Action",
        ],

        inputs: [

            {
                inputName: "fullName",
                types: "text",
                placeholder: "Full Name",

            }, {
                inputName: "email",
                types: "text",
                placeholder: "Email",

            }, {
                inputName: "phoneNo",
                type: "text",
                placeholder: "Phone No",
            }, {
                inputName: "salePerson",
                placeholder: "Sale Person",
                types: "text",
                isSelect: true,
                selectOption: [],
                label_text: "hidden",
            },
            {
                inputClass: 'toggle-btn',
                inputName: "active",
                types : "checkbox"
            }
            ,{
                inputClass: 'toggle-btn',
                inputName: "defaultContact",
                types : "checkbox"
            }
        ]
    }
];






export const saleInvoiceHeader = [
    "SI Number",
    "Issue Date",
    "Detail",
    "Created By",
    "Assignee",
    "Total Amount",
    "Status",
    "Action",

];

export const clientsHeader = [
    "Client Name",
                "Reference #",

    "Email",
    "Contact Person",
    "Created On",
    "Created By",
    "Assign",
    "Currency",
    "Active",
    "Status",
    "Action",

];

