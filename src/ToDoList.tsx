import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

const ErrorMessage = styled.span`
  color: #fff;
`;

type IForm = {
  todo: string;
};

function ToDoList() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const submitHandler = (data: IForm) => {
    console.log(data);
    setValue("todo", "");
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input {...register("todo", { required: "write to do" })} />
      <button>add to do</button>
    </form>
  );
}

export default ToDoList;
