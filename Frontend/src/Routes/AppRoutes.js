import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import DashboardLayout from '../Layouts/DashboardLayout';
import Section from "../Components/Section"
import NProgress from 'nprogress';
import { useEffect } from 'react';
import Login from "../Pages/Auth/Login";
import ProtectedRoute from './ProtectedRoute';
import { Navigate, useNavigate } from 'react-router';
import EditSaleInvoice from '../Pages/Dashboard/Sale/SaleInvoiceEdit';
import CompanyProfile from '../Components/CompanyProfile';

const NewPassword = lazy(() => import("../Pages/Auth/NewPassword"));
const Signup = lazy(() => import("../Pages/Auth/Signup"));
const AllProduct = lazy(() => import("../Pages/Dashboard/Product/AllProduct"));
const NewProduct = lazy(() => import("../Pages/Dashboard/Product/NewProduct"));
const AllSaleInvoice = lazy(() => import("../Pages/Dashboard/Sale/AllSaleInvoice"));
const NewInvoice = lazy(() => import("../Pages/Dashboard/Sale/NewInvoice"));
const NewEstimate = lazy(() => import('../Pages/Dashboard/Sale/NewEstimate'));
const AllClient = lazy(() => import("../Pages/Dashboard/Sale/AllClient"));
const AllSaleEstimate = lazy(() => import("../Pages/Dashboard/Sale/AllSaleEstimate"));
const NewClient = lazy(() => import("../Pages/Dashboard/Sale/NewClient"));
const AllPurchaseOrder = lazy(() => import("../Pages/Dashboard/Purchase/AllPurchaseOrder"));
const AllPurchaseInvoice = lazy(() => import("../Pages/Dashboard/Purchase/AllPurchaseInvoice"));
const NewPurchaseInvoice = lazy(() => import("../Pages/Dashboard/Purchase/NewPurchaseInvoice"));
const AllSupplier = lazy(() => import("../Pages/Dashboard/Purchase/AllSupplier"));
const NewSupplier = lazy(() => import("../Pages/Dashboard/Purchase/NewSupplier"));
const NewOrder = lazy(() => import("../Pages/Dashboard/Purchase/NewOrder"));
const NewMember = lazy(() => import("../Pages/Dashboard/Team/NewMember"));
const AllMember = lazy(() => import("../Pages/Dashboard/Team/AllMember"));
const TeamView = lazy(() => import("../Pages/Dashboard/Team/TeamView"));
const ProductView = lazy(() => import("../Pages/Dashboard/Product/ProductView"));
const ClientView = lazy(() => import("../Pages/Dashboard/Sale/ClientView"));
const SupplierView = lazy(() => import("../Pages/Dashboard/Purchase/SupplierView"));



const AppRoutes = () => {

    const queryClient = new QueryClient();

    useEffect(() => {
        const handleStart = () => NProgress.start();
        const handleDone = () => NProgress.done();


        window.addEventListener('beforeunload', handleStart);
        window.addEventListener('load', handleDone);

        return () => {
            window.removeEventListener('beforeunload', handleStart);
            window.removeEventListener('load', handleDone);
        };
    }, []);


    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Suspense >
                    <Routes>
                        <Route path="/" element={<Navigate to={localStorage.getItem("userToken") ? "/" : "/login"} replace />} />

                        <Route path='/signup' element={<Signup />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='new-password/:id' element={<NewPassword />} />

                        <Route path="/" element={<ProtectedRoute />}>
                            <Route element={<DashboardLayout />}>
                                <Route index element={<Section />} />
                                <Route path="company" element={<CompanyProfile />} />
                                <Route path="product/list" element={<AllProduct />} />
                                <Route path="product/view/:id" element={<ProductView />} />
                                <Route path="product/new" element={<NewProduct />} />
                                <Route path="sales/si/list" element={<AllSaleInvoice />} />
                                <Route path="sales/si/new" element={<NewInvoice />} />
                                <Route path="sales/si/edit/:id" element={<EditSaleInvoice />} />
                                <Route path="sales/se/list" element={<AllSaleEstimate />} />
                                <Route path="sales/se/new" element={<NewEstimate />} />
                                <Route path="client/view/:id" element={<ClientView />} />
                                <Route path="client/list" element={<AllClient />} />
                                <Route path="client/new" element={<NewClient />} />
                                <Route path="purchases/po/list" element={<AllPurchaseOrder />} />
                                <Route path="purchases/po/new" element={<NewOrder />} />
                                <Route path="purchases/pi/list" element={<AllPurchaseInvoice />} />
                                <Route path="purchases/pi/new" element={<NewPurchaseInvoice />} />
                                <Route path="supplier/list" element={<AllSupplier />} />
                                <Route path="supplier/new" element={<NewSupplier />} />
                                <Route path="supplier/view/:id" element={<SupplierView />} />
                                <Route path="team/list" element={<AllMember />} />
                                <Route path="team/view/:id" element={<TeamView />} />
                                <Route path="team/new" element={<NewMember />} />

                            </Route>
                        </Route>
                    </Routes>
                </Suspense>
            </QueryClientProvider>
        </BrowserRouter >
    );
}

export default AppRoutes;
