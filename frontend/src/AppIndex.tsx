import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { routes } from "./routes";
import NavBar from "./components/nav-bar/NavBar";

const AppIndex = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("user");

  useEffect(() => {
    if (token) {
      // Logged in user trying to access auth pages
      if (
        location.pathname === routes.LOGIN ||
        location.pathname === routes.SIGNUP
      ) {
        navigate(routes.PRODUCTS, { replace: true });
      }
    } else {
      // Not logged in trying to access protected routes
      if (
        location.pathname !== routes.LOGIN &&
        location.pathname !== routes.SIGNUP
      ) {
        navigate(routes.LOGIN, { replace: true });
      }
    }
  }, [token, location.pathname, navigate]);

  // Check if current page is auth page
  const isAuthPage =
    location.pathname === routes.LOGIN || location.pathname === routes.SIGNUP;

  return (
    <>
      {/* Show Navbar only when logged in AND not on auth pages */}
      {token && !isAuthPage && <NavBar />}

      <Outlet />
    </>
  );
};

export default AppIndex;
