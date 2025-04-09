import React, { useState, memo } from 'react'
import { navItems } from '../Data/Data'
import '../Css/Sidebar.css'
import { useSidebarDropdown } from '../Data/Data';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chatIcon, circle, dotsIcon, search } from './Icons';
import { useDispatch } from "react-redux";
import { logout } from "../Features/AuthSlice";
import { useNavigate } from "react-router-dom";
import {useFetch} from "../Services/ApiService.js"

const Sidebar = ({ sideOpen }) => {

    const [isOpen, setOpen] = useState('hidden');
    const [linkDropdown, links] = useSidebarDropdown();
    

    const {postFetch} = useFetch("http://localhost:8000/api/logout");

    useEffect(() => {
        sideOpen === 'side' ? setOpen('') : setOpen('hidden');
    }, [sideOpen]);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleLogout = async() => {
        try {
            // const response = await postFetch();
            // if (response?.success) {  
                dispatch(logout());
                navigate("/login");
            // } else {
            //     console.log("Logout failed:", response?.message);
            // }
    
        }
        catch (error) {
          console.log(error.message);
        }
    };
    

    
    return (
        
        
        
        <div className="smiels-sidebar " id="sidebar">
            <div
                className={`${sideOpen}  top-0 left-0  transition-all ease delay-75 
                side h-full  shadow-sideShadow
                flex flex-col justify-between  relative overflow-y-auto bg-dashboard` }>

                <nav className="navbar">
                    <div className={` ${isOpen} search  flex items-center relative mb-2.5 `}>
                        {search}

                        <input className={`focus:border-textColor placeholder:text-sm placeholder:text-textColor2
                             placeholder:font-normal   p-1.5 pl-7 outline-0 border box-border
                               overflow-hidden 
                             rounded-md border-searchIcon`} type="text" placeholder="Search using IMEI/Serial" />
                    </div>
                    <ul className="navbar-nav pb-5 border-b border-searchIcon">
                        {navItems.map((menu, index) => {

                            const show = links.x === index ? 'block' : 'hidden';


                            return (
                                <li className="nav-item list-none" key={index}>
                                    <Link to={menu.Path}
                                     onClick={() => {
                                        setSelectedIndex(index); 
                                         index !== 0 && linkDropdown(index)
                                        } }
                                     className={` 


                                        ${selectedIndex === index ? 'bg-textColor text-white ' : 'hover:text-downIcon'}
                                                
                                        text-textColor2
                    
                                         nav-link p-3 flex items-center justify-between
                                         text-sm relative`} path="/">
                                        <div className=" tooltip-container flex items-center
                                             gap-3.5 " >
                                            {menu.icon}
                                            <span className={` ${isOpen} tooltip ${menu.color}`} id="tooltip"> {menu.value} </span>
                                        </div>
                                        {index !== 0 && <span className={`${isOpen}`} >
                                            {menu.icon2}
                                        </span>}
                                    </Link>
                                    
                                    {index !== 0 &&
                                        <ul className={`${show} h-full my-2.5  rounded  `}>
                                            {menu.dropdown.map((dropdownMenu, index) => {
                                                return (
                                                    <li key={index} className='list-none'>
                                                        <Link to={dropdownMenu.Path} className='  p-3 flex items-center gap-3.5 text-textColor3 text-xs'>
                                                            {dropdownMenu.icon}
                                                            <span className={`${isOpen}`} > {dropdownMenu.value} </span>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>}

                                </li>)
                        })}

                    </ul>
                </nav>


                <footer className="footer">
                    <div className={`chat my-5  border border-textColor  ${sideOpen === 'side' ? 'px-2.5 py-2' : 'p-2.5'} rounded-md flex justify-center items-center gap-2 text-textColor font-semibold `} id="chat">

                        {chatIcon}
                        <span className={`${isOpen}`}> Chat with us </span>

                    </div>

                    <div className={`quickFile flex justify-between border rounded-md
                         ${sideOpen === 'close' ? 'p-1.5' : 'p-2.5'} items-center my-4 border-searchIcon`} >
                        <div className='flex items-center gap-2.5'>
                            <img src="https://app.smiels.com/assets/Quickfile.svg" alt="" className="loading" />
                            <p className={` ${isOpen} verify flex flex-col text-right`}>
                                <span className='text-sm text-heading font-semibold'> QuickFile </span>
                                <span style={{ fontSize: '10px' }} className="verified text-sectionColor "> verified</span>
                            </p>
                        </div>
                        <span className={` ${isOpen} check bg-bgColor text-white p-1.5`}>
                            {circle}
                        </span>
                    </div>


                    <div className="smiles-user flex items-center justify-between mb-5" id="close">
                        <div className='flex items-center gap-2.5'>
                            <img src="https://app.smiels.com/assets/user-profile.svg" alt="" className="profile-logo" />
                            <span className={` ${isOpen} user text-textColor2  font-normal  text-sm`}> SMIELS User </span>
                        </div>
                        <span className={`${isOpen}`}  onClick={handleLogout}>
                            {dotsIcon}
                        </span>
                    </div>

                    <p style={{ fontSize: '10px' }} className='text-textColor2 text-center '> 2023, SMIELS | 0.0.1-BETA.73 </p>
                </footer>
            </div>
        </div>



)
}

export default memo(Sidebar)
