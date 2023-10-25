import arrowIcon from "/arrow.svg";

import type { Idea } from "../../types/ideas";
import { AccountContext, AccountContextProps } from "../../contexts/account-context";
import { useContext } from "react";

interface IdeaItemProps {
  idea: Idea;
  onRemoveIdea: (idea: Idea) => void;
  upIdea: (idea: Idea, opt: boolean) => void;
  downIdea: (idea: Idea, opt: boolean) => void;
}

const IdeaItem = ({ idea, onRemoveIdea, upIdea, downIdea }: IdeaItemProps) => {
  const { currentUser, userVotes } = useContext(AccountContext) as AccountContextProps;

  const userVoted = (ideaId: string): boolean => {
    if (userVotes && ideaId) {
      return Boolean(userVotes.find(item => item === ideaId));
    }

    return false;
  };
  return (
    <>
      <article className="p-3 mb-4 bg-gray-300 rounded-lg sm:flex sm:items-center idea">
        {currentUser?.uid === idea.user && (
          <img
            className="mr-3 cursor-pointer"
            src="/remove.svg"
            alt="Remove Idea"
            onClick={() => onRemoveIdea(idea)}
          />
        )}
        <section className="text-center sm:flex-1 sm:text-left">
          <h2 className="text-xl sm:text-2xl sm:leading-6">{idea.name}</h2>
          <small>{idea.userName}</small>
        </section>
        <section className="pt-3 mt-6 border-t-2 border-black sm:pt-0 sm:pl-3 sm:border-t-0 sm:border-l-2 sm:flex sm:items-center">
          <h3 className="text-3xl font-bold text-center">{idea.votes}</h3>
          {currentUser && !userVoted(idea?.id || "") && (
            <nav className="flex justify-center sm:block">
              <img
                src={arrowIcon}
                alt="Vote up"
                className="w-10 cursor-pointer"
                onClick={() => upIdea(idea, true)}
              />
              <img
                src={arrowIcon}
                alt="Vote down"
                className="w-10 cursor-pointer transform rotate-180"
                onClick={() => downIdea(idea, false)}
              />
            </nav>
          )}
        </section>
      </article>
    </>
  );
};

export default IdeaItem;
