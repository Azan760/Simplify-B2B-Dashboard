import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const ProtectedRoute = () => {
    const storedToken = localStorage.getItem("userToken");
    const reduxToken = useSelector((state) => state.auth.token);

    const token = useMemo(() => reduxToken || storedToken, [reduxToken, storedToken]);

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;