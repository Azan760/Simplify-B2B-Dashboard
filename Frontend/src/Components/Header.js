import React, { memo } from 'react'
// import smielsLogo from '../Assets/smiels-logo-icon.png'
import { Link } from 'react-router-dom'
import '../Css/Header.css'
import { dropdownMenu, useDropdown } from '../Data/Data'
import { settingIcon } from './Icons'
import simplifyLogo from "../Assets/simplify-title-logo.png"

const Header = ({ toggleSidebar, menuClose, menuOpen }) => {

    const [dropdown, toggleSetting] = useDropdown();


    return (

        <header style={{ height: '60px' }} className="header absolute  w-full flex justify-between
         bg-dashboard p-5 pl-2.5 shadow-sideShadow  ">
            <div className="left-bar flex items-center">

                <span className="menu flex items-center " onClick={toggleSidebar}>
                    <i className={` ${menuOpen} fa-solid fa-bars text-textColor text-lg ml-3`} ></i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                        className={`bi bi-x ${menuClose} text-textColor ml-1.5 `} viewBox="0 0 16 16">
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </span>

                <div className="logo-text flex items-center gap-3">
                    <img src={simplifyLogo} alt="smiels-logo" />
                    <span className='text-textColor2 font-semibold text-base sm:hidden'>  </span>
                </div>
            </div>
            <div className="right-bar flex items-center ">
                {/* <div className="dropdown flex items-center relative">
                    <span className="notification border-r border-bgColor2 px-5" id="notification"
                     onClick={toggleNotification}>

                        {bellIcon}
                    </span>
                    {dropdown.notification &&
                        <div className="dropdown-menu flex flex-col flex-wrap absolute p-5 bg-dashboard border border-searchIcon" id="dropdown-menu">
                            <div className="notification-header flex justify-between items-center pb-3.5  border-b border-searchIcon">
                                <p className='font-semibold    '> Notifications(Beta) </p>
                                <a href="" className='decoration-0 text-textColor '> Mark all as read </a>
                            </div>
                            <div className="notification-menu flex flex-col mt-2.5 gap-2">
                                <span style={{ opacity: '0.7' }} className='text-xs text-placeHolder '> 3:46:38 AM </span>
                                <p className='text-sm text-placeHolder'>
                                    14 days free trail has been actived. Enjoy using SMIELS.
                                </p>
                            </div>
                        </div>} */}

                {/* </div> */}
                <div className="dropdown flex items-center relative ">
                    <span className="setting px-5" id="setting" onClick={toggleSetting}>
                        {settingIcon}
                    </span>
                    {dropdown.setting && <div className="dropdown-menu-2 flex flex-col absolute bg-dashboard border border-searchIcon rounded" id="dropdown-menu-2">
                        <ul className="setting-menu flex items-center flex-col" >
                            {dropdownMenu.map((menu, index) => {
                                return (
                                    <li className='list-none w-full' key={index}>
                                        <Link to={`${menu.path}`} className="setting-link flex gap-2.5 items-center p-2.5 text-xs border-b border-dashbaord  decoration-0 text-black ">
                                            {menu.icon}
                                            <span> {menu.value} </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>}
                </div>
            </div>
        </header>


    )
}

export default memo(Header)
