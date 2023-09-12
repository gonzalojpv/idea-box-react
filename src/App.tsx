import "./App.css";

import DefaultLayout from "./screens/layouts/default";
import AddIdeaForm from "./components/AddIdeaForm";
import IdeaList from "./components/IdeaList";
import seed from "./utils/seed.json";

import type { Idea } from "./types/ideas";

import { useState } from "react";

function App() {
  const { ideas } = seed
  const [items, setItems] = useState(ideas);

  const useHandleAddItem = (newItem: Idea) => {
    setItems([...items, newItem])
  }

  const handleUpIdea = (item: Idea) => {
    const ideas = items.map((idea) => {
      if (idea.id === item.id) {
        idea.votes = idea.votes + 1
      }      

      return idea
    })

    setItems(ideas)
  }

  const handleDownIdea = (item: Idea) => {
     const ideas = items.map((idea) => {
      if (idea.id === item.id) {
        if (idea.votes > 0) {
          idea.votes = idea.votes - 1
        }
      }      

      return idea
    })

    setItems(ideas)
  }

  return (
    <>
      <DefaultLayout>
        <h1 className="mb-5 text-4xl text-center">IdeaBox</h1>
        <AddIdeaForm addIdea={useHandleAddItem} />
        <IdeaList downIdea={handleDownIdea} upIdea={handleUpIdea} items={items} />
      </DefaultLayout>
    </>
  );
}

export default App;
