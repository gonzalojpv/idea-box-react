export interface Idea {
name: string;
userName: string;
user: string;
votes: number;
createdAt: number;
}

export interface IdeaListProps {
 items: Idea[];
 upIdea: (idea: Idea) => void
 downIdea: (idea: Idea) => void
}
