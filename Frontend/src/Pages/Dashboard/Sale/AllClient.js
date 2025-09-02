
import React from 'react';
import { clientsHeader } from './Data';
import { useEffect } from 'react';
import { three_Dots_icon } from '../../../Components/Icons.js';
import listView from "../../../Components/listView.js"
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';




export const AllClient = ({ searchTerm, allData, lengthData }) => {

  const filteredData = allData?.filter((member) => {
    return (
      member?.details?.clientName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      member?.details?.email?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  });

  useEffect(() => {
    console.log(allData, "allData");
    if (allData) {
      lengthData(allData?.length);
    }
  }, [allData, lengthData]);

  const formatDate = (isDate) => {
    const date = new Date(isDate);
    return date.toLocaleDateString("en-GB").replace(/\//g, "/");
  };




  return (
    <>
      <Helmet>
        <title> Clients </title>

      </Helmet>
      <tbody className="rounded border border-searchIcon box-border shadow-sideShadow">
        {filteredData?.map((field) => (
          <tr key={field._id} className="hover:bg-searchIcon border-b-2 border-b-searchIcon">

            {/* Client Name */}
            <td className="px-2.5 py-3 text-xs font-semibold text-textColor whitespace-nowrap">
              <Link to={`/client/view/${field._id}`} className="hover:underline">
                {field?.details?.clientName}
              </Link>
            </td>

            {/* CLI Number */}
            <td className="px-2.5 py-3 text-xs font-semibold text-textColor whitespace-nowrap">
              <Link to={`/client/view/${field._id}`} className="hover:underline">
                {field?.CLINumber}
              </Link>
            </td>

            {/* Email */}
            <td className="px-2.5 py-3 text-xs font-medium text-textColor2 whitespace-nowrap">
              {field?.details?.email}
            </td>

            {/* Contact Person */}
            <td className="px-2.5 py-3 text-xs font-medium text-textColor2 whitespace-nowrap">
              {field?.contactPersons[0]?.fullName}
            </td>

            {/* Created Date */}
            <td className="px-2.5 py-3 text-xs font-medium text-textColor2 whitespace-nowrap">
              {formatDate(field?.createdAt)}
            </td>

            {/* Created By (Avatar + Tooltip) */}
            <td className="px-2.5 py-3 text-center align-middle whitespace-nowrap">
              <Link
                to={`/team/view/${field?.createdBy?._id}`}
                className="relative group inline-block"
              >
                <div className="w-[30px] h-[30px] rounded-full bg-heading text-white flex items-center justify-center text-xs mx-auto">
                  <span>
                    {field?.createdBy?.name
                      ?.split(" ")
                      ?.map(word => word[0])
                      ?.join("")}
                  </span>
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                  {field?.createdBy?.name}
                </div>
              </Link>
            </td>

            {/* Salesperson */}
            <td className="px-2.5 py-3 text-xs text-textColor2 whitespace-nowrap">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to={`/team/view/${field?.contactPersons[0]?.salePerson?._id}`}
                className="hover:underline hover:text-textColor"
              >
                {field?.contactPersons[0]?.salePerson?.name}
              </Link>
            </td>

            {/* Currency */}
            <td className="px-2.5 py-3 text-xs font-medium text-textColor2 whitespace-nowrap">
              {field?.details?.currency.split(" ")[3]?.toUpperCase()}
            </td>

            {/* Active Checkbox */}
            <td className="px-2.5 py-3 text-center whitespace-nowrap">
              <input
                type="checkbox"
                className="toggle-btn"
                checked={field?.details?.active ?? false}
                readOnly
              />
            </td>

            {/* Status Badge */}
            <td className="px-1 py-3 text-center whitespace-nowrap">
              <span className="text-[12.5px] bg-bgColor text-white rounded px-1.5 py-1 block w-fit mx-auto">
                {field?.Status}
              </span>
            </td>

            {/* Actions Menu */}
            <td className="px-2.5 py-3 text-center relative group whitespace-nowrap">
              <span>{three_Dots_icon}</span>
              <div className="absolute top-full mt-2 right-0 w-28 p-1.5 bg-white rounded shadow-sideShadow hidden group-hover:block z-10">
                <Link
                  to={`/team/view/${field._id}`}
                  className="p-2 flex items-center gap-2 text-sm text-textColor hover:bg-gray-100 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="text-textColor bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                  <span>Edit</span>
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

    </>
  );
};


export default listView(AllClient, "http://localhost:8000/client/list", "Client Management", clientsHeader, "/client/new");
