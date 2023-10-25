import useFirebase from "../../hooks/useFirebase";
import IdeaItem from "../IdeaItem";
import Swal from "sweetalert2";

import type { Idea, IdeaListProps } from "../../types/ideas";
import { useCallback } from "react";

const IdeaList = ({ items, upIdea, downIdea, fetchIdeas }: IdeaListProps) => {
  const { removeIdeaAction } = useFirebase();

  const onRemoveIdea = useCallback((idea: Idea) => {
    Swal.fire({
      title: `Do you want to remove the ${idea.name}`,
      showCancelButton: true,
      confirmButtonText: "Remove",
    }).then(async result => {
      if (result.isConfirmed) {
        if (idea) {
          await removeIdeaAction(idea.id || "");
          fetchIdeas();
        }
      }
    });
  }, []);

  return (
    <>
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
