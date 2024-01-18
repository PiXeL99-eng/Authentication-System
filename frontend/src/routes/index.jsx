import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { Home, Signup, Login } from "../pages"

const Routes = () => {

    const { token } = useAuth();
    // Route configurations go here

    const routesForPublic = [
        // {
        //   path: "/service",
        //   element: <div>Service Page</div>,
        // },
        // {
        //   path: "/about-us",
        //   element: <div>About Us</div>,
        // },
    ];

    const routesForAuthenticatedOnly = [
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            // {
            //   path: "/profile",
            //   element: <div>User Profile</div>,
            // },
            // {
            //   path: "/logout",
            //   element: <div>Logout</div>,
            // },
          ],
        },
    ];

    const routesForNotAuthenticatedOnly = [
        // {
        //   path: "/",
        //   element: <div>Home Page</div>,
        // },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
    ];


    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;