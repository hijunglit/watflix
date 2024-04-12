import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";

type IForm = {
  toDo: string;
};

function CreateToDo() {
  const toDosStorage = "ToDos";
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write your To Do!" })}
        placeholder='Write your to do!'
      />
      <button>add to do</button>
    </form>
  );
}

export default CreateToDo;
