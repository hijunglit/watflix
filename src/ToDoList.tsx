import { eventNames } from "process";
import React, { FormEvent, useState } from "react";

function ToDoList() {
  const [todo, setTodo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
  };
  return (
    <form onSubmit={onSubmit}>
      <input type='text' onChange={onChange} placeholder='write to do' />
      <button>add to do</button>
    </form>
  );
}

export default ToDoList;
