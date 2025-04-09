import React from 'react';
import { productTableHeader } from './Data';
import listView from "../../../Components/listView.js"
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { three_Dots_icon } from '../../../Components/Icons.js';
import { Link } from 'react-router-dom';


const AllProduct = ({ searchTerm, allData, lengthData }) => {

  const user = useSelector((state) => state.auth.user);

  const filteredData = allData?.filter((product) => {
    return (
      product?.details?.productServiceName.toLowerCase().includes(searchTerm?.toLowerCase())
      || product?.details?.sku.toLowerCase().includes(searchTerm?.toLowerCase())
    )
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

      <tbody className='rounded border border-searchIcon box-border shadow-sideShadow'>
        {
          filteredData?.map((field) => (
            <tr key={field._id} className='border border-b-1 border-b-searchIcon '>
              <td >
                <Link to={`/product/view/${field._id}`} className='p-3 text-xs font-semibold text-textColor hover:underline'>
                  {field.details["productServiceName"]}
                </Link>
              </td>
              <td className=''>
                <Link to={`/product/view/${field._id}`} className='p-3 text-xs font-semibold text-textColor hover:underline'>
                  {field.details["sku"]}
                </Link></td>
              <td className=''>
                <Link to={`/team/view/${user?._id}`} className='p-3 text-xs  text-textColor2 hover:text-textColor hover:underline'>
                  {user?.fullName}
                </Link></td>
              <td className='p-2.5 font-medium text-textColor2 text-xs'>{formatDate(field?.createdAt)}</td>
              <td className=''>
                <Link to={`/team/view/${field?.salesPersonAssignment[0]?.id}`} className='p-3 text-xs  text-textColor2 hover:text-textColor hover:underline'>
                  {field?.salesPersonAssignment[0]?.name}
                </Link>
              </td>
              <td className='p-2.5 font-medium text-textColor2 text-xs'>{field.details["type"]}</td>
              <td className='p-2.5 font-medium text-textColor2 text-xs'>{field.details.active ? "Yes" : "No"}</td>
              <td className='p-2.5 font-medium text-textColor2 text-xs'>{field.details["brand"]}</td>
              <td className='p-2.5 font-medium text-textColor2 text-xs'>{field.details["category"]}</td>
              <td className='p-2.5 font-medium text-textColor2 text-xs'>{field.details["subCategory"]}</td>
              <td className='p-2.5 font-medium text-textColor2 text-xs'>{field.details["purchaseCost"]}</td>
              <td className='p-2.5 font-medium text-textColor2 text-xs'>{field.details["salePrice"]}</td>
              <td className='p-2.5 font-medium text-textColor2 text-xs'>{three_Dots_icon}</td>


            </tr>
          ))
        }

      </tbody>
    </>
  );
};

export default listView(AllProduct, "http://localhost:8000/product/list", "Products/Services", productTableHeader, '/product/new');