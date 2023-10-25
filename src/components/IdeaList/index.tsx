import RemoveIdea from "../RemoveIdea";
import useFirebase from "../../hooks/useFirebase";
import IdeaItem from "../IdeaItem";

import type { Idea, IdeaListProps } from "../../types/ideas";
import { useCallback, useState } from "react";

const IdeaList = ({ items, upIdea, downIdea }: IdeaListProps) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea>();

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
        <IdeaItem
          idea={item}
          key={item.name}
          onRemoveIdea={onRemoveIdea}
          upIdea={upIdea}
          downIdea={downIdea}
        />
      ))}
    </>
  );
};

export default IdeaList;
