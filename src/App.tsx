import "./App.css";

import DefaultLayout from "./screens/layouts/default";
import IdeaPage from "./screens/pages/idea";
import LoginAuthPage from "./screens/pages/auth/login";

function App() {
  const isReady = true
  return (
    <>
      <DefaultLayout>
      { isReady? <IdeaPage /> : <LoginAuthPage /> }
      </DefaultLayout>
    </>
  );
}

export default App;
