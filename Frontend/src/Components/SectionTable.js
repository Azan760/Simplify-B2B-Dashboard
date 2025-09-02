import React from 'react'
import SelectOptions from './SelectOptions'
import { expandIcon, plus, caretDown } from './Icons'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { FormattedDate } from './Date'



const SectionTable = ({ register, setValue, tables, tableData }) => {
    const navigate = useNavigate();

    return (
        <>

            <div style={{ borderRadius: '10px', boxShadow: '0 0 10px #172b4d1a' }}
                className="row-2 flex flex-col p-5 bg-dashboard">

                <div className="recent-sales flex justify-between xsm:flex-col xsm:gap-2.5 items-center mb-5 relative ">
                    <p className='text-black font-semibold text-lg'> {tables[0].title}  </p>
                    <div className="sales-right-bar flex items-center gap-2.5">
                        <div className='  flex  relative  items-center w-full'>
                            <SelectOptions
                                setValue={setValue} register={register}
                                field={{
                                    type: tables[0].type,
                                    placeholder: tables[0].placeholder,
                                    inputName: tables[0].inputName,
                                    selectOption: tables[0].SelectOption
                                }}
                                icon={caretDown}
                            />

                        </div>
                        <span onClick={() => navigate("/")}
                            className="add-new border border-searchIcon rounded py-2 px-2 ">
                            {plus}
                        </span>
                        <span className="view-all border border-searchIcon rounded py-2 px-2 ">
                            {expandIcon}
                        </span>
                    </div>
                </div>


                <table
                    style={{ borderRadius: '10px', boxShadow: '0 0 10px #172b4d1a' }}
                    className="table border-collapse w-full"
                >
                    <thead className="bg-placeHolder">
                        <tr>
                            {tables[0]?.heading.map((head, index) => (
                                <th
                                    key={index}
                                    className={`p-2.5 ${index === 4 ? "text-center" : "text-left"
                                        } text-white text-xs font-semibold`}
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="rounded border border-searchIcon box-border shadow-sideShadow">
                        {tableData && tableData.length > 0 ? (
                            tableData.map((row, index) => (
                                <tr key={index} className="border-b-2 border-b-searchIcon">
                                    <td className="p-2.5 text-textColor2" style={{ fontSize: "12.5px" }}>
                                        <Link className="text-downIcon decoration-0 font-medium">
                                            <span>{row?.SINumber}</span>
                                        </Link>
                                    </td>
                                    <td className="p-2.5 text-textColor2" style={{ fontSize: "12.5px" }}>
                                        {FormattedDate(row?.invoiceDetails?.date)}
                                    </td>
                                    <td className="p-2.5 text-textColor2" style={{ fontSize: "12.5px" }}>
                                        <Link className="text-downIcon decoration-0 font-medium">
                                            {row?.clientDetails?.clientName}
                                        </Link>
                                    </td>
                                    <td className="p-2.5 text-textColor2" style={{ fontSize: "12.5px" }}>
                                        {row?.totalAmount?.toLocaleString()}
                                    </td>
                                    <td className="p-2.5 text-textColor2">
                                        <span
                                            className={`text-xs text-white rounded md:py-1 md:px-0 block text-center py-1 px-1.5 bg-textColor2`}
                                        >
                                            Approved
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={tables[0]?.heading?.length}
                                    className="text-center text-textColor2 py-4 text-sm"
                                >
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>



            </div >






        </>
    )
}

export default SectionTable
