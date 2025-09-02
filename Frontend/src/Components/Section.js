import React, { useEffect } from 'react'
import { sale, section, sectionProduct, tableData, } from '../Data/Data'
import '../Css/Section.css'
import { expandIcon, plus, caretDown } from './Icons'
import { useNavigate } from 'react-router'
import SelectOptions from './SelectOptions'
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query'
import { saleTableData, purchaseTableData } from '../Data/Data'
import SectionTable from './SectionTable'
import { useFetch } from '../Services/ApiService'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import dataImg from "../Assets/undraw_Data_re_80ws.svg";



const Section = () => {


  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  let path = "si/list";
  let path2 = "client/list"

  const recentSales = watch("searchBar");


  if (recentSales === "Sale Estimate") {
    path = "se/list";
  } else {
    path = "si/list";
  }

  const clientsSuppler = watch("searchUsers");
  console.log(clientsSuppler);

  if (clientsSuppler === "Supplier") {
    path2 = "supplier/list";
  } else {
    path2 = "client/list";
  }


  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const { getFetch: saleFetch } = useFetch(`http://localhost:8000/main/${path}`);
  const { getFetch: purchaseFetch } = useFetch("http://localhost:8000/main/pi/list");
  const { getFetch: allClients } = useFetch(`http://localhost:8000/main/${path2}`);
  const { getFetch: TeamFetch } = useFetch("http://localhost:8000/main/team/list");


  const { data: salesInvoice, isLoading, error } = useQuery(
    ['salesInvoice', path],
    async () => {

      const response = await saleFetch();
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );


  const { data: purchaseInvoice } = useQuery(
    ['purchaseInvoice'],
    async () => {
      const response = await purchaseFetch();
      console.log(response);
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const { data: clients } = useQuery(
    ['allClients', path2],
    async () => {
      const response = await allClients();
      console.log("response", response);
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const { data: Teams } = useQuery(
    ['AllTeams'],
    async () => {
      const response = await TeamFetch();
      console.log(response);
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  //Role-based dashboard view - moved after all hooks
  if (user && (user.userType === 'Sales Person' || user.userType === 'Sales Manager')) {
    return (
      <>
        <div className="heading mb-5">
          <h6 style={{ letterSpacing: '1px' }} className="font-semibold text-heading  sm:text-lg text-xl">{` Welcome back, ${user?.fullName}  `}</h6>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <img src={dataImg} alt="No Dashboard" style={{ maxWidth: 400, width: '100%' }} />
        </div>
      </>
    );
  }

  sectionProduct[0].item = [];

  if (clients) {
    sectionProduct[0].item = clients.map((client) => {
      return {
        id: client._id,
        name: client.details.clientName || client.details.supplierName,
        path: "/client/view/" + client._id || "/supplier/view/" + client._id

      }
    });

  }

  if (Teams) {
    sectionProduct[1].item = Teams.map((team) => {
      return {
        id: team._id,
        name: team.fullName,
        path: "/team/view/" + team._id
      }
    });
  }





  return (

    <>

      <div className="heading mb-5">
        <h6 style={{ letterSpacing: '1px' }} className="font-semibold text-heading  sm:text-lg text-xl">{` Welcome back, ${user?.fullName}  `}</h6>
      </div>

      <section style={{ height: 'calc(100% - 60px)' }} className='grid' >

        <div style={{ gridTemplateColumns: 'repeat(5,1fr)' }} className=" section-1 grid gap-5">
          {section.map((menu, index) => {
            return (
              <div onClick={() => navigate(menu.path)}
                style={{ borderRadius: '10px' }} key={index} className="row-1 hover:border-placeHolder
           border-2 border-searchIcon  bg-bgColor3  h-full">

                <div className="record h-full">
                  <div className="record-header mb-5 flex items-center justify-between">
                    {menu.icon}
                    <span className='text-sectionColor text-sm'> {menu.value} </span>
                  </div>
                  <div className="record-content flex items-center justify-between">
                    <div className="record-content-1">
                      <h4 className=' text-2xl text-sectionColor font-semibold'> {menu.header} </h4>
                      <p className=' text-base mt-1.5 text-sectionColor font-medium '>
                        {menu.value2}

                      </p>
                    </div>
                    {index != 2 &&
                      <div className="record-content-2 flex items-center gap-1 ">
                        {menu.icon3}
                        <span style={{ fontSize: '18px' }} className={` ${menu.minus} text-bgColor font-semibold`}> {menu.value3}  </span>
                      </div>}
                  </div>
                </div>
              </div>)
          })}

        </div>

        <div style={{ gridTemplateColumns: '4fr 3fr' }} className=" pb-5 pt-5 section-2 grid gap-5">

          <div className='grid gap-5 auto-rows-auto'>

            <SectionTable

              register={register} setValue={setValue}
              tableData={salesInvoice}
              tables={saleTableData}

            />

            <SectionTable
              register={register} setValue={setValue}
              tableData={purchaseInvoice}
              tables={purchaseTableData}
            />

          </div>


          <div style={{ gridTemplateRows: '1fr 1fr' }} className='grid gap-5'>

            {sale.map((value, index) => {
              return (
                <div style={{ borderRadius: '10px', boxShadow: '0 0 10px #172b4d1a' }}
                  key={index} className="row-2 flex flex-col p-5 bg-dashboard">
                  <div className="recent-sales xsm:flex-col xsm:gap-2.5 flex justify-between items-center mb-5 relative">
                    <p className='text-black font-semibold text-lg'> {value.title} </p>
                    <div className="sales-right-bar flex items-center gap-2.5">
                      <div className="search-detail relative">

                        <div className='  flex  relative  items-center w-full'>
                          <SelectOptions
                            setValue={setValue} register={register}
                            field={{
                              type: value.type,
                              placeholder: value.placeholder,
                              inputName: value.inputName,
                              selectOption: value.selectOption,
                            }}
                            icon={caretDown}
                            index={index}

                          />
                        </div>

                      </div>
                      <span className="add-new border border-searchIcon rounded px-2.5 py-2">
                        {value.icon2}
                      </span>
                      <span className="view-all border border-searchIcon rounded px-2.5 py-2">
                        {value.icon3}
                      </span>
                    </div>
                  </div>
                  <div style={{ borderRadius: '10px' }} className="create-new-sale flex flex-col justify-center 
                     items-center w-full h-full border border-searchIcon ">
                    <p style={{ fontSize: '14.5px' }} className='text-textColor2 mb-2.5'> {value.value} </p>
                    <span className="sale-btn border-textColor shadow-sideShadow text-textColor border rounded px-2 font-semibold text-xs py-2.5">
                      {value.value2}
                    </span>
                  </div>
                </div>


              )
            })}

            <div style={{ gridTemplateRows: '1fr 1fr' }} className="row-3-parts grid gap-2.5">
              {sectionProduct.map((row, index) => {
                return (
                  <div key={index} style={{ borderRadius: '10px', boxShadow: '0 0 10px #172b4d1a' }} className='flex flex-col p-5 bg-dashboard
                 '>
                    <div className="recent-sales xsm:flex-col xsm:gap-2.5 flex justify-between items-center mb-5 relative">
                      <p className='text-black font-semibold text-lg'> {row.title} </p>
                      <div className="sales-right-bar flex items-center gap-2.5">
                        <div className="search-detail relative ">

                          {index === 0 &&
                            <div className='  flex  relative  items-center w-full'>
                              <SelectOptions
                                setValue={setValue} register={register}
                                field={{
                                  type: row.type,
                                  placeholder: row.placeholder,
                                  inputName: row.inputName,
                                  selectOption: row.selectOption
                                }}
                                icon={caretDown}
                                index={index}
                              />
                            </div>}
                        </div>
                        <span className="add-new border border-searchIcon rounded px-2.5 py-2">
                          {row.icon2}
                        </span>
                        <span className="view-all border border-searchIcon rounded px-2.5 py-2">
                          {row.icon3}
                        </span>
                      </div>
                    </div>

                    <div className="span-group flex items-center gap-2.5 flex-wrap">
                      {row.item.map((value, index) => {
                        return (
                          <Link
                            to={`${value.path}`}
                            key={index}
                            className="relative group"
                          >
                            <div
                              style={{ height: '30px', width: '30px', borderRadius: '50%' }}
                              className="bg-heading text-white flex items-center justify-center text-xs"
                            >
                              <span>
                                {value?.name
                                  ?.split(" ")
                                  ?.map(word => word[0])
                                  ?.join("")}
                              </span>
                            </div>

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                              {value.name}
                            </div>
                          </Link>
                        )
                      })}

                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>


    </>



  )
}

export default Section
