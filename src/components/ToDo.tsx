import { useRecoilState, useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atom";
import React from "react";

function ToDo({ text, id, category }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = () => {
    const index = toDos.findIndex((todo) => todo.id === id);
    const newList = removeItemAtIndex(toDos, index);
    setToDos(newList);
  };
  function removeItemAtIndex(arr: IToDo[], index: number) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={deleteToDo}>Delete</button>
    </li>
  );
}

export default ToDo;
