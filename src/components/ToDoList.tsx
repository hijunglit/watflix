import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import { toDoSelector, toDoState } from "../atom";
import ToDo from "./ToDo";

function ToDoList() {
  const [toDo, doing, done] = useRecoilValue(toDoSelector);
  return (
    <>
      <h1>What work will you hustle today?😀🔥🔥🔥</h1>
      <hr />
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <h2>To Do</h2>
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
