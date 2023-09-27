import AddIdeaForm from "../../../components/AddIdeaForm";
import IdeaList from "../../../components/IdeaList";
import seed from "../../../utils/seed.json";
import useFirebase from "../../../hooks/useFirebase";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import type { Idea } from "../../../types/ideas";
import type { FirebaseUser } from "../../../types/user";

const IdeaPage = () => {
  const { ideas } = seed;

  const [items, setItems] = useState(ideas);
  const [user, setUser] = useState<FirebaseUser>(null);
  const [auth, db, doLoginWithGoogle, doLogout, fetchCollection, addToCollection] = useFirebase();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetchCollection("ideas");
      setItems(response);
      // ...
    }
    fetchData();
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

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
        <AddIdeaForm
          user={user}
          addIdea={addToCollection}
          doLogin={doLoginWithGoogle}
          doLogout={doLogout}
        />
        <IdeaList downIdea={handleDownIdea} upIdea={handleUpIdea} items={items} />
      </div>
    </>
  );
};

export default IdeaPage;
