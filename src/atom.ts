import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO"="TO_DO",
  "DOING"="DOING",
  "DONE"="DONE",
}
export interface IToDo {
    text: string;
    id: number;
    category: Categories;
  }
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [
    ({setSelf, onSet}) => {
      const todoStorage = "Todos";
      const savedValue = localStorage.getItem(todoStorage);
      if(savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ?localStorage.removeItem(todoStorage)
          :localStorage.setItem(todoStorage, JSON.stringify(newValue))

      })
    }
  ],
});
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoSelector =selector({
  key:"toDoSelector",
  get: ({ get }) => {
      const toDos = get(toDoState);
      const category = get(categoryState);
      return toDos.filter((toDo) => toDo.category === category);
  },
})