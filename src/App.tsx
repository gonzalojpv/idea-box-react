import "./App.css";

import DefaultLayout from "./screens/layouts/default";
import IdeaPage from "./screens/pages/idea";
import LoginAuthPage from "./screens/pages/auth/login";
import { AuthContextProvider } from "./contexts/auth-context";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const isReady = true;
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <DefaultLayout>{isReady ? <IdeaPage /> : <LoginAuthPage />}</DefaultLayout>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
