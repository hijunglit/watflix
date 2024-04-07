import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, toDoSelector, toDoState } from "../atom";
import React from "react";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    console.log("I want to", name);
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      console.log(toDoSelector);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <>
      <li>{text}</li>
      {category !== "TO_DO" && (
        <button name='TO_DO' onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DOING" && (
        <button name='DOING' onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name='DONE' onClick={onClick}>
          Done
        </button>
      )}
    </>
  );
}

export default ToDo;
