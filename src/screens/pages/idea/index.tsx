import AddIdeaForm from "../../../components/AddIdeaForm";
import IdeaList from "../../../components/IdeaList";
import seed from "../../../utils/seed.json";

import { useState } from "react";

import type { Idea } from "../../../types/ideas";

const ideaPage = () => {
  const { ideas } = seed;
  const [items, setItems] = useState(ideas);

  const useHandleAddItem = (newItem: Idea) => {
    setItems([...items, newItem]);
  };

  const handleUpIdea = (item: Idea) => {
    const ideas = items.map((idea: Idea) => {
      if (idea.id === item.id) {
        idea.votes = idea.votes + 1;
      }

      return idea;
    });

    setItems(ideas);
  };

  const handleDownIdea = (item: Idea) => {
    const ideas = items.map((idea: Idea) => {
      if (idea.id === item.id) {
        if (idea.votes > 0) {
          idea.votes = idea.votes - 1;
        }
      }

      return idea;
    });

    setItems(ideas);
  };
  return (
    <>
      <div className="w-full p-4 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="mb-5 text-4xl text-center">IdeaBox</h1>
        <AddIdeaForm addIdea={useHandleAddItem} />
        <IdeaList downIdea={handleDownIdea} upIdea={handleUpIdea} items={items} />
      </div>
    </>
  );
};

export default ideaPage;
