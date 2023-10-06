import AddIdeaForm from "../../../components/AddIdeaForm";
import IdeaList from "../../../components/IdeaList";
import useFirebase from "../../../hooks/useFirebase";

import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

import type { Idea } from "../../../types/ideas";
import type { FirebaseUser } from "../../../types/user";

const IdeaPage = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState<FirebaseUser>(null);
  // @ts-ignore
  const [auth, db, doLoginWithGoogle, doLogout, fetchCollection, addToCollection, voteIdea] = useFirebase();

  const fetchIdeas = useCallback(async () => {
    try {
      // @ts-ignore
      const response = await fetchCollection("ideas");
      setItems(response);
      fetchIdeas();
    } catch (error) {
      console.log('Error', error)
    }
  }, [])

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

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

  const handleIdea = async (item: Idea, type: boolean) => {
    try {
      // @ts-ignore
      await voteIdea({ type: type, id: item.id, userId: user?.uid })
      fetchIdeas(); 
    } catch (error) {
      // @ts-ignore
      toast.error(error.message)
    }
  };

  return (
    <>
      <div className="w-full p-4 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="mb-5 text-4xl text-center">IdeaBox</h1>
        {/* @ts-ignore */}
        <AddIdeaForm user={user} addIdea={addToCollection} doLogin={doLoginWithGoogle} doLogout={doLogout} />
        {/* @ts-ignore */}
        <IdeaList downIdea={handleIdea} upIdea={handleIdea} items={items} />
      </div>
      <ToastContainer />
    </>
  );
};

export default IdeaPage;
