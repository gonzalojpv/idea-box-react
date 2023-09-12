import "./App.css";

import DefaultLayout from "./screens/layouts/default";
import AddIdeaForm from "./components/AddIdeaForm";
import IdeaList from "./components/IdeaList";

function App() {
  return (
    <>
      <DefaultLayout>
        <h1 className="mb-5 text-4xl text-center">IdeaBox</h1>
        <AddIdeaForm />
        <IdeaList />
      </DefaultLayout>
    </>
  );
}

export default App;
