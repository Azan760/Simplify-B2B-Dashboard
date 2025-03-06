import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import { useSidebar } from '../Data/Data'
import Login from '../Pages/Auth/Login'
import Signup from '../Pages/Auth/Signup'
import NewPassword from '../Pages/Auth/NewPassword'

const DashboardLayout = () => {

    const [sidebarOpen, toggleSidebar] = useSidebar();

    return (
        <>

            <div className="smiels-dashboard flex relative h-screen">
                {/* <Login/> */}
                {/* <NewPassword/> */}
                <Sidebar sideOpen={sidebarOpen.sideOpen} />
                <div style={{ marginTop: '60px' }} className="main block w-full">
                    <Header toggleSidebar={toggleSidebar} menuClose={sidebarOpen.menuClose}
                        menuOpen={sidebarOpen.menuOpen} />
                    <div style={{ height: 'calc(100vh - 60px)', padding: '30px' }}
                        className="containers overflow-y-auto ">
                        <Outlet />
                    </div>
                </div>

            </div>


        </>

    )
}

export default DashboardLayout
