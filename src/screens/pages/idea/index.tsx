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
  const [items, setItems] = useState<Idea[]>([]);
  const [user, setUser] = useState<FirebaseUser>(null);
  const { doLoginWithGoogle, doLogout, fetchCollection, addToCollection, voteIdea, getUserVotes } =
    useFirebase();

  const { setAccount, setUserVotes, currentUser } = useContext(
    AccountContext,
  ) as AccountContextProps;

  const fetchIdeas = useCallback(async () => {
    try {
      const response = await fetchCollection("ideas");
      setItems(response);
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, []);

  useEffect(() => {
    const auth2 = getAuth();
    const unsubscribe = onAuthStateChanged(auth2, async authUser => {
      if (authUser) {
        setAccount(authUser as FirebaseUser);
        setUser(authUser as FirebaseUser);
        const result = await getUserVotes(authUser.uid);
        setUserVotes(result);
      } else {
        setUser(null);
        setAccount(null);
      }
    });
    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleIdea = async (item: Idea, type: boolean) => {
    try {
      if (item?.id && user?.uid) {
        await voteIdea({ type: type, id: item.id, userId: user.uid });
      }

      fetchIdeas();
      if (currentUser) {
        const result = await getUserVotes(currentUser.uid);
        setUserVotes(result);
      }
    } catch (error) {
      // @ts-ignore
      if (error?.message) {
        // @ts-ignore
        toast.error(error.message as string);
      }
    }
  };

  const addNewIdea = async (idea: Idea) => {
    console.log("AddNewIdea", idea);
    await addToCollection(idea);
    fetchIdeas();
  };

  return (
    <>
      <div className="w-full p-4 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="mb-5 text-4xl text-center">IdeaBox</h1>
        <AddIdeaForm
          user={user}
          addIdea={addNewIdea}
          doLogin={doLoginWithGoogle}
          doLogout={doLogout}
        />
        <IdeaList downIdea={handleIdea} upIdea={handleIdea} items={items} fetchIdeas={fetchIdeas} />
      </div>
      <ToastContainer />
    </>
  );
};

export default IdeaPage;
