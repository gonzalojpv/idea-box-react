import arrowIcon from "/arrow.svg";
import RemoveIdea from "../RemoveIdea";
import useFirebase from "../../hooks/useFirebase";

import { AccountContext, AccountContextProps } from "../../contexts/account-context";
import type { Idea, IdeaListProps } from "../../types/ideas";
import { useCallback, useContext, useState } from "react";

const IdeaList = ({ items, upIdea, downIdea }: IdeaListProps) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea>();

  const { currentUser } = useContext(AccountContext) as AccountContextProps;
  const { removeIdeaAction } = useFirebase();

  const onRemoveIdea = useCallback((idea: Idea) => {
    setSelectedIdea(idea);
    setIsModalActive(true);
  }, []);

  const onCloseModal = () => {
    setIsModalActive(false);
  };

  const removeIdeaHandle = async () => {
    await removeIdeaAction(selectedIdea?.id || "");
    onCloseModal();
  };

  return (
    <>
      {isModalActive && (
        <RemoveIdea
          name={selectedIdea?.name || ""}
          onRemoveIdea={removeIdeaHandle}
          onCancelRemoveIdea={onCloseModal}
        />
      )}
      {items.map((item: Idea) => (
        <article
          key={item.name}
          className="p-3 mb-4 bg-gray-300 rounded-lg sm:flex sm:items-center idea"
        >
          {currentUser?.uid === item.user && (
            <img
              className="mr-3 cursor-pointer"
              src="/remove.svg"
              alt="Remove Idea"
              onClick={() => onRemoveIdea(item)}
            />
          )}

          <section className="text-center sm:flex-1 sm:text-left">
            <h2 className="text-xl sm:text-2xl sm:leading-6">{item.name}</h2>
            <small>{item.userName}</small>
          </section>
          <section className="pt-3 mt-6 border-t-2 border-black sm:pt-0 sm:pl-3 sm:border-t-0 sm:border-l-2 sm:flex sm:items-center">
            <h3 className="text-3xl font-bold text-center">{item.votes}</h3>
            <nav className="flex justify-center sm:block">
              <img
                src={arrowIcon}
                alt="Vote up"
                className="w-10 cursor-pointer"
                onClick={() => upIdea(item, true)}
              />
              <img
                src={arrowIcon}
                alt="Vote down"
                className="w-10 cursor-pointer transform rotate-180"
                onClick={() => downIdea(item, false)}
              />
            </nav>
          </section>
        </article>
      ))}
    </>
  );
};

export default IdeaList;
