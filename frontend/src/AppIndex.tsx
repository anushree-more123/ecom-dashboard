import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/nav-bar/NavBar";
import Footer from "./components/footer/Footer";
import { routes } from "./routes";

const AppIndex = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("user");

  useEffect(() => {
    if (token) {
      if (
        location.pathname === routes.LOGIN ||
        location.pathname === routes.SIGNUP
      ) {
        navigate(routes.PRODUCTS, { replace: true });
      }
    } else {
      if (
        location.pathname !== routes.LOGIN &&
        location.pathname !== routes.SIGNUP
      ) {
        navigate(routes.LOGIN, { replace: true });
      }
    }
  }, [token, location.pathname, navigate]);

  const isAuthPage =
    location.pathname === routes.LOGIN || location.pathname === routes.SIGNUP;

  return (
    <>
      {token && !isAuthPage && (
        <>
          <NavBar />
          <Footer />
        </>
      )}

      <Outlet />
    </>
  );
};

export default AppIndex;
