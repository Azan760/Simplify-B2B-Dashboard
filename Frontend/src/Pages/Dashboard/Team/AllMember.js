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
            <td className='p-3 font-medium text-textColor2 text-xs'></td>
            <td className='p-3 font-medium text-textColor2 text-xs'>{formatDate(field.createdAt)}</td>
            <td >
              <Link target='_blank' rel="noopener noreferrer"
                to={`/team/view/${user?._id}`} className='p-3 text-xs  text-textColor2 hover:underline hover:text-textColor' >
                {user?.fullName}
              </Link>

            </td>
            <td className='p-3 font-medium text-textColor2 text-xs'>{user?.active ? "Yes" : "No"}</td>
            <td className='p-3 font-medium text-textColor2 text-xs'>{three_Dots_icon}</td>

          </tr>
        ))}
      </tbody>
    </>
  );
};


export default listView(AllMember, "http://localhost:8000/team/list", "Teams", teamTableHeader);
