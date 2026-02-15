import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import AppIndex from "./AppIndex";

import SignUp from "./components/sign-up/SignUp";
import Products from "./components/product-list/Products";
import NotFound from "./components/not-found/NotFound";
import Login from "./components/login/Login";

const router = createBrowserRouter([
  {
    path: routes.APPINDEX,
    element: <AppIndex />,
    // errorElement: <ErrorBoundary />,
    children: [
      // Public Routes
      {
        path: routes.LOGIN,
        element: <Login />,
      },
      {
        path: routes.SIGNUP,
        element: <SignUp />,
      },

      // Protected Routes

      {
        path: routes.PRODUCTS,
        element: <Products />,
      },
    ],
  },
  {
    path: routes.NOTFOUND,
    element: <NotFound />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
