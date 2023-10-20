import AddIdeaForm from "../../../components/AddIdeaForm";
import IdeaList from "../../../components/IdeaList";
import useFirebase from "../../../hooks/useFirebase";

import { AccountContext, AccountContextProps } from "../../../contexts/account-context";
import { useState, useEffect, useCallback, useContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

import type { Idea } from "../../../types/ideas";
import type { FirebaseUser } from "../../../types/user";

const IdeaPage = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState<FirebaseUser>(null);
  const { init, doLoginWithGoogle, doLogout, fetchCollection, addToCollection, voteIdea } =
    useFirebase();

  const { setAccount } = useContext(AccountContext) as AccountContextProps;

  const fetchIdeas = useCallback(async () => {
    try {
      init();
      const response = await fetchCollection("ideas");
      // @ts-ignore
      setItems(response);
      fetchIdeas();
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  useEffect(() => {
    const auth2 = getAuth();
    // @ts-ignore
    const unsubscribe = onAuthStateChanged(auth2, (authUser: FirebaseUser) => {
      if (authUser) {
        setAccount(authUser);
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
      await voteIdea({ type: type, id: item.id, userId: user?.uid });
      fetchIdeas();
    } catch (error) {
      // @ts-ignore
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="w-full p-4 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="mb-5 text-4xl text-center">IdeaBox</h1>
        {/* @ts-ignore */}
        <AddIdeaForm
          user={user}
          addIdea={addToCollection}
          doLogin={doLoginWithGoogle}
          doLogout={doLogout}
        />
        {/* @ts-ignore */}
        <IdeaList downIdea={handleIdea} upIdea={handleIdea} items={items} />
      </div>
      <ToastContainer />
    </>
  );
};

export default IdeaPage;
