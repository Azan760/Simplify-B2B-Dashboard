import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { useFetch } from '../Services/ApiService.js';
import { downArrow, plus, search } from "./Icons.js";

const listView = (WrappedComponent, url, title, tableHeader) => {
    
  return function ListViewComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { getFetch } = useFetch(url);

    const { register, handleSubmit } = useForm();

    // Fetch data from API
    const { data: allData, isLoading, error } = useQuery(
      ['fetchAllData', searchTerm],
      async () => {
        const response = await getFetch(searchTerm);
        return response.statusCode["data"];
      },
      {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      }
    );

    const onSubmit = (data) => {
      setSearchTerm(data.search);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    };

    return (
      <>
        <Helmet>
          <title> Team Setting </title>
        </Helmet>

        <div className='flex justify-between mb-5 items-center'>
          <h6 style={{ letterSpacing: '1px' }} className="font-semibold text-heading text-xl">
            {title}
          </h6>

          <div className='flex gap-2.5'>
            <div className='flex items-center'>
              {search}
              <input
                {...register("search")}
                onKeyDown={handleKeyDown}
                style={{ boxShadow: "0 0 6px #172b4d0a" }}
                className="focus:border-textColor placeholder:text-sm placeholder:text-textColor2
                            placeholder:font-normal p-1.5 pl-7 outline-0 border box-border overflow-hidden
                            rounded-md text-sm border-searchIcon"
                type="text"
                placeholder="Press Enter to Search"
              />
            </div>

            <div className='flex bg-white w-56 border rounded'>
              <p style={{ boxShadow: "0 0 6px #172b4d0a" }} className='flex px-2.5 items-center w-full justify-between text-textColor2'>
                {downArrow}
              </p>
            </div>

            <button
              onClick={() => navigate('/team/new')}
              type="button"
              className="flex items-center gap-2 bg-textColor text-white p-2.5 rounded"
            >
              {plus}
              <span type='submit' value="Submit" className='text-sm font-semibold'>Create</span>
            </button>
          </div>
        </div>

        <div>
          <table style={{ boxShadow: '0 0 6px #172b4d2e' }} className='border rounded table border-collapse w-full'>
            <thead className='bg-darkBlue'>
              <tr>
                {tableHeader.map((head, index) => (
                  <th key={index} className="p-2.5 text-left text-white text-xs font-semibold">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <WrappedComponent searchTerm={searchTerm} allData={allData}  />
          </table>
        </div>
      </>
    );
  };
};

export default listView;
