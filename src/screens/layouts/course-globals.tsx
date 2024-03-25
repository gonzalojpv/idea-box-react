import CourseGoalHeader from "../../components/CourseGoalHeader";

import { Outlet } from "react-router-dom";
import { AccountContextProvider } from "../../contexts/account-context";

const CourseGlobalsLayout = () => {
  return (
    <AccountContextProvider>
      <main className="w-full max-w-2xl my-12 mx-auto  p-8 bg-gray-800 text-white rounded-md shadow-md">
        <CourseGoalHeader
          image={{
            src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.itsallaboutpeople.co%2Fwp-content%2Fuploads%2F2017%2F12%2Fstock-image-30079107-l-2015.jpg&f=1&nofb=1&ipt=0efc535869fb8cd2f7ca6d1ba974a9a0bc91ee7504b8e18bec4017b2fea955ea&ipo=images",
            alt: "A list of goals",
          }}
        >
          <h1 className="block font-bold my-4 m-0 text-2xl text-yellow-300">Your Course Goals</h1>
        </CourseGoalHeader>
        <Outlet />
      </main>
    </AccountContextProvider>
  );
};

export default CourseGlobalsLayout;
