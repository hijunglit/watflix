import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import { toDoState } from "../atom";
import ToDo from "./ToDo";

function ToDoList() {
  const toDo = useRecoilValue(toDoState);
  return (
    <>
      <h1>What work will you hustle today?😀🔥🔥🔥</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
