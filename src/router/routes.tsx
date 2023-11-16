import ErrorPage from "../screens/pages/error/404";
import RootLayout from "../screens/layouts/default";
import ideaChildRoutes from "./idea";

export default [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: ideaChildRoutes(),
  },
];
