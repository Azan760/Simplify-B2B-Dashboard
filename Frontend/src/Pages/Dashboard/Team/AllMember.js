import React from 'react';
import { teamTableHeader } from './Data';
import { useEffect } from 'react';
import { three_Dots_icon } from '../../../Components/Icons.js';
import listView from "../../../Components/listView.js"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const AllMember = ({ searchTerm, allData, lengthData }) => {
  const user = useSelector((state) => state.auth.user);

  const filteredData = allData?.filter((member) => {
    return (
      member?.fullName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      member?.email?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  });

  useEffect(() => {
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
      <tbody className='rounded border  border-searchIcon box-border shadow-sideShadow'>
        {filteredData?.map((field) => (
          <tr key={field._id} className=' hover:bg-searchIcon border border-b-2 border-b-searchIcon '>
            <td>
              <Link to={`/team/view/${field._id}`} className='p-3 text-xs font-semibold text-textColor hover:underline'>
                {field.fullName}
              </Link>
            </td>
            <td className='p-3 font-medium text-textColor2 text-xs'>{field.email}</td>
            <td className='p-3 font-medium text-textColor2 text-xs'>{field.userType}</td>
            <td className='p-3 font-medium text-textColor2 text-xs'>
              {
                field?.contractType === "CommisionBased" ? `Yes ${field?.commisionRate}%` : "No"
              }

            </td>
            <td className='p-3 font-medium text-textColor2 text-xs'>{formatDate(field.createdAt)}</td>
            <td >
              <Link target='_blank' rel="noopener noreferrer"
                to={`/team/view/${user?._id}`} className='p-3 text-xs  text-textColor2 hover:underline hover:text-textColor' >
                {field?.createdBy?.name}
              </Link>

            </td>
            <td className='p-3 font-medium text-textColor2 text-xs'>
              <input type="checkbox"
                checked={field?.details?.active ?? false}
                readOnly={true}
                className="toggle-btn" />
            </td>
            <td className="p-3 font-medium text-textColor2 text-xs relative group">
              <span>
                {three_Dots_icon}
              </span>

              <div className="absolute  top-5 right-11 w-28  p-1.5 bg-white rounded shadow-sideShadow hidden group-hover:block z-10">
                <Link
                  to={`/team/view/${field._id}`}
                  className=" p-2 flex items-center gap-5 text-sm "
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" text-textColor bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                  <span className='text-black'> Edit </span>
                </Link>
              </div>
            </td>


          </tr>
        ))}
      </tbody>
    </>
  );
};


export default listView(AllMember, "http://localhost:8000/team/list", "Teams", teamTableHeader);
