import ErrorPage from "../screens/pages/error/404";
import RootLayout from "../screens/layouts/default";
import ideaChildRoutes from "./idea";
import imageSearchChildRoutes from "./image-search";

export default [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: ideaChildRoutes(),
  },
  {
    path: "/image-search-engine",
    element: <RootLayout />,
    children: imageSearchChildRoutes(),
  },
];
