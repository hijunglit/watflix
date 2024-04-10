import { useForm, SubmitHandler } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { Categories, toDoState } from "../atom";

type IForm = {
  toDo: string;
};

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: Categories.TO_DO },
      ...oldToDos,
    ]);
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
