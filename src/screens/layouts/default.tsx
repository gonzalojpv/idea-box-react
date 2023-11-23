import Breadcrumb from "../../components/Breadcrumb";

import { Outlet } from "react-router-dom";
import { AccountContextProvider } from "../../contexts/account-context";

const defaultLayout = () => {
  return (
    <AccountContextProvider>
      <main className="container p-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumb />
        <Outlet />
      </main>
    </AccountContextProvider>
  );
};

export default defaultLayout;
