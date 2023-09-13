export interface Idea {
name: string;
userName: string;
votes: number;
id: string;
}

export interface IdeaListProps {
 items: Idea[];
 upIdea: (idea: Idea) => void
 downIdea: (idea: Idea) => void
}
