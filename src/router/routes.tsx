import ErrorPage from "../screens/pages/error/404";
import RootLayout from "../screens/layouts/default";
import CourseGlobalsLayout from "@/screens/layouts/course-globals";

import ideaChildRoutes from "./idea";
import imageSearchChildRoutes from "./image-search";
import courseGlobalChildRoutes from "./course-global";

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
  {
    path: "/course-globals",
    element: <CourseGlobalsLayout />,
    children: courseGlobalChildRoutes(),
  },
];
