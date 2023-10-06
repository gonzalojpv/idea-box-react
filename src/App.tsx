import "./App.css";

import DefaultLayout from "./screens/layouts/default";
import IdeaPage from "./screens/pages/idea";
import LoginAuthPage from "./screens/pages/auth/login";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const isReady = true;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DefaultLayout>{isReady ? <IdeaPage /> : <LoginAuthPage />}</DefaultLayout>
      </QueryClientProvider>
    </>
  );
}

export default App;
