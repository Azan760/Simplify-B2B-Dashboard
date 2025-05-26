import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { useFetch } from '../Services/ApiService.js';
import { caretDown, plus, search } from "./Icons.js";
import Button from './Button.js';


const listView = (WrappedComponent, url, title, tableHeader, path) => {

  return function ListViewComponent() {

    const [searchTerm, setSearchTerm] = useState('');
    const [lengthData, setLengthData] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [pageNo, setPageNo] = useState(1);
    const navigate = useNavigate();
    const { getFetch } = useFetch(url);

    const { register, handleSubmit } = useForm();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState("10 items per page");
    const pages = ["10", "20", "30", "40", "50"];

    const selectPages = () => {
      setIsOpen(!isOpen);
    };


    const handleSelect = (page) => {

      setPerPage(parseInt(page));

      setSelectedPage(`${page} items per page`);
      setIsOpen(false);
    };


    const { data: allData, isLoading, error } = useQuery(
      ['fetchAllData', searchTerm, pageNo, perPage],
      async () => {
        const response = await getFetch(searchTerm, pageNo, perPage);
        console.log(response.statusCode["data"]);
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
        

        <div className='min-w-max w-full'>

          <div className='flex justify-between mb-5 items-center '>
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
                  className="focus:border-textColor h-full  placeholder:text-sm placeholder:text-textColor2
                            placeholder:font-normal p-1.5 pl-7 outline-0 border box-border overflow-hidden
                            rounded-md text-sm border-searchIcon"
                  type="text"
                  placeholder="Press Enter to Search"
                />
              </div>

              {/* <div className='flex bg-white w-56 border rounded'>
              <p style={{ boxShadow: "0 0 6px #172b4d0a" }} className='flex px-2.5 items-center w-full justify-between text-textColor2'>
                {downArrow}
              </p>
            </div> */}

              <button
                onClick={() => navigate(path)}
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

              <WrappedComponent searchTerm={searchTerm} allData={allData} lengthData={setLengthData} />
            </table>
          </div>

          <div className='mt-5 flex justify-between items-center'>

            <div >
              <Button label={` ${pageNo} (Current)`} type="button" onClick={onclick}
                className={` rounded-sm text-xs bg-textColor text-white `} />
            </div>

            <div className='flex gap-2.5 items-center'>
              <div>
                <p className='text-sm'> {` Total Record Found ${lengthData}  `}</p>
              </div>

              <div className="relative">
                <div className=' flex items-center' onClick={selectPages}>
                  {caretDown}
                  <input type="text" style={{ boxShadow: '0 0 6px #172b4d2e' }}
                    readOnly className='px-2.5 py-1 rounded-sm  text-sectionColor text-base'
                    value={selectedPage} />
                </div>

                {isOpen && (
                  <div className="absolute left-0 bottom-8 bg-white  w-full shadow-md rounded-sm mt-1 z-10">
                    {pages.map((page, index) => (
                      <p
                        key={index}
                        className="text-sm text-sectionColor p-2 hover:bg-textColor hover:text-white cursor-pointer"
                        onClick={() => handleSelect(page)}
                      >
                        {`${page} items per page`}
                      </p>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </>
    );
  };
};

export default listView;
