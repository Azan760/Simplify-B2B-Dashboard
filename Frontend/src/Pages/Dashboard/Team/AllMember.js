import React from 'react';
import { teamTableHeader } from './Data';
import listView from "../../../Components/listView.js"

const AllMember = ({searchTerm,allData}) => {
 
  const filteredData = allData?.filter((member) => {
    return (
          member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
});


  return (
    <>

          <tbody className='rounded border border-searchIcon box-border shadow-sideShadow'>
            {
              filteredData?.map((field) => (
                <tr key={field._id} className='border border-b-1 border-b-searchIcon '>
                  <td className='p-2.5 font-medium text-xs text-textColor'>
                    {field.fullName}
                    </td>
                  <td className='p-2.5 font-medium text-textColor2 text-xs'>{field.email}</td>
                  <td className='p-2.5 font-medium text-textColor2 text-xs'>{field.userType}</td>
                </tr>
              ))
            }
            
          </tbody>
    </>
  );
};

export default listView(AllMember,"http://localhost:8000/team/list","Teams",teamTableHeader);