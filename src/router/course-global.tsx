import CourseGlobalPage from "@/screens/pages/course-global";
import TestCourse from "@/screens/pages/course-global/test";
import TimerPage from "@/screens/pages/course-global/timer";

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
  {
    path: "timer",
    element: <TimerPage />,
  },
];

export default courseGlobalChildRoutes;
