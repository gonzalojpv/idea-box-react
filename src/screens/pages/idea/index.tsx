import AddIdeaForm from "../../../components/AddIdeaForm";
import IdeaList from "../../../components/IdeaList";
import useFirebase from "../../../hooks/useFirebase";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import type { Idea } from "../../../types/ideas";
import type { FirebaseUser } from "../../../types/user";

const IdeaPage = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState<FirebaseUser>(null);
  // @ts-ignore
  const [auth, db, doLoginWithGoogle, doLogout, fetchCollection, addToCollection, voteIdea] = useFirebase();

  useEffect(() => {
    async function fetchData() {
      // @ts-ignore
      const response = await fetchCollection("ideas");
      setItems(response);
      // ...
    }
    fetchData();
  }, []);

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

  const handleUpIdea = async (item: Idea) => {
    // @ts-ignore
    await voteIdea({ type: true, id: item.id, userId: user?.uid })
  };

  const handleDownIdea = async (item: Idea) => {
    // @ts-ignore
    await voteIdea({ type: false, id: item.id, userId: user?.uid })
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
