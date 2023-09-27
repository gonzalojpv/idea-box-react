export interface Idea {
name: string;
userName: string;
user: string;
votes: number;
createdAt: number;
id: string;
}

export interface IdeaListProps {
  // @ts-ignore
 items: Idea[];
 upIdea: (idea: Idea) => void
 downIdea: (idea: Idea) => void
}
