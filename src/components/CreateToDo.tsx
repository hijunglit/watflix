import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Categories, toDoState } from "../atom";

type IForm = {
  toDo: string;
};

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: Categories.TO_DO },
      ...oldToDos,
    ]);
    const toDosToString = JSON.stringify(toDos);
    localStorage.setItem("toDos", JSON.stringify(toDosToString));
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Write your to do!" })}
        type='text'
        placeholder='Write your to do'
      />
      <button>add to do</button>
    </form>
  );
}

export default CreateToDo;
