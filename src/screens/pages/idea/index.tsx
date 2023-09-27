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
  // @ts-ignore
  const [auth, db, doLoginWithGoogle, doLogout, fetchCollection, addToCollection] = useFirebase();

  useEffect(() => {
    async function fetchData() {
      // @ts-ignore
      const response = await fetchCollection("ideas");
      setItems(response);
      // ...
    }
    fetchData();
  });

  useEffect(() => {
    // @ts-ignore
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      if (authUser) {
        // @ts-ignore
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleUpIdea = (item: Idea) => {
    // @ts-ignore
    const ideas = items.map((idea: Idea) => {
      // @ts-ignore
      if (idea.id === item.id) {
        idea.votes = idea.votes + 1;
      }

      return idea;
    });
    // @ts-ignore
    setItems(ideas);
  };

  const handleDownIdea = (item: Idea) => {
    // @ts-ignore
    const ideas = items.map((idea: Idea) => {
      // @ts-ignore
      if (idea.id === item.id) {
        if (idea.votes > 0) {
          idea.votes = idea.votes - 1;
        }
      }

      return idea;
    });
    // @ts-ignore
    setItems(ideas);
  };

  return (
    <>
      <div className="w-full p-4 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="mb-5 text-4xl text-center">IdeaBox</h1>
        {/* @ts-ignore */}
        <AddIdeaForm user={user} addIdea={addToCollection} doLogin={doLoginWithGoogle} doLogout={doLogout} />
        {/* @ts-ignore */}
        <IdeaList downIdea={handleDownIdea} upIdea={handleUpIdea} items={items} />
      </div>
    </>
  );
};

export default IdeaPage;
