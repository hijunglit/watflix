import { atom, selector } from "recoil";

export type IToDo = {
    text: string;
    id: number;
    category: "TO_DO" | "DONE" | "DOING";
  };
export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
  });

export const toDoSelector = selector({
    key: 'FilterToDoState',
    get: ({get}) => {
      const toDos = get(toDoState);
      return [
        toDos.filter((todo) => todo.category === 'TO_DO'),
        toDos.filter((todo) => todo.category === 'DOING'),
        toDos.filter((todo) => todo.category === 'DONE'),
      ]
    }
  })