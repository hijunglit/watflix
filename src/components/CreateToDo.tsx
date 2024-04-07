import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";

type IForm = {
  toDo: string;
};

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState); // recoil
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onVaild = ({ toDo }: IForm) => {
    setToDos((oldTodos) => [
      { text: toDo, id: Date.now(), category },
      ...oldTodos,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(onVaild)}>
      <input
        {...register("toDo", { required: "Please write a to do" })}
        placeholder='Write a to do'
      />
      <button>add to do</button>
    </form>
  );
}

export default CreateToDo;
