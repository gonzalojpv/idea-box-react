import CourseGlobalPage from "@/screens/pages/course-global";
import TestCourse from "@/screens/pages/course-global/test";

const courseGlobalChildRoutes = () => [
  {
    index: true,
    path: "",
    element: <CourseGlobalPage />,
  },
  {
    path: "test",
    element: <TestCourse />,
  },
];

export default courseGlobalChildRoutes;
