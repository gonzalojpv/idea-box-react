import { createContext } from "react";

interface TodosContextProps {
  addTodo: (newTodo: Todo) => void;
  removeTodo: (todoId: number) => void;
  clearTodos: () => void;
  todos: Todo[];
}

export const TodoContext = createContext<TodosContextProps>({
  addTodo: () => {},
  removeTodo: () => {},
  clearTodos: () => {},
  todos: []
});

export default const TodoContextProvider = () => {

  return (<TodoContext.Provider></TodoContext.Provider>)
}
