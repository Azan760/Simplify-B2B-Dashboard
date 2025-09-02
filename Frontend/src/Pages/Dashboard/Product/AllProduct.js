import React from 'react';
import { productTableHeader } from './Data';
import listView from "../../../Components/listView.js"
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { three_Dots_icon } from '../../../Components/Icons.js';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



const AllProduct = ({ searchTerm, allData, lengthData }) => {

  const user = useSelector((state) => state.auth.user);

  const filteredData = allData?.filter((product) => {
    return (
      product?.details?.productServiceName?.toLowerCase().includes(searchTerm?.toLowerCase())
      || product?.details?.sku?.toLowerCase().includes(searchTerm?.toLowerCase())
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

    <Helmet title="All Products" />
    
          <tbody className='rounded border border-searchIcon box-border shadow-sideShadow'>
        {
          filteredData?.map((field) => (
            <tr key={field._id} className='  hover:bg-searchIcon border border-b-1 border-b-searchIcon '>
              <td >
                <Link to={`/product/view/${field._id}`} style={{ fontSize: '12.5px' }} className='p-3  font-semibold text-textColor hover:underline'>
                  {field.details["productServiceName"]}
                </Link>
              </td>
              <td className=''>
                <Link to={`/product/view/${field._id}`} style={{ fontSize: '12.5px' }} className='p-3  font-semibold text-textColor hover:underline'>
                  {field.details["sku"]}
                </Link></td>
              <td className=''>
                <Link to={`/team/view/${user?._id}`} style={{ fontSize: '12.5px' }} className='p-3   text-textColor2 hover:text-textColor hover:underline'>
                  {user?.fullName}
                </Link></td>
              <td className='p-3 font-medium text-textColor2 text-xs'>{formatDate(field?.createdAt)}</td>
              <td className=''>
                <Link to={`/team/view/${field?.salesPersonAssignment[0]?.id}`} style={{ fontSize: '12.5px' }} className='p-3   text-textColor2 hover:text-textColor hover:underline'>
                  {field?.salesPersonAssignment[0]?.name}
                </Link>
              </td>
              <td className='p-2 font-medium text-white  '>
                <span style={{ fontSize: '12.5px' }} 
                className=' p-1  rounded md:p-1 md:px-0  block text-center  bg-heading' >
                  {field?.details?.type}
                </span>
              </td>
              <td  style={{ fontSize: '12.5px' }} className='p-3 font-medium text-textColor2 '>
                <input type="checkbox"
                  checked={field?.details?.active ?? false}
                  readOnly={true}
                  className="toggle-btn" />
              </td>
              <td style={{ fontSize: '12.5px' }} className='p-3 font-medium text-textColor2 '>{field.details["brand"]}</td>
              <td style={{ fontSize: '12.5px' }} className='p-3 font-medium text-textColor2 '>{field.details["category"]}</td>
              <td style={{ fontSize: '12.5px' }} className='p-3 font-medium text-textColor2 '>{field.details["subCategory"]}</td>
              <td style={{ fontSize: '12.5px' }} className='p-3 font-medium text-textColor2 '>{field.details["purchaseCost"]}</td>
              <td style={{ fontSize: '12.5px' }} className='p-3 font-medium text-textColor2 '>{field.details["salePrice"]}</td>
              <td style={{ fontSize: '12.5px' }} className="p-3 font-medium text-textColor2  relative group">
                <span>
                  {three_Dots_icon}
                </span>

                <div className="absolute  top-5 right-11 w-28  p-1.5 bg-white rounded shadow-sideShadow hidden group-hover:block z-10">
                  <Link
                    to={`/product/view/${field._id}`} style={{ fontSize: '12.5px' }}
                    className=" p-2 flex items-center gap-5  "
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
          ))
        }

      </tbody>
    </>
  );
};

export default listView(AllProduct, "http://localhost:8000/product/list", "Products/Services", productTableHeader, '/product/new');