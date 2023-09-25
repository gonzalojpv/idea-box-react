import React, { useState } from "react";

import type { Idea } from "../../types/ideas";
import type { FirebaseUser } from "../../types/user";
import { v4 as uuidv4 } from "uuid";

interface IdeaListProps {
  addIdea: (idea: Idea) => void;
  doLogin: () => void;
  doLogout: () => void;
  user: FirebaseUser;
}

const addIdeaForm: React.FC<IdeaListProps> = ({ addIdea, user, doLogin, doLogout }) => {
  const [idea, setIdea] = useState<string>("");

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    addIdea({ name: idea, userName: "", votes: 0, id: uuidv4() });
    setIdea("");
  };

  const handleIdeaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setIdea(newValue);
  };

  return (
    <>
      <section className="mb-6">
        <form className="sm:flex" onSubmit={onSubmit}>
          <input
            type="text"
            required
            name="idea"
            value={idea}
            onChange={handleIdeaChange}
            placeholder="Add your idea"
            className="w-full p-3 sm:flex-auto"
          />
          <input
            type="submit"
            value={"Add idea"}
            className="w-full p-2 text-white bg-gray-600 sm:flex-1"
          />
        </form>
        <p>
          {user ? (
            <>
              Hi 👋 {user.displayName}.
              <a href="#" onClick={doLogout} className="font-bold underline">
                Logout
              </a>
              .
            </>
          ) : (
            <>
              Please{" "}
              <a href="#" onClick={doLogin} className="font-bold underline">
                login
              </a>{" "}
              first
            </>
          )}
        </p>
      </section>
    </>
  );
};

export default addIdeaForm;
