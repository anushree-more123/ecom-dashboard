import { Navigate, Outlet } from "react-router-dom";

const AppIndex = () => {
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default AppIndex;
