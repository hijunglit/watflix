import { atom } from "recoil";

export type IToDo = {
    text: string;
    id: number;
    category: "TO_DO" | "DONE" | "DOING";
  };
export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
  });